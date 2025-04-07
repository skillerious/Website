# Manual Installation

If you prefer setting up **Markiva** from its source code instead of using a pre-built installer, follow the manual installation steps below. This approach is especially useful if you want to customize the application, contribute to development, or run it in a development environment.

---

## 1. Prerequisites

Before you begin, ensure the following are installed on your system:

1. **Node.js (v14+ recommended)**  
   - Verify using `node -v`
2. **npm (or yarn)**  
   - Verify using `npm -v` or `yarn -v`
3. **Git** (optional but recommended for cloning the repository)

---

## 2. Clone or Download the Repository

There are two ways to obtain the Markiva source code:

1. **Clone via Git**  
   ```bash
   git clone https://github.com/skillerious/Markiva.git
   cd Markiva
   ```
2. **Download the ZIP**  
   1. Visit the [Markiva repository](https://github.com/skillerious/Markiva)
   2. Click the **Code** button → **Download ZIP**  
   3. Extract the ZIP file into a folder of your choice  
   4. Navigate to that folder in your terminal or command prompt

---

## 3. Install Dependencies

Inside the **Markiva** project folder, run:

```bash
npm install
```

This command installs all required dependencies, including Electron, CodeMirror, and other packages used by Markiva.

---

## 4. Run Markiva in Development Mode

Once dependencies are installed:

```bash
npm start
```

This will launch **Markiva** in development mode. You’ll see a new window with the custom interface, and the console where you ran `npm start` will display logs.

**Note:**  
- If you encounter any errors or missing modules, double-check you have the correct Node.js version and that `npm install` ran successfully.

---

## 5. Building a Production Version (Optional)

If you’d like to create your own packaged version of Markiva (for distribution or personal use), you can do so with:

```bash
npm run dist
```

Electron Builder will generate an executable or installer specific to your platform (e.g., `.exe` on Windows, `.dmg` on macOS).

The build output will be placed in a directory named `dist` (for example, `dist/Markiva Setup.exe` on Windows).

---

## 6. Project Structure Overview

Here’s a quick look at the main files and folders in Markiva’s source code:

- **`main.js`**  
  Manages the main Electron process, creates windows, and handles IPC events.
- **`renderer.js`**  
  Handles front-end logic for the editor (UI, user actions, CodeMirror setup, etc.).
- **`index.html`**  
  Main window HTML layout and references to the CSS and JS files.
- **`assets/`**  
  Contains images, icons, and other static assets.
- **`package.json`**  
  Defines app metadata, dependencies, build scripts, etc.
- **`node_modules/`**  
  Holds installed dependencies (created/updated after `npm install`).

---

## 7. Troubleshooting

- **Permissions**  
  On certain systems, you may need elevated privileges to install global packages or run some commands. Use `sudo` (macOS/Linux) or run as Administrator (Windows) if needed.
- **Missing Modules**  
  If you see errors about missing modules or packages, re-run `npm install` to ensure all dependencies are in place.
- **Electron Version Issues**  
  Electron updates frequently. If you notice compatibility issues, check `package.json` to confirm the electron version used.  
- **Platform-Specific Complications**  
  Depending on your OS, you may need additional libraries or settings. Refer to the [Electron docs](https://www.electronjs.org/docs) if you have environment-specific questions.

---

## 8. Contributing

We welcome bug reports, feature requests, and code contributions. If you want to make a pull request or share your custom modifications, please read our [contribution guidelines](https://github.com/skillerious/Markiva/blob/main/CONTRIBUTING.md) on GitHub.

---

You now have a working **Markiva** installation from source!  
Enjoy exploring the codebase, adding new features, or simply running Markiva your way.