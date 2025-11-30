/**
 * editor/home.js
 * Formatting Tools.
 */

if (!window.EditorModules) window.EditorModules = {};

window.HomeModule = {
    getToolbar: function() {
        return `
            <i class="ri-arrow-go-back-line tool-icon" onmousedown="event.preventDefault(); window.EditorUtils.execCmd('undo')"></i>
            <i class="ri-arrow-go-forward-line tool-icon" onmousedown="event.preventDefault(); window.EditorUtils.execCmd('redo')"></i>
            <i class="ri-format-clear tool-icon" onmousedown="event.preventDefault(); window.EditorUtils.execCmd('removeFormat')"></i>
            <div class="divider"></div>
            
            ${window.EditorUtils.createDropdown('formatBlock', 'Style', ['Paragraph', 'H1', 'H2', 'H3', 'Blockquote'])}
            ${window.EditorUtils.createDropdown('fontName', 'Font', ['Sora', 'Arial', 'Times New Roman', 'Inter', 'Roboto', 'Playfair Display'])}
            
            <div class="tool-select-container">
                <div class="tool-select" style="gap:4px">
                    <i class="ri-subtract-line tool-icon" style="font-size:10px" onmousedown="event.preventDefault(); window.HomeModule.changeFontSize(-1)"></i>
                    <span>Size</span>
                    <i class="ri-add-line tool-icon" style="font-size:10px" onmousedown="event.preventDefault(); window.HomeModule.changeFontSize(1)"></i>
                </div>
            </div>

            <div class="divider"></div>
            
            <i class="ri-bold tool-icon" onmousedown="event.preventDefault(); window.EditorUtils.execCmd('bold')"></i>
            <i class="ri-italic tool-icon" onmousedown="event.preventDefault(); window.EditorUtils.execCmd('italic')"></i>
            <i class="ri-underline tool-icon" onmousedown="event.preventDefault(); window.EditorUtils.execCmd('underline')"></i>
            
             <div class="tool-select-container">
                 <div class="tool-select dropdown-trigger" title="Text Color">
                    <div style="width:12px;height:12px;background:#000;border-radius:2px;"></div>
                    <i class="ri-arrow-down-s-fill"></i>
                </div>
                <div class="dropdown-menu">
                    <div class="dropdown-item" onmousedown="event.preventDefault(); window.EditorUtils.execCmd('foreColor', '#000000')">Black</div>
                    <div class="dropdown-item" onmousedown="event.preventDefault(); window.EditorUtils.execCmd('foreColor', '#DC2626')">Red</div>
                    <div class="dropdown-item" onmousedown="event.preventDefault(); window.EditorUtils.execCmd('foreColor', '#2563EB')">Blue</div>
                    <div class="dropdown-item" onmousedown="event.preventDefault(); window.EditorUtils.execCmd('hiliteColor', '#FEF08A')">Highlight</div>
                </div>
            </div>

            <div class="divider"></div>
            <i class="ri-align-left tool-icon" onmousedown="event.preventDefault(); window.EditorUtils.execCmd('justifyLeft')"></i>
            <i class="ri-align-center tool-icon" onmousedown="event.preventDefault(); window.EditorUtils.execCmd('justifyCenter')"></i>
            <i class="ri-align-right tool-icon" onmousedown="event.preventDefault(); window.EditorUtils.execCmd('justifyRight')"></i>
        `;
    },
    
    changeFontSize: function(delta) {
        window.EditorUtils.execCmd('fontSize', delta > 0 ? '5' : '3');
    }
};

window.EditorModules.formatBlock = (val) => {
    const map = { 'Paragraph': 'P', 'H1': 'H1', 'H2': 'H2', 'H3': 'H3', 'Blockquote': 'BLOCKQUOTE' };
    window.EditorUtils.execCmd('formatBlock', map[val]);
};
window.EditorModules.fontName = (val) => window.EditorUtils.execCmd('fontName', val);