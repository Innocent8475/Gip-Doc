/**
 * editor/system.js
 * Manages Alerts, Prompts, and UI states.
 */

window.SystemModule = {
    
    toast: function(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if(!container) return;

        const el = document.createElement('div');
        el.className = 'toast';
        let icon = 'ri-information-line';
        if(type === 'success') { el.style.borderLeft = "4px solid #10B981"; icon = 'ri-check-circle-line'; }
        if(type === 'error') { el.style.borderLeft = "4px solid #EF4444"; icon = 'ri-error-warning-line'; }
        if(type === 'loading') icon = 'ri-loader-4-line ri-spin';

        el.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
        container.appendChild(el);

        if (type !== 'loading') {
            setTimeout(() => {
                el.style.opacity = '0';
                setTimeout(() => el.remove(), 300);
            }, 3000);
        }
        return el; 
    },

    prompt: function(title, placeholder = '') {
        return new Promise((resolve) => {
            const modal = document.getElementById('customPromptModal');
            const titleEl = document.getElementById('promptTitle');
            const inputEl = document.getElementById('promptInput');
            const confirmBtn = document.getElementById('promptConfirm');
            const cancelBtn = document.getElementById('promptCancel');

            titleEl.textContent = title;
            inputEl.value = '';
            inputEl.placeholder = placeholder;
            modal.classList.add('open');
            inputEl.focus();

            const cleanup = () => {
                modal.classList.remove('open');
                // Removing listeners is handled by cloneNode trick or just logic flags
                // For simplicity, we assume one prompt at a time.
            };

            confirmBtn.onclick = () => { cleanup(); resolve(inputEl.value || null); };
            cancelBtn.onclick = () => { cleanup(); resolve(null); };
            inputEl.onkeypress = (e) => { if(e.key === 'Enter') confirmBtn.click(); };
        });
    },

    showLoading: function(text) { return this.toast(text, 'loading'); },
    closePreview: function() { document.getElementById('previewModal').classList.remove('open'); }
};