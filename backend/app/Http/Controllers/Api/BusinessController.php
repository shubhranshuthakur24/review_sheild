<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BusinessResource;
use Illuminate\Http\Request;

class BusinessController extends Controller
{
    public function me(Request $request)
    {
        $business = $request->user()->businesses()->first();
        
        if (!$business) {
            return response()->json(['message' => 'No business profile found'], 404);
        }

        return new BusinessResource($business);
    }
}
