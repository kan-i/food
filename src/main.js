import './styles/reset.css';
import './styles/styles.css';


import './styles/sass/vars.sass';
import './styles/sass/style.sass';
import './styles/sass/banner.sass';
import './styles/sass/bestsellers.sass';
import './styles/sass/cart.sass';
import './styles/sass/catalog.sass';
import './styles/sass/footer.sass';
import './styles/sass/header.sass';
import './styles/sass/hero.sass';
import './styles/sass/menu.sass';
import './styles/sass/modal-menu.sass';
import './styles/sass/modal.sass';
import './styles/sass/range.sass';
import './styles/sass/select.sass';
import './styles/sass/slick-settings.sass';




import '../node_modules/slick-carousel/slick/slick.min';
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import getData from './modules/getData';
import random from './modules/randomData';
import { createSlides, setProgress, createArrows } from './modules/heroSlider';
import sortCards from './modules/sortCards';
import { createSlideMenu, filterData } from './modules/menuSlider';
import { openModalCard } from './modules/openModalCards';
import createSlidePopular from './modules/bestsellerSlider';
import select from './modules/select';
import renderCards from './modules/renderCards';
import cart from './modules/cart';


window.addEventListener('DOMContentLoaded', () => {
    "use strict";

    getData('db/catalog.json')
        .then(data => {
            random(data);
            data.forEach(createSlidePopular);
            sortCards(data);
            renderCards(data);
            filterData(data);
            openModalCard(data);


        })

    getData('db/menu.json')
        .then(data => {
            data.forEach(createSlideMenu);

        })


    getData('db/hero.json')
        .then(function (data) {
            data.forEach(createSlides);
            return data;
        })
        .then(() => {
            setProgress(0);
        })
        .then(() => {
            createArrows();
        })

    select();
    cart();

});




