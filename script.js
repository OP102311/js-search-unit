var originalPage;

var searchUnit;

/**
 * Initialization of searchUnit
 */
window.onload = function() {
    originalPage = document.getElementById("content").innerHTML;
    searchUnit = createInterface();
    document.body.appendChild(searchUnit);
}
/**
 * Shows or hides the search unit by pressing Ctrl+Alt+F
 */
document.addEventListener("keydown", function(event) {
    if ((event.ctrlKey) && (event.altKey) && (event.keyCode == 70)) {
        if (searchUnit!=null) {
            searchUnit.style.display = (searchUnit.style.display == 'none') ? '' : 'none';
            document.getElementById('search-input').focus();
        }
    }
});

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
    searchInput.setAttribute('onkeyup','searchText()');

    var searchCheckbox = document.createElement('input');
    searchCheckbox.type = 'checkbox';
    createCheckbox('match-case', 'match case');

    var searchNextButton = document.createElement('input');
    searchNextButton.type = 'button';
    searchNextButton.value = 'Next';

    var searchPreviousButton = document.createElement('input');
    searchPreviousButton.type = 'button';
    searchPreviousButton.value = 'Previous';

    var closeButton = document.createElement('input');
    closeButton.type = 'button';
    closeButton.value = 'Close';

    searchUnit.appendChild(searchInput);
    searchUnit.appendChild(createCheckbox('match-case', 'match case'));
    searchUnit.appendChild(createCheckbox('whole-word', 'whole word'));
    searchUnit.appendChild(createCheckbox('regular-exp', 'regular expression'));
    searchUnit.appendChild(searchNextButton);
    searchUnit.appendChild(searchPreviousButton);
    searchUnit.appendChild(closeButton);

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
 * Finds and highlights the search result
 */
function searchText() {
    var element = document.getElementById("content");
    element = restorePage(element);
    var tempinnerHTML = element.innerHTML;

    var searchString = document.getElementById('search-input').value;

    if (searchString!='') {
        element.innerHTML = tempinnerHTML.replace(/>([^<]*)?([^>]*)?</gi, replacer);
        function replacer(str) {
            var regex = new RegExp(searchString, "g");
            var result = str.replace(regex, '<span style="background:#FFFF00;">'+searchString+'</span>');
            return result;
        }
    }
}

/**
 * Restores page from the source
 * @param element
 * @returns {*}
 */
function restorePage(element)
{
    element.innerHTML = originalPage;
    return element;
}
