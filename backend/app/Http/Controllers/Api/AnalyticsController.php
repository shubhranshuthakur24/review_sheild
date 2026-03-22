<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AnalyticsController extends Controller
{
    public function index(Request $request)
    {
        $business = $request->user()->businesses()->first();
        if (!$business) return response()->json(['message' => 'No business found'], 404);

        $days = $request->query('days', 30);
        $startDate = Carbon::now()->subDays($days);

        $stats = [
            'total_reviews' => $business->reviews()->count(),
            'avg_rating' => round($business->reviews()->avg('rating'), 1),
            'positive_percentage' => $this->calculatePercentage($business, 'positive'),
            'neutral_percentage' => $this->calculatePercentage($business, 'neutral'),
            'negative_percentage' => $this->calculatePercentage($business, 'negative'),
            'responses_rate' => $this->calculateResponseRate($business),
            'reviews_by_platform' => $business->reviews()
                ->selectRaw('platform, count(*) as count')
                ->groupBy('platform')
                ->get(),
            'rating_distribution' => $business->reviews()
                ->selectRaw('rating, count(*) as count')
                ->groupBy('rating')
                ->orderBy('rating', 'desc')
                ->get(),
            'trends' => $business->reviews()
                ->where('created_at', '>=', $startDate)
                ->selectRaw('DATE(created_at) as date, count(*) as count, AVG(rating) as avg_rating')
                ->groupBy('date')
                ->get(),
        ];

        return response()->json($stats);
    }

    private function calculatePercentage($business, $sentiment)
    {
        $total = $business->reviews()->count();
        if ($total == 0) return 0;
        $count = $business->reviews()->where('sentiment', $sentiment)->count();
        return round(($count / $total) * 100, 1);
    }

    private function calculateResponseRate($business)
    {
        $total = $business->reviews()->count();
        if ($total == 0) return 0;
        $replied = $business->reviews()->where('replied', true)->count();
        return round(($replied / $total) * 100, 1);
    }
}
