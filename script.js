

let slides = document.querySelectorAll('.slideshow');
        let dots = document.querySelectorAll('.dot');
        let slideIndex = 1;
        let timeoutID;

        const showSlides = (n) => {
            let i;

            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }

            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }

            for (i = 0; i < slides.length; i++) {
                dots[i].setAttribute('class', 'dot');
            }


            slides[slideIndex - 1].style.display = 'block';
            dots[slideIndex - 1].setAttribute('class', 'dot ativo');
            clearTimeout(timeoutID);
            timeoutID = setTimeout(autoSlides, 4000);
        };

        const plusSlides = (n) => {
            showSlides(slideIndex += n);
        };

        const currentSlide = (n) => {
            showSlides(slideIndex = n);
        };

        function autoSlides() {
            let i;

            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }

            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }

            for (i = 0; i < slides.length; i++) {
                dots[i].setAttribute('class', 'dot');
            }

            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].setAttribute('class', 'dot ativo');
            timeoutID = setTimeout(autoSlides, 4000);
        }

        autoSlides();



        const nav = document.querySelector(".nav")
        const btnMenu = document.querySelector(".btn-menu")
        const menu = document.querySelector(".menu")

        function handleButtonClick(event) {
          if (event.type === "touchstart") event.preventDefault()
          event.stopPropagation()
          nav.classList.toggle("active")
          handleClickOutside(menu, () => {
            nav.classList.remove("active")
            setAria()
          })
          setAria()
        }

        function handleClickOutside(targetElement, callback) {
          const html = document.documentElement
          function handleHTMLClick(event) {
            if (!targetElement.contains(event.target)) {
              targetElement.removeAttribute("data-target")
              html.removeEventListener("click", handleHTMLClick)
              html.removeEventListener("touchstart", handleHTMLClick)
              callback()
            }
          }
          if (!targetElement.hasAttribute("data-target")) {
            html.addEventListener("click", handleHTMLClick)
            html.addEventListener("touchstart", handleHTMLClick)
            targetElement.setAttribute("data-target", "")
          }
        }

        function setAria() {
          const isActive = nav.classList.contains("active")
          btnMenu.setAttribute("aria-expanded", isActive)
          if (isActive) {
            btnMenu.setAttribute("aria-label", "Fechar Menu")
          } else {
            btnMenu.setAttribute("aria-label", "Abrir Menu")
          }
        }

        btnMenu.addEventListener("click", handleButtonClick)
        btnMenu.addEventListener("touchstart", handleButtonClick)