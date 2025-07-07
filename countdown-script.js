// Configuración
const BIRTHDAY_DATE = '2025-07-07T00:00:00';
const REDIRECT_URL = 'birthday.html';

// Variables globales
let countdownInterval;
let isBirthdayReached = false;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de contador cargada');
    initializeCountdown();
    createParticles();
    createFloatingElements();
    
    // Verificar responsividad
    checkResponsiveness();
});

// Función para verificar responsividad
function checkResponsiveness() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    console.log('Dispositivo detectado:', {
        width: window.innerWidth,
        isMobile: isMobile,
        isTablet: isTablet,
        isDesktop: !isMobile && !isTablet
    });
    
    // Ajustar elementos según el dispositivo
    adjustForDevice(isMobile, isTablet);
}

// Función para ajustar elementos según el dispositivo
function adjustForDevice(isMobile, isTablet) {
    const countdownContainer = document.querySelector('.countdown-container');
    const countdownTimer = document.querySelector('.countdown-timer');
    const timeUnits = document.querySelectorAll('.time-unit');
    const timeNumbers = document.querySelectorAll('.time-number');
    const timeLabels = document.querySelectorAll('.time-label');
    const mainTitle = document.querySelector('.main-title');
    const ageTitle = document.querySelector('.age-title');
    
    if (isMobile) {
        // Ajustes para móvil
        if (countdownContainer) {
            countdownContainer.style.padding = '20px';
        }
        if (countdownTimer) {
            countdownTimer.style.gap = '10px';
        }
        if (timeUnits) {
            timeUnits.forEach(unit => {
                unit.style.minWidth = '60px';
            });
        }
        if (timeNumbers) {
            timeNumbers.forEach(number => {
                number.style.fontSize = '1.8rem';
            });
        }
        if (timeLabels) {
            timeLabels.forEach(label => {
                label.style.fontSize = '0.8rem';
            });
        }
        if (mainTitle) {
            mainTitle.style.fontSize = '1.8rem';
        }
        if (ageTitle) {
            ageTitle.style.fontSize = '2.2rem';
        }
    } else if (isTablet) {
        // Ajustes para tablet
        if (countdownTimer) {
            countdownTimer.style.gap = '15px';
        }
        if (timeUnits) {
            timeUnits.forEach(unit => {
                unit.style.minWidth = '80px';
            });
        }
        if (timeNumbers) {
            timeNumbers.forEach(number => {
                number.style.fontSize = '2.2rem';
            });
        }
        if (timeLabels) {
            timeLabels.forEach(label => {
                label.style.fontSize = '0.9rem';
            });
        }
    }
    
    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth <= 768;
        const newIsTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
        adjustForDevice(newIsMobile, newIsTablet);
    });
}

// Función principal del contador
function initializeCountdown() {
    const birthdayDate = new Date(BIRTHDAY_DATE);
    
    // Verificar elementos del contador
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.error('Elementos del contador no encontrados');
        return;
    }
    
    // Función para actualizar el contador
    function updateCountdown() {
        const now = new Date();
        const distance = birthdayDate.getTime() - now.getTime();
        
        console.log('Fecha actual:', now.toLocaleString());
        console.log('Fecha objetivo:', birthdayDate.toLocaleString());
        console.log('Diferencia en milisegundos:', distance);
        
        if (distance < 0) {
            // Es el cumpleaños - mostrar botón de redirección
            if (!isBirthdayReached) {
                console.log('¡Es el cumpleaños! Mostrando botón de redirección...');
                isBirthdayReached = true;
                showBirthdayButton();
                updateCountdownDisplay(0, 0, 0, 0);
            }
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        updateCountdownDisplay(days, hours, minutes, seconds);
        console.log(`Contador: ${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
    
    // Función para actualizar la visualización del contador
    function updateCountdownDisplay(days, hours, minutes, seconds) {
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Actualizar inmediatamente
    updateCountdown();
    
    // Configurar el intervalo
    countdownInterval = setInterval(updateCountdown, 1000);
    
    console.log('Contador iniciado - Fecha objetivo:', birthdayDate.toLocaleDateString());
    
    // Mostrar información detallada
    showTimeInfo();
}

// Función para mostrar el botón de cumpleaños
function showBirthdayButton() {
    const countdownContainer = document.querySelector('.countdown-container');
    
    // Crear el botón de cumpleaños
    const birthdayButton = document.createElement('div');
    birthdayButton.className = 'birthday-button-container';
    birthdayButton.innerHTML = `
        <div class="birthday-celebration">
            <h2 class="birthday-title">🎉 ¡FELIZ CUMPLEAÑOS! 🎉</h2>
            <h3 class="birthday-age">¡20 Años!</h3>
            <p class="birthday-message">¡Es hora de celebrar! Haz clic en el botón para ver tu página especial</p>
            <button class="birthday-redirect-btn" onclick="goToBirthdayPage()">
                <i class="fas fa-gift"></i>
                ¡Ver Mi Página Especial!
                <i class="fas fa-heart"></i>
            </button>
            <div class="birthday-hearts">
                <i class="fas fa-heart"></i>
                <i class="fas fa-heart"></i>
                <i class="fas fa-heart"></i>
                <i class="fas fa-heart"></i>
                <i class="fas fa-heart"></i>
            </div>
        </div>
    `;
    
    // Agregar estilos CSS para el botón
    const style = document.createElement('style');
    style.textContent = `
        .birthday-button-container {
            margin-top: 30px;
            animation: fadeInUp 1s ease-out;
        }
        
        .birthday-celebration {
            background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
            border-radius: 25px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
        }
        
        .birthday-title {
            font-family: 'Dancing Script', cursive;
            font-size: 2.5rem;
            color: #fff;
            margin-bottom: 10px;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
            animation: glow 2s ease-in-out infinite alternate;
        }
        
        .birthday-age {
            font-family: 'Dancing Script', cursive;
            font-size: 2rem;
            color: #fff;
            margin-bottom: 15px;
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
            animation: bounce 2s ease-in-out infinite;
        }
        
        .birthday-message {
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 25px;
            line-height: 1.5;
        }
        
        .birthday-redirect-btn {
            background: rgba(255, 255, 255, 0.2);
            color: #fff;
            border: 2px solid rgba(255, 255, 255, 0.5);
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 1.2rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            display: inline-flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .birthday-redirect-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            border-color: rgba(255, 255, 255, 0.8);
        }
        
        .birthday-redirect-btn:active {
            transform: translateY(-1px);
        }
        
        .birthday-hearts {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
        }
        
        .birthday-hearts i {
            color: #fff;
            font-size: 1.5rem;
            animation: heart-beat 1.5s ease-in-out infinite;
        }
        
        .birthday-hearts i:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .birthday-hearts i:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        .birthday-hearts i:nth-child(4) {
            animation-delay: 0.6s;
        }
        
        .birthday-hearts i:nth-child(5) {
            animation-delay: 0.8s;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes glow {
            0% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
            100% { text-shadow: 0 0 30px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.8); }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        
        @keyframes heart-beat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        /* Responsividad para el botón */
        @media (max-width: 768px) {
            .birthday-title {
                font-size: 2rem;
            }
            
            .birthday-age {
                font-size: 1.6rem;
            }
            
            .birthday-message {
                font-size: 1rem;
            }
            
            .birthday-redirect-btn {
                padding: 12px 25px;
                font-size: 1.1rem;
                flex-direction: column;
                gap: 5px;
            }
            
            .birthday-celebration {
                padding: 25px 20px;
            }
        }
        
        @media (max-width: 480px) {
            .birthday-title {
                font-size: 1.8rem;
            }
            
            .birthday-age {
                font-size: 1.4rem;
            }
            
            .birthday-redirect-btn {
                padding: 10px 20px;
                font-size: 1rem;
            }
            
            .birthday-celebration {
                padding: 20px 15px;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // Agregar el botón al contenedor
    countdownContainer.appendChild(birthdayButton);
    
    // Crear confeti de celebración
    createBirthdayConfetti();
}

// Función para ir a la página del cumpleaños
function goToBirthdayPage() {
    console.log('Redirigiendo a la página del cumpleaños...');
    
    // Agregar efecto de transición
    const body = document.body;
    body.style.transition = 'opacity 0.5s ease-out';
    body.style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = REDIRECT_URL;
    }, 500);
}

// Función para crear confeti de cumpleaños
function createBirthdayConfetti() {
    const colors = ['#ff6b9d', '#4ecdc4', '#45b7d1', '#96c93d', '#ff9a9e', '#a8edea'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                border-radius: 50%;
                z-index: 1000;
                animation: confetti-fall 3s linear forwards;
            `;
            document.body.appendChild(confetti);
            
            // Remover el confeti después de la animación
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }, i * 100);
    }
    
    // Agregar la animación del confeti
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confetti-fall {
            0% {
                transform: translateY(-10px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);
}

// Función para mostrar información del tiempo
function showTimeInfo() {
    const now = new Date();
    const birthdayDate = new Date(BIRTHDAY_DATE);
    const distance = birthdayDate.getTime() - now.getTime();
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    console.log('=== INFORMACIÓN DEL CONTADOR ===');
    console.log('Fecha actual:', now.toLocaleString());
    console.log('Fecha objetivo:', birthdayDate.toLocaleString());
    console.log(`Tiempo restante: ${days} días, ${hours} horas, ${minutes} minutos`);
    console.log('================================');
}

// Función para crear partículas
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particle-float ${Math.random() * 10 + 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Función para crear elementos flotantes adicionales
function createFloatingElements() {
    const elements = ['💖', '🎂', '🎉', '🎁', '🌟', '💕', '🎊', '✨'];
    
    for (let i = 0; i < 10; i++) {
        const element = document.createElement('div');
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.cssText = `
            position: absolute;
            font-size: 2rem;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
            z-index: 5;
        `;
        document.body.appendChild(element);
    }
}

// Agregar estilos CSS dinámicos
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes scaleIn {
        from { 
            opacity: 0;
            transform: scale(0.8);
        }
        to { 
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes confetti-fall {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes particle-float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes glow {
        from {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
        }
        to {
            text-shadow: 0 0 30px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.8);
        }
    }
    
    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    @keyframes heart-beat {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        25% {
            transform: translateY(-20px) rotate(90deg);
        }
        50% {
            transform: translateY(-10px) rotate(180deg);
        }
        75% {
            transform: translateY(-30px) rotate(270deg);
        }
    }
`;

document.head.appendChild(dynamicStyles);

// Mostrar notificación de bienvenida
setTimeout(() => {
    console.log('🎂 Página de contador lista - Esperando el 7 de agosto');
}, 1000); 