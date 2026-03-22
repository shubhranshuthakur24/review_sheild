<?php

namespace App\Repositories;

use App\Models\Review;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ReviewRepository extends BaseRepository
{
    public function __construct(Review $model)
    {
        parent::__construct($model);
    }

    public function getFilteredReviews(int $businessId)
    {
        return QueryBuilder::for(Review::class)
            ->where('business_id', $businessId)
            ->allowedFilters([
                AllowedFilter::exact('platform'),
                AllowedFilter::exact('rating'),
                AllowedFilter::exact('sentiment'),
                AllowedFilter::exact('replied'),
            ])
            ->defaultSort('-created_at')
            ->paginate();
    }
}
