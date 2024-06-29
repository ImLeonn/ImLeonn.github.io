document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 1;
    const totalCards = document.querySelectorAll('.participant').length;

    // Функция для получения количества карточек на странице в зависимости от ширины экрана
    function getCardsPerPage() {
        return window.screen.width <= 375 ? 1 : 3;
    }

    // Функция для получения общего количества страниц
    function getTotalPages() {
        return Math.ceil(totalCards / getCardsPerPage());
    }

    // Функция для отображения карточек на странице
    function showPage(page) {
        const cardsPerPage = getCardsPerPage();
        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        const cards = document.querySelectorAll('.participant');
        cards.forEach((card, index) => {
            if (index >= start && index < end) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        // Обновляем состояние кнопок
        if (page === 1) {
            document.querySelector('.prev-button').setAttribute('disabled', 'disabled');
        } else {
            document.querySelector('.prev-button').removeAttribute('disabled');
        }
        if (page === getTotalPages()) {
            document.querySelector('.next-button').setAttribute('disabled', 'disabled');
        } else {
            document.querySelector('.next-button').removeAttribute('disabled');
        }

        // Обновляем индикатор страницы
        updatePageIndicator();
    }

    // Функция для обновления индикатора страницы
    function updatePageIndicator() {
        const cardsPerPage = getCardsPerPage();
        const totalPages = getTotalPages();
        document.querySelector('.change-number').textContent = currentPage * cardsPerPage;
        document.querySelector('.opacity-text').textContent = `/ 6`;
    }

    // Функция для перехода на следующую страницу
    function goToNextPage() {
        if (currentPage < getTotalPages()) {
            currentPage++;
        } else {
            currentPage = 1;
        }
        showPage(currentPage);
    }

    // Функция для перехода на предыдущую страницу
    function goToPrevPage() {
        if (currentPage > 1) {
            currentPage--;
        } else {
            currentPage = getTotalPages();
        }
        showPage(currentPage);
    }

    // Функция автоматического перелистывания карточек
    function autoScroll() {
        goToNextPage();
    }

    // Устанавливаем обработчики событий для кнопок
    document.querySelector('.prev-button').addEventListener('click', function () {
        goToPrevPage();
    });

    document.querySelector('.next-button').addEventListener('click', function () {
        goToNextPage();
    });

    // Автоматическое перелистывание каждые 4 секунды
    let intervalId = setInterval(autoScroll, 4000);

    // Остановка автоматического перелистывания при наведении
    document.querySelector('.carousel').addEventListener('mouseover', () => {
        clearInterval(intervalId);
    });

    // Возобновление автоматического перелистывания при уходе курсора
    document.querySelector('.carousel').addEventListener('mouseleave', () => {
        intervalId = setInterval(autoScroll, 4000);
    });

    // Обновляем состояние кнопок при наведении
    document.querySelectorAll('.prev-button, .next-button').forEach(button => {
        button.addEventListener('mouseover', () => {
            clearInterval(intervalId);
        });

        button.addEventListener('mouseleave', () => {
            intervalId = setInterval(autoScroll, 4000);
        });
    });

    // Обработчик изменения размера окна
    window.addEventListener('resize', () => {
        const newCardsPerPage = getCardsPerPage();
        const newTotalPages = getTotalPages();
        if (newCardsPerPage !== getCardsPerPage()) {
            currentPage = 1; // Сбросить на первую страницу при изменении размера
        }
        showPage(currentPage);
    });

    // Инициализация страницы
    showPage(currentPage);
});