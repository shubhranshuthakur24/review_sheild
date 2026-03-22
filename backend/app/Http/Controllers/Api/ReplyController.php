<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reply\SubmitReplyRequest;
use App\Http\Resources\ReplyResource;
use App\Models\Reply;
use App\Models\Review;

class ReplyController extends Controller
{
    public function store(SubmitReplyRequest $request)
    {
        $review = Review::findOrFail($request->validated('review_id'));
        $data = $request->validated();

        $reply = Reply::create([
            'review_id' => $data['review_id'],
            'user_id' => $request->user()->id,
            'content' => $data['content'],
            'tone' => $data['tone'] ?? 'professional',
            'is_ai_generated' => $data['is_ai_generated'] ?? false,
        ]);

        $review->update(['replied' => true]);

        return new ReplyResource($reply);
    }
}
