// Webflow Theme Switcher
// Aguarda o DOM estar pronto
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o theme switcher
    initThemeSwitcher();
});

// Função principal do theme switcher
function initThemeSwitcher() {
    // Seleciona elementos
    const actualTheme = document.querySelector('.actual-theme');
    const themeItems = document.querySelectorAll('.theme-item');
    
    // Verifica se os elementos existem
    if (!actualTheme || themeItems.length === 0) {
        console.log('Theme switcher elements not found');
        return;
    }
    
    // Adiciona event listeners para cada theme item
    themeItems.forEach(item => {
        item.addEventListener('click', function() {
            switchTheme(this);
        });
    });
    
    // Carrega o tema salvo no localStorage
    loadSavedTheme();
}

// Função para carregar o tema salvo
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        // Encontra o theme item correspondente
        const themeItems = document.querySelectorAll('.theme-item');
        const targetThemeItem = Array.from(themeItems).find(item => {
            return getThemeClass(item) === savedTheme;
        });
        
        if (targetThemeItem) {
            // Aplica o tema salvo
            switchTheme(targetThemeItem, true); // true = sem animação
        }
    }
}

// Função para trocar o tema
function switchTheme(clickedThemeItem, silent = false) {
    // Pega a classe do tema atual
    const actualTheme = document.querySelector('.actual-theme');
    const currentThemeClass = getThemeClass(actualTheme);
    
    // Pega a classe do tema clicado
    const newThemeClass = getThemeClass(clickedThemeItem);
    
    // Se não há mudança, não faz nada
    if (currentThemeClass === newThemeClass) {
        return;
    }
    
    // Salva o tema no localStorage
    if (newThemeClass) {
        localStorage.setItem('selectedTheme', newThemeClass);
    }
    
    // Se não for silent, adiciona classe de transição
    if (!silent) {
        document.body.classList.add('theme-transitioning');
    }
    
    // Troca as classes entre actual-theme e theme-item
    swapThemeClasses(actualTheme, clickedThemeItem, currentThemeClass, newThemeClass);
    
    // Atualiza todos os elementos com classes de tema
    updateAllThemeElements(currentThemeClass, newThemeClass);
    
    // Remove a classe de transição após a animação
    if (!silent) {
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 300);
    }
}

// Função para pegar a classe do tema de um elemento
function getThemeClass(element) {
    const classes = Array.from(element.classList);
    // Filtra classes que terminam com '-mode' (assumindo que são as classes de tema)
    const themeClass = classes.find(cls => cls.endsWith('-mode'));
    return themeClass || '';
}

// Função para trocar classes entre actual-theme e theme-item
function swapThemeClasses(actualTheme, themeItem, oldClass, newClass) {
    // Remove a classe antiga do actual-theme
    if (oldClass) {
        actualTheme.classList.remove(oldClass);
    }
    
    // Adiciona a nova classe ao actual-theme
    if (newClass) {
        actualTheme.classList.add(newClass);
    }
    
    // NÃO troca as classes dos theme-items - eles devem manter suas classes originais
    // Isso evita que os theme-items mudem de cor/aparência
}

// Função para atualizar TODOS os elementos com classes de tema
function updateAllThemeElements(oldClass, newClass) {
    // Seleciona TODOS os elementos do DOM
    const allElements = document.querySelectorAll('*');
    let updatedCount = 0;
    
    allElements.forEach(element => {
        // PULA os theme-items - eles devem manter suas classes originais
        if (element.classList.contains('theme-item')) {
            return;
        }
        
        // Verifica se o elemento tem a classe antiga
        if (oldClass && element.classList.contains(oldClass)) {
            // Remove a classe antiga
            element.classList.remove(oldClass);
            // Adiciona a nova classe
            if (newClass) {
                element.classList.add(newClass);
            }
            updatedCount++;
        }
    });
    

}

// Adiciona CSS para transições suaves
function addTransitionStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Transições suaves para mudança de tema */
        .theme-transitioning * {
            transition: all 0.3s ease-in-out !important;
        }
        
        /* Transições específicas para cores */
        .theme-transitioning {
            transition: background-color 0.3s ease-in-out, 
                        color 0.3s ease-in-out, 
                        border-color 0.3s ease-in-out !important;
        }
    `;
    document.head.appendChild(style);
}

// Inicializa os estilos de transição
addTransitionStyles();

// Função para debug (opcional)
function debugThemeState() {
    const actualTheme = document.querySelector('.actual-theme');
    const themeItems = document.querySelectorAll('.theme-item');
    const savedTheme = localStorage.getItem('selectedTheme');
    
    // Retorna informações para debug sem console.log
    return {
        savedTheme: savedTheme,
        actualThemeClasses: actualTheme ? Array.from(actualTheme.classList) : [],
        themeItemsCount: themeItems.length,
        themeItemsClasses: Array.from(themeItems).map(item => Array.from(item.classList))
    };
}

// Função para limpar o tema salvo
function clearSavedTheme() {
    localStorage.removeItem('selectedTheme');
}

// Exporta funções para uso global (se necessário)
window.themeSwitcher = {
    init: initThemeSwitcher,
    switchTheme: switchTheme,
    debug: debugThemeState,
    clearSaved: clearSavedTheme,
    loadSaved: loadSavedTheme
};
