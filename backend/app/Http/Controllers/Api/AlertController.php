<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AlertResource;
use Illuminate\Http\Request;

class AlertController extends Controller
{
    public function index(Request $request)
    {
        $business = $request->user()->businesses()->first();
        if (!$business) return response()->json(['message' => 'No business found'], 404);

        $alerts = $business->alerts()->latest()->paginate();
        return AlertResource::collection($alerts);
    }

    public function markAsRead(Request $request, $id)
    {
        $alert = $request->user()->businesses()->first()?->alerts()->findOrFail($id);
        $alert->update(['read_at' => now()]);

        return response()->json(['message' => 'Alert marked as read']);
    }
}
