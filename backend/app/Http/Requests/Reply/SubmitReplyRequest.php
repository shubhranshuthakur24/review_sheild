<?php

namespace App\Http\Requests\Reply;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SubmitReplyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'review_id' => ['required', 'exists:reviews,id'],
            'content' => ['required', 'string'],
            'tone' => ['nullable', 'string'],
            'is_ai_generated' => ['nullable', 'boolean'],
        ];
    }
}
