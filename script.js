// Variables globales
let countdownInterval;
let confettiInterval;
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;
let moves = 0;
let canFlip = true;

// Configuración personalizable
const CONFIG = {
    birthdayDate: '2025-07-07', // Fecha del cumpleaños: 7 de agosto
    birthdayName: 'Mi Princesa Angie', // Cambia por el nombre real
    yourName: 'Tu Príncipe J', // Cambia por tu nombre
    age: 20, // Edad que cumple
    // Rutas para archivos multimedia
    imagePath: 'fotos/', // Carpeta para las imágenes
    videoPath: 'videos/', // Carpeta para los videos
    surpriseMessages: {
        1: {
            title: '🎵 Sorpresa Musical',
            content: '¡Feliz cumpleaños número 20, mi princesa! 🎂🎉 Que esta canción te recuerde lo especial que eres y lo mucho que te amo. ¡Que la música de nuestro amor nunca deje de sonar y que este nuevo año esté lleno de momentos increíbles juntos! 💖✨'
        },
        2: {
            title: '💝 Mensaje Especial',
            content: '¡20 años de pura magia! 🌟 Eres el sueño que nunca supe que tenía hasta que te conocí. Cada día a tu lado es un regalo, cada momento contigo es un tesoro. Tu sonrisa ilumina mis días y tu amor hace que todo sea posible. Te amo más de lo que las palabras pueden expresar. ¡Que este nuevo año de vida esté lleno de amor, risas y aventuras juntos! 💕'
        },
        3: {
            title: '🌟 Deseo Mágico',
            content: 'En tus 20 años, mi deseo más profundo es que seas feliz, que encuentres la paz que mereces, que todos tus sueños se cumplan. Que este nuevo año de vida esté lleno de amor, risas, viajes, logros y momentos inolvidables. ¡Que cada día sea una nueva aventura llena de amor y felicidad! 🌈✨'
        },
        4: {
            title: '🎊 Celebración',
            content: '¡Hoy celebramos 20 años de pura belleza y magia! 🎉🎂 Tu sonrisa ilumina los días más oscuros, tu amor hace que todo sea posible. Eres el regalo más hermoso que la vida me ha dado. ¡Que este cumpleaños sea el comienzo de un año lleno de sueños cumplidos, amor infinito y momentos que nunca olvidaremos! 💖🎊'
        }
    }
};

// Configuración de sorpresas
const surprises = {
    1: {
        title: "🎵 Sorpresa Musical",
        content: `
            <div class="surprise-content">
                <h3>Dos canciones especiales para ti</h3>
                <p>Estas canciones me recuerdan a ti cada vez que las escucho...</p>
                <div class="song-player">
                    <h4>🎵 Primera Canción</h4>
                    <audio controls class="surprise-audio" data-song="1">
                        <source src="Musica1_se.mp3" type="audio/mpeg">
                        Tu navegador no soporta audio.
                    </audio>
                    <h4>🎁 Segunda Canción</h4>
                    <audio controls class="surprise-audio" data-song="2">
                        <source src="Musica3_regalo.mp3" type="audio/mpeg">
                        Tu navegador no soporta audio.
                    </audio>
                </div>
                <p class="song-message">Espero que te gusten tanto como me gustas tú 💕</p>
            </div>
        `
    },
    2: {
        title: "💝 Mensaje Especial",
        content: `
            <div class="surprise-content">
                <h3>Un mensaje del corazón</h3>
                <p>Quiero que sepas que eres una persona muy especial para mí. Cada vez que te veo, mi día se ilumina con tu sonrisa.</p>
                <p>Me gusta mucho pasar tiempo contigo y espero que podamos seguir siendo los mismos y ser algo más aqui en adelante.</p>
                <p>¡Que tengas el mejor cumpleaños del mundo! 🌟</p>
                <p>Tqm</p>
                    <i class="fas fa-heart"></i>
                    <i class="fas fa-heart"></i>
                    <i class="fas fa-heart"></i>
                </div>
            </div>
        `
    },
    3: {
        title: "🌟 Deseo Mágico",
        content: `
            <div class="surprise-content">
                <h3>Mi deseo para ti</h3>
                <p>En este día tan especial, mi deseo es que seas muy feliz y que todos tus sueños se cumplan.</p>
                <p>Espero que este nuevo año de vida esté lleno de alegría, éxito y momentos inolvidables.</p>
                <p>Y tal vez, un dia de estos que estes por aqui, pueda cumplir uno de tus deseos</p>
                <div class="wish-stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
            </div>
        `
    },
    4: {
        title: "🎊 Celebración",
        content: `
            <div class="surprise-content">
                <h3>¡Celebremos juntos!</h3>
                <p>Quiero celebrar este día tan especial contigo. Eres una persona increíble que merece toda la felicidad del mundo.</p>
                <p>Espero que podamos seguir compartiendo momentos especiales juntos.</p>
                <p>Sabes que iria a tu lado para celebrar este día, pero nuevamente se que no me dejaras, asi que lo que te puedo ofrecer es una llamada o una reunion virtual para celebrar este día</p>
                <p>¡Feliz cumpleaños! 🎂🎉</p>
                <div class="celebration-confetti">
                    <span>🎊</span>
                    <span>🎈</span>
                    <span>🎁</span>
                    <span>🎂</span>
                    <span>✨</span>
                </div>
            </div>
        `
    }
};

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('Inicializando página principal del cumpleaños...');
    console.log('Fecha actual:', new Date().toLocaleDateString());
    
    // Mostrar todo el contenido sin restricciones
    console.log('Mostrando contenido completo del cumpleaños');
    showBirthdayContent();
    
    // Inicializar todo el contenido
    initializeMemoryGame();
    setupSmoothScrolling();
    setupSurprises();
    setupMobileNavigation();
    setupLetterDate();
    setupPoemDate();
    setupScrollEffects();
    setupMusicControls();
    startEntranceAnimations();
    
    // Crear efectos de confeti
    createConfetti();
    
    // Verificar que todo esté funcionando
    setTimeout(() => {
        console.log('Página del cumpleaños completamente cargada y funcional');
    }, 2000);
}

// Función para mostrar el contenido del cumpleaños (sin restricciones)
function showBirthdayContent() {
    console.log('Mostrando contenido completo del cumpleaños');
    
    // Mostrar todas las secciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'block';
        section.style.opacity = '1';
    });
    
    // Mostrar navegación completa
    const nav = document.querySelector('.navbar');
    if (nav) {
        nav.style.display = 'flex';
    }
    
    // Mostrar controles de música
    const musicControls = document.querySelector('.music-controls');
    if (musicControls) {
        musicControls.style.display = 'flex';
    }
    
    // Mostrar footer
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.style.display = 'block';
    }
    
    // Agregar botón para ir al contador
    addCountdownButton();
}

// Contador regresivo
function startCountdown() {
    // Configurar la fecha objetivo para el 7 de agosto de 2024 a las 00:00
    const birthdayDate = new Date('2024-08-07T00:00:00');
    
    // Verificar que los elementos del contador existan
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
            // Es el cumpleaños
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            
            // Verificar si es el día del cumpleaños y mostrar contenido
            const today = new Date();
            const birthdayDateObj = new Date(CONFIG.birthdayDate);
            if (today.toDateString() === birthdayDateObj.toDateString()) {
                showBirthdayContent();
            }
            
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        console.log(`Contador: ${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
    
    // Actualizar inmediatamente
    updateCountdown();
    
    // Configurar el intervalo
    countdownInterval = setInterval(updateCountdown, 1000);
    
    console.log('Contador iniciado - Fecha objetivo:', birthdayDate.toLocaleDateString());
    
    // Mostrar información detallada del tiempo restante
    showTimeInfo();
    
    // Función de prueba para verificar el contador
    // Descomenta la siguiente línea para probar con una fecha cercana
    // testCountdown(); // ACTIVADO PARA PRUEBA
}

// Función para mostrar información detallada del tiempo
function showTimeInfo() {
    const now = new Date();
    const birthdayDate = new Date('2024-08-07T00:00:00');
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

// Función para probar el contador (solo para desarrollo)
function testCountdown() {
    console.log('Modo de prueba activado');
    
    // Cambiar temporalmente la fecha a 1 hora desde ahora
    const testDate = new Date();
    testDate.setHours(testDate.getHours() + 1);
    testDate.setMinutes(0);
    testDate.setSeconds(0);
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.error('Elementos del contador no encontrados en modo prueba');
        return;
    }
    
    function updateTestCountdown() {
        const now = new Date().getTime();
        const distance = testDate.getTime() - now;
        
        if (distance < 0) {
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            console.log('Prueba completada - contador llegó a cero');
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        console.log(`Prueba: ${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
    
    updateTestCountdown();
    setInterval(updateTestCountdown, 1000);
}

// Efectos de confeti
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#ff6b9d', '#4ecdc4', '#45b7d1', '#96c93d', '#ff9a9e'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confettiContainer.appendChild(confetti);
            
            // Remover confeti después de la animación
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 100);
    }
}

// Juego de memoria
function initializeMemoryGame() {
    const gameContainer = document.getElementById('memory-game');
    const symbols = ['💖', '🎂', '🎉', '🎁', '🌟', '💝', '🎊', '💕'];
    const gameSymbols = [...symbols, ...symbols]; // Duplicar para hacer pares
    
    // Mezclar símbolos
    gameSymbols.sort(() => Math.random() - 0.5);
    
    // Crear tarjetas
    gameSymbols.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        
        card.innerHTML = `
            <div class="memory-card-front">?</div>
            <div class="memory-card-back">${symbol}</div>
        `;
        
        card.addEventListener('click', () => flipCard(card));
        gameContainer.appendChild(card);
        memoryCards.push(card);
    });
    
    // Configurar botón de reinicio
    document.getElementById('reset-game').addEventListener('click', resetMemoryGame);
}

function flipCard(card) {
    if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        canFlip = false;
        moves++;
        document.getElementById('moves').textContent = moves;
        
        const [card1, card2] = flippedCards;
        
        if (card1.dataset.symbol === card2.dataset.symbol) {
            // Par encontrado
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                matchedPairs++;
                score += 10;
                document.getElementById('score').textContent = score;
                
                if (matchedPairs === 8) {
                    setTimeout(() => {
                        showSpecialNotification('¡Felicitaciones! Un jueguito muy sencillo para ti hermosa e inteligente ¡Eres increíble! 🎉', 'success');
                    }, 500);
                }
                
                flippedCards = [];
                canFlip = true;
            }, 500);
        } else {
            // No es un par
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
                canFlip = true;
            }, 1000);
        }
    }
}

function resetMemoryGame() {
    memoryCards.forEach(card => {
        card.classList.remove('flipped', 'matched');
    });
    
    flippedCards = [];
    matchedPairs = 0;
    score = 0;
    moves = 0;
    canFlip = true;
    
    document.getElementById('score').textContent = score;
    document.getElementById('moves').textContent = moves;
    
    // Mezclar tarjetas
    const symbols = ['💖', '🎂', '🎉', '🎁', '🌟', '💝', '🎊', '💕'];
    const gameSymbols = [...symbols, ...symbols];
    gameSymbols.sort(() => Math.random() - 0.5);
    
    memoryCards.forEach((card, index) => {
        card.dataset.symbol = gameSymbols[index];
        card.querySelector('.memory-card-back').textContent = gameSymbols[index];
    });
}

// Navegación suave
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .scroll-btn');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Configurar sorpresas
function setupSurprises() {
    const surpriseCards = document.querySelectorAll('.surprise-card');
    const modal = document.getElementById('surprise-modal');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.querySelector('.close');
    
    surpriseCards.forEach(card => {
        card.addEventListener('click', function() {
            const surpriseId = this.dataset.surprise;
            const surprise = surprises[surpriseId];
            
            if (surprise) {
                modalContent.innerHTML = surprise.content;
                modal.style.display = 'block';
                
                // Configurar control de audio para sorpresa musical
                if (surpriseId === '1') {
                    setupAudioControls();
                }
                
                // Crear confeti para la sorpresa
                createConfetti();
            }
        });
    });
    
    // Cerrar modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        // Pausar todos los audios al cerrar
        pauseAllAudios();
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            // Pausar todos los audios al cerrar
            pauseAllAudios();
        }
    });
}

// Función para configurar controles de audio
function setupAudioControls() {
    const audios = document.querySelectorAll('.surprise-audio');
    const backgroundMusic = document.getElementById('background-music');
    
    audios.forEach(audio => {
        audio.addEventListener('play', function() {
            // Pausar música de fondo
            if (backgroundMusic) {
                backgroundMusic.pause();
            }
            
            // Pausar otros audios de sorpresa
            audios.forEach(otherAudio => {
                if (otherAudio !== this) {
                    otherAudio.pause();
                }
            });
        });
        
        audio.addEventListener('pause', function() {
            // Reanudar música de fondo si no hay otros audios reproduciéndose
            const anyPlaying = Array.from(audios).some(a => !a.paused);
            if (!anyPlaying && backgroundMusic) {
                backgroundMusic.play().catch(e => console.log('No se pudo reanudar música de fondo'));
            }
        });
    });
}

// Función para pausar todos los audios
function pauseAllAudios() {
    const audios = document.querySelectorAll('.surprise-audio');
    const backgroundMusic = document.getElementById('background-music');
    
    audios.forEach(audio => {
        audio.pause();
    });
    
    // Reanudar música de fondo
    if (backgroundMusic) {
        backgroundMusic.play().catch(e => console.log('No se pudo reanudar música de fondo'));
    }
}

// Navegación móvil
function setupMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Configurar fecha de la carta
function setupLetterDate() {
    const today = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = today.toLocaleDateString('es-ES', options);
    document.getElementById('letter-date').textContent = dateString;
    
    // Iniciar el efecto de escritura de la carta
    startLetterTyping();
}

// Función para el efecto de escritura de la carta
function startLetterTyping() {
    const letterText = document.getElementById('letter-text');
    if (!letterText) {
        console.log('Elemento de carta no encontrado');
        return;
    }
    
    const fullText = letterText.textContent.trim();
    if (!fullText) {
        console.log('Texto de carta vacío');
        return;
    }
    
    // Limpiar el contenido y configurar estilos
    letterText.textContent = '';
    letterText.style.borderRight = '2px solid #ff6b9d';
    letterText.style.whiteSpace = 'pre-line';
    letterText.style.overflow = 'hidden';
    letterText.style.position = 'relative';
    letterText.style.minHeight = '300px';
    
    let currentIndex = 0;
    const typingSpeed = 30; // milisegundos por carácter
    
    function typeNextChar() {
        if (currentIndex < fullText.length) {
            const char = fullText[currentIndex];
            letterText.textContent += char;
            currentIndex++;
            
            // Pausa más larga para saltos de línea
            const delay = char === '\n' ? 500 : typingSpeed;
            setTimeout(typeNextChar, delay);
        } else {
            // Terminar la animación
            setTimeout(() => {
                letterText.style.borderRight = 'none';
                // Agregar efecto de finalización
                letterText.style.animation = 'glow 2s ease-in-out';
                console.log('Efecto de escritura completado');
                
                // Mostrar notificación romántica
                showSpecialNotification('💌 Mi carta especial está completa para ti, Angie', 'romantic');
            }, 500);
        }
    }
    
    // Iniciar la escritura después de un pequeño delay
    console.log('Iniciando efecto de escritura de la carta...');
    setTimeout(typeNextChar, 1000);
}

// Efectos de scroll
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animateElements = document.querySelectorAll('.timeline-content, .surprise-card, .letter-paper');
    animateElements.forEach(el => observer.observe(el));
}

// Animaciones de entrada
function startEntranceAnimations() {
    // Animación del título principal
    const animatedText = document.querySelector('.animated-text');
    if (animatedText) {
        animatedText.style.opacity = '0';
        animatedText.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            animatedText.style.transition = 'all 1s ease';
            animatedText.style.opacity = '1';
            animatedText.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Animación del contador
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 1000 + (index * 200));
    });
}

// Efectos adicionales
function addFloatingElements() {
    const hero = document.querySelector('.hero');
    
    // Crear elementos flotantes adicionales
    for (let i = 0; i < 10; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.innerHTML = ['🎈', '🎊', '🎉', '💖', '🌟'][Math.floor(Math.random() * 5)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 5 + 's';
        element.style.animationDuration = (Math.random() * 3 + 3) + 's';
        hero.appendChild(element);
    }
}

// Función para reproducir música (opcional)
function playBackgroundMusic() {
    const music = document.getElementById('background-music');
    if (music) {
        music.volume = 0.3;
        // Solo reproducir si el usuario interactúa
        document.addEventListener('click', () => {
            music.play().catch(e => console.log('No se pudo reproducir música automáticamente'));
        }, { once: true });
    }
}

// Controles de música
function setupMusicControls() {
    const musicBtn = document.getElementById('music-toggle');
    const music = document.getElementById('background-music');
    const musicIcon = musicBtn.querySelector('i');
    
    let isPlaying = false;
    
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicIcon.className = 'fas fa-play';
            isPlaying = false;
        } else {
            music.play();
            musicIcon.className = 'fas fa-pause';
            isPlaying = true;
        }
    });
    
    // Actualizar estado cuando la música termina
    music.addEventListener('ended', () => {
        musicIcon.className = 'fas fa-play';
        isPlaying = false;
    });
    
    // Actualizar estado cuando la música se pausa
    music.addEventListener('pause', () => {
        musicIcon.className = 'fas fa-play';
        isPlaying = false;
    });
    
    // Actualizar estado cuando la música se reproduce
    music.addEventListener('play', () => {
        musicIcon.className = 'fas fa-pause';
        isPlaying = true;
    });
}

// Función para mostrar notificaciones románticas especiales
function showSpecialNotification(message, type = 'romantic') {
    const notification = document.createElement('div');
    notification.className = `romantic-notification notification-${type}`;
    
    // Definir iconos y colores según el tipo
    const notificationConfig = {
        romantic: {
            icon: '💕',
            bgColor: 'linear-gradient(135deg, #ff6b9d 0%, #e91e63 100%)',
            borderColor: '#ff6b9d',
            shadowColor: 'rgba(255, 107, 157, 0.4)'
        },
        success: {
            icon: '✨',
            bgColor: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
            borderColor: '#4ecdc4',
            shadowColor: 'rgba(78, 205, 196, 0.4)'
        },
        love: {
            icon: '💖',
            bgColor: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            borderColor: '#ff9a9e',
            shadowColor: 'rgba(255, 154, 158, 0.4)'
        },
        birthday: {
            icon: '🎂',
            bgColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            borderColor: '#a8edea',
            shadowColor: 'rgba(168, 237, 234, 0.4)'
        }
    };
    
    const config = notificationConfig[type] || notificationConfig.romantic;
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${config.icon}</div>
            <div class="notification-text">
                <div class="notification-message">${message}</div>
                <div class="notification-hearts">
                    <i class="fas fa-heart"></i>
                    <i class="fas fa-heart"></i>
                    <i class="fas fa-heart"></i>
                </div>
            </div>
        </div>
        <div class="notification-progress"></div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${config.bgColor};
        color: white;
        padding: 0;
        border-radius: 20px;
        box-shadow: 0 10px 30px ${config.shadowColor}, 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        transform: translateX(400px) scale(0.8);
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        border: 2px solid ${config.borderColor};
        backdrop-filter: blur(10px);
        min-width: 350px;
        max-width: 450px;
        overflow: hidden;
    `;
    
    document.body.appendChild(notification);
    
    // Agregar estilos CSS para la notificación
    const style = document.createElement('style');
    style.textContent = `
        .romantic-notification .notification-content {
            display: flex;
            align-items: center;
            padding: 1.5rem;
            gap: 15px;
        }
        
        .romantic-notification .notification-icon {
            font-size: 2rem;
            animation: notification-bounce 2s ease-in-out infinite;
        }
        
        .romantic-notification .notification-text {
            flex: 1;
        }
        
        .romantic-notification .notification-message {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 8px;
            line-height: 1.4;
        }
        
        .romantic-notification .notification-hearts {
            display: flex;
            gap: 5px;
        }
        
        .romantic-notification .notification-hearts i {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.8);
            animation: heart-beat 1.5s ease-in-out infinite;
        }
        
        .romantic-notification .notification-hearts i:nth-child(2) {
            animation-delay: 0.5s;
        }
        
        .romantic-notification .notification-hearts i:nth-child(3) {
            animation-delay: 1s;
        }
        
        .romantic-notification .notification-progress {
            height: 3px;
            background: rgba(255, 255, 255, 0.3);
            width: 100%;
            position: relative;
            overflow: hidden;
        }
        
        .romantic-notification .notification-progress::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: rgba(255, 255, 255, 0.8);
            animation: progress-shrink 4s linear forwards;
        }
        
        @keyframes notification-bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        @keyframes progress-shrink {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
        }
        
        @keyframes heart-beat {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.2); opacity: 1; }
        }
        
        @media (max-width: 768px) {
            .romantic-notification {
                min-width: 280px;
                max-width: 320px;
                right: 10px;
                left: 10px;
                top: 10px;
                border-radius: 15px;
            }
            
            .romantic-notification .notification-content {
                padding: 1rem;
                gap: 10px;
            }
            
            .romantic-notification .notification-icon {
                font-size: 1.5rem;
            }
            
            .romantic-notification .notification-message {
                font-size: 0.95rem;
                line-height: 1.3;
            }
            
            .romantic-notification .notification-hearts {
                gap: 3px;
            }
            
            .romantic-notification .notification-hearts i {
                font-size: 0.7rem;
            }
        }
        
        @media (max-width: 480px) {
            .romantic-notification {
                min-width: 250px;
                max-width: 280px;
                right: 5px;
                left: 5px;
                top: 5px;
                border-radius: 12px;
            }
            
            .romantic-notification .notification-content {
                padding: 0.8rem;
                gap: 8px;
            }
            
            .romantic-notification .notification-icon {
                font-size: 1.3rem;
            }
            
            .romantic-notification .notification-message {
                font-size: 0.9rem;
                line-height: 1.2;
            }
            
            .romantic-notification .notification-hearts {
                gap: 2px;
            }
            
            .romantic-notification .notification-hearts i {
                font-size: 0.6rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);
    
    // Animación de salida
    setTimeout(() => {
        notification.style.transform = 'translateX(400px) scale(0.8)';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Inicializar efectos adicionales
setTimeout(() => {
    addFloatingElements();
    playBackgroundMusic();
    
    // Mostrar notificación de música
    setTimeout(() => {
        showSpecialNotification('🎵 La música especial está lista para ti, mi amor', 'love');
    }, 500);
}, 2000);

// Mostrar notificación de bienvenida romántica
setTimeout(() => {
    showSpecialNotification('¡Bienvenida a tu página especial de cumpleaños, mi princesa Angie! 💖', 'romantic');
}, 1000);

// Efectos de partículas en el fondo
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
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

// Crear partículas después de un tiempo
setTimeout(createParticles, 3000);

// Agregar estilos CSS dinámicos para partículas
const particleStyles = document.createElement('style');
particleStyles.textContent = `
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
    
    .floating-element {
        position: absolute;
        font-size: 2rem;
        animation: float-around 6s ease-in-out infinite;
        pointer-events: none;
    }
    
    @keyframes float-around {
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
    
    .animate-in {
        animation: slideInUp 0.8s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .surprise-hearts {
        text-align: center;
        margin-top: 1rem;
    }
    
    .surprise-hearts i {
        color: #ff6b9d;
        font-size: 2rem;
        margin: 0 0.5rem;
        animation: heart-beat 1s ease-in-out infinite;
    }
`;

document.head.appendChild(particleStyles);

// Función para agregar botón de contador
function addCountdownButton() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const countdownButton = document.createElement('div');
    countdownButton.className = 'countdown-button-container';
    countdownButton.innerHTML = `
        <div class="countdown-info">
            <h3>🎂 ¿Quieres ver el contador?</h3>
            <p>El contenido especial se desbloqueará el 7 de julio de 2025</p>
            <button class="countdown-btn" onclick="goToCountdown()">
                <i class="fas fa-clock"></i>
                Ver Contador Regresivo
            </button>
        </div>
    `;
    
    // Agregar estilos CSS para el botón
    const style = document.createElement('style');
    style.textContent = `
        .countdown-button-container {
            margin-top: 30px;
            animation: fadeInUp 1s ease-out;
        }
        
        .countdown-info {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 25px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .countdown-info h3 {
            color: #fff;
            font-size: 1.5rem;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .countdown-info p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 1rem;
            margin-bottom: 20px;
        }
        
        .countdown-btn {
            background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
            color: #fff;
            border: none;
            padding: 12px 25px;
            border-radius: 25px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        
        .countdown-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(255, 107, 157, 0.4);
        }
        
        .countdown-btn:active {
            transform: translateY(0);
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
        
        /* Responsividad para el botón */
        @media (max-width: 768px) {
            .countdown-info {
                padding: 20px;
            }
            
            .countdown-info h3 {
                font-size: 1.3rem;
            }
            
            .countdown-info p {
                font-size: 0.9rem;
            }
            
            .countdown-btn {
                padding: 10px 20px;
                font-size: 1rem;
            }
        }
        
        @media (max-width: 480px) {
            .countdown-info {
                padding: 15px;
            }
            
            .countdown-info h3 {
                font-size: 1.2rem;
            }
            
            .countdown-btn {
                padding: 8px 16px;
                font-size: 0.9rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    hero.appendChild(countdownButton);
}

// Función para ir al contador
function goToCountdown() {
    console.log('Redirigiendo al contador...');
    
    // Agregar efecto de transición
    const body = document.body;
    body.style.transition = 'opacity 0.5s ease-out';
    body.style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// Función para ir a la página de recuerdos
function goToMemories() {
    console.log('Redirigiendo a la página de recuerdos bloqueados...');
    
    // Agregar efecto de transición
    const body = document.body;
    body.style.transition = 'opacity 0.5s ease-out';
    body.style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = 'memories-locked.html';
    }, 500);
}

// Configurar fecha del poema
function setupPoemDate() {
    const today = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = today.toLocaleDateString('es-ES', options);
    const poemDateElement = document.getElementById('poem-date');
    if (poemDateElement) {
        poemDateElement.textContent = dateString;
    }
}

// Función para el efecto de escritura del poema
function startPoemTyping() {
    const poemText = document.getElementById('poem-text');
    if (!poemText) {
        console.log('Elemento de poema no encontrado');
        return;
    }
    
    // Obtener el texto completo y guardarlo
    const fullText = poemText.textContent.trim();
    if (!fullText) {
        console.log('Texto de poema vacío');
        return;
    }
    
    // Limpiar el contenido inmediatamente y configurar estilos
    poemText.textContent = '';
    poemText.style.borderRight = '2px solid #ff6b9d';
    poemText.style.whiteSpace = 'pre-line';
    poemText.style.overflow = 'hidden';
    poemText.style.position = 'relative';
    poemText.style.minHeight = '400px';
    poemText.style.opacity = '1';
    
    let currentIndex = 0;
    const typingSpeed = 30; // milisegundos por carácter (más rápido)
    
    function typeNextChar() {
        if (currentIndex < fullText.length) {
            const char = fullText[currentIndex];
            poemText.textContent += char;
            currentIndex++;
            
            // Pausa mínima para saltos de línea
            const delay = char === '\n' ? 10 : typingSpeed;
            setTimeout(typeNextChar, delay);
        } else {
            // Terminar la animación
            setTimeout(() => {
                poemText.style.borderRight = 'none';
                // Agregar efecto de finalización
                poemText.style.animation = 'glow 2s ease-in-out';
                console.log('Efecto de escritura del poema completado');
                
                // Crear partículas especiales para el poema
                createPoemParticles();
                
                // Mostrar notificación romántica
                showSpecialNotification('💕 Mi poema especial está listo para ti, mi princesa', 'love');
            }, 300);
        }
    }
    
    // Iniciar la escritura inmediatamente
    console.log('Iniciando efecto de escritura del poema...');
    setTimeout(typeNextChar, 2000);
}

// Función para iniciar la animación del poema con el botón
function startPoemAnimation() {
    console.log('Iniciando animación del poema...');
    
    // Obtener elementos
    const startContainer = document.getElementById('poem-start-container');
    const textContainer = document.getElementById('poem-text-container');
    const startBtn = document.querySelector('.poem-start-btn');
    
    if (!startContainer || !textContainer || !startBtn) {
        console.log('Elementos del poema no encontrados');
        return;
    }
    
    // Cambiar el botón a estado de carga
    startBtn.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        <span>Preparando poema...</span>
        <i class="fas fa-heart"></i>
    `;
    startBtn.disabled = true;
    
    // Simular tiempo de preparación
    setTimeout(() => {
        // Ocultar contenedor de inicio con animación
        startContainer.style.animation = 'fadeOut 0.5s ease-out forwards';
        
        setTimeout(() => {
            startContainer.style.display = 'none';
            
            // Mostrar contenedor del poema
            textContainer.style.display = 'block';
            textContainer.style.opacity = '0';
            textContainer.style.transform = 'translateY(20px)';
            
            // Animar entrada del contenedor del poema
            setTimeout(() => {
                textContainer.style.transition = 'all 0.8s ease-out';
                textContainer.style.opacity = '1';
                textContainer.style.transform = 'translateY(0)';
                
                // Iniciar efecto de escritura inmediatamente
                setTimeout(() => {
                    startPoemTyping();
                }, 200);
            }, 100);
        }, 500);
    }, 1500);
}

// Función para crear partículas especiales para el poema
function createPoemParticles() {
    const poemSection = document.querySelector('.poems-section');
    if (!poemSection) return;
    
    // Crear contenedor de partículas si no existe
    let particlesContainer = poemSection.querySelector('.poem-particles');
    if (!particlesContainer) {
        particlesContainer = document.createElement('div');
        particlesContainer.className = 'poem-particles';
        poemSection.appendChild(particlesContainer);
    }
    
    // Crear partículas
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'poem-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
            particlesContainer.appendChild(particle);
        }, i * 200);
    }
} 