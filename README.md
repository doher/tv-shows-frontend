# tv-shows-frontend

Поиск сериалов по названию с фильтром по жанру, пагинацией и избранным.
React-приложение обращается к NestJS API в соседнем проекте `tv-shows-backend`.

## Локальный запуск

Из каталога фронтенда откройте два терминала. В первом запустите API:

```powershell
cd ../tv-shows-backend
pnpm install
pnpm dev
```

Во втором запустите фронтенд:

```powershell
pnpm install
pnpm dev
```

Откройте адрес, который выведет Vite. Vite передаёт запросы `/api` серверу
на `http://127.0.0.1:8080`. Дополнительные переменные не нужны.

## Развёртывание

Фронтенд и бэкенд развёртываются как два проекта. Выберите Vite для
фронтенда и укажите `VITE_API_BASE_URL` как origin проекта бэкенда
(например, `https://tv-shows-backend-example.vercel.app`, без `/api`).
Для GitHub Pages создайте переменную репозитория `VITE_API_BASE_URL` в
**Settings → Secrets and variables → Actions → Variables**.
В проекте бэкенда задайте `FRONTEND_ORIGIN` равным origin фронтенда
(например, `https://doher.github.io` для стандартного домена Pages этого репозитория).
Переменные должны быть заданы до сборки фронтенда и запуска API.
Контракт API и ограничения хранения описаны в `tv-shows-backend/README.md`.
