# Markiva CLI (Command Line Interface)

While Markiva is primarily a GUI-based Markdown editor, it also offers a lightweight command-line interface (CLI) to support basic automation and scripting use cases. This document outlines the CLI commands, arguments, and tips for using Markiva via the terminal.

---

## 1. Running Markiva from the Command Line

To start Markiva using the command line:

```bash
npm start
```

This will launch the Electron app using the configuration in `package.json`.

If installed as a packaged app:

```bash
./Markiva
```

You can also open specific files directly.

---

## 2. Opening a Specific Markdown File

To open a file in Markiva from the terminal:

```bash
npm start -- path/to/your-file.md
```

If you're using a packaged binary:

```bash
./Markiva path/to/your-file.md
```

This will launch Markiva and load the file in a new tab.

---

## 3. CLI Options (Planned)

> 📌 CLI feature extensions are planned in future releases.

Expected flags:

| Flag | Description |
|------|-------------|
| `--export-pdf <file>` | Export a Markdown file to PDF |
| `--export-html <file>` | Export to static HTML |
| `--headless` | Run without opening the GUI (for automation) |
| `--print` | Print a file using system print dialog |
| `--theme <dark|light>` | Override UI theme |

These will allow better integration with build tools, scripts, and CI pipelines.

---

## 4. Developer Tips

If you're building or testing Markiva:

- Run in dev mode: `npm start`
- Package for production: `npm run dist`
- You can pass environment variables for debugging:

```bash
DEBUG=1 npm start
```

---

## 5. Troubleshooting CLI Launches

### Problem: "Electron not found"

Make sure dependencies are installed:

```bash
npm install
```

And you're using the correct working directory.

---

## 6. Scripts in package.json

```json
"scripts": {
  "start": "electron .",
  "dist": "electron-builder"
}
```

- `start` – Starts the app in development mode
- `dist` – Builds a distributable version of Markiva

You can customize or extend these scripts to fit your workflow.

---

## 7. Future Plans

We are exploring a full-featured CLI tool that could:

- Render markdown to PDF/HTML
- Lint markdown files
- Extract metadata or headings
- Generate changelogs or summaries

---

## Conclusion

The Markiva CLI allows quick launching and will grow to support more powerful workflows over time. Stay tuned for CLI extensions in upcoming releases. Feature requests are welcome!