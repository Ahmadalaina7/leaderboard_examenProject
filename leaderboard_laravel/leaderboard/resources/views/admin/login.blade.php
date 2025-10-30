<!doctype html>
<html lang="nl">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100">
    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 class="text-2xl mb-4">Admin login</h2>

            @if($errors->any())
            <div class="bg-red-100 text-red-800 p-2 rounded mb-4">{{ $errors->first() }}</div>
            @endif

            <form method="POST" action="{{ route('admin.login.post') }}">
                @csrf
                <label class="block mb-2">Wachtwoord</label>
                <input name="password" type="password" class="w-full border px-3 py-2 rounded mb-4" />
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
            </form>

            <div class="mt-4 text-sm text-center">
                <a href="{{ route('leaderboard.index') }}" class="text-gray-600">Terug naar Home</a>
            </div>
        </div>
    </div>
</body>

</html>