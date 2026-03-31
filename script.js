document.addEventListener('DOMContentLoaded', function() {
    // --- Controle de tema claro/escuro (Toggle Switch) ---
    const themeSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const body = document.body;

    // Aplicar tema
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            if (themeSwitch) themeSwitch.checked = true;
        } else {
            body.removeAttribute('data-theme');
            if (themeSwitch) themeSwitch.checked = false;
        }
    }

    // Verificar preferência de tema
    function checkTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return savedTheme || (prefersDark ? 'dark' : 'light');
    }

    // Aplicar tema inicial
    const initialTheme = checkTheme();
    applyTheme(initialTheme);

    // Alternar entre temas via Toggle Switch
    if (themeSwitch) {
        themeSwitch.addEventListener('change', function(e) {
            const currentTheme = e.target.checked ? 'dark' : 'light';
            applyTheme(currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
    }

    // Função para abrir abas
    function openTab(evt, tabName) {
        // Esconder todos os conteúdos de tab
        const tabContents = document.getElementsByClassName('tab-content');
        for (let i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }

        // Desativar todas as tabs
        const tabs = document.getElementsByClassName('tab');
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove('active');
        }

        // Mostrar conteúdo da tab atual e ativar a tab
        document.getElementById(tabName).classList.add('active');
        evt.currentTarget.classList.add('active');
    }

    // Adicionar event listeners para todas as abas
    const tabs = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function(e) {
            const tabName = this.getAttribute('data-tab') ||
                this.getAttribute('onclick').match(/'(.*?)'/)[1];
            openTab(e, tabName);
        });
    }

    // Ativar a primeira aba por padrão
    if (tabs.length > 0) {
        const firstTab = tabs[0];
        const firstTabName = firstTab.getAttribute('data-tab') ||
            firstTab.getAttribute('onclick').match(/'(.*?)'/)[1];
        firstTab.classList.add('active');
        const firstTabContent = document.getElementById(firstTabName);
        if (firstTabContent) firstTabContent.classList.add('active');
    }

    // --- Lógica do Menu Flutuante (Dropdown) ---
    const langDropdown = document.getElementById('langDropdown');
    const langBtn = document.getElementById('langBtn');

    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });

        // Fecha o menu ao clicar fora dele
        window.addEventListener('click', (e) => {
            if (!langDropdown.contains(e.target)) {
                langDropdown.classList.remove('active');
            }
        });

        // Impede fechamento ao clicar dentro do menu (opcional)
        const dropdownMenu = langDropdown.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    // --- Lógica da Barra Lateral (Toggle) ---
    const barraToggle = document.getElementById('barraToggle');
    const barraLateral = document.querySelector('.barra-lateral');

    if (barraToggle && barraLateral) {
        barraToggle.addEventListener('click', function() {
            // Alterna entre expandida e recolhida
            barraLateral.classList.toggle('expandida');
            
            // Atualiza posição visual do botão se necessário
            if (barraLateral.classList.contains('expandida')) {
                this.style.left = '305px';
            } else {
                this.style.left = '85px';
            }
        });
    }
});