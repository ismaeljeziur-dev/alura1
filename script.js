// Script de interatividade dos olhos da Monalisa
// Projeto: Arte Interativa - Alura

// Elementos do DOM
const svg = document.querySelector('.monalisa');
const eyeLeftGroup = document.getElementById('eyeLeftGroup');
const eyeRightGroup = document.getElementById('eyeRightGroup');
const pupilLeft = document.getElementById('pupilLeft');
const pupilRight = document.getElementById('pupilRight');
const irisLeft = document.getElementById('irisLeft');
const irisRight = document.getElementById('irisRight');

// Posições iniciais dos olhos
const eyeLeftCenter = { x: 165, y: 170 };
const eyeRightCenter = { x: 235, y: 170 };

// Raio de movimento das pupilas
const maxDistance = 7;

// Variáveis para rastreamento
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

/**
 * Calcula o ângulo entre dois pontos
 * @param {number} cx - Coordenada X do centro
 * @param {number} cy - Coordenada Y do centro
 * @param {number} ex - Coordenada X do ponto final
 * @param {number} ey - Coordenada Y do ponto final
 * @returns {number} Ângulo em radianos
 */
function getAngle(cx, cy, ex, ey) {
    const dy = ey - cy;
    const dx = ex - cx;
    return Math.atan2(dy, dx);
}

/**
 * Calcula a distância entre dois pontos
 * @param {number} x1 - Primeira coordenada X
 * @param {number} y1 - Primeira coordenada Y
 * @param {number} x2 - Segunda coordenada X
 * @param {number} y2 - Segunda coordenada Y
 * @returns {number} Distância euclidiana
 */
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Converte coordenadas de viewport para coordenadas SVG
 * @param {number} clientX - Coordenada X do cliente
 * @param {number} clientY - Coordenada Y do cliente
 * @returns {object} Objeto com x e y em coordenadas SVG
 */
function getCoordinatesInSVG(clientX, clientY) {
    // Obtém a posição do SVG no viewport
    const svgRect = svg.getBoundingClientRect();
    
    // Calcula a posição do mouse relativa ao SVG
    const relativeX = clientX - svgRect.left;
    const relativeY = clientY - svgRect.top;
    
    // Converte para coordenadas do viewBox (400x500)
    const scaleX = 400 / svgRect.width;
    const scaleY = 500 / svgRect.height;
    
    return {
        x: relativeX * scaleX,
        y: relativeY * scaleY
    };
}

/**
 * Atualiza a posição das pupilas baseado na posição do mouse
 */
function updateEyesPosition() {
    // Converte coordenadas do mouse para coordenadas SVG
    const mouseInSVG = getCoordinatesInSVG(mouseX, mouseY);
    
    // ========== OLHO ESQUERDO ==========
    // Calcula o ângulo do mouse em relação ao olho esquerdo
    const angleLeft = getAngle(
        eyeLeftCenter.x, 
        eyeLeftCenter.y, 
        mouseInSVG.x, 
        mouseInSVG.y
    );
    
    // Calcula a nova posição da pupila esquerda
    const pupilLeftX = eyeLeftCenter.x + Math.cos(angleLeft) * maxDistance;
    const pupilLeftY = eyeLeftCenter.y + Math.sin(angleLeft) * maxDistance;
    
    // Atualiza as coordenadas da pupila esquerda
    pupilLeft.setAttribute('cx', pupilLeftX);
    pupilLeft.setAttribute('cy', pupilLeftY);
    
    // Atualiza a íris esquerda (acompanha a pupila)
    irisLeft.setAttribute('cx', pupilLeftX + 4);
    irisLeft.setAttribute('cy', pupilLeftY + 4);
    
    // ========== OLHO DIREITO ==========
    // Calcula o ângulo do mouse em relação ao olho direito
    const angleRight = getAngle(
        eyeRightCenter.x, 
        eyeRightCenter.y, 
        mouseInSVG.x, 
        mouseInSVG.y
    );
    
    // Calcula a nova posição da pupila direita
    const pupilRightX = eyeRightCenter.x + Math.cos(angleRight) * maxDistance;
    const pupilRightY = eyeRightCenter.y + Math.sin(angleRight) * maxDistance;
    
    // Atualiza as coordenadas da pupila direita
    pupilRight.setAttribute('cx', pupilRightX);
    pupilRight.setAttribute('cy', pupilRightY);
    
    // Atualiza a íris direita (acompanha a pupila)
    irisRight.setAttribute('cx', pupilRightX + 4);
    irisRight.setAttribute('cy', pupilRightY + 4);
}

/**
 * Event listener para movimento do mouse
 * Rastreia a posição do mouse e atualiza os olhos
 */
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    updateEyesPosition();
});

/**
 * Event listener para movimento do toque (mobile)
 * Permite que os olhos funcionem também em dispositivos táteis
 */
document.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
        mouseX = event.touches[0].clientX;
        mouseY = event.touches[0].clientY;
        updateEyesPosition();
    }
});

/**
 * Event listener para quando o mouse sai da janela
 * Retorna os olhos para a posição neutra
 */
document.addEventListener('mouseleave', () => {
    // Reseta as posições das pupilas para o centro dos olhos
    pupilLeft.setAttribute('cx', eyeLeftCenter.x);
    pupilLeft.setAttribute('cy', eyeLeftCenter.y);
    irisLeft.setAttribute('cx', eyeLeftCenter.x + 4);
    irisLeft.setAttribute('cy', eyeLeftCenter.y + 4);
    
    pupilRight.setAttribute('cx', eyeRightCenter.x);
    pupilRight.setAttribute('cy', eyeRightCenter.y);
    irisRight.setAttribute('cx', eyeRightCenter.x + 4);
    irisRight.setAttribute('cy', eyeRightCenter.y + 4);
});

/**
 * Event listener para quando o mouse retorna à janela
 * Reinicia o rastreamento dos olhos
 */
document.addEventListener('mouseenter', () => {
    updateEyesPosition();
});

// Inicializa o rastreamento dos olhos
console.log('✨ Arte interativa da Monalisa carregada com sucesso!');
console.log('🎨 Cores originais aplicadas com degradês e sombras');
console.log('👀 Mova o cursor para fazer os olhos seguirem você!');
