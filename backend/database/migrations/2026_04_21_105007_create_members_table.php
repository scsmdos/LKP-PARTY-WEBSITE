<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('member_id', 20)->nullable()->unique();
            $table->string('mobile', 15)->unique();
            $table->boolean('is_mobile_verified')->default(false);
            $table->string('full_name', 100)->nullable();
            $table->date('dob')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->string('profile_photo')->nullable();
            $table->string('occupation', 100)->nullable();
            $table->string('email', 100)->nullable();
            $table->string('voter_id', 20)->nullable();
            $table->string('aadhaar_last4', 4)->nullable();
            $table->text('address_line')->nullable();
            $table->string('state', 100)->nullable();
            $table->string('district', 100)->nullable();
            $table->string('block', 100)->nullable();
            $table->string('village_ward', 100)->nullable();
            $table->string('pincode', 10)->nullable();
            $table->enum('status', ['active', 'pending', 'inactive'])->default('pending');
            $table->date('membership_valid_until')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
