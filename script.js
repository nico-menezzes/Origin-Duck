// Origin - Duck Script
// Arquivo JavaScript criado para o repositório Origin-Duck

console.log('Origin - Duck está funcionando!');

// Função de exemplo
function duckFunction() {
    return 'Quack! Quack!';
}

// Exportar função para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { duckFunction };
}