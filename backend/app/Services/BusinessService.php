<?php

namespace App\Services;

use App\Models\Business;
use Illuminate\Support\Str;

class BusinessService extends BaseService
{
    public function createBusiness(array $data, int $userId)
    {
        return Business::create([
            'owner_id' => $userId,
            'name' => $data['name'],
            'slug' => Str::slug($data['name']),
            'logo' => $data['logo'] ?? null,
            'theme_color' => $data['theme_color'] ?? '#4F46E5',
            'welcome_message' => $data['welcome_message'] ?? null,
            'cta_text' => $data['cta_text'] ?? 'Leave a Review',
            'tone' => $data['tone'] ?? 'professional',
        ]);
    }

    public function getBySlug(string $slug)
    {
        return Business::where('slug', $slug)->firstOrFail();
    }
}
