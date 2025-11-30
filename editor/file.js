/**
 * editor/file.js
 * I/O logic. 
 */

if (!window.EditorModules) window.EditorModules = {};

window.FileModule = {
  getToolbar: function() {
    return `
            <div class="tool-select-container" onclick="window.FileModule.newDoc()">
                <div class="tool-select"><i class="ri-file-add-line"></i> New</div>
            </div>
            
            <input type="file" id="fileInput" accept=".txt,.html,.json,.pdf" style="display:none" onchange="window.FileModule.handleFileOpen(this)">
            <div class="tool-select-container" onclick="document.getElementById('fileInput').click()">
                <div class="tool-select"><i class="ri-folder-open-line"></i> Open</div>
            </div>
            
            <div class="divider"></div>

            <div class="tool-select-container" onclick="window.FileModule.saveLocal()">
                <div class="tool-select"><i class="ri-save-3-line"></i> Save</div>
            </div>

            ${window.EditorUtils.createIconDropdown('download', 'Export', [
                {text: 'PDF Document (.pdf)', icon: 'ri-file-pdf-line', val: 'pdf'},
                {text: 'HTML Source (.html)', icon: 'ri-html5-line', val: 'html'},
                {text: 'Plain Text (.txt)', icon: 'ri-file-text-line', val: 'txt'}
            ])}
        `;
  },
  
  newDoc: function() {
    if (confirm("Unsaved changes will be lost.")) {
      document.getElementById('editor').innerHTML = '<h1>Untitled</h1><p>Start typing...</p>';
      window.SystemModule.toast('Created New Doc', 'success');
    }
  },
  
  saveLocal: function() {
    localStorage.setItem('editorContent', document.getElementById('editor').innerHTML);
    window.SystemModule.toast('Saved to LocalStorage', 'success');
  },
  
  handleFileOpen: function(input) {
    const file = input.files[0];
    if (!file) return;
    
    // View Mode for PDF
    if (file.type === 'application/pdf') {
      this.openPdfViewer(file);
    } else {
      // Edit Mode for Text/HTML
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('editor').innerHTML = e.target.result;
        window.SystemModule.toast('Document Opened', 'success');
      };
      reader.readAsText(file);
    }
    input.value = '';
  },
  
  openPdfViewer: function(file) {
    const modal = document.getElementById('pdfViewerModal');
    const container = document.getElementById('pdfCanvasContainer');
    container.innerHTML = ''; // clear previous
    modal.classList.add('open');
    
    const fileReader = new FileReader();
    fileReader.onload = function() {
      const typedarray = new Uint8Array(this.result);
      if (window.pdfjsLib) {
        window.SystemModule.toast('Loading PDF Viewer...', 'info');
        
        pdfjsLib.getDocument(typedarray).promise.then(async function(pdf) {
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const scale = 1.5;
            const viewport = page.getViewport({ scale: scale });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            canvas.style.margin = "10px";
            canvas.style.boxShadow = "0 2px 10px #000";
            container.appendChild(canvas);
            
            await page.render({ canvasContext: context, viewport: viewport }).promise;
          }
        });
      }
    };
    fileReader.readAsArrayBuffer(file);
  },
  
  closePdfViewer: function() {
    document.getElementById('pdfViewerModal').classList.remove('open');
  }
};

window.EditorModules.download = (type) => {
  window.SystemModule.prompt('Filename:', 'doc').then(name => {
    if (!name) return;
    if (type === 'pdf') {
      const el = document.getElementById('editor');
      const opt = { margin: 0.5, filename: name + '.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4' } };
      html2pdf().set(opt).from(el).save();
    }
    else if (type === 'html') {
      // download logic (simplified)
    }
  });
};