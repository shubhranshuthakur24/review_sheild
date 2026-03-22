<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationSettingResource;
use Illuminate\Http\Request;

class NotificationSettingController extends Controller
{
    public function show(Request $request)
    {
        $business = $request->user()->businesses()->first();
        if (!$business) return response()->json(['message' => 'No business found'], 404);
        
        $settings = $business->notificationSetting;

        return new NotificationSettingResource($settings);
    }

    public function update(Request $request)
    {
        $business = $request->user()->businesses()->first();
        if (!$business) return response()->json(['message' => 'No business found'], 404);

        $settings = $business->notificationSetting()->updateOrCreate(
            ['business_id' => $business->id],
            [
                'channels' => $request->channels,
                'triggers' => $request->triggers,
            ]
        );

        return new NotificationSettingResource($settings);
    }
}
