<?php

namespace App\Services;

use App\Repositories\ReviewRepository;

class ReviewService extends BaseService
{
    protected $reviewRepository;

    public function __construct(ReviewRepository $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }

    public function getReviews(int $businessId)
    {
        return $this->reviewRepository->getFilteredReviews($businessId);
    }
}
