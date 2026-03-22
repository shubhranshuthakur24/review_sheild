<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Funnel\SubmitRatingRequest;
use App\Http\Requests\Funnel\SubmitFeedbackRequest;
use App\Http\Resources\BusinessResource;
use App\Models\Business;
use App\Models\Review;

class FunnelController extends Controller
{
    public function show($slug)
    {
        $business = Business::where('slug', $slug)->firstOrFail();
        return new BusinessResource($business);
    }

    public function submitRating(SubmitRatingRequest $request, $slug)
    {
        $business = Business::where('slug', $slug)->firstOrFail();

        $review = Review::create([
            'business_id' => $business->id,
            'platform' => $request->platform,
            'rating' => $request->rating,
            'utm_params' => $request->utm_params,
            'sentiment' => $this->calculateSentiment($request->rating),
        ]);

        return response()->json(['message' => 'Rating submitted', 'id' => $review->id]);
    }

    public function submitFeedback(SubmitFeedbackRequest $request, $slug)
    {
        $business = Business::where('slug', $slug)->firstOrFail();

        $review = Review::updateOrCreate(
            ['id' => $request->review_id],
            [
                'business_id' => $business->id,
                'content' => $request->message,
                'metadata' => [
                    'category' => $request->category,
                    'contact' => $request->contact,
                ]
            ]
        );

        return response()->json(['message' => 'Feedback submitted']);
    }

    private function calculateSentiment($rating)
    {
        if ($rating >= 4) return 'positive';
        if ($rating <= 2) return 'negative';
        return 'neutral';
    }
}
