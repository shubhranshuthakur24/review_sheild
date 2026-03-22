<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'owner_id',
    'name',
    'slug',
    'logo',
    'theme_color',
    'welcome_message',
    'cta_text',
    'tone',
    'google_place_id',
    'facebook_page_id',
])]
class Business extends Model
{
    use HasFactory;

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function alerts()
    {
        return $this->hasMany(Alert::class);
    }

    public function notificationSetting()
    {
        return $this->hasOne(NotificationSetting::class);
    }
}
