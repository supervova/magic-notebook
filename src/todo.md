# Плановые обновления сайта

## 1) Hero

Сейчас слишком много кораллового. Сделать в Nano Banano картинку по мотивам той, что делал для SMS: левитирующий в позе лотоса мужчина. Только здесь вместо молодого человека – Эрнест Хэмингуэй с трубкой и в современной одежде: майка Dear Denmark, we hate him too, кеды. Фон добавить уже в HTML – фирменный коралловый квадратик с волнами – то что сейчас используется, как фон для УТП. Только меньше.
Попробовать сделать в «мултяшной» стилистике, типа ~/Pictures/inspiration/_ixd-aesthetics/_imagery/baby-breakfast.png

Заголовок – сверху, голова Хэма закрывает букву или две. Всю композицию сделать на один экран (min-height: 100dvh), чтобы не мельчить.

## 2) На время бета-версии и скидок добавлять в блок JSON-LD раздел offers

После появления оценок в App Store и магазине Windows-приложений добавить раздел aggregateRating.

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "name": "Magic Notebook",
    "@type": "SoftwareApplication",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Windows, macOS",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.6",
      "ratingCount": "8864"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
</script>
```
