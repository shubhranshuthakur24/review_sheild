<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BusinessController;
use App\Http\Controllers\Api\FunnelController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\ReplyController;
use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\Admin\BusinessController as AdminBusinessController;
use App\Http\Controllers\Api\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Api\AlertController;
use App\Http\Controllers\Api\NotificationSettingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth Routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
        
        // Email Verification
        Route::get('/verify-email/{id}/{hash}', [AuthController::class, 'verify'])
            ->middleware(['signed', 'throttle:6,1'])
            ->name('verification.verify');

        Route::post('/email/verification-notification', [AuthController::class, 'resendVerification'])
            ->middleware(['throttle:6,1'])
            ->name('verification.send');
    });
});

// Public Funnel Routes
Route::prefix('funnel')->group(function () {
    Route::get('/{slug}', [FunnelController::class, 'show']);
    Route::post('/{slug}/rating', [FunnelController::class, 'submitRating']);
    Route::post('/{slug}/feedback', [FunnelController::class, 'submitFeedback']);
});

// Business Owner & Staff Routes
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/reviews', [ReviewController::class, 'index']);
    Route::get('/reviews/{id}', [ReviewController::class, 'show']);
    Route::post('/reviews/reply', [ReplyController::class, 'store']);
    
    // Business Profile
    Route::get('/business', [BusinessController::class, 'me']);

    // Alerts
    Route::get('/alerts', [AlertController::class, 'index']);
    Route::post('/alerts/{id}/read', [AlertController::class, 'markAsRead']);

    // Settings
    Route::get('/settings/notifications', [NotificationSettingController::class, 'show']);
    Route::put('/settings/notifications', [NotificationSettingController::class, 'update']);
    
    // Analytics
    Route::get('/analytics', [AnalyticsController::class, 'index']);

    // Admin Routes
    Route::middleware(['role:super_admin'])->prefix('admin')->group(function () {
        Route::get('/stats', [AdminDashboardController::class, 'stats']);
        Route::get('/businesses', [AdminBusinessController::class, 'index']);
        Route::get('/businesses/{id}', [AdminBusinessController::class, 'show']);
    });
});
