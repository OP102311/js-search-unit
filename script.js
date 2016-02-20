var originalPage;

var searchUnit;

var matchIndex = -1;
var matchesArray = [];
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
    searchUnit.style.backgroundColor = "#F0F8FA";
    searchUnit.style.border = "1px solid";
    searchUnit.style.borderColor = "#AABBCC";
    searchUnit.style.padding = "5px";
    searchUnit.style.position = "fixed";
    searchUnit.style.top = "0em";
    searchUnit.style.left = "0.5em";
    searchUnit.style.display = "none";

    var searchInput = document.createElement('input');
    searchInput.id = "search-input";
    searchInput.type = 'text';
    searchInput.style.background = "url(images/search.png) no-repeat scroll";
    searchInput.style.backgroundPosition = "right";
    searchInput.style.paddingRight = "16px";
    searchInput.style.marginRight = "14px";

    searchInput.setAttribute('onkeyup','searchText()');

    var searchCheckbox = document.createElement('input');
    searchCheckbox.type = 'checkbox';
    createCheckbox('match-case', 'match case');

    var searchNextButton = document.createElement('input');
    searchNextButton.type = 'image';
    searchNextButton.value = 'Next';
    searchNextButton.src = "images/arrow-down.png";
    searchNextButton.style.verticalAlign = "middle";
    searchNextButton.style.padding = "3px";
    searchNextButton.addEventListener('click', function (e) {
        selectMatch(1);
        e.preventDefault();
    }, false);

    var searchPreviousButton = document.createElement('input');
    searchPreviousButton.type = 'image';
    searchPreviousButton.value = 'Previous';
    searchPreviousButton.src = "images/arrow-up.png";
    searchPreviousButton.style.verticalAlign = "middle";
    searchPreviousButton.style.padding = "3px";
    searchPreviousButton.addEventListener('click', function (e) {
        selectMatch(-1);
        e.preventDefault();
    }, false);

    var closeButton = document.createElement('input');
    closeButton.type = 'image';
    closeButton.value = 'Close';
    closeButton.src = "images/close.png";
    closeButton.style.verticalAlign = "middle";
    closeButton.style.padding = "3px";
    closeButton.addEventListener('click', function (e) {
        searchUnit.style.display = (searchUnit.style.display == 'none') ? '' : 'none';
        e.preventDefault();
    }, false);

    searchUnit.appendChild(searchInput);
    searchUnit.appendChild(createCheckbox('match-case', 'match case'));
    searchUnit.appendChild(createCheckbox('whole-word', 'whole word'));
    searchUnit.appendChild(createCheckbox('regular-exp', 'regular expression'));
    searchUnit.appendChild(searchPreviousButton);
    searchUnit.appendChild(searchNextButton);
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
    checkbox.style.verticalAlign = "middle";

    var label = document.createElement('label');
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(title));
    label.style.verticalAlign = "middle";
    label.style.marginRight = "14px";
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
            var result = str.replace(regex, '<span class="search-match" style="background:#FFFF00;">'+searchString+'</span>');
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

/**
 * Prepares matches array
 */
function getAllMatches() {
    var container  = document.getElementById("content");
    matchesArray = container.getElementsByClassName("search-match");
}

/**
 * Focuses on next/previous search match
 * @param offset
 */
function selectMatch(offset) {
    getAllMatches();
    matchIndex += offset;
    matchIndex = matchIndex % matchesArray.length;
    matchesArray[matchIndex].scrollIntoView(false);

    for (var i = 0; i < matchesArray.length; i++) {
        if (matchIndex == i) {
            matchesArray[i].style.background = "#B0B04A";
            matchesArray[i].style.color = "#FFFFFF";
        } else {
            matchesArray[i].style.background = "#FFFF00";
            matchesArray[i].style.color = "#000000";
        }
    }
}

/**
 *
 * @param id
 * @returns {*}
 */
function getElementDisplayStyle(id) {
    var divElement = document.getElementById(id);
    var displayStyle;
    if (divElement) {
        if (window.getComputedStyle) {
            displayStyle = window.getComputedStyle(divElement, null).getPropertyValue('display');
        } else {
            displayStyle = divElement.currentStyle.display;
        }
    }
    return displayStyle;
}