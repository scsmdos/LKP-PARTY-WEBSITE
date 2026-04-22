<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::guard('admin')->attempt($request->only('email', 'password'))) {
            $admin = Auth::guard('admin')->user();
            $admin->update(['last_login_at' => now()]);
            
            $token = $admin->createToken('admin_auth_token')->plainTextToken;
            
            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'admin' => $admin
            ]);
        }

        return response()->json(['message' => 'Invalid email or password'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function me(Request $request)
    {
        return response()->json(['data' => $request->user()]);
    }

    public function updateProfile(Request $request)
    {
        \Illuminate\Support\Facades\Log::info('Profile Update Request', $request->all());
        
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:admins,email,' . $request->user()->id,
            ]);

            $admin = $request->user();
            $admin->update($request->only('name', 'email'));

            \Illuminate\Support\Facades\Log::info('Profile Updated Success', ['id' => $admin->id]);

            return response()->json([
                'message' => 'Profile updated successfully',
                'data' => $admin
            ]);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Profile Update Failed: ' . $e->getMessage());
            throw $e;
        }
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        $admin = $request->user();

        if (!\Illuminate\Support\Facades\Hash::check($request->current_password, $admin->password)) {
            return response()->json(['message' => 'Current password does not match.'], 400);
        }

        $admin->update(['password' => \Illuminate\Support\Facades\Hash::make($request->new_password)]);

        return response()->json(['message' => 'Password changed successfully']);
    }
}
