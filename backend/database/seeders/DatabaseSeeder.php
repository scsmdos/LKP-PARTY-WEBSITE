<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Default Admin if doesn't exist
        if (\App\Models\Admin::count() === 0) {
            \App\Models\Admin::create([
                'name' => 'LKP Admin',
                'email' => 'lokkalyanparty@gmail.com',
                'password' => \Hash::make('Patna@2026'),
                'role' => 'super_admin',
            ]);
        }
    }
}
