(function(){
    var originalPage;
    var searchUnit;

    /**
     * Initialization of searchUnit
     */
    window.onload = function() {
        originalPage = document.getElementById("content").innerHTML;
        searchUnit = createInterface();
        document.body.appendChild(searchUnit);
    };

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
        searchUnit.style.cssText = 'background-color:#F0F8FA; border:1px solid #AABBCC; padding:5px; position:fixed; top:0em; left:0.5em; display:none;';

        searchUnit.appendChild(createInput('search-input', 'text', 'images/search.png', function(e) {
            searchText();
            e.preventDefault();
        }));
        searchUnit.appendChild(createCheckbox('match-case', 'match case'));
        searchUnit.appendChild(createCheckbox('whole-word', 'whole word'));
        searchUnit.appendChild(createCheckbox('regular-exp', 'regular expression'));
        searchUnit.appendChild(createInput('search-prev', 'image', 'images/arrow-up.png', function (e) {
            selectMatch(-1);
            e.preventDefault();
        }));
        searchUnit.appendChild(createInput('search-next', 'image', 'images/arrow-down.png', function (e) {
            selectMatch(1);
            e.preventDefault();
        }));
        searchUnit.appendChild(createInput('search-close', 'image', 'images/close.png', function (e) {
            var searchUnit = document.getElementById('search-unit');
            searchUnit.style.display = (searchUnit.style.display == 'none') ? '' : 'none';
            e.preventDefault();
        }));

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
     * Creates input element
     * @param id
     * @param type
     * @param img
     * @param handler
     * @returns {Element}
     */
    function createInput(id, type, img, handler) {
        var input = document.createElement('input');
        input.id = id;
        input.type = type;
        if (type == 'text') {
            input.style.cssText = "padding-right: 16px; margin-right: 14px; background: url(" + img + ") 100% 50% no-repeat scroll;";
            input.onkeyup = handler;
        } else {
            input.src = img;
            input.style.cssText = 'vertical-align: middle; padding: 3px;';
            input.onclick = handler;
        }
        return input;
    }

    /**
     * Finds and highlights the search result
     */
    function searchText(){
        var searchString = document.getElementById('search-input').value;
        var element = document.getElementById("content");
        element = restorePage(element);
        if (searchString!='') {
            highlightMatches(element, searchString, function(node, match) {
                var span = document.createElement("span");
                span.className = "search-match";
                span.style.background = "#FFFF00";
                span.textContent = match;
                return span;
            });
        }
    }

    /**
     * Traverse and replace all matches of search phrase
     * @param node
     * @param searchString
     * @param handler
     * @param excludeElements
     * @returns {*}
     */
    var highlightMatches = function(node, searchString, handler, excludeElements) {
        var child = node.firstChild;
        while (child) {
            switch (child.nodeType) {
                case 1:
                    highlightMatches(child, searchString, handler, excludeElements);
                    break;
                case 3:
                    var diff = 0;
                    child.data.replace(new RegExp(searchString, 'g'), function(all) {
                        var args = [].slice.call(arguments),
                            offset = args[args.length - 2],
                            newTextNode = child.splitText(offset+diff), tag;
                        diff -= child.data.length + all.length;

                        newTextNode.data = newTextNode.data.substr(all.length);
                        tag = handler.apply(window, [child].concat(args));
                        child.parentNode.insertBefore(tag, newTextNode);
                        child = newTextNode;
                    });
                    break;
            }
            child = child.nextSibling;
        }
        return node;
    };

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
     * Focuses on next/previous search match
     * @param offset
     */
    function selectMatch(offset) {
        var matchesArray = document.getElementsByClassName('search-match');
        if (matchesArray.length > 1) {
            //Можно сделать обход в одном цикле
            var matchIndex = -1;
            for (var i = 0; i < matchesArray.length; i++) {
                if (matchesArray[i].id == 'match-selected') {
                    matchIndex = i;
                    matchesArray[i].id = '';
                    break;
                }
            }

            matchIndex += offset;
            matchIndex = matchIndex > 0 ? matchIndex % matchesArray.length : 0;
            matchesArray[matchIndex].scrollIntoView(false);
            matchesArray[matchIndex].id = 'match-selected';

            for (var i = 0; i < matchesArray.length; i++) {
                matchesArray[i].style.cssText += (matchIndex == i)
                    ? 'background:#B0B04A; color:#FFFFFF;'
                    : 'background:#FFFF00; color:#000000;';
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
}());