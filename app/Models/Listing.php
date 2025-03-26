<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    use HasFactory;
    protected $table = 'listings';

    protected $fillable = [
        'title',
        'description',
        'user_id',
        'estimate',
        'sale_order',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
