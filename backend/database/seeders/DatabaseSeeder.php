<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Roles
        $superAdmin = Role::firstOrCreate(['name' => 'super_admin', 'guard_name' => 'web']);
        $businessOwner = Role::firstOrCreate(['name' => 'business_owner', 'guard_name' => 'web']);
        $businessStaff = Role::firstOrCreate(['name' => 'business_staff', 'guard_name' => 'web']);

        // Test Super Admin
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@reviewshield.com'],
            [
                'name' => 'Super Admin',
                'password' => bcrypt('password'),
            ]
        );
        $adminUser->assignRole($superAdmin);

        // Test Business Owner
        $ownerUser = User::firstOrCreate(
            ['email' => 'owner@example.com'],
            [
                'name' => 'Business Owner',
                'password' => bcrypt('password'),
            ]
        );
        $ownerUser->assignRole($businessOwner);

        $this->call([
            BusinessSeeder::class,
            ReviewSeeder::class,
        ]);
    }
}
