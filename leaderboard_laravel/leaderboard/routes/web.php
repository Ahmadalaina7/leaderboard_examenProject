<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ScoreController;
use App\Http\Controllers\Web\LeaderboardController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\ScoreAdminController;
use App\Http\Middleware\AdminAuth;

// Publieke leaderboard-pagina
Route::get('/', [\App\Http\Controllers\Web\LeaderboardController::class, 'index'])
    ->name('leaderboard.index');

// Admin auth & management
Route::get('/admin/login', [AuthController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AuthController::class, 'login'])->name('admin.login.post');

Route::post('/admin/logout', [AuthController::class, 'logout'])->name('admin.logout');

Route::middleware([AdminAuth::class])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [ScoreAdminController::class, 'index'])->name('index');
    Route::get('/scores/{score}/edit', [ScoreAdminController::class, 'edit'])->name('scores.edit');
    Route::put('/scores/{score}', [ScoreAdminController::class, 'update'])->name('scores.update');
    Route::delete('/scores/{score}', [ScoreAdminController::class, 'destroy'])->name('scores.destroy');
});
