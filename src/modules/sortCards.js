import renderCards from './renderCards';

const sortCards = data => {
    document.addEventListener('click', e => {
        if (e.target.closest('.select-box') && e.target.getAttribute('value') == 1) {
            renderCards(data.sort((a, b) => a.price - b.price));
        }
        if (e.target.closest('.select-box') && e.target.getAttribute('value') == 0) {
            renderCards(data.sort((a, b) => b.price - a.price));
        }
    })
}

export default sortCards;