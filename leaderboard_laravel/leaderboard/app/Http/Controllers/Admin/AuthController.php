<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function showLogin()
    {
        return view('admin.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'password' => 'required|string'
        ]);

        $password = $request->input('password');

        if ($password === env('ADMIN_PASSWORD')) {
            $request->session()->put('is_admin', true);
            return redirect()->route('admin.index');
        }

        return back()->withErrors(['password' => 'Onjuiste beheerderswachtwoord']);
    }

    public function logout(Request $request)
    {
        $request->session()->forget('is_admin');
        // After logout, redirect to the public leaderboard (home) so user can continue browsing
        return redirect()->route('leaderboard.index');
    }
}
