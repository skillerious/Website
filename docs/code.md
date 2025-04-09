# Writing and Displaying Code in Markiva

Markiva is tailored for technical writers, developers, and anyone who documents code. It supports elegant, readable, and beautifully formatted code through Markdown and syntax highlighting. Whether you're writing short snippets or full functions, Markiva makes code presentation seamless.

---

## 1. Inline Code

Use single backticks to display code **inline**.

### Syntax

`` `inline-code` ``

### Example

```
Use `npm install markiva` to install the package.
```

### Rendered:

Use `npm install markiva` to install the package.

| Use Case               | Benefit                            |
|------------------------|------------------------------------|
| File paths             | `~/Documents/Markiva`              |
| Variables              | `let userName = 'Alex'`            |
| Command line commands  | `git status`                       |

---

## 2. Code Blocks

Use triple backticks to display multi-line blocks with optional language hints.

### Syntax

<pre>
```language
// code here
```
</pre>

### Example

<pre>
```python
def greet(name):
    return f"Hello, {name}"
```
</pre>

### Output

```python
def greet(name):
    return f"Hello, {name}"
```

| Feature        | Description                              |
|----------------|------------------------------------------|
| Syntax hint    | Specify language after backticks         |
| Formatting     | Maintains indentation and line breaks    |
| Highlighting   | Uses Highlight.js to style the output    |

---

## 3. Supported Languages

Markiva supports over **180 programming languages** via **Highlight.js**.

### Commonly Used Languages

| Language   | Extension Examples         |
|------------|----------------------------|
| `javascript` | `.js`, `.mjs`             |
| `python`     | `.py`                     |
| `bash`       | `.sh`, `.zsh`, `.bash`    |
| `html`       | `.html`, `.htm`           |
| `css`        | `.css`                    |
| `json`       | `.json`                   |
| `markdown`   | `.md`                     |

If no language is provided, **auto-detection** attempts to guess the correct one.

---

## 4. Snippet Autocomplete

Markiva provides built-in snippet support to speed up code entry.

### To trigger:

- Press `Ctrl + Space` (Windows/Linux)
- Press `Cmd + Space` (macOS)

### Available Snippet Example

```markdown
```language
Code Block
```
```

| Snippet          | Display Name     |
|------------------|------------------|
| Code Block       | `Code Block`     |
| Inline Code      | `Inline Code`    |
| Bash Template    | `Terminal Snippet`|

---

## 5. Formatting Best Practices

Keep your code blocks clean, short, and contextual.

### Guidelines

| Tip                                | Reason                                         |
|------------------------------------|------------------------------------------------|
| Indent consistently                | Improves readability                          |
| Limit line length (80–120 chars)   | Prevents wrapping and horizontal scrolling    |
| Use comments for clarity           | Helps readers understand logic                |
| Group related code logically       | Enhances comprehension                        |
| Use variables with clear names     | Reduces ambiguity                             |

---

## 6. Styling & Theming Code

### Editor Styling

Handled via **CodeMirror**, which supports themes like:

- `material-darker` (dark mode)
- `default` (light mode)

Change via:

```js
cmEditor.setOption('theme', 'your-theme');
```

### Preview Styling

Handled via **Highlight.js** and CSS overrides in `style.css`.

```css
#preview-content pre code {
  background-color: #222;
  border-radius: 6px;
  padding: 12px;
  font-size: 14px;
}
```

| Area        | Technology Used     |
|-------------|---------------------|
| Editor      | CodeMirror          |
| Preview     | Highlight.js        |
| Styling     | CSS via `style.css` |

---

## 7. Code in Cards

Cards offer a great way to present styled blocks alongside context or explanations.

### Example

```html
<div class="card warning">
  <h4>Don’t do this:</h4>
  <pre><code class="language-js">
eval(userInput);
  </code></pre>
</div>
```

You can create custom styles for `.card` types such as `info`, `tip`, `warning`, etc., in CSS.

---

## 8. Embedding Terminal Commands

For command-line documentation, use `bash` or `shell` syntax.

### Example

```bash
npm install -g markiva
markiva .
```

Rendered:

```bash
npm install -g markiva
markiva .
```

---

## 9. Exporting Code Blocks

When exporting to:

- **PDF** → All code blocks are preserved with syntax highlighting
- **HTML** → Code is embedded with Highlight.js classes for web embedding

Ensure:

- You use valid code syntax
- You specify the language for accuracy
- You avoid extremely long code blocks when formatting for print

---

## 10. Advanced Embedding

Use raw HTML inside Markdown for enhanced control.

### Example

```html
<details>
  <summary>Click to expand code</summary>
  <pre><code class="language-python">
def advanced_feature():
    pass
  </code></pre>
</details>
```

This creates a collapsible block of code.

---

## Conclusion

Markiva is a capable environment for writing and presenting code cleanly and effectively.

- Inline code for quick mentions
- Syntax-highlighted blocks for in-depth examples
- Built-in AI tools to assist with formatting and structure
- Snippets and themes for productivity and personalization

Start building better documentation — one code block at a time.