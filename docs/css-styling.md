# CSS Styling in Markiva

Markiva is designed with clarity, responsiveness, and aesthetics in mind. Through thoughtful CSS architecture, it balances minimalism with powerful UI features. This guide dives into how Markiva's CSS works and how you can personalize the experience through styling.

---

## 1. Overview of Default Styling

Markiva’s interface is primarily styled through a single `style.css` file. It governs the overall appearance and layout of:

| Area                   | Styled Elements                                     |
|------------------------|-----------------------------------------------------|
| **Editor & Preview**   | Markdown input, syntax highlighting, scroll sync   |
| **Sidebar**            | File tools, formatting buttons                     |
| **Dialogs/Modals**     | Prompts, popovers, alerts                          |
| **Notes & Files**      | Notes panel and file list browser                  |
| **Custom Components**  | Table editor, context menu, status bar             |

All styles are centralized and class/ID based, which makes customization straightforward.

---

## 2. Theming: Light and Dark Modes

Markiva supports **two distinct themes**:

| Theme        | Description                                        |
|--------------|----------------------------------------------------|
| **Dark**     | Default theme using `material-darker` for CodeMirror |
| **Light**    | Brighter UI and `default` CodeMirror theme          |

### How Themes Work

- Switched using the **theme toggle button** in the status bar
- Theme preference is saved in `settings.json`
- Logic is handled in `main.js` and `renderer.js`

---

## 3. CodeMirror Customization

Markiva uses **CodeMirror 5** for the editor. To customize it:

### Examples

```css
/* Change font size */
.CodeMirror {
  font-size: 16px;
}

/* Adjust line number appearance */
.CodeMirror-gutters {
  background-color: #1e1e1e;
  color: #999;
}
```

| Customization      | What to Target                |
|--------------------|-------------------------------|
| Font Size/Family   | `.CodeMirror`                 |
| Background Color   | `.CodeMirror` or `#editor-wrapper` |
| Line Numbers       | `.CodeMirror-gutters`         |
| Active Line        | `.CodeMirror-activeline`      |
| Selection          | `.CodeMirror-selected`        |

Themes can be swapped or created via `codemirror/theme/` or overridden in `style.css`.

---

## 4. Styling Custom Components

Markiva features various styled UI components.

| Component              | Selectors to Use                  |
|------------------------|-----------------------------------|
| Prompt Dialog          | `#custom-prompt`, `.prompt-buttons` |
| Table Editor Panel     | `#table-editor-panel`             |
| GitHub Popover         | `#github-popover`                 |
| Save Changes Dialog    | `#save-changes-dialog`            |

### Sample Styles

```css
#custom-prompt {
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
}
.prompt-buttons button {
  background-color: #05c46b;
  border: none;
  padding: 8px 12px;
}
```

All components are responsive and follow flex/grid layouts for consistency.

---

## 5. Preview Pane Styling

The preview area is rendered with HTML using `marked` and styled with Highlight.js.

### To style Markdown-rendered content:

```css
#preview-content h1,
#preview-content h2 {
  font-weight: bold;
  border-bottom: 1px solid #444;
}

#preview-content code {
  background: #272727;
  padding: 2px 6px;
  border-radius: 3px;
}
```

| Element Type   | Selector Example             |
|----------------|------------------------------|
| Headings       | `#preview-content h1, h2`    |
| Code Blocks    | `#preview-content pre code`  |
| Inline Code    | `#preview-content code`      |
| Lists & Tables | `#preview-content ul, table` |

---

## 6. Responsive Layout

Markiva’s layout uses **Flexbox** to adapt to various screen sizes.

```css
#split-pane {
  display: flex;
  flex-direction: row;
  height: 100%;
}
#editor-container,
#preview-container {
  flex: 1;
  overflow-y: auto;
}
```

| Container             | Layout Strategy |
|-----------------------|-----------------|
| `#main-layout`        | Flex            |
| `#split-pane`         | Row-wise flex   |
| `#status-bar`         | Inline-flex     |

Use `flex-grow`, `flex-shrink`, and media queries to adjust pane behaviors responsively.

---

## 7. Fonts and Icons

Markiva uses:

- **Roboto Font** from Google Fonts
- **Font Awesome** for sidebar and toolbar icons

### Modify Fonts

```html
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
```

To override:

```css
body, .CodeMirror {
  font-family: 'YourFontName', sans-serif;
}
```

To change icons, edit class names like `fa fa-plus` in `index.html`.

---

## 8. Adding Custom Styles

### How to Add Your Own CSS

1. Open `style.css`
2. Scroll to the end or create a `/* Custom Styles */` section
3. Add your custom rules
4. Restart the app (or reload during development)

You can use browser dev tools (`Ctrl+Shift+I`) to inspect and test CSS live.

---

## 9. Creating a Custom Theme

Want a full aesthetic overhaul? Here’s how:

| Step | Action |
|------|--------|
| 1    | Copy an existing CodeMirror theme (`.css`) |
| 2    | Rename and adjust colors, fonts, etc. |
| 3    | Reference it in `index.html` |
| 4    | Update `cmEditor.setOption('theme', 'your-theme')` in `renderer.js` |
| 5    | Match preview styles in `style.css` for full consistency |

Ensure visual continuity between CodeMirror and preview content.

---

## 10. Advanced Tips

- Use [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) for easier theme switching
- Group selectors logically (e.g., `.editor-wrapper`, `.preview-wrapper`)
- Add `:focus` and `:hover` styles for better accessibility
- Maintain mobile responsiveness for future packaging

---

## Conclusion

Markiva’s CSS system is built to be developer-friendly and fully customizable. With a clear structure, modern practices like Flexbox, and support for theming, it’s easy to adapt Markiva to your visual style.

Whether you're adjusting fonts, designing your own layout, or crafting a custom color scheme — **you have complete control**.