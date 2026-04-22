<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MemberController extends Controller
{
    public function updatePersonal(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:100',
            'dob' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'occupation' => 'nullable|string|max:100',
            'email' => 'nullable|email|max:100',
            'voter_id' => 'nullable|string|max:20',
        ]);

        $member = $request->user();
        
        // Auto set active if they finish personal + location
        $wasPending = $member->status === 'pending';
        $member->update($validated);
        
        if ($wasPending && $member->state && $member->district) {
            $member->update(['status' => 'active', 'joined_at' => now(), 'membership_valid_until' => now()->addYears(2)]);
        }

        return response()->json(['message' => 'Personal info updated successfully']);
    }

    public function updateLocation(Request $request)
    {
        $validated = $request->validate([
            'state'        => 'required|string|max:100',
            'district'     => 'required|string|max:100',
            'block'        => 'required|string|max:100',
            'assembly'     => 'nullable|string|max:150',
            'village_ward' => 'required|string|max:100',
            'pincode'      => 'required|string|size:6',
            'address_line' => 'nullable|string',
        ]);

        $member = $request->user();
        $wasPending = $member->status === 'pending';
        $member->update($validated);

        if ($wasPending && $member->full_name) {
            $member->update(['status' => 'active', 'joined_at' => now(), 'membership_valid_until' => now()->addYears(2)]);

            // Award points to referrer (10 points per successful referral)
            if ($member->referred_by) {
                \App\Models\Member::where('referral_code', $member->referred_by)
                    ->increment('referral_points', 10);
            }
        }

        return response()->json(['message' => 'Location info updated successfully']);
    }

    public function showLocation(Request $request) {
        $user = $request->user();
        return response()->json([
            'data' => [
                'state'        => $user->state,
                'district'     => $user->district,
                'block'        => $user->block,
                'assembly'     => $user->assembly,
                'village_ward' => $user->village_ward,
                'pincode'      => $user->pincode,
                'address_line' => $user->address_line,
            ]
        ]);
    }

    public function uploadPhoto(Request $request)
    {
        $request->validate(['photo' => 'required|image|max:2048']);
        $member = $request->user();
        
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('profile_photos', 'public');
            $member->update(['profile_photo' => $path]);
        }
        
        return response()->json(['message' => 'Photo uploaded']);
    }

    // --- Family ---
    public function getFamily(Request $request) {
        return response()->json(['data' => $request->user()->familyMembers]);
    }

    public function addFamily(Request $request) {
        $validated = $request->validate(['name' => 'required|string|max:100','relation' => 'required|string|max:50','age' => 'nullable|integer', 'voter_id' => 'nullable|string', 'mobile' => 'nullable|string']);
        $request->user()->familyMembers()->create($validated);
        return response()->json(['message' => 'Family member added']);
    }

    public function updateFamily(Request $request, $id) {
        $member = $request->user()->familyMembers()->findOrFail($id);
        $member->update($request->all());
        return response()->json(['message' => 'Family member updated']);
    }

    public function deleteFamily(Request $request, $id) {
        $request->user()->familyMembers()->findOrFail($id)->delete();
        return response()->json(['message' => 'Family member deleted']);
    }

    // --- Social ---
    public function getSocial(Request $request) {
        return response()->json(['data' => $request->user()->socialProfiles]);
    }

    public function saveSocial(Request $request) {
         $request->validate(['profiles' => 'array']);
         $user = $request->user();
         $user->socialProfiles()->delete(); // reset
         
         if($request->profiles) {
             foreach($request->profiles as $p) {
                 $user->socialProfiles()->create($p);
             }
         }
         return response()->json(['message' => 'Social profiles saved']);
    }

    // --- Card Details ---
    public function getCard(Request $request) {
        $user = $request->user();
        $data = [
            'member_id'  => $user->status === 'active' ? $user->member_id : null,
            'full_name'  => $user->full_name,
            'mobile'     => $user->mobile,
            'state'      => $user->state,
            'district'   => $user->district,
            'assembly'   => $user->assembly,
            'joined_at'  => $user->joined_at ? $user->joined_at->format('d M Y') : null,
            'valid_until' => $user->membership_valid_until ? $user->membership_valid_until->format('M Y') : null,
            'photo_url'  => $user->profile_photo ? asset('storage/' . $user->profile_photo) : null,
        ];
        return response()->json(['data' => $data]);
    }
    // --- Referral ---
    public function getReferral(Request $request) {
        $user = $request->user();

        // Auto-generate for older members who didn't get one during OTP
        if (!$user->referral_code) {
            $base = 'LKP' . str_pad($user->id, 5, '0', STR_PAD_LEFT);
            while (\App\Models\Member::where('referral_code', $base)->exists()) {
                $base = 'LKP' . strtoupper(Str::random(5));
            }
            $user->referral_code = $base;
            $user->save();
        }

        $referrals = \App\Models\Member::where('referred_by', $user->referral_code)
            ->select('full_name', 'mobile', 'status', 'created_at')
            ->latest()
            ->get()
            ->map(fn($m) => [
                'name'   => $m->full_name ?: 'Pending',
                'mobile' => substr($m->mobile, 0, 4) . '******',  // mask mobile
                'status' => $m->status,
                'date'   => $m->created_at->format('d M Y'),
            ]);

        return response()->json([
            'data' => [
                'referral_code'  => $user->referral_code,
                'referral_link'  => env('FRONTEND_URL', 'https://lokkalyanparty.in') . '/member/login?ref=' . $user->referral_code,
                'total_referrals' => $referrals->count(),
                'points'         => $user->referral_points,
                'referrals'      => $referrals,
            ]
        ]);
    }
}
