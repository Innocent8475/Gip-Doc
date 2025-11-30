document.addEventListener('DOMContentLoaded', () => {
    const toolbar = document.getElementById('toolbar');
    const menuBtns = document.querySelectorAll('.menu-btn:not(.special-menu)'); // Exclude sidebar button
    
    const routes = {
        'Home': window.HomeModule,
        'File': window.FileModule,
        'Insert': window.InsertModule,
        'Layout': window.LayoutModule,
        'View': window.ViewModule
    };

    function setToolbar(name) {
        toolbar.style.opacity = '0';
        toolbar.style.height = '46px';
        setTimeout(() => {
            const m = routes[name] || window.HomeModule;
            toolbar.innerHTML = m ? m.getToolbar() : 'Error';
            toolbar.style.opacity = '1';
        }, 150);
    }

    menuBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            menuBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setToolbar(btn.dataset.menu);
        });
    });

    setToolbar('Home');

    // Global Dropdown Handler
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.dropdown-trigger');
        const active = document.querySelector('.dropdown-menu.show');
        
        // If clicking outside, close
        if (!trigger && !e.target.closest('.dropdown-menu')) {
            if(active) { active.classList.remove('show'); toolbar.style.height = '46px'; }
            return;
        }

        if (trigger) {
            const menu = trigger.nextElementSibling; // The .dropdown-menu
            if (menu.classList.contains('show')) {
                menu.classList.remove('show');
                toolbar.style.height = '46px';
            } else {
                if(active) active.classList.remove('show'); // Close others
                menu.classList.add('show');
                toolbar.style.height = (50 + menu.scrollHeight) + 'px';
            }
        }
    });
    
    // Autosave Recovery
    const saved = localStorage.getItem('editorContent');
    document.getElementById('editor').innerHTML = saved || "<h1>Untitled</h1><p>Start typing...</p>";
    
    // Word Count
    document.getElementById('editor').addEventListener('input', () => {
        const t = document.getElementById('editor').innerText;
        document.getElementById('wordCount').innerText = t.split(/\s+/).filter(n=>n!='').length + " words";
    });
});