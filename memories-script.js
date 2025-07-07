// Script específico para la página de recuerdos
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de recuerdos cargada');
    
    // Inicializar funcionalidades
    setupMobileNavigation();
    setupSmoothScrolling();
    setupGalleryLightbox();
    setupTimelineAnimations();
    setupFuturePlaceholders();
    startEntranceAnimations();
    
    console.log('Funcionalidades de recuerdos inicializadas');
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

// Configurar scroll suave
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
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

// Configurar lightbox para la galería
function setupGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item:not(.future-photo)');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.getAttribute('data-caption');
            
            if (img) {
                showLightbox(img.src, caption);
            }
        });
    });
}

// Mostrar lightbox
function showLightbox(imageSrc, caption) {
    // Crear overlay del lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${imageSrc}" alt="${caption}">
            <p class="lightbox-caption">${caption}</p>
        </div>
    `;
    
    // Agregar estilos CSS para el lightbox
    const style = document.createElement('style');
    style.textContent = `
        .lightbox-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 3000;
            animation: fadeIn 0.3s ease;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            text-align: center;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .lightbox-caption {
            color: white;
            font-size: 1.2rem;
            margin-top: 1rem;
            font-weight: 600;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .lightbox-close:hover {
            color: #ff6b9d;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @media (max-width: 768px) {
            .lightbox-content img {
                max-height: 70vh;
            }
            
            .lightbox-caption {
                font-size: 1rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(lightbox);
    
    // Cerrar lightbox
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => {
        lightbox.remove();
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.remove();
        }
    });
    
    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            lightbox.remove();
        }
    });
}

// Configurar animaciones de la timeline
function setupTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Configurar placeholders futuros
function setupFuturePlaceholders() {
    const futureItems = document.querySelectorAll('.future-placeholder');
    
    futureItems.forEach(item => {
        item.addEventListener('click', function() {
            showFutureMessage();
        });
    });
}

// Mostrar mensaje sobre futuros recuerdos
function showFutureMessage() {
    const message = document.createElement('div');
    message.className = 'future-message';
    message.innerHTML = `
        <div class="future-message-content">
            <h3>🌟 Más recuerdos por venir</h3>
            <p>Aquí se agregarán nuevos momentos especiales que compartiremos juntos. ¡Cada día es una nueva oportunidad para crear recuerdos inolvidables!</p>
            <div class="future-hearts">
                <i class="fas fa-heart"></i>
                <i class="fas fa-heart"></i>
                <i class="fas fa-heart"></i>
            </div>
            <button class="future-close-btn">Entendido</button>
        </div>
    `;
    
    // Agregar estilos CSS para el mensaje
    const style = document.createElement('style');
    style.textContent = `
        .future-message {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }
        
        .future-message-content {
            background: white;
            padding: 2rem;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            margin: 1rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .future-message-content h3 {
            color: #ff6b9d;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        
        .future-message-content p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        
        .future-hearts {
            margin: 1rem 0;
        }
        
        .future-hearts i {
            color: #ff6b9d;
            font-size: 1.5rem;
            margin: 0 0.5rem;
            animation: heart-beat 1.5s ease-in-out infinite;
        }
        
        .future-hearts i:nth-child(2) {
            animation-delay: 0.5s;
        }
        
        .future-hearts i:nth-child(3) {
            animation-delay: 1s;
        }
        
        .future-close-btn {
            background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
            color: white;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: transform 0.3s ease;
        }
        
        .future-close-btn:hover {
            transform: translateY(-2px);
        }
        
        @keyframes heart-beat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(message);
    
    // Cerrar mensaje
    const closeBtn = message.querySelector('.future-close-btn');
    closeBtn.addEventListener('click', () => {
        message.remove();
    });
    
    message.addEventListener('click', (e) => {
        if (e.target === message) {
            message.remove();
        }
    });
}

// Animaciones de entrada
function startEntranceAnimations() {
    // Animación del título principal
    const memoriesTitle = document.querySelector('.memories-title');
    if (memoriesTitle) {
        memoriesTitle.style.opacity = '0';
        memoriesTitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            memoriesTitle.style.transition = 'all 1s ease';
            memoriesTitle.style.opacity = '1';
            memoriesTitle.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Animación de los corazones
    const hearts = document.querySelectorAll('.memories-hearts i');
    hearts.forEach((heart, index) => {
        heart.style.opacity = '0';
        heart.style.transform = 'scale(0)';
        
        setTimeout(() => {
            heart.style.transition = 'all 0.5s ease';
            heart.style.opacity = '1';
            heart.style.transform = 'scale(1)';
        }, 1000 + (index * 200));
    });
}

// Función para agregar nuevos recuerdos (para uso futuro)
function addNewMemory(date, title, description, imageSrc, tags) {
    const timeline = document.querySelector('.timeline');
    const futureMemory = document.querySelector('.future-memory');
    
    if (timeline && futureMemory) {
        const newMemory = document.createElement('div');
        newMemory.className = 'timeline-item';
        newMemory.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${date}</div>
                <div class="timeline-image">
                    <img src="${imageSrc}" alt="${title}" onerror="this.src='https://via.placeholder.com/300x200/ff6b9d/ffffff?text=${encodeURIComponent(title)}'">
                </div>
                <h3>${title}</h3>
                <p>${description}</p>
                <div class="timeline-tags">
                    ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        // Insertar antes del placeholder futuro
        timeline.insertBefore(newMemory, futureMemory);
        
        // Animar la entrada
        newMemory.style.opacity = '0';
        newMemory.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            newMemory.style.transition = 'all 0.8s ease';
            newMemory.style.opacity = '1';
            newMemory.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Función para agregar nuevas fotos (para uso futuro)
function addNewPhoto(imageSrc, caption) {
    const galleryGrid = document.querySelector('.gallery-grid');
    const futurePhotos = document.querySelectorAll('.future-photo');
    
    if (galleryGrid && futurePhotos.length > 0) {
        const newPhoto = document.createElement('div');
        newPhoto.className = 'gallery-item';
        newPhoto.setAttribute('data-caption', caption);
        newPhoto.innerHTML = `<img src="${imageSrc}" alt="${caption}" onerror="this.src='https://via.placeholder.com/300x300/ff6b9d/ffffff?text=${encodeURIComponent(caption)}'">`;
        
        // Insertar antes del primer placeholder futuro
        galleryGrid.insertBefore(newPhoto, futurePhotos[0]);
        
        // Configurar lightbox para la nueva foto
        newPhoto.addEventListener('click', function() {
            showLightbox(imageSrc, caption);
        });
        
        // Animar la entrada
        newPhoto.style.opacity = '0';
        newPhoto.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            newPhoto.style.transition = 'all 0.6s ease';
            newPhoto.style.opacity = '1';
            newPhoto.style.transform = 'scale(1)';
        }, 100);
    }
}

// Exportar funciones para uso futuro
window.MemoriesPage = {
    addNewMemory,
    addNewPhoto
}; 