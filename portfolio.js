document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Lógica para el filtro del portfolio con animación
    const filtersContainer = document.querySelector('.portfolio-filters');
    if (filtersContainer) {
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filtersContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('filter-btn')) {
                // --- Lógica de animación --- 

                // 0. Preparación
                const filterValue = e.target.getAttribute('data-filter');
                const footer = document.querySelector('.footer');

                // 1. Medir la posición del footer ANTES del cambio
                const oldTop = footer.getBoundingClientRect().top;

                // 2. Cambiar clases para animar los items
                filtersContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');

                portfolioItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    const shouldShow = (filterValue === 'all' || filterValue === itemCategory);

                    if (shouldShow) {
                        item.classList.remove('hide');
                        setTimeout(() => {
                            item.classList.remove('shrinking');
                        }, 20);
                    } else {
                        item.classList.add('shrinking');
                    }
                });

                // 3. Ocultar items y animar el footer DESPUÉS de la animación de los items
                setTimeout(() => {
                    // Ocultar los que deben estar ocultos
                    portfolioItems.forEach(item => {
                        if (item.classList.contains('shrinking')) {
                            item.classList.add('hide');
                        }
                    });

                    // 4. Medir la posición del footer DESPUÉS del cambio
                    const newTop = footer.getBoundingClientRect().top;
                    const deltaY = oldTop - newTop;

                    // 5. Animar el footer si el cambio de posición es notable
                    if (Math.abs(deltaY) > 1) {
                        requestAnimationFrame(() => {
                            footer.style.transform = `translateY(${deltaY}px)`;
                            footer.style.transition = 'transform 0s';

                            requestAnimationFrame(() => {
                                footer.style.transform = '';
                                footer.style.transition = 'transform 0.4s ease';
                            });
                        });

                        footer.addEventListener('transitionend', () => {
                            footer.style.transition = '';
                        }, { once: true });
                    }
                }, 400); // Coincide con la duración de la transición de los items
            }
        });
    }

    // Animación de entrada para los items del portfolio
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (portfolioItems.length > 0) {
        portfolioItems.forEach(item => {
            item.classList.add('animate');
        });
    }
});
