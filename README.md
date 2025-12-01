
# Gip Doc 📝
View live: https://innocent8475.github.io/Gip-Doc/

**Gip Doc** is an ultra-robust, lightweight, and modular WYSIWYG text editor built entirely with native HTML, CSS, and JavaScript. It replicates the functionality and look-and-feel of modern cloud processors (like Google Docs) without the overhead of heavy frameworks.

It features a realistic "Paper" UI, drag-and-drop shape resizing, a built-in PDF viewer, and a document navigation sidebar.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-Production--Ready-orange.svg)

## ✨ Key Features

### 🖥️ Core Editing
- **Rich Text Engine:** Bold, Italic, Underline, Strikethrough, Justification.
- **Typography:** Dynamic Google Fonts loading (Sora, Inter, Roboto, etc.).
- **Formatting:** Headers (H1-H3), Blockquotes, Lists (Ordered/Unordered).
- **Zoom & Layout:** Real-time Zooming and Layout switching (Portrait/Landscape, A4/Letter/Legal).

### 🛠️ Advanced Tools
- **Resizer Engine:** Insert Shapes (Rectangle, Circle, Pill) and **click-and-drag** to resize them.
- **Smart Insert:** Insert images via URL or Device upload.
- **Tables:** Generate custom tables instantly.

### 📂 File Management
- **PDF Viewer:** Built-in read-only PDF viewing engine using `pdf.js`.
- **Import/Export:** Open `.txt`, `.html`, or `.json`. Export to **PDF** (High fidelity), HTML, or Text.
- **Auto-Save:** Automatic persistence to LocalStorage (never lose your work on refresh).

### 🎨 UI & UX
- **Navigation Sidebar:** Auto-generates a Table of Contents based on document Headings.
- **Print Preview:** A dedicated modal simulating the exact printed output.
- **No Native Alerts:** Custom-built "System" module for Toasts, Prompts, and Loading states (no blocking browser popups).
- **Responsive:** Fully optimized mobile view with horizontal scrolling toolbars.

---

## 🏗️ Project Structure

Gip Doc uses a modular JavaScript architecture for maintainability and scalability.

```text
Gip-Doc/
│
├── css/
│   ├── main.css        # Global vars, resets, and utilities
│   └── style.css       # Component styling (Toolbar, Paper, Modals)
│
├── editor/             # The Core Logic Modules
│   ├── main.js         # The Kernel: Selection state & Registry
│   ├── system.js       # UI OS: Toasts, Modals, Prompts
│   ├── home.js         # Formatting & Fonts logic
│   ├── file.js         # I/O, PDF Parsing, Saving
│   ├── insert.js       # Shapes, Resizer Engine, Tables
│   ├── layout.js       # Page dimensions & Margins
│   └── view.js         # Fullscreen, Zoom, Preview, Sidebar
│
├── index.html          # Main application shell
├── editor.js           # Controller: Initializes and links modules
└── README.md           # Documentation
```

---

## 🚀 Getting Started

Since Gip Doc is built with Vanilla JS, no complex build steps (Webpack/Vite) are strictly required.

### Method 1: Direct Open
1. Download or Clone the repository.
2. Open `index.html` in your browser.
   * *Note: Some browsers restrict File API or LocalStorage when opening files directly. Using a local server is recommended.*

### Method 2: Local Server (Recommended)
If you have Python installed or use VS Code:

**VS Code:**
1. Install "Live Server" extension.
2. Right-click `index.html` -> "Open with Live Server".

**Python:**
```bash
cd Gip-Doc
python -m http.server 8000
# Open localhost:8000 in browser
```

---

## 📚 Libraries Used

Gip Doc relies on a few powerful CDNs for specific capabilities:

1.  **[Remix Icon](https://remixicon.com/):** For the UI iconography.
2.  **[html2pdf.js](https://ekoopmans.github.io/html2pdf.js/):** For high-quality canvas-based PDF export.
3.  **[PDF.js (Mozilla)](https://mozilla.github.io/pdf.js/):** To render PDF files inside the view modal without leaving the app.
4.  **[Google Fonts](https://fonts.google.com):** For typography.

---

## 🕹️ Controls

*   **Typing:** Just click on the paper and type.
*   **Menus:** Click tabs (Home, File, etc.) to switch toolbars.
*   **Resizing Shapes:**
    1.  Insert a Shape via `Insert > Shapes`.
    2.  **Click** the shape to select it (Blue outline appears).
    3.  Drag the **white handle** (bottom-right) to resize.
*   **Navigation:** Click the "Pages" button in the menu bar to toggle the Outline Sidebar.

---

## 🤝 Contributing

Contributions are welcome!
1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

**Created by Hassan Innocent**
