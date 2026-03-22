<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Auth\Events\Registered;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        \Spatie\Permission\Models\Role::create(['name' => 'business_owner', 'guard_name' => 'web']);
        \Spatie\Permission\Models\Role::create(['name' => 'business_staff', 'guard_name' => 'web']);
    }

    public function test_user_can_register_with_valid_password()
    {
        Event::fake();

        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
        $this->assertNull(User::first()->email_verified_at);
        Event::assertDispatched(Registered::class);
    }

    public function test_user_cannot_register_with_simple_password()
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['password']);
    }

    public function test_business_routes_require_verified_email()
    {
        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);

        $response = $this->actingAs($user, 'sanctum')
                         ->getJson('/api/business');

        $response->assertStatus(403);
    }

    public function test_business_routes_accessible_with_verified_email()
    {
        $user = User::factory()->create([
            'email_verified_at' => now(),
        ]);

        // Mocking the business relationship or ensuring it exists if needed
        $user->businesses()->create([
            'name' => 'Test Business',
            'slug' => 'test-business',
        ]);

        $response = $this->actingAs($user, 'sanctum')
                         ->getJson('/api/business');

        $response->assertStatus(200);
    }
}
