# Навыки агентов

Навыки проекта находятся в `.agents/skills`.

## Источники

При обновлении копируй исходный каталог навыка целиком и обновляй его версию.
Навыки исключены из Biome для сохранения исходного форматирования и примеров.

### Matt Pocock

- Репозиторий: [mattpocock/skills](https://github.com/mattpocock/skills).
- Версия: `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d`.
- Лицензия: [MIT, Matt Pocock](../.agents/LICENSE).

- `retro` — `skills/engineering/retro`.
- `code-review` — `skills/engineering/code-review`.
- `writing-for-agents` — `skills/productivity/writing-for-agents`,
  зависимость `retro`.

### Vercel

- Репозиторий: [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills).
- Версия: `1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62`.
- [`vercel-react-best-practices`](../.agents/skills/vercel-react-best-practices/SKILL.md)
  — `skills/react-best-practices`, лицензия MIT.

## Использование

Правила из [архитектуры компонентов](component-architecture.md) и
[соглашений Git](git-conventions.md) имеют приоритет над общими
рекомендациями навыков.

Трекер для `code-review` — GitHub Issues репозитория
[doher/tv-shows-frontend](https://github.com/doher/tv-shows-frontend).
Читай связанные задачи через подключённый GitHub MCP.

### Путь запроса при архитектурном ревью

Если изменения затрагивают запрос по действию пользователя, передай агенту
`Standards` задачу проследить один такой сценарий по коду. В отчёте укажи
цепочку вызовов от обработчика UI через `task` до API и, если результат
сохраняется, до метода записи в стор. Если запрос запускается косвенно,
укажи фактическое место запуска и сверь его с
[правилами презентера](component-architecture.md#view-и-presenter).

### Ревью незакоммиченных изменений

Если запрос касается текущих незакоммиченных изменений, используй `HEAD`
при отсутствии явно указанной базы. Соблюдай заданные базу и область ревью.

- Проверяй staged и unstaged вместе. Для базы `HEAD` используй `git diff HEAD --`.
- Включай новые файлы из `git ls-files --others --exclude-standard`. Читай их
  напрямую или собирай общий diff во временном индексе.
