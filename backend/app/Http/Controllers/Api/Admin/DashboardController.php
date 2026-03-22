<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'total_businesses' => Business::count(),
            'total_reviews' => Review::count(),
            'total_users' => User::count(),
            'avg_rating' => Review::avg('rating'),
        ]);
    }
}
