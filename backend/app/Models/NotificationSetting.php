<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'business_id',
    'channels',
    'triggers',
])]
class NotificationSetting extends Model
{
    use HasFactory;

    protected $casts = [
        'channels' => 'array',
        'triggers' => 'array',
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }
}
