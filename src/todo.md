# Поддержка и развитие

## 1) На время бета-версии и скидок добавлять в блок JSON-LD раздел offers

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
