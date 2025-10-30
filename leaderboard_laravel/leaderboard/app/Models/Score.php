<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    protected $fillable = [
        'player_name',
        'time_seconds',
        'score',
        'game_id',
        'submitted_from_ip',
    ];
}
