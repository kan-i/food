const slider = $('.hero-slider'),
    progressBar = $('.progress');


let currSlide = 0;
let nextSlide = 0;
const prevArrow = `
        <div class="hero-footer-arrow hero-footer-arrow--prev animate__animated animate__fadeInLeft">
            <svg class="hero-footer-arrow_img--prev" width="92" height="8" viewBox="0 0 92 8" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0.646446 3.64645C0.451187 3.84171 0.451187 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53554 7.53553C4.7308 7.34027 4.7308 7.02369 4.53554 6.82843L1.70711 4L4.53554 1.17157C4.7308 0.976311 4.7308 0.659728 4.53554 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM92 3.5L1 3.5V4.5L92 4.5V3.5Z" />
            </svg>
            previous<span class="hero-footer-arrow_desc"></span>
        </div>
    `;
const nextArrow = `
        <div class="hero-footer-arrow hero-footer-arrow--next animate__animated animate__fadeInRight">
            next
            <svg class="hero-footer-arrow_img--next" width="92" height="8" viewBox="0 0 92 8" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M91.3536 4.35355C91.5488 4.15829 91.5488 3.84171 91.3536 3.64645L88.1716 0.464466C87.9763 0.269204 87.6597 0.269204 87.4645 0.464466C87.2692 0.659728 87.2692 0.976311 87.4645 1.17157L90.2929 4L87.4645 6.82843C87.2692 7.02369 87.2692 7.34027 87.4645 7.53553C87.6597 7.7308 87.9763 7.7308 88.1716 7.53553L91.3536 4.35355ZM0 4.5H91V3.5H0V4.5Z" />
            </svg>
            <span class="hero-footer-arrow_desc"></span>
        </div>
    `;
let progressNum = $('.progress_num');

const createSlides = function ({
    id,
    name,
    image,
    minImage,
    imageShadow,
    imageSmoke,
    imageVegetables
}) {
    const $slide = `
        <div class="hero-slide">
            <div class="hero-slide-text">
                <h2
                    class="hidden hero-slide-text_title animate__animated animate__fadeInRight animate__delay-2s">
                    ${name}
                </h2>
                <button
                    class="hidden hero-slide-text_button animate__animated animate__fadeInLeft animate__delay-2s">
                    Перейти в меню
                </button>
            </div>
            <div class="hero-slide-images">

                <picture>
                    <source srcset="${image}" media="(min-width: 414px)">
                    <img src="${minImage}" alt="${name}" class="hidden hero-slide-image main-img animate__animated animate__fadeInDownBig">
                </picture>                
                <img src="${imageShadow}" alt="${name}"
                    class="hidden shadow hero-slide-image animate__animated animate__delay-1s animate__zoomIn animate__slow">
                <img src="${imageSmoke}" alt="${name}"
                    class="hidden hero-slide-image hero-slide-images_item smoke animate__animated animate__zoomIn animate__delay-2s">
                <img src="${imageVegetables}" alt="${name}"
                    class="hidden hero-slide-image hero-slide-images_item vegetables animate__animated animate__zoomIn animate__delay-2s">
            </div>
        </div>
        `;
    slider.slick('slickAdd', `${$slide}`);
    $('.slick-active .hero-slide-text .hero-slide-text_title').removeClass('hidden');
    $('.slick-active .hero-slide-text .hero-slide-text_button').removeClass('hidden');
    $('.slick-active .hero-slide-images .hero-slide-image').removeClass('hidden');

}

const setProgress = (index) => {
    var calc = ((index + 1) / (slider.slick('getSlick').slideCount)) * 100;

    progressBar
        .css('background-size', calc + '% 100%')
        .attr('aria-valuenow', calc);

}

const createArrows = () => {

    let slidesLength = slider.slick('getSlick').$slides.length;
    let currentSlideIndex = slider.slick('getSlick').currentSlide;
    let nextSlideIndex = currentSlideIndex + 1;
    let prevSlideIndex = slidesLength - 1;
    let btnPrev = slider.slick('getSlick').$prevArrow;
    let btnNext = slider.slick('getSlick').$nextArrow;
    let namePrev = $('.hero-footer-arrow--prev .hero-footer-arrow_desc');
    let nameNext = $('.hero-footer-arrow--next .hero-footer-arrow_desc');
    let nextSlideText = slider.slick('getSlick').$slides.find('.hero-slide-text_title')[`${nextSlideIndex}`].innerText;
    let prevSlideText = slider.slick('getSlick').$slides.find('.hero-slide-text_title')[`${prevSlideIndex}`].innerText;



    namePrev.text(`${prevSlideText}`);
    nameNext.text(`${nextSlideText}`);
    progressNum.text(`0${nextSlideIndex}`);

    btnPrev.on('click', function () {
        if (prevSlideIndex <= 0) {
            prevSlideIndex = slidesLength;
        }
        if (nextSlideIndex <= 0) {
            nextSlideIndex = slidesLength;
        }
        prevSlideIndex--;
        namePrev.text(slider.slick('getSlick').$slides.find('.hero-slide-text_title')[`${prevSlideIndex}`].innerText);
        if ((nextSlideIndex - 1) == 0) {
            progressNum.text(`0${slidesLength}`);
        } else {
            progressNum.text(`0${nextSlideIndex - 1}`);
        }
        nextSlideIndex--;
        nameNext.text(slider.slick('getSlick').$slides.find('.hero-slide-text_title')[`${nextSlideIndex}`].innerText);
    })

    btnNext.on('click', function () {
        if (nextSlideIndex >= slidesLength - 1) {
            nextSlideIndex = -1;
        }
        if (prevSlideIndex >= slidesLength - 1) {
            prevSlideIndex = -1;
        }
        nextSlideIndex++;
        nameNext.text(slider.slick('getSlick').$slides.find('.hero-slide-text_title')[`${nextSlideIndex}`].innerText);
        if (nextSlideIndex == 0) {
            progressNum.text(`0${slidesLength}`);
        } else {
            progressNum.text(`0${nextSlideIndex}`);
        }
        prevSlideIndex++;
        namePrev.text(slider.slick('getSlick').$slides.find('.hero-slide-text_title')[`${prevSlideIndex}`].innerText);
    })

    document.querySelectorAll('.hero-slide-text_button').forEach(item => {
        item.onclick = () => {
            document.querySelector('.menu').scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
        }
    })

}

slider.on('afterChange', function (event, slick, currentSlide) {
    nextSlide = currentSlide;
    if (nextSlide !== currSlide) {
        $('.slick-active .hero-slide-text .hero-slide-text_title').removeClass('animate__fadeInRight');
        $('.slick-active .hero-slide-text .hero-slide-text_button').removeClass('animate__fadeInLeft');
        $('.slick-active .hero-slide-images .main-img').removeClass('animate__fadeInDownBig');
        $('.slick-active .hero-slide-images .shadow').removeClass('animate__zoomIn');
        $('.slick-active .hero-slide-images .smoke').removeClass('animate__zoomIn');
        $('.slick-active .hero-slide-images .vegetables').removeClass('animate__zoomIn');
    }
});

slider.on('setPosition', function (event, slick, currentSlide) {
    if (nextSlide !== currSlide) {

        const $title = $('.slick-active .hero-slide-text .hero-slide-text_title');
        const $btn = $('.slick-active .hero-slide-text .hero-slide-text_button');

        $title.removeClass('hidden');
        $title.addClass('animate__fadeInRight animate__delay-2s');
        $title.removeClass('animate__fadeOutRight');

        $btn.removeClass('hidden');
        $btn.addClass('animate__fadeInLeft animate__delay-2s');
        $btn.removeClass('animate__fadeOutLeft');

        $('.slick-active .hero-slide-images .hero-slide-image').removeClass('hidden');

        $('.slick-active .hero-slide-images .smoke').addClass('animate__zoomIn animate__delay-2s');
        $('.slick-active .hero-slide-images .main-img').addClass('animate__fadeInDownBig');
        $('.slick-active .hero-slide-images .shadow').addClass('animate__delay-1s animate__zoomIn animate__slow');
        $('.slick-active .hero-slide-images .vegetables').addClass('animate__zoomIn animate__delay-2s');

        $('.slick-active .hero-slide-images .smoke').removeClass('animate__zoomOut');
        $('.slick-active .hero-slide-images .main-img').removeClass('animate__fadeOutUpBig');
        $('.slick-active .hero-slide-images .shadow').removeClass('animate__zoomOut');
        $('.slick-active .hero-slide-images .vegetables').removeClass('animate__zoomOut');
    }
});

slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    currSlide = currentSlide;
    $('.slick-active .hero-slide-text .hero-slide-text_title').removeClass('animate__fadeInRight animate__delay-2s');
    $('.slick-active .hero-slide-text .hero-slide-text_title').addClass('animate__fadeOutRight');

    $('.slick-active .hero-slide-text .hero-slide-text_button').removeClass('animate__fadeInLeft animate__delay-2s');
    $('.slick-active .hero-slide-text .hero-slide-text_button').addClass('animate__fadeOutLeft');

    $('.slick-active .hero-slide-images .smoke').removeClass('animate__zoomIn animate__delay-2s');
    $('.slick-active .hero-slide-images .main-img').removeClass('animate__fadeInDownBig');
    $('.slick-active .hero-slide-images .shadow').removeClass('animate__delay-1s animate__zoomIn animate__slow');
    $('.slick-active .hero-slide-images .vegetables').removeClass('animate__zoomIn animate__delay-2s');

    $('.slick-active .hero-slide-images .smoke').addClass('animate__zoomOut');
    $('.slick-active .hero-slide-images .main-img').addClass('animate__fadeOutUpBig');
    $('.slick-active .hero-slide-images .shadow').addClass('animate__zoomOut');
    $('.slick-active .hero-slide-images .vegetables').addClass('animate__zoomOut');


    setProgress(nextSlide);
});

slider.slick({
    dots: false,
    dotsClass: "hero-dots",
    arrows: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    prevArrow: prevArrow,
    nextArrow: nextArrow,
});



export { createSlides, setProgress, createArrows };

