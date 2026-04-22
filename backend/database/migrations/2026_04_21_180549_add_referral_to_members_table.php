<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('members', function (Blueprint $table) {
            $table->string('referral_code', 20)->nullable()->unique()->after('member_id');
            $table->string('referred_by', 20)->nullable()->after('referral_code'); // referral_code of referrer
            $table->unsignedInteger('referral_points')->default(0)->after('referred_by');
        });
    }

    public function down(): void
    {
        Schema::table('members', function (Blueprint $table) {
            $table->dropColumn(['referral_code', 'referred_by', 'referral_points']);
        });
    }
};
