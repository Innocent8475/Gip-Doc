/**
 * editor/main.js
 * CORE KERNEL: Initializes global namespaces and selection logic.
 */

// Initialize Registry
window.EditorModules = window.EditorModules || {};

window.EditorUtils = {
    savedSelection: null,
    
    saveSelection: function() {
        if (window.getSelection) {
            const sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                this.savedSelection = sel.getRangeAt(0);
            }
        }
    },
    
    restoreSelection: function() {
        const editor = document.getElementById('editor');
        editor.focus();
        if (this.savedSelection && window.getSelection) {
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(this.savedSelection);
        }
    },
    
    // Main Execution Function
    execCmd: function(command, value = null) {
        this.restoreSelection();
        
        if (command === 'fontName' && value) {
            this.loadFont(value);
        }
        
        document.execCommand(command, false, value);
        this.saveSelection();
        document.getElementById('editor').dispatchEvent(new Event('input'));
    },
    
    insertHtmlAtCursor: function(html) {
        this.restoreSelection();
        const sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            const range = sel.getRangeAt(0);
            range.deleteContents();
            
            const div = document.createElement("div");
            div.innerHTML = html;
            const fragment = document.createDocumentFragment();
            let node, lastNode;
            while ((node = div.firstChild)) {
                lastNode = fragment.appendChild(node);
            }
            range.insertNode(fragment);
            range.collapse(false); // Move to end
        }
        this.saveSelection();
        document.getElementById('editor').dispatchEvent(new Event('input'));
    },
    
    loadFont: function(fontName) {
        const id = `font-${fontName.replace(/\s+/g, '-')}`;
        if (!document.getElementById(id)) {
            const link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}&display=swap`;
            document.head.appendChild(link);
        }
    },
    
    // UI Helpers
    createDropdown: function(id, label, items) {
        const listHtml = items.map(item =>
            `<div class="dropdown-item" onmousedown="event.preventDefault(); window.EditorModules['${id}']('${item}')">${item}</div>`
        ).join('');
        
        return `
            <div class="tool-select-container">
                <div class="tool-select dropdown-trigger" title="${label}">
                    <span>${label}</span>
                    <i class="ri-arrow-down-s-fill"></i>
                </div>
                <div class="dropdown-menu">${listHtml}</div>
            </div>
        `;
    },
    
    createIconDropdown: function(id, label, items) {
        const listHtml = items.map(item =>
            `<div class="dropdown-item" onmousedown="event.preventDefault(); window.EditorModules['${id}']('${item.val}')">
                <i class="${item.icon}"></i> ${item.text}
             </div>`
        ).join('');
        return `
            <div class="tool-select-container">
                <div class="tool-select dropdown-trigger" title="${label}">
                    <span>${label}</span> <i class="ri-arrow-down-s-fill"></i>
                </div>
                <div class="dropdown-menu">${listHtml}</div>
            </div>
        `;
    }
};

// Global Listener
document.addEventListener('selectionchange', () => {
    const activeEl = document.activeElement;
    if (activeEl && activeEl.id === 'editor') {
        window.EditorUtils.saveSelection();
    }
});