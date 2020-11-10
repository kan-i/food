const select = () => {

    let inputSelect = document.querySelectorAll(".select-box");
    let lengthInputSelect = inputSelect.length;
    let selectElement, seliectElementLength, selectSelelected, selectItems, c;

    function closeAllSelect(elmnt) {
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }

    function openOptions(e) {
        let y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                yl = y.length;
                for (k = 0; k < yl; k++) {
                    y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                // if (this.getAttribute('value') == 1) {
                //     sortCards(this.getAttribute('value'));
                // }
                // if (this.getAttribute('value') == 0) {
                //     sortCards(this.getAttribute('value'));
                // }
                break;
            }
        }
        h.click();
    }

    function showSelect(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");

    }

    for (let i = 0; i < lengthInputSelect; i++) {

        selectElement = inputSelect[i].getElementsByTagName("select")[0];
        seliectElementLength = selectElement.length;


        selectSelelected = document.createElement("DIV");
        selectSelelected.setAttribute("class", "select-selected");
        selectSelelected.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
        inputSelect[i].appendChild(selectSelelected);

        selectItems = document.createElement("DIV");
        selectItems.setAttribute("class", "select-items select-hide");
        for (let j = 1; j < seliectElementLength; j++) {

            c = document.createElement("DIV");
            c.innerHTML = selectElement.options[j].innerHTML;
            c.setAttribute('value', `${selectElement.options[j].value}`);
            c.addEventListener("click", openOptions);
            selectItems.appendChild(c);

        }
        inputSelect[i].appendChild(selectItems);
        selectSelelected.addEventListener("click", showSelect);
    }

    document.addEventListener("click", closeAllSelect);

}

export default select;