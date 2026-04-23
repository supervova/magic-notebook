# Минимальный triage workflow под solo-разработку

> [!question] Что такое triage (простыми словами)
> Это регламент обработки входящих issues, помогающей быстро понять — что это, насколько важно и что с этим делать. Цель triage:
>
> - не терять идеи
> - не копить хаос
> - держать фокус на MVP

## ⚡ Общий принцип

**Каждый новый issue должен за 1–2 минуты получить**:

1. тип (`bug` / `feature` / `question`)
2. область (`area`)
3. приоритет
4. решение: `сейчас` / `потом` / не `делать`

## 🧩 Workflow (пошагово)

### 1. Входящий issue

Ты открываешь новый issue → задаёшь 3 вопроса:

#### 1.1) что это ?

- баг → `bug`
- идея → `enhancement`
- вопрос → `question`

#### 1.2) где это?

Добавляешь 1 label:

```txt
area:editor / area:file-manager / area:website / ...
```

#### 1.3) насколько важно?

```txt
priority:high / medium / low
```

### 2. Быстрое решение (самое важное)

После этого **сразу решаешь судьбу issue**:

#### 2.1) делать

```txt
todo:planned
```

#### 2.2) позже

```txt
todo:later
```

#### 2.3) не делать

```txt
todo:wontfix
```

\+ короткий комментарий

#### 2.4) непонятно

```txt
todo:needs-info
```

### 3. Когда начинаешь работу

Меняешь:

```txt
planned → todo:in-progress
```

### 4. Если застрял

```txt
todo:blocked
```

### 5. Когда готово

- закрываешь issue
- (опционально) оставляешь комментарий с результатом

## 🧠 Визуальная модель (очень простая)

```txt
INCOMING
   ↓
TRIAGE (1–2 мин)
   ↓
[ todo:planned ] → todo:in-progress → done
[ todo:later ] → backlog
[ todo:wontfix ]
[ todo:needs-info ]
```

## 📌 Реальные примеры

### Пример 1 — баг в редакторе

```txt
bug
area:editor
priority:high
todo:planned
```

### Пример 2 — идея (не сейчас)

```txt
enhancement
area:ux
priority:low
todo:later
```

### Пример 3 — вопрос пользователя

```txt
question
```

(часто без остального)

## ⚠️ Частые ошибки (важно)

### ❌ Слишком много labels

Не надо:

- 3 area
- 2 priority
- все статусы сразу

👉 максимум:

- 1 type
- 1 area
- 1 priority
- 1 статус

### ❌ Нет решения

Самая частая проблема:

> issue есть, но не понятно — делать или нет

👉 всегда фиксируй:

- todo:planned / todo:later / todo:wontfix

### ❌ Всё помечено как high

👉 тогда ничего не high

## 🧩 Режим для индивидуального разработчика

### Раз в день (или раз в 2–3 дня)

- открываешь Issues
- быстро проходишься по новым
- делаешь triage

⏱ время: 5–10 минут

### Перед началом работы

Смотри сначала баги:

```txt
is:issue is:open label:bug label:priority:high
```

Потом – остальное важное:

```txt
is:issue is:open label:planned label:priority:high
```

Когда важного нет – бэклог:

```txt
is:issue is:open label:todo:later
```

## 🧠 Главное правило

> Issue без triage = потерянный issue
