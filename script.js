// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar iconos de Lucide
    lucide.createIcons();
    
    // Inicializar todas las funcionalidades
    initMobileMenu();
    initNavbarScroll();
    initFloatingElements();
    initIntersectionObserver();
    initSmoothScroll();
    initCTAButtons();
    initSubtleEffects();
    initProjectsGallery();
});

// Funcionalidad del menú móvil
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Cambiar icono del botón con efecto suave
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.setAttribute('data-lucide', 'menu');
            } else {
                icon.setAttribute('data-lucide', 'x');
            }
            lucide.createIcons();
        });
        
        // Cerrar menú al hacer clic en un enlace
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                
                const icon = mobileMenuButton.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }
}

// Efecto de navegación al hacer scroll
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
}

// Crear elementos flotantes sutiles
function initFloatingElements() {
    if (window.innerWidth > 768) {
        createFloatingElement('.floating-elements', '#06b6d4', '15%', '85%', 8);
        createFloatingElement('.floating-elements', '#eab308', '75%', '10%', 6);
        createFloatingElement('.floating-elements', '#0ea5e9', '45%', '90%', 10);
    }
}

function createFloatingElement(container, color, top, left, duration) {
    const containerEl = document.querySelector(container);
    if (!containerEl) return;
    
    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.top = top;
    element.style.left = left;
    element.style.width = '60px';
    element.style.height = '60px';
    element.style.background = `radial-gradient(circle, ${color}20 0%, transparent 70%)`;
    element.style.borderRadius = '50%';
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
    element.style.animation = `float ${duration}s ease-in-out infinite`;
    element.style.filter = 'blur(1px)';
    
    containerEl.appendChild(element);
}

// Observador de intersección para animaciones
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Animar tarjetas con retraso escalonado
                if (entry.target.closest('#programa')) {
                    animateCardsSequentially('.enhanced-card', 200);
                }
                
                if (entry.target.closest('#beneficios')) {
                    animateCardsSequentially('.premium-card', 150);
                }
                
                if (entry.target.closest('#testimonios')) {
                    animateCardsSequentially('.testimonial-card', 200);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    const elementsToObserve = document.querySelectorAll('.section-reveal');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

function animateCardsSequentially(selector, delay) {
    const cards = document.querySelectorAll(selector);
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.6s ease';
        }, index * delay);
    });
}

// Navegación suave
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                // Efecto visual en el enlace clickeado
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Funcionalidad de botones CTA
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.enhanced-button-primary, .enhanced-button-secondary');
    
    ctaButtons.forEach(button => {
        // Efecto de ondas al hacer clic
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.4)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Lógica específica del botón
            const buttonText = this.textContent.trim();
            handleButtonAction(buttonText);
        });
        
        // Efecto hover mejorado
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Animación de ondas para botones
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

function handleButtonAction(buttonText) {
    switch(buttonText) {
        case 'Descubre el Diploma IB':
            scrollToSection('programa');
            showNotification('Explorando el programa IB...', '#06b6d4');
            break;
        case 'Más Información':
            scrollToSection('beneficios');
            showNotification('Descubriendo beneficios...', '#eab308');
            break;
        case 'Solicitar Información':
            scrollToSection('contacto');
            showNotification('Redirigiendo a contacto...', '#0ea5e9');
            break;
        case 'Descargar Brochure':
            downloadBrochure();
            showNotification('Preparando descarga...', '#06b6d4');
            break;
        default:
            console.log('Button clicked:', buttonText);
    }
}

// Sistema de notificaciones elegante
function showNotification(message, color) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        color: ${color};
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        border-left: 4px solid ${color};
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Estilos para notificaciones
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
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
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Efectos sutiles adicionales
function initSubtleEffects() {
    // Efecto parallax suave en scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-elements');
        
        parallaxElements.forEach(element => {
            const speed = 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Efecto de hover en tarjetas
    const cards = document.querySelectorAll('.enhanced-card, .premium-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto de hover en iconos sociales
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Funcionalidad de la galería de proyectos
function initProjectsGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    // Filtros de proyectos
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar proyectos con animación
            galleryItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    setTimeout(() => {
                        item.classList.remove('hidden');
                        item.style.animationDelay = `${index * 0.1}s`;
                    }, index * 50);
                } else {
                    item.classList.add('hidden');
                }
            });
            
            // Efecto visual en el botón
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            showNotification(`Mostrando proyectos: ${getFilterName(filter)}`, '#06b6d4');
        });
    });
    
    // Cerrar modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeProjectModal);
    }
    
    // Cerrar modal al hacer clic fuera
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProjectModal();
            }
        });
    }
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeProjectModal();
        }
    });
    
    // Animación inicial de aparición de proyectos
    setTimeout(() => {
        galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        });
    }, 500);
}

function getFilterName(filter) {
    const names = {
        'all': 'Todos los Proyectos',
        'ciencias': 'Ciencias',
        'arte': 'Arte y Diseño',
        'tecnologia': 'Tecnología',
        'humanidades': 'Humanidades'
    };
    return names[filter] || 'Proyectos';
}

// Abrir modal de proyecto
function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalTitle || !modalBody) return;
    
    // Contenido específico para cada proyecto
    const projectData = getProjectData(projectId);
    
    modalTitle.textContent = projectData.title;
    modalBody.innerHTML = projectData.content;
    
    // Mostrar modal con animación
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
    
    // Reinicializar iconos de Lucide en el modal
    lucide.createIcons();
}

// Cerrar modal de proyecto
function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

// Datos de los proyectos
function getProjectData(projectId) {
    const projects = {
        'proyecto1': {
            title: 'Síntesis de Compuestos Orgánicos',
            content: `
                <div class="space-y-6">
                    <img src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop" alt="Proyecto de Química" class="w-full h-64 object-cover rounded-lg">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="text-lg font-bold text-ib-blue-800 mb-3">Descripción del Proyecto</h4>
                            <p class="text-gray-600 mb-4">Este proyecto de investigación se centra en el desarrollo de métodos sostenibles para la síntesis de compuestos orgánicos, utilizando catalizadores verdes y procesos de bajo impacto ambiental.</p>
                            <div class="space-y-2">
                                <div class="flex items-center">
                                    <i data-lucide="user" class="w-4 h-4 text-accent-cyan mr-2"></i>
                                    <span class="text-sm text-gray-600">Estudiante: María González</span>
                                </div>
                                <div class="flex items-center">
                                    <i data-lucide="calendar" class="w-4 h-4 text-accent-cyan mr-2"></i>
                                    <span class="text-sm text-gray-600">Grado 10 - Química</span>
                                </div>
                                <div class="flex items-center">
                                    <i data-lucide="clock" class="w-4 h-4 text-accent-cyan mr-2"></i>
                                    <span class="text-sm text-gray-600">Duración: 6 meses</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-lg font-bold text-ib-blue-800 mb-3">Objetivos Alcanzados</h4>
                            <ul class="space-y-2">
                                <li class="flex items-start">
                                    <i data-lucide="check-circle" class="w-4 h-4 text-green-500 mr-2 mt-1"></i>
                                    <span class="text-sm text-gray-600">Desarrollo de 3 nuevos catalizadores sostenibles</span>
                                </li>
                                <li class="flex items-start">
                                    <i data-lucide="check-circle" class="w-4 h-4 text-green-500 mr-2 mt-1"></i>
                                    <span class="text-sm text-gray-600">Reducción del 40% en residuos químicos</span>
                                </li>
                                <li class="flex items-start">
                                    <i data-lucide="check-circle" class="w-4 h-4 text-green-500 mr-2 mt-1"></i>
                                    <span class="text-sm text-gray-600">Presentación en feria científica regional</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        },
        'proyecto2': {
            title: 'Arte Digital Interactivo',
            content: `
                <div class="space-y-6">
                    <img src="https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop" alt="Proyecto de Arte Digital" class="w-full h-64 object-cover rounded-lg">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="text-lg font-bold text-ib-blue-800 mb-3">Descripción del Proyecto</h4>
                            <p class="text-gray-600 mb-4">Una exploración innovadora de medios digitales que combina arte tradicional con tecnología moderna, creando experiencias interactivas que responden al movimiento y sonido.</p>
                            <div class="space-y-2">
                                <div class="flex items-center">
                                    <i data-lucide="user" class="w-4 h-4 text-accent-cyan mr-2"></i>
                                    <span class="text-sm text-gray-600">Estudiante: Carlos Ruiz</span>
                                </div>
                                <div class="flex items-center">
                                    <i data-lucide="calendar" class="w-4 h-4 text-accent-cyan mr-2"></i>
                                    <span class="text-sm text-gray-600">Grado 9 - Arte Digital</span>
                                </div>
                                <div class="flex items-center">
                                    <i data-lucide="clock" class="w-4 h-4 text-accent-cyan mr-2"></i>
                                    <span class="text-sm text-gray-600">Duración: 4 meses</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-lg font-bold text-ib-blue-800 mb-3">Técnicas Utilizadas</h4>
                            <ul class="space-y-2">
                                <li class="flex items-start">
                                    <i data-lucide="palette" class="w-4 h-4 text-orange-500 mr-2 mt-1"></i>
                                    <span class="text-sm text-gray-600">Pintura digital con sensores de movimiento</span>
                                </li>
                                <li class="flex items-start">
                                    <i data-lucide="music" class="w-4 h-4 text-orange-500 mr-2 mt-1"></i>
                                    <span class="text-sm text-gray-600">Visualización de audio en tiempo real</span>
                                </li>
                                <li class="flex items-start">
                                    <i data-lucide="monitor" class="w-4 h-4 text-orange-500 mr-2 mt-1"></i>
                                    <span class="text-sm text-gray-600">Instalación interactiva multimedia</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        },
        'proyecto3': {
            title: 'Robot Asistente Educativo',
            content: `
                <div class="space-y-6">
                    <img src="https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop" alt="Proyecto de Robótica" class="w-full h-64 object-cover rounded-lg">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="text-lg font-bold text-ib-blue-800 mb-3">Descripción del Proyecto</h4>
                            <p class="text-gray-600 mb-4">Desarrollo de un robot asistente diseñado para ayudar en el proceso de aprendizaje, capaz de responder preguntas, proporcionar explicaciones y adaptar su enseñanza al ritmo del estudiante.</p>
                            <div class="space-y-2">
                                <div class="flex items-center">
                                    <i data-lucide="user" class="w-4 h-4 text-accent-cyan mr-2"></i>
                                    <span class="text-sm text-gray-600">Estudiante: Ana Martínez</span>
                                </div>
                                <div class="flex items-center">
                                    <i data-lucide="calendar" class="w-4 h-4 text-accent-cyan mr-2"></i>
                                    <span class="text-sm text-gray-600">Grado 10 - Tecnología</span>
                                </div>
                                <div class="flex items-center">
                                    <i data-lucide="clock" class="w-4 h-4 text-accent-cyan mr-2"></i>
                                    <span class="text-sm text-gray-600">Duración: 8 meses</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-lg font-bold text-ib-blue-800 mb-3">Características Técnicas</h4>
                            <ul class="space-y-2">
                                <li class="flex items-start">
                                    <i data-lucide="brain" class="w-4 h-4 text-purple-500 mr-2 mt-1"></i>
                                    <span class="text-sm text-gray-600">Inteligencia artificial conversacional</span>
                                </li>
                                <li class="flex items-start">
                                    <i data-lucide="eye" class="w-4 h-4 text-purple-500 mr-2 mt-1"></i>
                                    <span class="text-sm text-gray-600">Reconocimiento visual de objetos</span>
                                </li>
                                <li class="flex items-start">
                                    <i data-lucide="volume-2" class="w-4 h-4 text-purple-500 mr-2 mt-1"></i>
                                    <span class="text-sm text-gray-600">Síntesis y reconocimiento de voz</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        },
        'proyecto4': {
            title: 'Memoria Histórica Digital',
            content: `
                <div class="space-y-6">
                    <img src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop" alt="Proyecto de Historia" class="w-full h-64 object-cover rounded-lg">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="text-lg font-bold text-ib-blue-800 mb-3">Descripción del Proyecto</h4>
                            <p class="text-gray-600 mb-4">Un archivo digital interactivo que preserva testimonios históricos de la comunidad local, utilizando tecnología multimedia para crear una experiencia inmersiva de aprendizaje histórico.</p>
                            <div class="space-y-2">
                                <div class="flex items-center">
                                    <i data-lucide="user" class="w-4 h-4 text-accent-cyan mr-2"></i>
                                    <span class="text-sm text-gray-600">Estudiante: Diego López</span>
                                </div>
                                <div class="flex items-center">
                                    <i data-lucide="calendar" class="w-4 h-4 text-accent-cyan mr-2"></i>
                                    <span class="text-sm text-gray-600">Grado 9 - Historia</span>
                                </div>
                                <div class="flex items-center">
                                    <i data-lucide="clock" class="w-4 h-4 text-accent-cyan mr-2"></i>
                                    <span class="text-sm text-gray-600">Duración: 5 meses</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-lg font-bold text-ib-blue-800 mb-3">Contenido del Archivo</h4>
                            <ul class="space-y-2">
                                <li class="flex items-start">
                                    <i data-lucide="mic" class="w-4 h-4 text-red-500 mr-2 mt-1"></i>
                                    <span class="text-sm text-gray-600">25 entrevistas a residentes locales</span>
                                </li>
                                <li class="flex items-start">
                                    <i data-lucide="image" class="w-4 h-4 text-red-500 mr-2 mt-1"></i>
                                    <span class="text-sm text-gray-600">Digitalización de 200+ fotografías históricas</span>
                                </li>
                                <li class="flex items-start">
                                    <i data-lucide="map" class="w-4 h-4 text-red-500 mr-2 mt-1"></i>
                                    <span class="text-sm text-gray-600">Mapas interactivos de evolución urbana</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        },
        'proyecto5': {
            title: 'Ecosistemas Urbanos',
            content: `
                <div class="space-y-6">
                    <img src="https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop" alt="Proyecto de Biología" class="w-full h-64 object-cover rounded-lg">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="text-lg font-bold text-ib-blue-800 mb-3">Descripción del Proyecto</h4>
                            <p class="text-gray-600 mb-4">Investigación exhaustiva sobre la biodiversidad en entornos urbanos, analizando cómo las especies se adaptan a la vida en la ciudad y su impacto en el ecosistema local.</p>
                            <div class="space-y-2">
                                <div class="flex items-center">
                                    <i data-lucide="user" class="w-4 h-4 text-accent-cyan mr-2"></i>
                                    <span class="text-sm text-gray-600">Estudiante: Laura Fernández</span>
                                </div>
                                <div class="flex items-center">
                                    <i data-lucide="calendar" class="w-4 h-4 text-accent-cyan mr-2"></i>
                                    <span class="text-sm text-gray-600">Grado 10 - Biología</span>
                                </div>
                                <div class="flex items-center">
                                    <i data-lucide="clock" class="w-4 h-4 text-accent-cyan mr-2"></i>
                                    <span class="text-sm text-gray-600">Duración: 7 meses</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-lg font-bold text-ib-blue-800 mb-3">Hallazgos Principales</h4>
                            <ul class="space-y-2">
                                <li class="flex items-start">
                                    <i data-lucide="leaf" class="w-4 h-4 text-green-500 mr-2 mt-1"></i>
                                    <span class="text-sm text-gray-600">Catalogación de 45 especies urbanas</span>
                                </li>
                                <li class="flex items-start">
                                    <i data-lucide="trending-up" class="w-4 h-4 text-green-500 mr-2 mt-1"></i>
                                    <span class="text-sm text-gray-600">Identificación de corredores ecológicos</span>
                                </li>
                                <li class="flex items-start">
                                    <i data-lucide="shield" class="w-4 h-4 text-green-500 mr-2 mt-1"></i>
                                    <span class="text-sm text-gray-600">Propuestas de conservación urbana</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        },
        'proyecto6': {
            title: 'Escultura Sostenible',
            content: `
                <div class="space-y-6">
                    <img src="https://images.pexels.com/photos/1183986/pexels-photo-1183986.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop" alt="Proyecto de Escultura" class="w-full h-64 object-cover rounded-lg">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="text-lg font-bold text-ib-blue-800 mb-3">Descripción del Proyecto</h4>
                            <p class="text-gray-600 mb-4">Una serie de esculturas creadas exclusivamente con materiales reciclados y sostenibles, explorando la relación entre arte, medio ambiente y responsabilidad social.</p>
                            <div class="space-y-2">
                                <div class="flex items-center">
                                    <i data-lucide="user" class="w-4 h-4 text-accent-cyan mr-2"></i>
                                    <span class="text-sm text-gray-600">Estudiante: Sofía Morales</span>
                                </div>
                                <div class="flex items-center">
                                    <i data-lucide="calendar" class="w-4 h-4 text-accent-cyan mr-2"></i>
                                    <span class="text-sm text-gray-600">Grado 9 - Arte Sostenible</span>
                                </div>
                                <div class="flex items-center">
                                    <i data-lucide="clock" class="w-4 h-4 text-accent-cyan mr-2"></i>
                                    <span class="text-sm text-gray-600">Duración: 6 meses</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-lg font-bold text-ib-blue-800 mb-3">Materiales Utilizados</h4>
                            <ul class="space-y-2">
                                <li class="flex items-start">
                                    <i data-lucide="recycle" class="w-4 h-4 text-orange-500 mr-2 mt-1"></i>
                                    <span class="text-sm text-gray-600">Plásticos reciclados del océano</span>
                                </li>
                                <li class="flex items-start">
                                    <i data-lucide="tree-pine" class="w-4 h-4 text-orange-500 mr-2 mt-1"></i>
                                    <span class="text-sm text-gray-600">Madera recuperada de construcciones</span>
                                </li>
                                <li class="flex items-start">
                                    <i data-lucide="zap" class="w-4 h-4 text-orange-500 mr-2 mt-1"></i>
                                    <span class="text-sm text-gray-600">Componentes electrónicos reutilizados</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        }
    };
    
    return projects[projectId] || {
        title: 'Proyecto no encontrado',
        content: '<p>Lo sentimos, no se pudo cargar la información de este proyecto.</p>'
    };
}

// Función auxiliar para scroll a sección específica
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Función para simular descarga de brochure
function downloadBrochure() {
    console.log('Brochure download initiated');
    // Simular descarga
    setTimeout(() => {
        showNotification('¡Brochure listo para descargar!', '#0ea5e9');
    }, 1500);
}

// Manejo de errores para imágenes
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x300/0ea5e9/ffffff?text=IB+Diploma';
            this.alt = 'Imagen del Programa IB';
        });
    });
});

// Función para manejar el resize de la ventana
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        // Reducir efectos en móviles
        const floatingElements = document.querySelectorAll('.floating-elements > div');
        floatingElements.forEach(el => {
            el.style.opacity = '0.3';
        });
    } else {
        // Restaurar efectos en desktop
        const floatingElements = document.querySelectorAll('.floating-elements > div');
        floatingElements.forEach(el => {
            el.style.opacity = '0.6';
        });
    }
});

// Efectos de teclado para accesibilidad
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Cerrar menú móvil con tecla Escape
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const icon = mobileMenuButton.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    }
});

// Función para analytics (placeholder)
function trackEvent(action, category, label) {
    console.log('Analytics event:', { action, category, label });
}

// Tracking de eventos
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('enhanced-button-primary')) {
        trackEvent('click', 'CTA', 'Primary Button');
    }
    
    if (e.target.classList.contains('enhanced-button-secondary')) {
        trackEvent('click', 'CTA', 'Secondary Button');
    }
    
    if (e.target.closest('.social-icon')) {
        trackEvent('click', 'Social', 'Social Media Link');
    }
});

// Inicializar efectos de carga
window.addEventListener('load', function() {
    // Fade in suave de toda la página
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Inicializar animaciones de las tarjetas
    setTimeout(() => {
        const cards = document.querySelectorAll('.enhanced-card, .premium-card, .testimonial-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'all 0.6s ease';
            }, index * 100);
        });
    }, 500);
});

// Optimización de rendimiento
let ticking = false;

function updateOnScroll() {
    // Aquí van las funciones que se ejecutan en scroll
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Lazy loading para imágenes (si es necesario)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}