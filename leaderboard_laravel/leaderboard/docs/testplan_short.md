# Testplan (kort)

Doel
---
Kort overzicht van tests die nodig zijn om functionaliteit en stabiliteit aan te tonen.

Scope
---
- Unit: modellen (bijv. `Score`) en helpers
- Feature: API (POST / GET) en admin CRUD
- Smoke: end-to-end check van leaderboard

Belangrijkste testcases
---
1) Unit: `tests/Unit/ScoreModelTest.php` — controleer `$fillable` (verwacht: pass)
2) Feature: API POST `/api/scores` en GET `/api/scores` — verwacht 201/200 en geldige JSON
3) Smoke: bezoek `/leaderboard` — pagina laadt en toont scores

Uitvoeren
---
Run alle tests of filter op ScoreModel:

```powershell
php artisan test --filter=ScoreModelTest
```

Artifacts
---
- Testoutput en screenshots in `docs/test-results/`

Actiepunten
---
- [ ] Schrijf feature-test voor API create/list in `tests/Feature/`
- [ ] Run tests en sla output op in `docs/test-results/`
- [ ] Noteer hoe testdata wordt gemaakt (seeders/.env)
