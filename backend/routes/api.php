<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\OtpController;
use App\Http\Controllers\Member\MemberController;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminMemberController;

// ── Auth Member ────────────────────────────────────────────────────────
Route::post('/auth/send-otp', [OtpController::class, 'sendOtp']);
Route::post('/auth/verify-otp', [OtpController::class, 'verifyOtp']);
Route::post('/auth/verify-firebase', [OtpController::class, 'verifyFirebase']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [OtpController::class, 'logout']);
    Route::get('/auth/me', [OtpController::class, 'me']);

    // Member profile routes
    Route::put('/member/personal', [MemberController::class, 'updatePersonal']);
    Route::get('/member/location', [MemberController::class, 'showLocation']);
    Route::put('/member/location', [MemberController::class, 'updateLocation']);
    Route::post('/member/photo', [MemberController::class, 'uploadPhoto']);
    
    // Family
    Route::get('/member/family', [MemberController::class, 'getFamily']);
    Route::post('/member/family', [MemberController::class, 'addFamily']);
    Route::put('/member/family/{id}', [MemberController::class, 'updateFamily']);
    Route::delete('/member/family/{id}', [MemberController::class, 'deleteFamily']);
    
    // Social & Card
    Route::get('/member/social', [MemberController::class, 'getSocial']);
    Route::put('/member/social', [MemberController::class, 'saveSocial']);
    Route::get('/member/card', [MemberController::class, 'getCard']);
    Route::get('/member/referral', [MemberController::class, 'getReferral']);
});

// ── Admin ──────────────────────────────────────────────────────────────
Route::post('/admin/login', [AdminAuthController::class, 'login']);

Route::middleware(['auth:sanctum', 'type.admin'])->group(function () {
    Route::post('/admin/logout', [AdminAuthController::class, 'logout']);
    Route::get('/admin/me', [AdminAuthController::class, 'me']);
    
    // Profile
    Route::put('/admin/profile', [AdminAuthController::class, 'updateProfile']);
    Route::put('/admin/password', [AdminAuthController::class, 'changePassword']);

    // Stats
    Route::get('/admin/stats/overview', [AdminMemberController::class, 'overview']);
    Route::get('/admin/stats/by-state', [AdminMemberController::class, 'byState']);
    Route::get('/admin/stats/growth', [AdminMemberController::class, 'growth']);

    // Members
    Route::get('/admin/members/export', [AdminMemberController::class, 'export']);
    Route::get('/admin/members', [AdminMemberController::class, 'index']);
    Route::get('/admin/members/{id}', [AdminMemberController::class, 'show']);
    Route::put('/admin/members/{id}/status', [AdminMemberController::class, 'updateStatus']);
    Route::get('/admin/filters', [AdminMemberController::class, 'filterOptions']);
});

// ── Common (Locations mock) ─────────────────────────────────────────────────
Route::get('/locations/districts', function(Request $request) {
    // In real app, load from DB. Here just mock array for demo
    return response()->json(['data' => ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur']]);
});

Route::get('/locations/blocks', function(Request $request) {
    return response()->json(['data' => ['Block 1', 'Block 2', 'Block 3']]);
});
