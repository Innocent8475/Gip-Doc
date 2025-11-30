/**
 * editor/insert.js
 * Contains the Resize Logic.
 */

if (!window.InsertModule) window.InsertModule = {};

// Inject CSS for Handles
(function() {
  if (!document.getElementById('shape-styles')) {
    const s = document.createElement('style');
    s.id = 'shape-styles';
    s.innerHTML = `.resize-handle { display: none; position: absolute; width: 10px; height: 10px; background: white; border: 1px solid #000; z-index:10; } .editable-shape.selected { outline: 2px solid #3B82F6; } .editable-shape.selected .resize-handle { display: block; }`;
    document.head.appendChild(s);
  }
})();

window.InsertModule = {
  resizing: { active: false, element: null, startX: 0, startWidth: 0, startHeight: 0 },
  
  getToolbar: function() {
    return `
            <input type="file" id="imgUpload" accept="image/*" style="display:none" onchange="window.InsertModule.handleImgUpload(this)">
            <div class="tool-select-container">
                <div class="tool-select dropdown-trigger">
                    <i class="ri-image-add-line"></i> <span>Image</span><i class="ri-arrow-down-s-fill"></i>
                </div>
                <div class="dropdown-menu">
                    <div class="dropdown-item" onmousedown="event.preventDefault(); document.getElementById('imgUpload').click()">Device</div>
                    <div class="dropdown-item" onmousedown="event.preventDefault(); window.InsertModule.insertImageURL()">URL</div>
                </div>
            </div>

            <div class="tool-select-container">
                <div class="tool-select dropdown-trigger">
                    <i class="ri-shape-line"></i> <span>Shapes</span><i class="ri-arrow-down-s-fill"></i>
                </div>
                <div class="dropdown-menu">
                    <div class="dropdown-item" onmousedown="event.preventDefault(); window.InsertModule.insertShape('rect')">Rectangle</div>
                    <div class="dropdown-item" onmousedown="event.preventDefault(); window.InsertModule.insertShape('circle')">Circle</div>
                    <div class="dropdown-item" onmousedown="event.preventDefault(); window.InsertModule.insertShape('pill')">Pill</div>
                </div>
            </div>
            
            <div class="tool-select-container" onclick="window.EditorUtils.execCmd('insertHorizontalRule')"><div class="tool-select"><i class="ri-separator"></i> Div</div></div>
        `;
  },
  
  insertShape: function(type) {
    let style = "width: 100px; height: 100px; background: #ccc; position: relative; display: inline-block;";
    if (type === 'rect') style += " border-radius: 4px;";
    if (type === 'circle') style += " border-radius: 50%;";
    if (type === 'pill') style += " width:120px; height:60px; border-radius: 30px;";
    
    const html = `<span class="editable-shape" contenteditable="false" style="${style}"><span class="resize-handle rh-se" style="bottom:-4px; right:-4px; cursor:se-resize;" data-dir="se"></span></span>`;
    window.EditorUtils.insertHtmlAtCursor(html);
  },
  
  insertImageURL: function() {
    window.SystemModule.prompt('Image URL:').then(url => { if (url) window.EditorUtils.insertHtmlAtCursor(`<img src="${url}" style="max-width:100%">`); });
  },
  
  handleImgUpload: function(input) {
    if (input.files[0]) {
      const r = new FileReader();
      r.onload = e => window.EditorUtils.insertHtmlAtCursor(`<img src="${e.target.result}" style="max-width:100%">`);
      r.readAsDataURL(input.files[0]);
    }
    input.value = '';
  }
};

// --- Resizer Global Events ---
document.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('editable-shape')) {
    document.querySelectorAll('.editable-shape').forEach(s => s.classList.remove('selected'));
    e.target.classList.add('selected');
  } else if (!e.target.classList.contains('resize-handle')) {
    document.querySelectorAll('.editable-shape').forEach(s => s.classList.remove('selected'));
  }
  
  if (e.target.classList.contains('resize-handle')) {
    const s = e.target.parentElement;
    window.InsertModule.resizing = { active: true, element: s, startX: e.clientX, startY: e.clientY, startWidth: parseInt(s.offsetWidth), startHeight: parseInt(s.offsetHeight) };
    e.preventDefault();
  }
});

document.addEventListener('mousemove', (e) => {
  const r = window.InsertModule.resizing;
  if (r.active) {
    e.preventDefault();
    const w = r.startWidth + (e.clientX - r.startX);
    const h = r.startHeight + (e.clientY - r.startY);
    if (w > 20) r.element.style.width = w + 'px';
    if (h > 20) r.element.style.height = h + 'px';
  }
});
document.addEventListener('mouseup', () => window.InsertModule.resizing.active = false);