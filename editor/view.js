/**
 * editor/view.js
 * Handles Sidebar and Preview.
 */
if (!window.EditorModules) window.EditorModules = {};

window.ViewModule = {
  getToolbar: function() {
    return `
            <div class="tool-select-container" onclick="window.ViewModule.toggleFullscreen()">
                <div class="tool-select"><i class="ri-fullscreen-line"></i> Fullscreen</div>
            </div>
            
            <div class="tool-select-container" onclick="window.ViewModule.openPreview()">
                <div class="tool-select"><i class="ri-printer-cloud-line"></i> Print Preview</div>
            </div>

            <div class="divider"></div>
            ${window.EditorUtils.createDropdown('zoom', 'Zoom', ['50%', '75%', '100%', '125%'])}
        `;
  },
  
  toggleFullscreen: function() {
    !document.fullscreenElement ? document.documentElement.requestFullscreen() : document.exitFullscreen();
  },
  
  // --- PAGE NAVIGATION LOGIC ---
  togglePagesSidebar: function() {
    const sb = document.getElementById('pagesSidebar');
    sb.classList.toggle('open');
    this.populateSidebar();
  },
  
  populateSidebar: function() {
    const content = document.getElementById('sidebarContent');
    const editor = document.getElementById('editor');
    content.innerHTML = '';
    
    // Find Headers to act as anchors
    const headers = editor.querySelectorAll('h1, h2');
    if (headers.length === 0) {
      content.innerHTML = '<div style="padding:10px; color:#999">Add Headings (H1, H2) to navigate document structure.</div>';
      return;
    }
    
    headers.forEach((h, index) => {
      const id = 'header-' + index;
      h.id = id;
      const link = document.createElement('div');
      link.className = h.tagName === 'H1' ? 'nav-link nav-h1' : 'nav-link nav-h2';
      link.textContent = h.textContent || '(Untitled)';
      link.onclick = () => {
        h.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      content.appendChild(link);
    });
  },
  
  openPreview: function() {
    const body = document.getElementById('previewBody');
    const editor = document.getElementById('editor');
    body.innerHTML = '';
    const clone = editor.cloneNode(true);
    // Clean clone
    clone.classList.add('paper-clone');
    clone.contentEditable = "false";
    clone.removeAttribute('id');
    clone.style.transform = 'none'; // reset zoom
    body.appendChild(clone);
    document.getElementById('previewModal').classList.add('open');
  }
};

window.EditorModules.zoom = (val) => {
  const paper = document.getElementById('editor');
  paper.style.transform = `scale(${parseInt(val)/100})`;
  paper.style.transformOrigin = 'top center';
};