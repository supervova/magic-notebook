# ИИ-видео

Лучше **не делать всё в одном инструменте**.

## Практический стек

### Вариант A — Grok Imagine

Можно бесплатно.

### Вариант B — есть бесплатный пробник

- **[Runway Gen-4 / Gen-4.5](https://runwayml.com/)** — для немых cinematic-сцен с Анной, потому что Runway делает короткие, контролируемые image-to-video шоты и умеет держать consistency через visual references. Gen-4 делает клипы по 5 или 10 секунд из изображения + prompt, а Gen-4/4.5 позиционируются именно как инструменты с хорошим контролем сцены и консистентности.
- **[Отдельный lip-sync pass](https://help.runwayml.com/hc/en-us/articles/31941427186323-Creating-with-Lip-Sync)** — либо **Runway Lip Sync**, потому что он принимает image/video input, либо **HeyGen Avatar IV**, если нужен именно уверенный “говорящий кадр” с чистой синхронизацией губ и естественной мимикой. HeyGen прямо позиционирует Avatar IV как talking-video из одного фото с clean lip-sync, expressive facial motion и natural gestures.

### Вариант C — если нужен один более “умный” движок

- **Google Veo** (только платный в Google AI Studio; можно попросить у Джона поюзать денек) — очень сильный вариант, если хочешь лучшее следование сложному режиссёрскому промпту, reference images, first/last frame и даже нативный audio. Veo 3.1 умеет image-to-video, до трёх reference images, 8-секундные клипы и 720p/1080p/4k, а Google отдельно выпустил prompt guide именно под creative control.

## Рекомендованный пайплайн для Magic Notebook

### 1. Сначала зафиксируй Анну как персонажа

Не начинай с видео.

Сначала нужно сделать **character pack**:

- 1 hero portrait
- 1 top view reference
- 1 front bed-level reference
- 1 over-the-shoulder reference
- 1 detail sheet: волосы, одежда, лицо, цвет света, постель, ноутбук, наклейка 🧐

У Runway и Veo консистентность сильно лучше, когда ты даёшь **reference image(s)**, а не каждый раз описываешь персонажа с нуля. Runway Gen-4 прямо продвигает работу через visual references для consistent subjects/locations/styles, а Veo 3.1 поддерживает до трёх reference images.

### 2. Раздели AI-блок на 3 независимые сцены

#### Сцена A — top view, Анна лежит

Задача:

- уютная комната
- камера будто в лампе
- кровать по центру
- Анна лежит на животе или полубоком
- одна рука подпирает голову
- согнутые ноги слегка качаются
- закрытый ноутбук перед ней
- логотип не виден, закрыт наклейкой 🧐

#### Сцена B — фронтальный ракурс у кровати

Задача:

- Анна смотрит на ноутбук
- улыбается
- потирает руки
- открывает ноутбук

#### Сцена C — over-the-shoulder

Задача:

- камера за плечом
- видно экран ноутбука
- на экране ОС с обоями, без открытых программ

#### Сцена D — финальный talking shot

Задача:

- фронтальный ракурс
- Анна отводит взгляд от ноутбука
- смотрит в камеру
- поднимает указательный палец
- произносит фразу про Markdown mode

## Как именно это делать

### Подход 1 — лучший по качеству

#### Stage 1: сгенерировать keyframe images

Сначала генерируешь **статичные кадры** для A/B/C/D.

Требование к ним:

- один и тот же персонаж
- один и тот же outfit
- одинаковая палитра
- одно и то же пространство комнаты

Потом:

- эти кадры анимируешь в Runway Gen-4/4.5 или Veo 3.1 как image-to-video. Runway делает короткие 5/10-секундные clips из изображения + prompt, а Veo 3.1 поддерживает image-to-video и reference images.

### Подход 2 — talking shot отдельно

Финальную реплику я бы **не делал тем же генератором, что и атмосферные планы**, если нужен предсказуемый рот и палец.

Лучше:

- либо взять keyframe D и прогнать через **Runway Lip Sync**;
- либо использовать **HeyGen Avatar IV** для одного говорящего шота. Runway Lip Sync принимает image/video input, а HeyGen Avatar IV заточен именно под talking avatars с clean lip-sync.

## Какой инструмент под какую сцену

### Если хочешь минимизировать риск

#### Runway

Используй для:

- сцена A
- сцена B
- сцена C

#### HeyGen / Runway Lip Sync

Используй для:

- сцена D

Это самый безопасный продакшн-вариант.

### Если хочешь максимум режиссёрского контроля

#### Veo 3.1

Используй для:

- A/B/C
- возможно D, если устроит экспериментальный риск

Почему:

- есть reference images;
- есть audio;
- есть first/last frame и более киношный prompt control.

## Character bible для Анны

Сразу фиксирую, как её лучше описывать, чтобы не плавала между шотами.

### Внешность

- young woman, about 24–28
- warm, intelligent, calm expression
- natural beauty, not fashion-model glam
- soft oval face
- medium-length dark blond or light brown hair
- slightly messy home hairstyle
- no heavy makeup
- cozy knit top or oversized soft sweater
- relaxed homewear, neutral tones

### Энергия персонажа

- kind
- slightly playful
- attentive
- feels like a thoughtful writing companion
- not “virtual influencer”
- not “corporate assistant”

### Среда

- hygge bedroom
- warm lamp light
- soft evening ambience
- beige / warm wood / linen palette
- no clutter
- tasteful but lived-in
- writer’s room, not luxury showroom

### Ноутбук

- thin aluminum laptop
- design reminiscent of a premium notebook computer
- **no visible brand**
- logo fully covered by a single 🧐 sticker

## Базовая формула промпта

Для Veo/Runway хорошо работает такая структура:

**subject + environment + camera + action + mood + constraints**

Примерно так:

- who
- where
- camera angle / lens / framing
- exact motion
- lighting
- pacing
- what must not appear

Это очень близко к тому, как Google сама советует подходить к prompting для Veo 3.1 — не просто “что”, а режиссёрская формулировка сцены.

## Готовые промпты

Ниже даю сразу в английском, потому что так обычно лучше для видео-моделей.

### Prompt A — top view

```text
A cozy hygge bedroom at night, warm lamp light, soft beige and wood tones.
A young woman named Anna lies relaxed on a neatly made bed in the center of the room.
Camera is a strict top-down overhead shot, as if hidden inside the ceiling lamp directly above the bed.
Anna supports her head with one fist, smiles softly, and gently waves her bent legs in the air in a relaxed playful way.
In front of her lies a closed thin aluminum laptop on the bed. The laptop brand is not visible; the logo area is fully covered by a single 🧐 emoji sticker.
The room feels calm, intimate, tasteful, and lived-in.
Cinematic realism, natural body proportions, subtle motion, premium lifestyle product-film mood, calm pacing, no fast movement, no extra people, no visible text, no visible brand logos.
```

### Prompt B — frontal bed-level

```text
The same woman, the same bedroom, the same warm evening lamp light, the same bed and laptop.
Camera is now frontal, at bed level, facing Anna from a natural eye-level angle across the bed.
Anna looks at the camera for a brief moment, then smiles warmly, rubs her hands together with quiet excitement, and opens the laptop in front of her.
Natural, believable motion, soft facial expression, cinematic realism, premium calm product-film style, no sudden movement, no visible brand logos, no extra objects appearing.
```

### Prompt C — over the shoulder

```text
Over-the-shoulder shot from behind Anna as she sits on the bed with the opened laptop.
We see part of her shoulder and hair in the foreground, and the laptop screen clearly in view.
The screen shows a clean desktop operating system wallpaper with no open applications, no notifications, and no visible brand marks.
The same warm bedroom lighting, calm atmosphere, realistic camera depth, subtle natural movement, premium cinematic product-film mood.
```

### Prompt D — talking shot

```text
The same woman in the same cozy bedroom, frontal camera at bed level.
Anna briefly looks away from the laptop, then turns her gaze directly to the camera, smiles warmly, raises her index finger upward in a gentle “one more thing” gesture, and speaks one short sentence.
Natural lip movement, expressive but subtle face animation, believable hand gesture, warm lamp light, premium calm cinematic realism, no exaggerated motion, no visible logos, no extra people.
```

## Negative prompt / constraints

Если инструмент поддерживает negative prompt, добавляй почти всегда:

```text
No extra fingers, no distorted hands, no warped laptop, no floating objects,
no flickering face, no changing hairstyle, no changing outfit, no visible brand logos,
no subtitles, no text overlays, no fast camera shake, no clutter, no neon lighting,
no exaggerated expressions, no cartoon look.
```

## Как добиться консистентности Анны

### Обязательные правила

1. **Сначала утверди один master portrait.**
2. Потом сделай **same character reference sheet**.
3. Во всех prompt’ах используй одинаковые:
   - hair
   - outfit
   - room palette
   - bed linen
   - laptop sticker

4. Не меняй одновременно:
   - позу
   - ракурс
   - эмоцию
   - действие
   - композицию

Меняй максимум 1–2 вещи за генерацию.

### Практически

Для Runway:

- подавай reference still каждого персонажа/пространства. Runway Gen-4 продвигает именно reference-based consistency.

Для Veo:

- используй `referenceImages` и держи сцену в пределах 8 секунд. Veo 3.1 допускает до трёх reference images и 8-секундные клипы.

## Речь Анны

Для финальной сцены реплика должна быть короткой.

**If you’re a developer, you can enable Markdown mode.**

Коротко, понятно, ритмично.

## Что может сломаться

### Самые частые проблемы

#### 1. Лицо “плывёт”

Решение:

- сначала утвердить один hero still;
- потом image-to-video, а не text-to-video.

#### 2. Руки и палец кривые

Решение:

- talking shot делать отдельно;
- если палец критичен, генерировать несколько вариантов одного и того же keyframe.

#### 3. Ноутбук меняет форму / логотип появляется

Решение:

- в prompt явно писать:
  - thin aluminum laptop
  - no visible brand
  - logo fully covered by sticker

#### 4. Камера не держит strict top-down

Решение:

- начать с top-down still image;
- анимировать его, а не просить model “сразу снять сверху”.

### Что лучше делать следующим шагом

Сейчас самый полезный следующий подшаг — не общая теория, а **production pack**:

**я могу следующим сообщением собрать тебе полный набор:**

- 4 финальных промпта в polished-версии;
- character sheet prompt для Анны;
- negative prompts;
- shot list с длительностями;
- список дублей, которые надо сгенерировать для каждого кадра.
