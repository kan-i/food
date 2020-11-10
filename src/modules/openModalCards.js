const body = document.querySelector('body'),
    modalMenu = document.querySelector('.modal-menu');

const openModalCard = data => {

    function handlerHeader() {
        if (pageYOffset < document.documentElement.clientHeight) {
            document.querySelector('.header').style.background = 'transparent';
        } else {
            document.querySelector('.header').style.background = 'linear-gradient(131.41deg, #151515 -8.5%, #3A3A3A 112%)';
        }
    }

    function createCardModal({
        id,
        name,
        description,
        indigrients,
        price,
        img,
        imgMin
    }) {
        let cardPage = document.createElement('div');
        cardPage.className = 'card-page animate__fadeInUp animate__animated';
        cardPage.innerHTML = `
            <div class="container">
                <div class="modal card" id="${id}">

                    <picture class="modal-figure">
                        <source srcset="${img}" media="(min-width: 414px)">
                        <img src="${imgMin}" alt="${name}" class="modal-figure_img" id="image">
                    </picture> 

                    <div class="modal-text">
                        <h2 class="modal-text_title" id="title">${name}</h2>
                        <p class="modal-text_description">${description}</p>
                        <p class="modal-text_indigrients">
                            <span class="modal-text_indigrients--title">Состав</span>
                            ${indigrients}
                        </p>
                        <footer class="modal-text-footer">
                            <button class="modal-text-footer_button card-text_button button-add-cart">
                            <div class="circle-button">
                                <svg class="card-text_button_icon" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 10L0 10" />
                                    <path d="M10 20L10 0" />
                                </svg>
                            </div>
                            Добавить в корзину
                            </button>
                            <span class="modal-text-footer_price" id="price">${price} ₽</span>
                        </footer>
                    </div>
                    <button class="modal_close"></button>
                </div>
            </div>
        `;
        body.insertAdjacentElement('beforeend', cardPage);
        cardPage.addEventListener('click', closeCardModal);
    }

    function closeCardModal(e) {
        if (e.target.closest('.modal_close')) {
            let cardPage = document.querySelector('.card-page');
            cardPage.classList.add('animate__fadeOutDown');
            body.style.overflow = '';
            document.addEventListener('scroll', handlerHeader);
        }
    }

    document.addEventListener('scroll', handlerHeader);

    document.querySelector('.modal-menu_btn').addEventListener('click', () => {
        modalMenu.classList.remove('animate__fadeInDown');
        modalMenu.classList.add('animate__fadeOutUp');
        body.style.overflow = '';
    });

    document.addEventListener('click', e => {
        if (e.target.classList.contains('card_img') || e.target.classList.contains('card-text_title') || e.target.classList.contains('bestsellers-slide_img') || e.target.classList.contains('bestsellers-slide-text_title')) {
            let idCard = e.target.closest('.card').getAttribute('id');
            let cardData = data.find(el => {
                if (el.id == idCard) {
                    return el;
                }
            });
            body.style.overflow = 'hidden';
            if (document.querySelector('.card-page')) {
                document.querySelector('.card-page').remove();
            }
            createCardModal(cardData);
            document.querySelector('.header').style.background = 'linear-gradient(131.41deg, #151515 -8.5%, #3A3A3A 112%)';
            document.removeEventListener('scroll', handlerHeader);

        }
        if (e.target.closest('.header-menu')) {
            if (modalMenu.classList.contains('animate__fadeOutUp')) {
                modalMenu.classList.remove('animate__fadeOutUp');
            }
            modalMenu.style.display = 'block';
            modalMenu.classList.add('animate__fadeInDown');
            body.style.overflow = 'hidden';

        }

    })

}



const decdig = strNum => {
    strNum = ('' + strNum).split(' ').join('');
    return strNum
        .split('')
        .reverse()
        .join('')
        .match(/\d\d?\d?/g)
        .map(function (el) {
            return el.split('').reverse().join('');
        })
        .reverse()
        .join(' ');
}

export { decdig, openModalCard };