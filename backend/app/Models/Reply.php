<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'review_id',
    'user_id',
    'content',
    'tone',
    'is_ai_generated',
])]
class Reply extends Model
{
    use HasFactory;

    protected $casts = [
        'is_ai_generated' => 'boolean',
    ];

    public function review()
    {
        return $this->belongsTo(Review::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
