# Authoring Content with Markiva

Welcome to **Markiva** — your intelligent, minimal, and flexible Markdown authoring environment. Whether you’re writing documentation, personal notes, technical manuals, or blog posts, Markiva brings together simplicity and power to streamline your workflow.

This guide will serve as a comprehensive reference to help you become a Markdown authoring expert with Markiva.

---

## 1. Why Use Markdown?

Markdown is a markup language that’s designed to be readable in plain text and easily converted into rich HTML. With it, you can:

- Format documents without complex editors
- Write faster and cleaner than using WYSIWYG tools
- Ensure portability across platforms and tools
- Leverage version control (e.g., Git) for tracking changes

Markiva enhances this simplicity with advanced features and a responsive interface tailored for Markdown writing.

---

## 2. Writing in Markdown: Core Syntax

Here’s a detailed breakdown of core Markdown formatting rules:

### Headings

Use the `#` symbol followed by a space to create headings:

```markdown
# Heading 1
## Heading 2
### Heading 3
```

### Emphasis

```markdown
*Italic text*
**Bold text**
***Bold and italic***
```

### Lists

```markdown
- Bullet 1
- Bullet 2

1. Number 1
2. Number 2
```

### Code

```markdown
Inline: `const x = 10;`

Block:
```javascript
function greet(name) {
  return `Hello, ${name}`;
}
```
```

### Links & Images

```markdown
[Visit Markiva](https://github.com/skillerious/Markiva)
![Screenshot](screenshot.png)
```

### Blockquotes & Horizontal Rules

```markdown
> This is a quote

---
```

### Tables

```markdown
| Feature     | Description               |
|-------------|---------------------------|
| Real-time   | Live preview as you type  |
| Exportable  | PDF and HTML support      |
```

Markiva supports GitHub Flavored Markdown (GFM), meaning tables, checkboxes, and extended syntax work seamlessly.

---

## 3. The Editor Experience

Markiva offers a distraction-free, multi-tab editor with:

- **Syntax highlighting** for Markdown
- **Live preview** in split view
- **Spellcheck toggle**
- **Custom themes** (light and dark)
- **Autosave reminders and dirty file detection**

Navigation is intuitive and fast. Click to switch tabs, right-click for context options, and use keyboard shortcuts to maximize productivity.

---

## 4. Visual Formatting with the Sidebar

Markiva features a sidebar packed with formatting utilities:

- **Bold, Italic, Code, Link** — single-click formatting tools
- **Heading levels** — instantly add `#` symbols
- **Table and Media Insertion Wizards** — visually generate tables or insert images
- **Live search & replace** — find and modify text instantly

Markiva’s toolbar reduces your need to memorize syntax — but you still retain full Markdown flexibility.

---

## 5. Advanced Authoring with AI

Markiva’s built-in AI assistants help you refine content faster:

### Summarize

Summarizes long content into concise, bulleted takeaways — useful for executive summaries or documentation intros.

### Simplify

Reduces verbose writing by removing filler and redundant words. Great for clarity and technical accuracy.

### Suggest Headings

Scans paragraphs to suggest useful section headers. Perfect for improving structure or creating a table of contents.

---

## 6. Using Cards and Layout Elements

You can visually emphasize content using **cards**:

```html
<div class="card info">
  <h3>Note</h3>
  <p>This is important information highlighted in a card.</p>
</div>
```

Card types include:

- `card info`
- `card warning`
- `card danger`
- `card success`

Combine Markdown and HTML freely for maximum control.

---

## 7. Document Navigation and Tabs

Each file opens in a new **tab**, making multi-document workflows easy.

Tabs track:

- Dirty state (unsaved changes)
- Filename
- Context (via hover tooltips)

Tabs can be closed, renamed, or reopened from the file list.

---

## 8. Table Editing Panel

When your cursor is on a Markdown table:

- Markiva activates the **Table Editor Panel**
- Add or remove rows and columns with a click
- Supports proper table alignment and formatting

---

## 9. Notes and To-Dos

Use the **Notes panel** on the right for:

- Tracking personal reminders or edits
- Creating lists of references, ideas, or outline bullets
- Pinning or checking off completed tasks

Notes persist between sessions and are stored in `notes.json`.

---

## 10. File Management: Built-in Project Explorer

The **Project Files** panel lets you:

- Open, rename, or delete `.md` files
- Drag and drop files into the workspace
- Search for files using live filtering

Files can be opened in-place or refreshed manually.

---

## 11. Export and Share

Once your document is ready, export it for sharing:

- **Export to PDF** — Creates a print-ready copy
- **Print Document** — Uses the system’s print dialog
- **Export to HTML** — Clean HTML output (for web use)

Exports use your current theme for consistent styling.

---

## 12. GitHub Features

Insert GitHub content with ease:

- Badges for **Stars**, **Issues**, or **Releases**
- Paste GitHub Markdown directly into the editor
- Integrate with your README.md or documentation

Use the **GitHub menu** in the status bar.

---

## 13. Preferences and Configuration

You can access settings like:

- **Default folder path**
- **Spellcheck toggle**
- **Theme (light/dark)**
- **Last file restore**

Settings persist automatically and are saved in `settings.json`.

---

## 14. Shortcuts Reference

| Action                  | Shortcut (Win/Linux) | Shortcut (Mac)      |
|-------------------------|----------------------|---------------------|
| Save File               | Ctrl + S             | Cmd + S             |
| Trigger Markdown Hint   | Ctrl + Space         | Cmd + Space         |
| Search & Replace        | Ctrl + F             | Cmd + F             |
| Toggle Spellcheck       | Alt + S              | Option + S          |
| Export to PDF           | Alt + P              | Option + P          |
| Switch Theme            | Alt + T              | Option + T          |

---

## 15. Authoring Best Practices

- **Organize your documents** with headings and tables
- **Use AI** to improve clarity and tone
- **Preview often** to spot formatting issues
- **Back up** or sync your Markdown files using Git
- **Use cards** or block elements to emphasize key ideas
- **Split content** into modular files for large documents

---

## Conclusion

Markiva is more than just a Markdown editor. It’s your content companion — built for speed, structure, and smart authoring. Whether you’re a writer, developer, or knowledge worker, Markiva provides the tools to create professional-grade content with ease.

Dive in. Write well. Publish confidently.