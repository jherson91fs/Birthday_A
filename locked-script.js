// Script para la página de recuerdos bloqueados
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de recuerdos bloqueados cargada');
    
    // Inicializar funcionalidades
    setupMobileNavigation();
    setupAnimations();
    createParticles();
    createFloatingElements();
    
    console.log('Funcionalidades de página bloqueada inicializadas');
});

// Configurar navegación móvil
function setupMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Configurar animaciones
function setupAnimations() {
    // Animación del candado
    const lockIcon = document.querySelector('.lock-icon');
    if (lockIcon) {
        lockIcon.addEventListener('click', function() {
            this.style.animation = 'lock-bounce 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    }
    
    // Animación de entrada de elementos
    const elements = document.querySelectorAll('.locked-title, .locked-message, .back-button-container, .hope-message');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
}

// Crear partículas
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particle-float ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }, i * 100);
    }
}

// Crear elementos flotantes
function createFloatingElements() {
    const elements = document.querySelectorAll('.floating-heart, .floating-star');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        element.style.animationDuration = `${3 + Math.random() * 2}s`;
    });
}

// Función para volver atrás
function goBack() {
    console.log('Volviendo a la página principal...');
    
    // Agregar efecto de transición
    const body = document.body;
    body.style.transition = 'opacity 0.5s ease-out';
    body.style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = 'birthday.html';
    }, 500);
}

// Efectos adicionales
function addGlowEffect() {
    const lockIcon = document.querySelector('.lock-icon');
    if (lockIcon) {
        setInterval(() => {
            lockIcon.style.textShadow = '0 0 20px rgba(255, 107, 157, 0.8)';
            setTimeout(() => {
                lockIcon.style.textShadow = '0 0 10px rgba(255, 107, 157, 0.4)';
            }, 1000);
        }, 2000);
    }
}

// Inicializar efectos adicionales
setTimeout(() => {
    addGlowEffect();
}, 2000);

// Mostrar mensaje de bienvenida
setTimeout(() => {
    showWelcomeMessage();
}, 1000);

// Función para mostrar mensaje de bienvenida
function showWelcomeMessage() {
    const message = document.createElement('div');
    message.className = 'welcome-message';
    message.innerHTML = `
        <div class="welcome-content">
            <h3>🔒 Sección Bloqueada</h3>
            <p>Esta área especial se desbloqueará cuando el momento sea el indicado...</p>
            <div class="welcome-hearts">
                <i class="fas fa-heart"></i>
                <i class="fas fa-heart"></i>
                <i class="fas fa-heart"></i>
            </div>
        </div>
    `;
    
    // Agregar estilos CSS para el mensaje
    const style = document.createElement('style');
    style.textContent = `
        .welcome-message {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.95);
            padding: 1rem;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideInRight 0.5s ease;
            max-width: 300px;
        }
        
        .welcome-content h3 {
            color: #ff6b9d;
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
        }
        
        .welcome-content p {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
        
        .welcome-hearts {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .welcome-hearts i {
            color: #ff6b9d;
            font-size: 1rem;
            animation: heart-beat 1.5s ease-in-out infinite;
        }
        
        .welcome-hearts i:nth-child(2) {
            animation-delay: 0.5s;
        }
        
        .welcome-hearts i:nth-child(3) {
            animation-delay: 1s;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes heart-beat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        @media (max-width: 768px) {
            .welcome-message {
                top: 10px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(message);
    
    // Remover mensaje después de 5 segundos
    setTimeout(() => {
        message.style.animation = 'slideInRight 0.5s ease reverse';
        setTimeout(() => {
            message.remove();
        }, 500);
    }, 5000);
}

// Función para desbloquear sección especial
function unlockSpecialSection() {
    console.log('Iniciando proceso de desbloqueo...');
    
    // Mostrar mensaje de confirmación
    showUnlockConfirmation();
    
    // Preparar mensaje de WhatsApp
    const phoneNumber = '+51970345089';
    const message = 'Desbloquemos esta seccion juntos, estoy lista ❤';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Agregar efecto visual al botón
    const unlockBtn = document.querySelector('.unlock-btn');
    if (unlockBtn) {
        unlockBtn.style.animation = 'unlock-pulse 0.6s ease';
        unlockBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <span>Enviando mensaje...</span>
            <i class="fas fa-heart"></i>
        `;
        
        setTimeout(() => {
            // Restaurar botón original
            unlockBtn.style.animation = '';
            unlockBtn.innerHTML = `
                <i class="fas fa-unlock-alt"></i>
                <span>Desbloquear Sección Especial</span>
                <i class="fas fa-heart"></i>
            `;
            
            // Abrir WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Mostrar mensaje de éxito
            showUnlockSuccess();
        }, 1500);
    }
}

// Función para mostrar confirmación de desbloqueo
function showUnlockConfirmation() {
    const confirmation = document.createElement('div');
    confirmation.className = 'unlock-confirmation';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <div class="confirmation-icon">
                <i class="fas fa-heart"></i>
            </div>
            <h3>💕 ¡Mensaje Especial!</h3>
            <p>Se abrirá WhatsApp para enviar el mensaje de desbloqueo</p>
            <div class="confirmation-hearts">
                <i class="fas fa-heart"></i>
                <i class="fas fa-heart"></i>
                <i class="fas fa-heart"></i>
            </div>
        </div>
    `;
    
    // Agregar estilos CSS para la confirmación
    const style = document.createElement('style');
    style.textContent = `
        .unlock-confirmation {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.98);
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            z-index: 2000;
            animation: confirmation-slide 0.5s ease;
            text-align: center;
            max-width: 400px;
            border: 2px solid #ff6b9d;
        }
        
        .confirmation-content h3 {
            color: #ff6b9d;
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }
        
        .confirmation-content p {
            color: #555;
            margin-bottom: 1rem;
            font-size: 1rem;
        }
        
        .confirmation-icon {
            font-size: 3rem;
            color: #ff6b9d;
            margin-bottom: 1rem;
            animation: heart-beat 1.5s ease-in-out infinite;
        }
        
        .confirmation-hearts {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        
        .confirmation-hearts i {
            color: #ff6b9d;
            font-size: 1.2rem;
            animation: heart-beat 1.5s ease-in-out infinite;
        }
        
        .confirmation-hearts i:nth-child(2) {
            animation-delay: 0.5s;
        }
        
        .confirmation-hearts i:nth-child(3) {
            animation-delay: 1s;
        }
        
        @keyframes confirmation-slide {
            from {
                transform: translate(-50%, -50%) scale(0.8);
                opacity: 0;
            }
            to {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
        
        @keyframes unlock-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @media (max-width: 768px) {
            .unlock-confirmation {
                margin: 0 20px;
                padding: 1.5rem;
            }
            
            .confirmation-content h3 {
                font-size: 1.2rem;
            }
            
            .confirmation-content p {
                font-size: 0.9rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(confirmation);
    
    // Remover confirmación después de 3 segundos
    setTimeout(() => {
        confirmation.style.animation = 'confirmation-slide 0.5s ease reverse';
        setTimeout(() => {
            confirmation.remove();
        }, 500);
    }, 3000);
}

// Función para mostrar mensaje de éxito
function showUnlockSuccess() {
    const success = document.createElement('div');
    success.className = 'unlock-success';
    success.innerHTML = `
        <div class="success-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>🎉 ¡Mensaje Enviado!</h3>
            <p>El mensaje de desbloqueo ha sido enviado a WhatsApp</p>
            <p class="success-hint">Espera la respuesta para desbloquear la sección especial</p>
            <div class="success-sparkles">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
        </div>
    `;
    
    // Agregar estilos CSS para el mensaje de éxito
    const style = document.createElement('style');
    style.textContent = `
        .unlock-success {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
            color: white;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            z-index: 2000;
            animation: success-slide 0.5s ease;
            text-align: center;
            max-width: 400px;
        }
        
        .success-content h3 {
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }
        
        .success-content p {
            margin-bottom: 0.5rem;
            font-size: 1rem;
        }
        
        .success-hint {
            font-size: 0.9rem;
            opacity: 0.9;
            font-style: italic;
        }
        
        .success-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            animation: success-bounce 1s ease-in-out;
        }
        
        .success-sparkles {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        
        .success-sparkles i {
            font-size: 1.2rem;
            animation: sparkle 2s ease-in-out infinite;
        }
        
        .success-sparkles i:nth-child(2) {
            animation-delay: 0.5s;
        }
        
        .success-sparkles i:nth-child(3) {
            animation-delay: 1s;
        }
        
        @keyframes success-slide {
            from {
                transform: translate(-50%, -50%) scale(0.8);
                opacity: 0;
            }
            to {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
        
        @keyframes success-bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        @keyframes sparkle {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.3) rotate(180deg); opacity: 0.7; }
        }
        
        @media (max-width: 768px) {
            .unlock-success {
                margin: 0 20px;
                padding: 1.5rem;
            }
            
            .success-content h3 {
                font-size: 1.2rem;
            }
            
            .success-content p {
                font-size: 0.9rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(success);
    
    // Remover mensaje de éxito después de 4 segundos
    setTimeout(() => {
        success.style.animation = 'success-slide 0.5s ease reverse';
        setTimeout(() => {
            success.remove();
        }, 500);
    }, 4000);
} 