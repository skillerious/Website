# Customizing Markiva

Markiva is built with customization in mind—whether you’re a casual user looking to change themes or a developer wanting to extend functionality. This guide outlines various ways you can tailor Markiva to suit your workflow and preferences.

---

## 1. User Settings

Markiva saves user preferences in a `settings.json` file located in your system's user data directory.

### You can configure:

- **Theme** (dark/light)
- **Spellcheck** (on/off)
- **Last opened file**
- **Default folder**

These settings are saved automatically and persist between sessions.

---

## 2. Theme Customization

Markiva includes a **theme switcher** in the status bar.

### To customize themes:

- Modify the CodeMirror theme used in `renderer.js`
- Update `style.css` to match your color scheme
- Optionally, add new themes to `node_modules/codemirror/theme/` or load them via CDN

Use this to create your own branded or comfortable visual style.

---

## 3. Font and Editor Styling

You can customize:

- **Font family and size**
- **Line spacing**
- **Editor color scheme**

Modify these in `style.css`:

```css
.CodeMirror {
  font-family: 'Fira Code', monospace;
  font-size: 16px;
  line-height: 1.5;
}
```

---

## 4. Keyboard Shortcuts

Markiva currently supports basic shortcuts like:

- `Ctrl + S` / `Cmd + S` – Save
- `Ctrl + Space` – Trigger snippet hints
- `Ctrl + F` – Search

To add more, bind to `cmEditor` events in `renderer.js`.

---

## 5. Adding Your Own Markdown Snippets

Snippets for Markdown auto-completion are defined in `renderer.js` under `markdownSnippets`.

### Example:

```js
{ text: '**Bold Text**', displayText: 'Bold Text' }
```

Add more entries to suggest templates, reusable blocks, or custom components.

---

## 6. Custom Preview Styling

The preview pane uses HTML rendered from Markdown.

To style it:

- Target `#preview-content` in `style.css`
- Add styles for headings, tables, code blocks, etc.

```css
#preview-content h1 {
  color: #00b894;
  border-bottom: 1px solid #444;
}
```

---

## 7. Extending the UI

You can extend the interface by editing `index.html` and connecting new buttons or dialogs through `renderer.js`.

Ideas include:

- Custom toolbar buttons
- New AI-based tools
- File templates or snippet libraries

---

## 8. Adding New Features

Markiva is modular. You can:

- Use IPC in `main.js` to communicate with the main Electron process
- Add new dialogs or windows (like the GitHub modal)
- Create and call new `ipcRenderer.invoke()` handlers

Explore and modify `main.js` and `renderer.js` to implement what you need.

---

## 9. Plugin Ideas (Advanced)

While Markiva doesn't use a formal plugin system yet, you can implement custom logic via:

- Custom toolbar commands
- Scripted content transformations
- Markdown extensions (e.g., for diagrams, footnotes)

Let us know if you'd like official plugin support in future versions!

---

## 10. Developer Notes

- Markiva uses Electron + Node.js + Vanilla JS + CodeMirror
- You can reload your changes using `npm start`
- For production builds, use `npm run dist`

Pull requests are welcome! Contribute your customizations to help make Markiva better.

---

## Conclusion

Markiva is meant to be flexible. Whether you're tweaking appearance, adding shortcuts, or extending features, you’re in control. Don’t hesitate to experiment—make Markiva your own!