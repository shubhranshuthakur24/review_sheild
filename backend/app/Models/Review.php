<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'business_id',
    'platform',
    'rating',
    'content',
    'sentiment',
    'replied',
    'recovery_status',
    'utm_params',
    'metadata',
])]
class Review extends Model
{
    use HasFactory;

    protected $casts = [
        'replied' => 'boolean',
        'utm_params' => 'array',
        'metadata' => 'array',
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function reply()
    {
        return $this->hasOne(Reply::class);
    }
}
