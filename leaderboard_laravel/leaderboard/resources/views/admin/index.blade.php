<!doctype html>
<html lang="nl">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin - Scores</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100">
    <nav class="bg-white shadow-sm">
        <div class="container mx-auto px-4 py-3 flex items-center justify-between">
            <a href="{{ route('leaderboard.index') }}" class="text-lg font-semibold">Leaderboard</a>
            <div>
                <a href="{{ route('leaderboard.index') }}" class="mr-4 text-sm text-gray-700">Home</a>
                <form method="POST" action="{{ route('admin.logout') }}" style="display:inline">@csrf
                    <button class="text-sm text-red-600">Logout</button>
                </form>
            </div>
        </div>
    </nav>

    <div class="container mx-auto p-6">
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl">Beheer Scores</h1>
            <div>
                <form method="POST" action="{{ route('admin.logout') }}">@csrf
                    <button class="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
                </form>
            </div>
        </div>

        @if(session('success'))
        <div class="bg-green-100 text-green-800 p-2 rounded mb-4">{{ session('success') }}</div>
        @endif

        <div class="bg-white rounded shadow overflow-hidden">
            <table class="min-w-full">
                <thead class="bg-gray-800 text-white">
                    <tr>
                        <th class="px-4 py-2">#</th>
                        <th class="px-4 py-2">Speler</th>
                        <th class="px-4 py-2">Score</th>
                        <th class="px-4 py-2">Aangemaakt</th>
                        <th class="px-4 py-2">Acties</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($scores as $s)
                    <tr class="border-t">
                        <td class="px-4 py-2">{{ $s->id }}</td>
                        <td class="px-4 py-2">{{ $s->player_name }}</td>
                        <td class="px-4 py-2">{{ $s->score }}</td>
                        <td class="px-4 py-2">{{ $s->created_at }}</td>
                        <td class="px-4 py-2">
                            <a href="{{ route('admin.scores.edit', $s->id) }}" class="text-blue-600 mr-2">Aanpassen</a>
                            <form method="POST" action="{{ route('admin.scores.destroy', $s->id) }}" style="display:inline">@csrf @method('DELETE')
                                <button class="text-red-600" onclick="return confirm('Weet je het zeker?')">Verwijder</button>
                            </form>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div class="mt-4">{{ $scores->links() }}</div>
    </div>
</body>

</html>