import { decdig } from './openModalCards';

const cart = () => {

    const cartPage = document.querySelector('.cart-page'),
        cartItems = document.querySelector('.cart-items'),
        headerCart = document.querySelector('.header-cart'),
        cartClose = document.querySelector('.cart_close'),
        cartSum = document.querySelector('.cart-footer_sum--bold'),
        headerCartSum = document.querySelector('.header-cart_sum'),
        headerCartIcon = document.querySelector('.header-cart_icon'),
        cartFooter = document.querySelector('.cart-footer'),
        cartWrapper = document.querySelector('.cart-wrapper'),
        body = document.querySelector('body'),
        heroSocialLinks = document.querySelector('.hero-social');
    const cart = [];


    const saveCart = function () {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    function loadCart() {
        if (localStorage.getItem('cart')) {
            JSON.parse(localStorage.getItem('cart')).forEach(function (item) {
                cart.push(item);
            });
        }
        const totalPrice = cart.reduce(function (result, item) {
            return result + (parseFloat(item.price) * item.count);
        }, 0);
        headerCartSum.textContent = decdig(totalPrice) + ' ₽';
    }

    loadCart();

    function fixedCartFooter() {
        cartPage.addEventListener('scroll', () => {
            let coordsCartFooter = cartFooter.getBoundingClientRect();
            if (document.documentElement.clientWidth > 768) {
                if (cartPage.scrollTop > cartWrapper.offsetTop + header.offsetHeight) {
                    cartPage.style.animationFillMode = 'none';
                    cartFooter.style.width = cartFooter.offsetWidth + 'px';
                    cartFooter.style.left = coordsCartFooter.left + 'px';
                    cartFooter.style.top = header.offsetHeight + 'px';
                    cartFooter.classList.add('fixed');
                } else {
                    cartPage.style.animationFillMode = 'both';
                    cartFooter.style.width = '';
                    cartFooter.style.left = '';
                    cartFooter.style.top = '';
                    cartFooter.classList.remove('fixed');
                }
            }
        })

    }

    function openCart() {
        let cardPage = document.querySelector('.card-page');
        if (cardPage) {
            cardPage.classList.add('animate__fadeOutDown');
            document.addEventListener('scroll', () => {
                if (pageYOffset < document.documentElement.clientHeight) {
                    document.querySelector('.header').style.background = 'transparent';
                } else {
                    document.querySelector('.header').style.background = 'linear-gradient(131.41deg, #151515 -8.5%, #3A3A3A 112%)';
                }
            });
        }
        let cartPage = document.querySelector('.cart-page');
        cartPage.classList.remove('animate__fadeOutUp');
        cartPage.classList.add('animate__fadeInDown');
        cartPage.style.display = "block";
        body.style.overflow = 'hidden';
        heroSocialLinks.style.zIndex = 0;
        if (pageYOffset < document.documentElement.clientHeight) {
            document.querySelector('.header').style.background = 'linear-gradient(131.41deg, #151515 -8.5%, #3A3A3A 112%)';
        }
        fixedCartFooter();

    }

    function closeCart() {
        if (pageYOffset < document.documentElement.clientHeight) {
            document.querySelector('.header').style.background = 'transparent';
        }
        cartPage.style.animationFillMode = 'both';
        body.style.overflow = "";
        cartPage.classList.remove('animate__fadeInDown');
        cartPage.classList.add('animate__fadeOutUp');
        heroSocialLinks.style.zIndex = '';
    }

    function addToCart(event) {
        const target = event.target;
        const buttonAddToCart = target.closest('.button-add-cart');
        const card = target.closest('.card');
        if (buttonAddToCart) {

            const circleBtn = buttonAddToCart.querySelector('.circle-button');
            changeBtn(buttonAddToCart);
            setTimeout(() => {
                flyToElement(circleBtn, headerCartIcon);
            }, 500);
            setTimeout(() => {
                changeBtnBack(buttonAddToCart)
            }, 1000);

            const card = target.closest('.card');
            const cardTitle = card.querySelector('#title').textContent;
            const price = card.querySelector('#price').textContent;
            const image = card.querySelector('#image').getAttribute('src');
            const id = card.id;
            const food = cart.find((item) => {
                return item.id === id;
            })

            if (food) {
                food.count += 1;
            } else {
                cart.push({
                    id,
                    cardTitle,
                    price,
                    image,
                    count: 1
                });
            }
        }

        saveCart();
        const totalPrice = cart.reduce(function (result, item) {
            return result + (parseFloat(item.price) * item.count);
        }, 0);

        setTimeout(() => {
            headerCartSum.textContent = decdig(totalPrice) + ' ₽';
        }, 1000);

    }

    function changeBtn(elem) {
        elem.style.color = 'transparent';
        elem.querySelector('.circle-button').style.cssText = `
        width: 41px;
        border-radius: 50%;
    `;
        elem.querySelectorAll('path').forEach(item => {
            item.style.stroke = '#fff';
        })
    }

    function changeBtnBack(elem) {
        elem.style.color = '';
        elem.querySelector('.circle-button').style.cssText = ``;
        elem.querySelectorAll('path').forEach(item => {
            item.style.stroke = '';
        })
    }

    function renderCart() {
        cartItems.textContent = "";
        cart.forEach(function ({
            cardTitle,
            price,
            id,
            count,
            image
        }) {
            const itemCart = `
            <div class="cart-item">
                <figure class="cart-item_figure">
                    <img src="${image}" alt="${cardTitle}" class="cart-item_img">
                </figure>
                <div class="cart-item-wrapper">
                    <h4 class="cart-item_title">${cardTitle}</h4>
                    <div class="cart-item_counter">
                        <span class="minus counter-button" data-id="${id}">
                            <svg viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 10L0 10" />
                            </svg>
                        </span>
                        <span class="count">${count}</span>
                        <span class="plus counter-button" data-id="${id}">
                            <svg viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 10L0 10" />
                                <path d="M10 20L10 0" />
                            </svg>
                        </span>
                    </div>
                    <div class="cart-item_price">${decdig((parseFloat(price) * count)) + ' ₽'}</div>
                </div>
            </div>
      `;
            cartItems.insertAdjacentHTML('afterbegin', itemCart)
        });
        const totalPrice = cart.reduce(function (result, item) {
            return result + (parseFloat(item.price) * item.count);
        }, 0);
        cartSum.textContent = decdig(totalPrice) + ' ₽';

    }

    function changeCount(event) {
        const target = event.target;
        if (target.closest('.counter-button')) {
            const food = cart.find(function (item) {
                return item.id === target.closest('.counter-button').dataset.id;
            });
            if (target.closest('.minus')) {
                food.count--;
                if (food.count === 0) {
                    cart.splice(cart.indexOf(food), 1);
                }
            }
            if (target.closest('.plus')) {
                food.count++;
            }
            renderCart();
        }
        saveCart();

    }

    function flyToElement(flyer, flyingTo) {
        var $func = $(this);
        var divider = 3;
        var flyerClone = $(flyer).clone();
        var path = $(flyerClone).find('path').css({
            stroke: '#fff',
        });
        let plus = $(flyerClone).find('.card-text_button_icon');

        $(flyerClone).css({
            width: '41px',
            height: '41px',
            borderRadius: '100%',
            top: $(flyer).offset().top + "px",
            left: $(flyer).offset().left + "px",
            opacity: 1,
            'z-index': 1000
        });
        $('body').append($(flyerClone));
        var gotoX = $(flyingTo).offset().left + ($(flyingTo).width() / 2) - ($(flyer).width() / divider) / 2;
        var gotoY = $(flyingTo).offset().top + ($(flyingTo).height() / 2) - ($(flyer).height() / divider) / 2;

        $(flyerClone).animate({
            opacity: 0.4,
            left: gotoX,
            top: gotoY,
            width: $(flyer).width() / divider,
            height: $(flyer).height() / divider
        }, 0,
            function () {
                $(flyingTo).fadeOut('fast', function () {
                    $(flyingTo).fadeIn('fast', function () {
                        $(flyerClone).fadeOut('fast', function () {
                            $(flyerClone).remove();
                        });
                    });
                });
            });
        $(plus).animate({
            width: 0,
            height: 0
        }, 0);
    }

    document.addEventListener('click', addToCart);
    headerCart.addEventListener('click', function () {
        openCart();
        renderCart();
    })

    cartClose.addEventListener('click', function () {
        closeCart();
    })

    cartPage.addEventListener('click', changeCount);

}

export default cart;