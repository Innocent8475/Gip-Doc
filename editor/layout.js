window.LayoutModule = {
    getToolbar: function() {
        return `
            ${window.EditorUtils.createDropdown('margins', 'Margins', ['Normal', 'Narrow', 'Wide'])}
            ${window.EditorUtils.createDropdown('size', 'Size', ['A4', 'Letter', 'Legal'])}
            ${window.EditorUtils.createDropdown('orientation', 'Orient', ['Portrait', 'Landscape'])}
        `;
    }
};
window.EditorModules.margins = (v) => { 
    const p = document.getElementById('editor'); 
    if(v=='Narrow') p.style.padding = '30px'; 
    else if(v=='Wide') p.style.padding = '80px 100px'; 
    else p.style.padding = '60px'; 
};
window.EditorModules.size = (v) => {
    const p = document.getElementById('editor'); 
    if(v=='Legal') p.style.minHeight='1344px'; else p.style.minHeight='1056px';
};
window.EditorModules.orientation = (v) => {
    const p = document.getElementById('editor'); 
    if(v=='Landscape') p.style.maxWidth='1056px'; else p.style.maxWidth='816px';
};