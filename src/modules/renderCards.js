const renderCards = data => {

    // function shuffle(arr) {
    //     var j, temp;
    //     for (var i = arr.length - 1; i > 0; i--) {
    //         j = Math.floor(Math.random() * (i + 1));
    //         temp = arr[j];
    //         arr[j] = arr[i];
    //         arr[i] = temp;
    //     }
    //     return arr;
    // }
    // console.log(shuffle(data));


    let state = {
        'querySet': data,
        'page': 1,
        'rows': 12,
        'window': 3,
    }

    function scrollToTop() {
        document.querySelector('.sort').scrollIntoView({
            block: "start",
            behavior: "smooth"
        });
    }

    function pagination(querySet, page, rows) {
        var trimStart = (page - 1) * rows
        var trimEnd = trimStart + rows

        var trimmedData = querySet.slice(trimStart, trimEnd)

        var pages = Math.ceil(querySet.length / rows);
        let cardsLength = querySet.length;
        return {
            'querySet': trimmedData,
            'pages': pages,
            'cardsLength': cardsLength
        }
    }

    function pageButtons(pages) {
        var wrapper = document.querySelector('.pages');
        wrapper.innerHTML = ``;
        var maxLeft = (state.page - Math.floor(state.window / 2))
        var maxRight = (state.page + Math.floor(state.window / 2))

        if (maxLeft < 1) {
            maxLeft = 1
            maxRight = state.window
        }

        if (maxRight > pages) {
            maxLeft = pages - (state.window - 1)

            if (maxLeft < 1) {
                maxLeft = 1
            }
            maxRight = pages
        }


        for (var page = maxLeft; page <= maxRight; page++) {
            if (state.page == page) {
                wrapper.innerHTML += `<button value=${page} class="page active pages_link">${page}</button>`;
            } else {
                wrapper.innerHTML += `<button value=${page} class="page pages_link">${page}</button>`;
            }
        }

        // if (state.page != 1) {
        //     wrapper.innerHTML = `<button value=${1} class="pages_link page">Первая</button>` + wrapper.innerHTML
        // }

        // if (state.page != pages) {
        //     wrapper.innerHTML += `<button value=${pages} class="pages_link page">Последняя</button>`
        // }

        $('.page').on('click', function () {
            $('.cards').empty();
            state.page = Number($(this).val());
            buildCards();
            scrollToTop();
        })

    }

    function buildCards() {
        let table = document.querySelector('.cards');

        var data = pagination(state.querySet, state.page, state.rows, state.cardsLength);
        var myList = data.querySet;
        for (let i in myList) {
            var row = `
                <div id="${myList[i].id}" class="card catalog-card">
                    <picture>
                        <source srcset="${myList[i].img}" media="(min-width: 414px)">
                        <img src="${myList[i].imgMin}" alt="${myList[i].name}" class="card_img" id="image">
                    </picture>
                    <div class="card-text">
                        <h3 class="card-text_title" id="title">${myList[i].name}</h3>
                        <p class="card-text_description">${myList[i].description}</p>
                        <div class="card-footer">
                            <span class="card-text_price" id="price">${myList[i].price} ₽</span>
                            <button class="card-text_button button-add-cart">
                            <div class="circle-button">
                                <svg class="card-text_button_icon" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 10L0 10" />
                                    <path d="M10 20L10 0" />
                                </svg>
                            </div>
                            Добавить в корзину
                            </button>
                        <div>
                    </div>
                </div>
            `;
            table.insertAdjacentHTML('beforeend', row);
        }
        if (data.cardsLength > 12) {
            pageButtons(data.pages);
        } else {
            document.querySelector('.pages').textContent = '';
        }
    }
    document.querySelector('.cards').textContent = '';
    buildCards()
}


export default renderCards;