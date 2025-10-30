<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Score;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    public function index()
    {
        $scores = Score::orderByDesc('score')->limit(10)->get();
        return view('leaderboard.index', compact('scores'));
    }
}