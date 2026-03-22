<?php

namespace App\Http\Requests\Funnel;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SubmitFeedbackRequest extends FormRequest
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
            'message' => ['required', 'string'],
            'category' => ['nullable', 'string'],
            'contact' => ['nullable', 'array'],
        ];
    }
}
