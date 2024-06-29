document.addEventListener("DOMContentLoaded", function () {
    
    function updateLink() {
        const button = document.querySelector('.header-button-left');
        const anchor = button.closest('a');

        if (window.screen.width <= 375) {
            anchor.setAttribute('href', '#first-block-smallscreen');
        } else {
            anchor.setAttribute('href', '#first-block');
        }
    }

    // Initial check
    updateLink();

    // Update link on window resize
    window.addEventListener('resize', updateLink);



    const leftButton = document.querySelector(".left-button");
        const rightButton = document.querySelector(".right-button");
        const items = document.querySelectorAll(".carousel-item");
        const indicators = document.querySelectorAll(".indicator");
        let currentIndex = 0;

        function updateCarousel() {
            items.forEach((item, index) => {
                item.style.display = index === currentIndex ? "block" : "none";
            });
            indicators.forEach((indicator, index) => {
                indicator.querySelector("circle").setAttribute("fill", index === currentIndex ? "#313131" : "#D9D9D9");
            });
            leftButton.classList.toggle("disabled", currentIndex === 0);
            rightButton.classList.toggle("disabled", currentIndex === items.length - 1);
        }

        leftButton.addEventListener("click", function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        rightButton.addEventListener("click", function() {
            if (currentIndex < items.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener("click", function() {
                currentIndex = index;
                updateCarousel();
            });
        });

        updateCarousel();

});
