# CSS Styling in Markiva

Markiva uses custom CSS to create a clean, modern, and functional interface for Markdown editing. This guide explains how styling works in Markiva and how you can customize it to fit your needs.

---

## 1. Default Styling

Markiva’s main styles are defined in the `style.css` file located in the project root. This file styles:

- **Editor and Preview Areas**
- **Sidebar Buttons**
- **Notes and File List**
- **Dialogs and Modals**
- **Custom Elements** like popovers and table editors

---

## 2. Theming: Light vs Dark

Markiva supports two themes:
- **Dark Theme (Default)**: Uses `material-darker` for CodeMirror and darker UI tones.
- **Light Theme**: Uses CodeMirror's `default` theme and lighter backgrounds.

### Switching Themes

- Users can toggle themes using the **theme switch button** in the status bar.
- The selected theme is saved in `settings.json`.

You can find theme-switching logic in `main.js` and `renderer.js`.

---

## 3. CodeMirror Styling

Markiva integrates **CodeMirror 5** as its Markdown editor.

### To Customize CodeMirror:

- Modify themes:
  - Located in `node_modules/codemirror/theme/`
  - Or override with custom rules in `style.css`
- Example: Change font size
  ```css
  .CodeMirror {
    font-size: 15px;
  }
  ```

### Common Customizations:

- **Line height**
- **Background color**
- **Line number styles**
- **Selection color**

---

## 4. Custom Elements

Markiva includes custom components like:

- Prompt modals
- GitHub popover
- Table editor panel
- Save changes dialog

These are all styled in `style.css` using class-based selectors.

You can target them using IDs or classes such as:

```css
#custom-prompt {
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
}
.prompt-buttons button {
  background: #05c46b;
}
```

---

## 5. Styling the Preview

The preview pane renders HTML from Markdown using **Marked** and **Highlight.js**.

To style rendered Markdown output:

```css
#preview-content h1,
#preview-content h2 {
  font-weight: bold;
  border-bottom: 1px solid #444;
}

#preview-content code {
  background-color: #222;
  padding: 2px 4px;
  border-radius: 4px;
}
```

This ensures the preview looks clean and matches your theme.

---

## 6. Responsive Layout

Markiva uses **flexbox-based layouts** for:

- Sidebar and main content split
- Editor and preview panes
- Status bar distribution

You can tweak sizes, spacing, and responsiveness via:

```css
#split-pane {
  display: flex;
  height: 100%;
}
#editor-container,
#preview-container {
  flex: 1;
}
```

---

## 7. Fonts and Icons

- **Font**: Uses [Roboto](https://fonts.google.com/specimen/Roboto) via Google Fonts.
- **Icons**: Uses [Font Awesome](https://fontawesome.com/) for UI icons.

You can switch fonts or icons by updating `<link>` tags in `index.html` and modifying CSS rules accordingly.

---

## 8. Adding Your Own Styles

To add your custom styles:

1. Open `style.css`
2. Add your CSS rules at the bottom or in a separate section
3. Restart Markiva (or reload if in development mode)

Tip: Use browser dev tools (right-click → Inspect Element) during development to test CSS changes live.

---

## 9. Creating a Custom Theme

To create a new theme:

1. Duplicate `material-darker.css` in CodeMirror’s theme directory
2. Rename it (e.g., `mytheme.css`)
3. Reference it in your `index.html` and apply it in `renderer.js` via `cmEditor.setOption('theme', 'mytheme')`

Don’t forget to match preview styles to your custom theme for consistency!

---

## 10. Conclusion

Markiva’s styling system is flexible and easy to extend. Whether you're tweaking fonts or building a custom UI experience, CSS gives you full control.

Feel free to experiment and share your custom styles with the community!