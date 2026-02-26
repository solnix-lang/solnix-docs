function setPlaceholder() {
    const searchInput = document.querySelector(".md-search__input");
    if (searchInput) {
        searchInput.placeholder = "search in solnix";
        searchInput.setAttribute("aria-label", "search in solnix");
    }
}

document.addEventListener("DOMContentLoaded", setPlaceholder);

setTimeout(setPlaceholder, 500);
setTimeout(setPlaceholder, 1000);
setTimeout(setPlaceholder, 2000);
