<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BusinessResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'logo_url' => $this->logo ? asset('storage/' . $this->logo) : null,
            'theme_color' => $this->theme_color,
            'welcome_message' => $this->welcome_message,
            'cta_text' => $this->cta_text,
            'tone' => $this->tone,
        ];
    }
}
