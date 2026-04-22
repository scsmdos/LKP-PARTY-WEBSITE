<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\OtpToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class OtpController extends Controller
{
    public function sendOtp(Request $request)
    {
        $request->validate(['mobile' => 'required|digits:10']);
        $mobile = $request->mobile;
        $fast2smsKey = trim(config('services.fast2sms.key'));

        $otp = rand(100000, 999999);

        if (!$fast2smsKey && app()->environment('local')) {
            $otp = '123456';
        }

        // Clean up old tokens to prevent DB bloat
        OtpToken::where('mobile', $mobile)->delete();

        OtpToken::create([
            'mobile'     => $mobile,
            'otp'        => $otp,
            'expires_at' => now()->addMinutes(10),
        ]);

        if ($fast2smsKey) {
            try {
                $response = Http::get('https://www.fast2sms.com/dev/bulkV2', [
                    'authorization' => $fast2smsKey,
                    'message'       => "Verification Code: " . $otp . " for Lok Kalyan Party login.",
                    'language'      => 'english',
                    'route'         => 'q',
                    'numbers'       => $mobile,
                ]);
                
                $resBody = $response->json();

                if (!$response->successful() || (isset($resBody['return']) && !$resBody['return'])) {
                    $errorMsg = $resBody['message'] ?? 'SMS API Error';
                    \Log::error("Fast2SMS API Error: " . $errorMsg, $resBody);
                    return response()->json(['message' => 'SMS Gateway Error: ' . $errorMsg], 500);
                }
            } catch (\Exception $e) {
                \Log::error("SMS Sending Failed: " . $e->getMessage());
                return response()->json(['message' => 'SMS server connection failed'], 500);
            }
        }

        return response()->json([
            'message' => 'OTP sent successfully',
            'dev_otp' => app()->environment('local') ? $otp : null,
        ]);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'mobile'       => 'required|digits:10',
            'otp'          => 'required|digits:6',
            'referral_code' => 'nullable|string|max:20',
        ]);

        $otpRecord = OtpToken::where('mobile', $request->mobile)
            ->where('otp', $request->otp)
            ->where('is_used', false)
            ->where('expires_at', '>', now())
            ->latest()
            ->first();

        if (!$otpRecord) {
            return response()->json(['message' => 'Invalid or expired OTP'], 400);
        }

        $otpRecord->update(['is_used' => true]);

        $isNew = !Member::where('mobile', $request->mobile)->exists();

        // Find or create member
        $member = Member::firstOrCreate(
            ['mobile' => $request->mobile],
            ['is_mobile_verified' => true]
        );

        if (!$member->member_id) {
            $member->member_id = 'LKP-' . date('Y') . '-' . str_pad($member->id, 4, '0', STR_PAD_LEFT);
            $member->save();
        }

        // Generate unique referral code if not set
        if (!$member->referral_code) {
            $member->referral_code = $this->generateReferralCode($member);
            $member->save();
        }

        // Track referral only for new members
        if ($isNew && $request->referral_code) {
            $referrer = Member::where('referral_code', $request->referral_code)->first();
            if ($referrer && $referrer->id !== $member->id) {
                $member->referred_by = $request->referral_code;
                $member->save();
            }
        }

        $token = $member->createToken('member_auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Verified successfully',
            'token'   => $token,
            'member'  => $member,
        ]);
    }

    public function verifyFirebase(Request $request)
    {
        $request->validate([
            'firebase_token' => 'required|string',
            'referral_code' => 'nullable|string|max:20',
        ]);

        $apiKey = env('FIREBASE_API_KEY');
        
        try {
            // Verify with Google Identity Toolkit API
            $response = Http::post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key={$apiKey}", [
                'idToken' => $request->firebase_token
            ]);

            if (!$response->successful()) {
                return response()->json(['message' => 'Firebase verification failed'], 401);
            }

            $users = $response->json('users');
            if (empty($users)) {
                 return response()->json(['message' => 'User not found in Firebase'], 401);
            }

            // Get phone number from firebase (usually +91XXXXXXXXXX)
            $fullPhone = $users[0]['phoneNumber'] ?? null;
            if (!$fullPhone) {
                 return response()->json(['message' => 'Phone number missing in token'], 401);
            }

            // Strip +91 if present for local DB consistency (assuming 10 digits in DB)
            $mobile = str_replace('+91', '', $fullPhone);
            
            $isNew = !Member::where('mobile', $mobile)->exists();

            $member = Member::firstOrCreate(
                ['mobile' => $mobile],
                ['is_mobile_verified' => true]
            );

            if (!$member->member_id) {
                $member->member_id = 'LKP-' . date('Y') . '-' . str_pad($member->id, 4, '0', STR_PAD_LEFT);
                $member->save();
            }

            if (!$member->referral_code) {
                $member->referral_code = $this->generateReferralCode($member);
                $member->save();
            }

            if ($isNew && $request->referral_code) {
                $referrer = Member::where('referral_code', $request->referral_code)->first();
                if ($referrer && $referrer->id !== $member->id) {
                    $member->referred_by = $request->referral_code;
                    $member->save();
                }
            }

            $token = $member->createToken('member_auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Verified successfully',
                'token'   => $token,
                'member'  => $member,
            ]);

        } catch (\Exception $e) {
            \Log::error("Firebase verification error: " . $e->getMessage());
            return response()->json(['message' => 'Verification server error'], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function me(Request $request)
    {
        return response()->json(['data' => $request->user()->loadCount(['familyMembers', 'socialProfiles'])]);
    }

    private function generateReferralCode(Member $member): string
    {
        // e.g. LKP-REF-0001 or initials based
        $base = 'LKP' . str_pad($member->id, 5, '0', STR_PAD_LEFT);
        // Ensure uniqueness
        while (Member::where('referral_code', $base)->exists()) {
            $base = 'LKP' . strtoupper(Str::random(5));
        }
        return $base;
    }
}
