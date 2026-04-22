<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('social_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('member_id')->constrained('members')->onDelete('cascade');
            $table->enum('platform', ['facebook', 'instagram', 'twitter', 'youtube', 'whatsapp']);
            $table->string('profile_url');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('social_profiles');
    }
};
