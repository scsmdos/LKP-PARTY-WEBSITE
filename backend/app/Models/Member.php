<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Member extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'dob' => 'date',
        'is_mobile_verified' => 'boolean',
        'membership_valid_until' => 'date',
        'joined_at' => 'datetime',
    ];

    protected $appends = ['photo_url'];

    public function getPhotoUrlAttribute()
    {
        if ($this->profile_photo) {
            return asset('storage/' . $this->profile_photo);
        }
        return null;
    }

    public function familyMembers()
    {
        return $this->hasMany(FamilyMember::class);
    }

    public function socialProfiles()
    {
        return $this->hasMany(SocialProfile::class);
    }
}
