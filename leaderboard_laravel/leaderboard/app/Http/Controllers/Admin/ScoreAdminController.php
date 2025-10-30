<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Score;
use Illuminate\Http\Request;

class ScoreAdminController extends Controller
{
    public function index()
    {
        $scores = Score::orderByDesc('score')->paginate(25);
        return view('admin.index', compact('scores'));
    }

    public function edit(Score $score)
    {
        return view('admin.edit', compact('score'));
    }

    public function update(Request $request, Score $score)
    {
        $data = $request->validate([
            'player_name' => 'required|string|max:255',
            'score' => 'required|integer',
        ]);

        $score->update($data);
        return redirect()->route('admin.index')->with('success', 'Score bijgewerkt');
    }

    public function destroy(Score $score)
    {
        $score->delete();
        return redirect()->route('admin.index')->with('success', 'Score verwijderd');
    }
}
