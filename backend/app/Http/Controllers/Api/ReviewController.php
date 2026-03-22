<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use App\Services\ReviewService;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    protected $reviewService;

    public function __construct(ReviewService $reviewService)
    {
        $this->reviewService = $reviewService;
    }

    public function index(Request $request)
    {
        $businessId = $request->user()->businesses()->first()?->id;

        if (!$businessId) {
            return response()->json(['message' => 'No business found'], 404);
        }

        $reviews = $this->reviewService->getReviews($businessId);

        return ReviewResource::collection($reviews);
    }

    public function show(Request $request, $id)
    {
        $review = $request->user()->businesses()->first()->reviews()->with('reply')->findOrFail($id);
        return new ReviewResource($review);
    }
}
