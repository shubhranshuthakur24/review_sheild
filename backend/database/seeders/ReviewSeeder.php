<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $business = Business::first();
        if (!$business) return;

        // 5 Star Positive
        for ($i = 0; $i < 50; $i++) {
            Review::create([
                'business_id' => $business->id,
                'platform' => fake()->randomElement(['google', 'facebook', 'yelp']),
                'rating' => fake()->numberBetween(4, 5),
                'content' => fake()->sentence(),
                'sentiment' => 'positive',
                'replied' => fake()->boolean(),
                'created_at' => fake()->dateTimeBetween('-6 months', 'now'),
            ]);
        }

        // Negative (needs recovery)
        for ($i = 0; $i < 10; $i++) {
            Review::create([
                'business_id' => $business->id,
                'platform' => fake()->randomElement(['google', 'facebook', 'yelp']),
                'rating' => fake()->numberBetween(1, 2),
                'content' => fake()->sentence(),
                'sentiment' => 'negative',
                'recovery_status' => 'pending',
                'created_at' => fake()->dateTimeBetween('-1 month', 'now'),
            ]);
        }
    }
}
