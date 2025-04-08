# Writing and Displaying Code in Markiva

Markiva is designed to be a powerful yet simple tool for writing and displaying code snippets in your Markdown documents. Whether you’re documenting a project, writing a tutorial, or sharing a quick example, Markiva supports clean syntax highlighting and formatting using standard Markdown conventions.

---

## 1. Inline Code

Use backticks \`` \` to insert inline code.

### Example:

\`\`npm install markiva\`\` → `npm install markiva`

This is ideal for short commands or single variables within a paragraph.

---

## 2. Code Blocks

Use triple backticks \`\`\` to create multi-line code blocks.

### Syntax:

<pre>
\`\`\`language
// your code here
\`\`\`
</pre>

### Example:

<pre>
\`\`\`javascript
function greet(name) {
  return `Hello, ${name}!`;
}
\`\`\`
</pre>

Will render as:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

---

## 3. Supported Languages

Markiva uses **Highlight.js**, which supports over 180 programming languages.

Popular options include:

- `javascript`
- `python`
- `bash`
- `html`
- `css`
- `json`
- `markdown`

If you don’t specify a language, Markiva will auto-detect the syntax using `highlightAuto`.

---

## 4. Markdown Snippets for Code

Markiva provides a code block snippet in the autocomplete list:

```markdown
\`\`\`language
Code Block
\`\`\`
```

Trigger autocomplete by pressing `Ctrl + Space` (Windows/Linux) or `Cmd + Space` (Mac) inside the editor.

---

## 5. Formatting Tips

- Keep code blocks short and focused
- Use comments to explain key parts
- Avoid embedding large files—link them instead
- Use consistent indentation

---

## 6. Theming & Styling Code

Code blocks are styled using:

- CodeMirror (for editing)
- Highlight.js (for preview)

You can change syntax color schemes by modifying:

- `material-darker` (dark theme)
- `default` (light theme)

Or you can create your own in `style.css`.

---

## 7. Embedding Code in Cards

Combine code blocks with **cards** for teaching or callout purposes:

```html
<div class="card info">
  <h3>Example Usage</h3>
  <pre><code class="language-js">
function add(a, b) {
  return a + b;
}
  </code></pre>
</div>
```

---

## 8. Export Considerations

When exporting to **PDF** or **HTML**, all code blocks retain their formatting and highlighting.

Ensure you use proper syntax and indentation so your code looks polished in export formats.

---

## Conclusion

Markiva makes writing and reading code simple and elegant. With support for inline code, full blocks, and syntax highlighting, it's perfect for developers, technical writers, and educators.

Start coding your docs with confidence!