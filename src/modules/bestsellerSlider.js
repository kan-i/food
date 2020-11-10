const bestsellersSlider = $('.bestsellers-slider');
const bestsellersRange = $('#bestsellers-range');

bestsellersSlider.on('init reInit', function (event, slick) {
    var amount = slick.slideCount;
    bestsellersRange.attr('max', amount);
});

bestsellersSlider.on('afterChange', function (e, slick, currentSlide) {
    bestsellersRange.val(currentSlide + 1);
});

bestsellersRange.on('input change', function () {
    bestsellersSlider.slick('slickGoTo', this.value - 1);
});

bestsellersSlider.slick({
    variableWidth: true,
    centerPadding: '35px 50px 35px 50px',
    centerMode: true,
    slidesToShow: 1,
    prevArrow: `<button class="menu_button menu_button--prev">
                    <svg class="menu_arrow" width="18" height="35" viewBox="0 0 18 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="menu_arrow-path" d="M17.5 1.00061L1 17.5006L17.5 34.0006"/>
                    </svg>
                </button>`,
    nextArrow: `<button class="menu_button menu_button--next">
                    <svg class="menu_arrow" width="19" height="35" viewBox="0 0 19 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="menu_arrow-path" d="M1 34.0006L17.5 17.5006L1 1.00061"/>
                    </svg>
                 </button>`,
    dots: false,
    focusOnSelect: true,
    responsive: [{
        breakpoint: 800,
        settings: {
            slidesToShow: 1,
            arrows: false
        }
    }]
});

const createSlidePopular = function ({
    id,
    name,
    img,
    description,
    price,
    popular,
}) {
    const slide = `
    <div id="${id}" class="bestsellers-slide card">
        <img src="${img}" alt="${name}" class="bestsellers-slide_img" id="image">
        <div class="bestsellers-slide-text">
            <h3 class="bestsellers-slide-text_title" id="title">${name}</h3>
            <p class="bestsellers-slide-text_description">${description}</p>
            <div class = "card-footer">
                <span class="bestsellers-slide-text_price" id="price">${price} ₽</span>
                <button class="bestsellers-slide-text_button card-text_button button-add-cart">
                    <div class="circle-button">
                        <svg class="card-text_button_icon" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 10L0 10" />
                            <path d="M10 20L10 0" />
                        </svg>
                    </div>
                    Добавить в корзину
                </button>
            </div>
        </div>
    </div>
    `;
    if (popular === true) {
        bestsellersSlider.slick('slickAdd', `${slide}`);
    }
}

export default createSlidePopular;