# Installatie

Stappen om de applicatie lokaal te draaien.

1. Clone de repository

```powershell
git clone <repo-url>
cd leaderboard
```

2. Installeer dependencies

```powershell
composer install
npm install (indien frontend dependencies)
```

3. Environment

-   Kopieer `.env.example` naar `.env` en vul database- en app-keys in
-   Genereer APP_KEY: `php artisan key:generate`

4. Migraties

```powershell
php artisan migrate --seed
```

5. Start server

```powershell
php artisan serve
```

## Acties

-   [ ] Vul repo-url en eventuele platform-specifieke instructies
