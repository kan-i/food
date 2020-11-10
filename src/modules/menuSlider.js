import renderCards from './renderCards';
import sortCards from './sortCards';

let menu = $('.menu-slider');

menu.on('init reInit', function (event, slick) {
    var amount = slick.slideCount;
    $('#range').attr('max', amount);
})

menu.on('afterChange', function (e, slick, currentSlide) {
    $('#range').val(currentSlide + 1);
})

$('#range').on('input change', function () {
    menu.slick('slickGoTo', this.value - 1);
});


menu.slick({
    variableWidth: true,
    centerMode: true,
    centerPadding: '20px 0px 0px 0px',
    slidesToShow: 7,
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
            slidesToShow: 4,
            arrows: false
        }
    }]
})

const createSlideMenu = function ({
    id,
    name,
    image
}) {
    const slide = `
        <div class="menu-slide" id="${id}">
            <img src="${image}" alt="${name}" class="menu-slide_img">
            <h3 class="menu-slide_title">${name}</h3>
        </div>
    `;
    menu.slick('slickAdd', `${slide}`);
}


const filterData = data => {
    menu.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        let idCategory = menu.slick('getSlick').$slides[nextSlide].id;
        let newData = data.filter(element => {
            if (element.category.includes(idCategory)) {
                return element;
            }
        });
        renderCards(newData);
        sortCards(newData);
    })
}

export { createSlideMenu, filterData };