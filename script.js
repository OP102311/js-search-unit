/**
 * Creates a search unit interface
 * @returns {HTMLElement}
 */
function createInterface() {
    var searchUnit = document.createElement('div');
    searchUnit.id = "search-unit";

    var searchInput = document.createElement('input');
    searchInput.id = "search-input";
    searchInput.type = 'text';
    var searchCheckbox = document.createElement('input');
    searchCheckbox.type = 'checkbox';
    createCheckbox('match-case', 'match case');
    var searchNextButton = document.createElement('input');
    searchNextButton.type = 'button';
    searchNextButton.value = 'Next';
    var searchPreviousButton = document.createElement('input');
    searchPreviousButton.type = 'button';
    searchPreviousButton.value = 'Previous';

    document.body.appendChild(searchUnit);
    searchUnit.appendChild(searchInput);
    searchUnit.appendChild(createCheckbox('match-case', 'match case'));
    searchUnit.appendChild(createCheckbox('whole-word', 'whole word'));
    searchUnit.appendChild(createCheckbox('regular-exp', 'regular expression'));
    searchUnit.appendChild(searchNextButton);
    searchUnit.appendChild(searchPreviousButton);
    return searchUnit;
}

/**
 * Creates checkbox element
 * @param name
 * @param title
 * @returns {HTMLElement}
 */
function createCheckbox(name, title) {
    var checkbox = document.createElement('input');
    checkbox.name = name;
    checkbox.type = 'checkbox';
    var label = document.createElement('label');
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(title));
    return label;
}

/**
 * Shows or hides the search unit by pressing Ctrl+Alt+F
 */
document.addEventListener("keydown", function(event) {
    if ((event.ctrlKey) && (event.altKey) && (event.keyCode == 70)) {
        var searchUnit = document.getElementById('search-unit');
        if (searchUnit!=null) {
            searchUnit.style.display = (searchUnit.style.display == 'none') ? '' : 'none';
        } else {
            createInterface();
        }
        document.getElementById('search-input').focus();
    }
});