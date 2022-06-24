document.addEventListener('DOMContentLoaded', function () {
  // burger
  let burger = document.querySelector('.header__burger-btn');
  let menu = document.querySelector('.burger-menu');
  let menuLinks = document.querySelectorAll('.header-top__link');
  let menuBtn = document.querySelector('.burger-menu__btn');

  burger.addEventListener('click',
    function () {

      burger.classList.toggle('header__burger-btn--active');

      menu.classList.toggle('burger-menu--active');

      document.body.classList.toggle('stop-scroll');
    })

  menuBtn.addEventListener('click',
    function () {
      menu.classList.toggle('burger-menu--active');
    }
  )
  menuLinks.forEach(function (el) {
    el.addEventListener('click',
      function () {

        burger.classList.remove('header__burger-btn--active');

        menu.classList.remove('burger-menu--active');

        document.body.classList.remove('stop-scroll')
      })
  })



  // btn-search

  function setSearch(params) {
    const openBtn = document.querySelector(`.${params.openBtnClass}`);
    const search = document.querySelector(`.${params.searchClass}`);
    const closeBtn = search.querySelector(`.${params.closeBtnClass}`);
    const disabledBtn = document.querySelector('.header__search-btn-mobile');
    const btnClosed = document.querySelector('.form-mobile__btn-closed');
    const burgerBtn = document.querySelector('.header__burger-btn');
    const headerLogo = document.querySelector('.header__logo');

    search.addEventListener("animationend", function (evt) {
      if (this._isOpened) {
        this.classList.remove(params.activeClass);
        this.classList.remove(params.hiddenClass);
        this._isOpened = false;
      } else {
        this._isOpened = true;
      }
    });

    search.addEventListener('click', function (evt) {
      evt._isSearch = true;
    });

    openBtn.addEventListener("click", function (evt) {


      this.disabled = true;

      openBtn.disabled = true;
      openBtn.classList.add(params.hiddenClass);

      if (
        !search.classList.contains(params.activeClass) &&
        !search.classList.contains(params.hiddenClass)
      ) {
        search.classList.add(params.activeClass);
      }

      if (window.innerWidth <= 768) {
        burgerBtn.classList.add(params.hiddenClass);
        headerLogo.classList.add(params.hiddenClass);

      }
    });

    closeBtn.addEventListener('click', function () {
      openBtn.disabled = false;
      openBtn.classList.remove(params.hiddenClass);
      search.classList.add(params.hiddenClass);

      if (window.innerWidth <= 768) {
        burgerBtn.classList.remove(params.hiddenClass);
        headerLogo.classList.remove(params.hiddenClass);
      }

    });

    document.body.addEventListener('click', function (evt) {
      if (!evt._isSearch && search._isOpened) {
        openBtn.disabled = false;
        openBtn.classList.remove(params.hiddenClass);
        search.classList.add(params.hiddenClass);

        if (window.innerWidth <= 768) {
          burgerBtn.classList.remove(params.hiddenClass);
          headerLogo.classList.remove(params.hiddenClass);
        }
      }
    });
  }

  setSearch({
    openBtnClass: "js-open-search", // класс кнопки открытия
    closeBtnClass: "js-close", // класс кнопки закрытия
    searchClass: "js-form", // класс формы поиска
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
  });


  //header tabs
  document.querySelectorAll('.header-bottom__menu-btn').forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (e) {
      const path = e.currentTarget.dataset.path;
      const buttonTab = document.querySelector(`[data-target="${path}"]`);

      const isClickedButtonActive = e.currentTarget.classList.contains('header-bottom__menu-btn--active');
      // const isButtonTabActive = buttonTab.classList.contains('tab__container--active');
      document.querySelectorAll('.header-bottom__menu-btn').forEach(function (btn) {
        btn.classList.remove('header-bottom__menu-btn--active');
      });

      document.querySelectorAll('.header-bottom__dropdown').forEach(function (tabsBtn) {
        tabsBtn.classList.remove('header-bottom__dropdown--active')
      });

      if (!isClickedButtonActive) {
        e.currentTarget.classList.add('header-bottom__menu-btn--active');
        buttonTab.classList.add('header-bottom__dropdown--active');
      }
    });
  })

  // scroll
  document.querySelectorAll('.js-scroll-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const href = this.getAttribute('href').substring(1);
      const scrollTarget = document.getElementById(href);
      const elementPosition = scrollTarget.getBoundingClientRect().top;

      window.scrollBy({
        top: elementPosition,
        behavior: 'smooth'
      });
    });
  });


  //  modal
  const btns = document.querySelectorAll('.gallery-slider__slide');
  const modalOverlay = document.querySelector('.gallery__modal-overlay');
  const modals = document.querySelectorAll('.gallery__modal');
  const modalBtn = document.querySelector('.gallery-modal__right');
  const modalResetButtons = document.querySelectorAll('.gallery-modal__btn');

  btns.forEach((el) => {
    el.addEventListener('click', (e) => {
      let path = e.currentTarget.getAttribute('data-path');

      modals.forEach((el) => {
        el.classList.remove('gallery__modal--visible');
      });

      document.querySelector(`[data-target = "${path}"]`).classList.add('gallery__modal--visible');
      modalOverlay.classList.add('gallery__modal-overlay--visible');

      document.body.style.overflowY = "hidden";
    });
  });

  modalOverlay.addEventListener('click', (e) => {

    if (e.target == modalOverlay) {
      modalOverlay.classList.remove('gallery__modal-overlay--visible');
      modals.forEach((el) => {
        el.classList.remove('gallery__modal-overlay--visible');

        document.body.style.overflowY = "auto";
      });
    }
  });

  modalResetButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      modalOverlay.classList.remove('gallery__modal-overlay--visible');
      modals.forEach((el) => {
        el.classList.remove('gallery__modal--visible');

        document.body.style.overflowY = "auto";
      });
    })
  });

  //catalog tabs

  let painterBtn = document.querySelectorAll('.painters__link');
  let painterItem = document.querySelectorAll('.painter__descr');

  painterBtn.forEach(function (element) {
    element.addEventListener('click', function (e) {
      const path = e.currentTarget.dataset.path;

      painterBtn.forEach(function (btn) { btn.classList.remove('painters__link--active') });
      e.currentTarget.classList.add('painters__link--active');

      painterItem.forEach(function (element) { element.classList.remove('painter__descr--active') });
      document.querySelector(`[data-target= "${path}"]`).classList.add('painter__descr--active');

    })
  })

  // hero-swiper
  const heroSwiper = new Swiper('.hero__swiper', {
    // Optional parameters

    loop: true,
    allowTouchMove: false,
    slidesPerView: 1,
    speed: 7000,

    autoplay: {
      delay: 7000,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    a11y: {
      containerRoleDescriptionMessage: "Слайдер Художественная галерея",
      paginationBulletMessage: "Переключить слайд на номер {{index}}",
      enabled: "Слайд на данный момент",
      paginationBulletMessage: String,
      itemRoleDescriptionMessage: "Слайд",
      lastSlideMessage: "Последний слайд",
      nextSlideMessage: "Следующий слайд",
      slideRole: "Слайд главного слайдера сайта",
    },

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  });


  // choices
  const element = document.querySelector('#customSelect');
  const choices = new Choices(element, {
    searchEnabled: false,
    shouldSort: false,
  });

  // swiper-gallery
  let gallerySwiper = new Swiper('.gallery__slider', {
    // Optional parameters
    speed: 700,
    spaceBetween: 50,

    // If we need pagination
    pagination: {
      el: '.gallery-slider__pagination',
      type: 'fraction',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.gallery-slider__btn-next',
      prevEl: '.gallery-slider__btn-prev',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0
      },
      576: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 50,
        slidesPerGroup: 2,
      },
      1700: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3,
      },
    },
    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
      itemRoleDescriptionMessage: 'Слайд'
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true
    }
  });


  // swiper-events
  let eventsSwiper = new Swiper('.events__swiper', {
    slidesPerView: 3,
    speed: 400,
    spaceBetween: 50,
    slidesPerGroup: 3,
    navigation: {
      nextEl: '.events__button-next',
      prevEl: '.events__button-prev',
    },
    pagination: {
      el: '.events__bullets',
      type: "bullets",
      clickable: true,
    },

    breakpoints: {
      1400: {
        spaceBetween: 50,
      },

      1024: {
        slidesPerView: 3,
        spaceBetween: 27,
        slidesPerGroup: 3,
      },

      575: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30
      },

      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0
      },
    },
    a11y: {
      itemRoleDescriptionMessage: "Слайд",
      prevSlideMessage: 'Предыдущее событие',
      nextSlideMessage: 'Следующее событие',
    }
  });

  // partners-swiper
  let partnersSwiper = new Swiper('.partners__slider', {
    speed: 400,

    navigation: {
      nextEl: '.partners__button-next',
      prevEl: '.partners__button-prev',
    },
    breakpoints: {
      1200: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3,
      },

      1024: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 50,
      },

      576: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30
      },

      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0
      },
    },
    a11y: {
      itemRoleDescriptionMessage: "Слайд",
      prevSlideMessage: 'Предыдущее событие',
      nextSlideMessage: 'Следующее событие',
    }
  });



  // accordion
  $(function () {
    $("#accordion").accordion({
      heightStyle: "content",
      collapsible: true,
    });
  });


  // tooltips
  tippy('.js-tooltip', {
    trigger: 'click',
    theme: 'tooltip-theme',
    maxWidth: 260,
    moveTransition: 'transform 0.2s ease-out',
  });

  // inputmask, just-validate

  var selector = document.querySelector("input[type='tel']");

  var im = new Inputmask("+7 (999) 999-99-99");
  im.mask(selector);

  const validation = new JustValidate('#contacts-form', {
    errorFieldCssClass: 'is-invalid',
    errorLabelCssClass: 'is-label-invalid',
  });

  validation
    .addField('#name', [
      {
        rule: 'customRegexp',
        value: /^[а-яa-z]*$/i,
        errorMessage: 'Некорректные символы',
      },
      {
        rule: 'required',
        errorMessage: 'Как вас зовут?',
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Недостаточное количество символов',
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Слишком длинное имя',
      },
    ])
    .addField('#tel', [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Укажите ваш телефон',
      },
      {
        validator: function (name, value) {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        },
        errorMessage: 'Номер должен содержать 10 цифр',
      }
    ])

  // yandex-map

  ymaps.ready(init);
  function init() {

    var myMap = new ymaps.Map("map1", {
      center: [55.75846806898367, 37.60108849999989],
      zoom: 14,
      controls: ['geolocationControl', 'zoomControl']
    },
      {
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition: { top: "200px", right: "20px" },
        geolocationControlFloat: 'none',
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "120px", right: "20px" },
      }
    );
    var myPlacemark = new ymaps.Placemark([55.75846806898367, 37.60108849999989], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-pin.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-20, -20]
    });

    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
    myMap.container.fitToViewport();
  }



})


