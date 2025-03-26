<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    protected $table = 'listings';

    protected $fillable = [
        'title',
        'description',
        'consignor',
        'user_id',
        'estimate',
        'sale_order',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
