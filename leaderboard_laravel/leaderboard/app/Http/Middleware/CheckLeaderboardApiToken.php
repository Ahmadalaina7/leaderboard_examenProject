<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;


class CheckLeaderboardApiToken
{
    public function handle(Request $request, Closure $next)
    {
        // Accept both X-API-TOKEN and X-Token headers for convenience
        $token = $request->header('X-API-TOKEN') ?? $request->header('X-Token') ?? $request->query('api_token');

        if (!$token || $token !== config('services.leaderboard.api_token')) {
            return response()->json(['message' => 'Unauthorized - invalid API token'], 401);
        }

        return $next($request);
    }
}
