<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Score;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'score' => 'required|integer|min:0',
            'player_name' => 'required|string|max:255'
        ]);

        $score = Score::create($validated);
        
        return response()->json($score, 201);
    }
}