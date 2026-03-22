<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BusinessSeeder extends Seeder
{
    public function run(): void
    {
        $owner = User::where('email', 'owner@example.com')->first();
        if (!$owner) return;
        
        Business::create([
            'owner_id' => $owner->id,
            'name' => 'Review Shield Demo',
            'slug' => 'demo-business',
            'theme_color' => '#4F46E5',
            'welcome_message' => 'Welcome! Tell us how we did.',
            'cta_text' => 'Leave a Review',
            'tone' => 'professional',
        ]);
    }
}
