namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
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
            'platform' => $this->platform,
            'rating' => $this->rating,
            'content' => $this->content,
            'sentiment' => $this->sentiment,
            'replied' => $this->replied,
            'recovery_status' => $this->recovery_status,
            'created_at' => $this->created_at,
            'reply' => new ReplyResource($this->whenLoaded('reply')),
        ];
    }
}
