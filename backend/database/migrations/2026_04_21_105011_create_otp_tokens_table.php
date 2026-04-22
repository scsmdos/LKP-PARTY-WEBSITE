<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('otp_tokens', function (Blueprint $table) {
            $table->id();
            $table->string('mobile', 15)->index();
            $table->string('otp', 6);
            $table->timestamp('expires_at');
            $table->integer('attempts')->default(0);
            $table->boolean('is_used')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('otp_tokens');
    }
};
