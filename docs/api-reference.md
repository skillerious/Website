# Markiva API Reference

Markiva includes several internal APIs and exposed functions designed to facilitate communication between the frontend (renderer) and backend (main process) of the Electron app. This reference provides a detailed overview of available IPC methods and key internal functions for customization and development.

---

## 1. IPC Methods

Markiva uses **Electron’s IPC (Inter-Process Communication)** via `ipcMain` and `ipcRenderer` to handle tasks between processes.

---

### 📥 Renderer → Main IPC (`ipcRenderer.invoke` / `ipcRenderer.send`)

| Method | Description |
|--------|-------------|
| `open-file-dialog` | Opens native dialog to choose a `.md` file or folder |
| `get-user-data-path` | Returns the path to the user’s data directory |
| `open-about-window` | Opens the About modal window |
| `open-settings-window` | Opens the Settings modal window |
| `open-github-window` | Opens the GitHub modal |
| `print-document` | Prints the current document preview |
| `export-pdf` | Triggers PDF export of the rendered HTML |
| `export-html` | (Future) Exports the current tab to HTML |
| `toggle-spellcheck` | Toggles spellcheck setting and updates config |
| `switch-theme` | Switches between dark and light UI themes |
| `save-app-settings` | Writes user settings to disk |
| `load-app-settings` | Loads settings from settings.json |

---

### 📤 Main → Renderer IPC (`mainWindow.webContents.send`)

| Channel | Description |
|---------|-------------|
| `insert-github-markdown` | Inserts GitHub badge or content into the active editor |

---

## 2. Global Functions (Renderer)

### `customPrompt(message, defaultValue?)`

Displays a custom modal input field.  
Returns a `Promise<string|null>`.

### `customAlert(message)`

Displays a custom alert modal.  
Returns a `Promise<void>`.

### `window.attemptAppCloseFromMain()`

Called when user tries to close the app.  
Returns `"proceed"` or `"cancel"` after checking for unsaved changes.

---

## 3. AI Tool Functions

These are local helpers used to enhance Markdown documents:

| Function | Description |
|----------|-------------|
| `summarizeText(text)` | Returns a summary of paragraphs |
| `simplifyText(text)` | Removes filler words, simplifies writing |
| `suggestHeadings(text)` | Suggests logical headings from content |
| `displayAiResults(title, lines)` | Formats AI output in a modal |

---

## 4. Editor Utility Functions

| Function | Description |
|----------|-------------|
| `wrapSelection(before, after)` | Wraps selected text with formatting |
| `alignSelection(alignment)` | Wraps blocks in `<div>` with text-align |
| `updatePreview()` | Parses Markdown and updates the preview pane |
| `updateStatusBar()` | Refreshes word count and read time display |
| `provideHint(cm)` | Autocompletion for Markdown snippets |
| `markdownLinter(text)` | Lints Markdown using markdownlint module |

---

## 5. Table Editor API

| Function | Purpose |
|----------|---------|
| `getCurrentTableBlock()` | Detects current Markdown table block |
| `parseTable(text)` | Parses table into a 2D array |
| `formatTable(rows)` | Converts array back to Markdown |
| `tableAddRow()` | Adds a new row to the selected table |
| `tableRemoveRow()` | Removes a row |
| `tableAddColumn()` | Adds a new column |
| `tableRemoveColumn()` | Removes a column based on cursor position |

---

## 6. Exporting & File Functions

| Function | Description |
|----------|-------------|
| `exportCurrentTabToPDF()` | Sends HTML content to main for PDF creation |
| `exportCurrentTabToHTML()` | Converts Markdown to HTML for export |
| `saveSpecificTab(filePath)` | Saves a single open tab to disk |
| `refreshFileList()` | Refreshes the file list in the sidebar |
| `loadFile(filePath)` | Loads content into a new or existing tab |

---

## 7. UI & State Management

| Global Variable | Purpose |
|------------------|---------|
| `tabs[]` | Stores open file tabs and their state |
| `activeTab` | File path of the currently focused tab |
| `userSettings` | Settings object loaded from disk |
| `notes[]` | List of to-do notes from notes.json |

---

## 8. Planned APIs (Future)

- Plugin support with custom card types and buttons
- Enhanced export formats (EPUB, DOCX)
- Scripting support for keyboard macros and automations

---

## Conclusion

Markiva exposes helpful internal APIs and extensible patterns via IPC and frontend logic. Developers and power users can leverage these to add features, automate tasks, or fully customize the editor experience.