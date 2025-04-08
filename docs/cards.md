# Cards in Markiva

Markiva supports a flexible system for using **cards**—visually distinct blocks of content useful for callouts, tips, warnings, or showcasing specific sections of information. Cards are implemented using simple Markdown and enhanced with custom styling via HTML.

---

## 1. What is a Card?

A **card** is a styled block of content that visually stands out in your Markdown document. You can use it to:

- Highlight important notes
- Show tips or best practices
- Display warnings or errors
- Present examples or quotes

---

## 2. Basic Card Syntax

Since Markdown doesn't natively support cards, we use **HTML blocks** inside your Markdown file:

```html
<div class="card info">
  <h3>Info Card</h3>
  <p>This is a helpful piece of information inside a styled card.</p>
</div>
```

---

## 3. Types of Cards

Markiva supports multiple card types by default (you can customize them in `style.css`):

| Card Type | Class Name     | Usage Example |
|-----------|----------------|----------------|
| Info      | `card info`     | Blue-tinted card for neutral information |
| Success   | `card success`  | Green card for confirmations or success |
| Warning   | `card warning`  | Yellow-orange card for cautions |
| Danger    | `card danger`   | Red card for alerts and critical issues |

### Example:

```html
<div class="card warning">
  <h3>Warning</h3>
  <p>Be careful when editing system files directly.</p>
</div>
```

---

## 4. Customizing Card Styles

Open `style.css` and locate or add card styles like:

```css
.card {
  padding: 1em;
  margin: 1em 0;
  border-radius: 8px;
  background-color: #1e293b;
  color: white;
}

.card.info {
  border-left: 6px solid #3498db;
}
.card.success {
  border-left: 6px solid #2ecc71;
}
.card.warning {
  border-left: 6px solid #f39c12;
}
.card.danger {
  border-left: 6px solid #e74c3c;
}
```

---

## 5. When to Use Cards

Use cards when you want to:

- **Draw attention** to a block of text
- **Segment** different types of content
- **Communicate urgency or action**

Avoid overusing them—cards should enhance readability, not overwhelm it.

---

## 6. Tips for Markdown + Cards

- You can use standard Markdown **inside** a card by writing in HTML-compatible syntax.
- Use `<ul>` or `<strong>` inside your card block to maintain semantic formatting.

```html
<div class="card success">
  <p><strong>Tip:</strong></p>
  <ul>
    <li>Use cards sparingly</li>
    <li>Keep content concise</li>
  </ul>
</div>
```

---

## 7. Advanced Usage: Collapsible Cards (Coming Soon)

We plan to support collapsible cards with toggle buttons like:

```html
<div class="card collapsible">
  <button class="toggle">Show/Hide</button>
  <div class="content">
    <p>Hidden by default. Click to expand!</p>
  </div>
</div>
```

With JavaScript support and styles added, these will allow more interactive documents.

---

## Conclusion

Cards are a powerful way to enhance your Markdown documents with visual hierarchy and clarity. Use them to improve reader focus, highlight key sections, or convey meaning through design.

Feel free to create your own card types and share them with the community!