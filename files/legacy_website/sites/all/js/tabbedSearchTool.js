determineFocus('bookSearch');

var defaultId = 'bookSearch';
var previousForm = document.getElementById(defaultId);

function activateTabByObj(obj, searchForm) {
    searchElem = document.getElementById(searchForm);

    var tabObj = document.getElementById("tablist");
    var tabObjLI = tabObj.getElementsByTagName("li");
    
    for (i = 0; i < tabObjLI.length; i++) {
        tabObjLI[i].className = "";
        previousForm.style.display = 'none';
    }
    
    obj.className = "active";
    searchElem.style.display = 'block';
    previousForm = searchElem;
    
    determineFocus(searchForm);    
}

function determineFocus(formname)
{
    for (i=0; i<=document.forms[formname].elements.length; i++) {
        if (document.forms[formname].elements[i].type == "text") {
            document.forms[formname].elements[i].focus();
            break;
        }
    }
}