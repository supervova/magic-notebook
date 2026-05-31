# Скрипт для эмуляции печати – dev-вставка в MN

Для TipTap / ProseMirror лучше делать не DOM-эмуляцию, а **вставку через editor chain/commands**.

Ниже — готовый встроенный demo-хелпер для скринкастов:

- печатает текст по символам;
- делает паузы после строк, точек и запятых;
- запускается hotkey;
- умеет stop/reset;
- не ломает TipTap;
- не требует DevTools.

## 1. Файл `src/features/demo-typing/model/create-demo-typing-controller.ts`

```ts
import type { Editor } from '@tiptap/react';

export interface DemoTypingDelays {
  minDelayMs: number;
  maxDelayMs: number;
  linePauseMs: number;
  sentencePauseMs: number;
  commaPauseMs: number;
  startDelayMs: number;
}

export interface DemoTypingOptions {
  text: string;
  delays?: Partial<DemoTypingDelays>;
  shouldClearBeforeStart?: boolean;
}

export interface DemoTypingController {
  start: () => Promise<void>;
  stop: () => void;
  reset: () => void;
  isRunning: () => boolean;
}

const DEFAULT_DELAYS: DemoTypingDelays = {
  minDelayMs: 45,
  maxDelayMs: 95,
  linePauseMs: 450,
  sentencePauseMs: 320,
  commaPauseMs: 140,
  startDelayMs: 600,
};

/**
 * Создаёт контроллер автопечати для TipTap-редактора.
 * @param editor
 * @param options
 * @returns Контроллер запуска и остановки печати.
 */
export const createDemoTypingController = (
  editor: Editor,
  options: DemoTypingOptions
): DemoTypingController => {
  let isCancelled = false;
  let isStarted = false;

  const delays: DemoTypingDelays = {
    ...DEFAULT_DELAYS,
    ...options.delays,
  };

  const wait = async (ms: number): Promise<void> =>
    new Promise(resolve => {
      window.setTimeout(resolve, ms);
    });

  const randomBetween = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const getExtraDelay = (character: string): number => {
    if (character === '\n') {
      return delays.linePauseMs;
    }

    if (character === '.' || character === '!' || character === '?') {
      return delays.sentencePauseMs;
    }

    if (character === ',') {
      return delays.commaPauseMs;
    }

    return 0;
  };

  const insertCharacter = (character: string): void => {
    if (character === '\n') {
      editor.chain().focus().setHardBreak().run();
      return;
    }

    editor.chain().focus().insertContent(character).run();
  };

  const clearEditor = (): void => {
    editor.chain().focus().clearContent(true).run();
  };

  const reset = (): void => {
    isCancelled = true;
    isStarted = false;
    clearEditor();
  };

  const stop = (): void => {
    isCancelled = true;
    isStarted = false;
  };

  const start = async (): Promise<void> => {
    if (isStarted) {
      return;
    }

    isCancelled = false;
    isStarted = true;

    if (options.shouldClearBeforeStart ?? true) {
      clearEditor();
    }

    editor.chain().focus().run();
    await wait(delays.startDelayMs);

    for (const character of options.text) {
      if (isCancelled) {
        isStarted = false;
        return;
      }

      insertCharacter(character);

      const baseDelay = randomBetween(delays.minDelayMs, delays.maxDelayMs);
      const extraDelay = getExtraDelay(character);

      await wait(baseDelay + extraDelay);
    }

    isStarted = false;
  };

  return {
    start,
    stop,
    reset,
    isRunning: (): boolean => isStarted,
  };
};
```

## 2. Файл `src/features/demo-typing/model/demo-typing-script.ts`

```ts
export const DEMO_TYPING_SCRIPT = `The room is quiet.

There is no pressure to structure ideas,
no need to think about formatting.

Just words, appearing one by one.

And for the first time in a while,
writing feels simple again.`;
```

## 3. Файл `src/features/demo-typing/model/use-demo-typing.ts`

```ts
import { useEffect, useMemo } from 'react';
import type { Editor } from '@tiptap/react';

import {
  createDemoTypingController,
  type DemoTypingController,
} from './create-demo-typing-controller';
import { DEMO_TYPING_SCRIPT } from './demo-typing-script';

export interface UseDemoTypingOptions {
  isEnabled?: boolean;
  hotkeys?: {
    start: string;
    stop: string;
    reset: string;
  };
}

/**
 * Подключает hotkeys для demo-автопечати в TipTap.
 * @param editor
 * @param options
 * @returns Контроллер demo-автопечати.
 */
export const useDemoTyping = (
  editor: Editor | null,
  options?: UseDemoTypingOptions
): DemoTypingController | null => {
  const isEnabled = options?.isEnabled ?? false;

  const hotkeys = {
    start: options?.hotkeys?.start ?? 'Meta+Alt+Enter',
    stop: options?.hotkeys?.stop ?? 'Meta+Alt+Backspace',
    reset: options?.hotkeys?.reset ?? 'Meta+Alt+Delete',
  };

  const controller = useMemo<DemoTypingController | null>(() => {
    if (!editor || !isEnabled) {
      return null;
    }

    return createDemoTypingController(editor, {
      text: DEMO_TYPING_SCRIPT,
      shouldClearBeforeStart: true,
      delays: {
        minDelayMs: 55,
        maxDelayMs: 110,
        linePauseMs: 650,
        sentencePauseMs: 420,
        commaPauseMs: 180,
        startDelayMs: 700,
      },
    });
  }, [editor, isEnabled]);

  useEffect(() => {
    if (!controller || !editor) {
      return;
    }

    const normalizeKey = (value: string): string => value.toLowerCase();

    const isHotkeyMatch = (event: KeyboardEvent, hotkey: string): boolean => {
      const parts = hotkey.split('+').map(normalizeKey);
      const key = normalizeKey(event.key);

      const hasMeta = parts.includes('meta');
      const hasCtrl = parts.includes('ctrl');
      const hasAlt = parts.includes('alt');
      const hasShift = parts.includes('shift');

      const mainKey = parts.find(
        part => part !== 'meta' && part !== 'ctrl' && part !== 'alt' && part !== 'shift'
      );

      if (hasMeta !== event.metaKey) {
        return false;
      }

      if (hasCtrl !== event.ctrlKey) {
        return false;
      }

      if (hasAlt !== event.altKey) {
        return false;
      }

      if (hasShift !== event.shiftKey) {
        return false;
      }

      if (!mainKey) {
        return false;
      }

      return key === mainKey;
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      const isStart = isHotkeyMatch(event, hotkeys.start);
      const isStop = isHotkeyMatch(event, hotkeys.stop);
      const isReset = isHotkeyMatch(event, hotkeys.reset);

      if (!isStart && !isStop && !isReset) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (isStart) {
        void controller.start();
        return;
      }

      if (isStop) {
        controller.stop();
        return;
      }

      controller.reset();
    };

    window.addEventListener('keydown', handleKeyDown);

    return (): void => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [controller, editor, hotkeys.reset, hotkeys.start, hotkeys.stop]);

  return controller;
};
```

## 4. Файл `src/features/demo-typing/model/index.ts`

```ts
export { DEMO_TYPING_SCRIPT } from './demo-typing-script';
export {
  createDemoTypingController,
  type DemoTypingController,
  type DemoTypingDelays,
  type DemoTypingOptions,
} from './create-demo-typing-controller';
export { useDemoTyping, type UseDemoTypingOptions } from './use-demo-typing';
```

## 5. Интеграция в компонент с TipTap

В твоём editor-компоненте, где уже есть `useEditor(...)`:

```ts
import { useEditor } from '@tiptap/react';

import { useDemoTyping } from '@/features/demo-typing/model';
```

После создания `editor`:

```ts
const editor = useEditor({
  editable: true,
  immediatelyRender: false,
  content: '',
  extensions: [
    // ...
  ],
});

useDemoTyping(editor, {
  isEnabled: import.meta.env.DEV,
  hotkeys: {
    start: 'Meta+Alt+Enter',
    stop: 'Meta+Alt+Backspace',
    reset: 'Meta+Alt+Delete',
  },
});
```

## 6. Если хочешь включать это и в production-сборке для записи

Не через `import.meta.env.DEV`, а через отдельный флаг:

```ts
const isDemoTypingEnabled = import.meta.env.DEV || localStorage.getItem('mn-demo-typing') === '1';

useDemoTyping(editor, {
  isEnabled: isDemoTypingEnabled,
});
```

И в console один раз:

```js
localStorage.setItem('mn-demo-typing', '1');
```

Отключить:

```js
localStorage.removeItem('mn-demo-typing');
```

## 7. Важное ограничение TipTap

Сейчас перенос строки сделан через:

```ts
setHardBreak();
```

Это хорошо для **ролика и визуальной записи**.

Но если у тебя абзацы должны быть именно абзацами, а не hard break, можно заменить `\n` на вставку paragraph. Для скринкаста текущий вариант обычно выглядит аккуратнее и предсказуемее.

## 8. Как пользоваться при записи

Последовательность:

1. открыть нужный документ;
2. поставить курсор в редактор;
3. начать запись;
4. нажать hotkey `start`;
5. при необходимости:
   - `stop` — остановить;
   - `reset` — очистить и переписать дубль.

