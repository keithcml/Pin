'use-strict'

$(document).ready(ready());

let timer;

// document ready, run the following listeners
function ready() {

    // autofocus for first input field, works in ios UIWebView
    $("#1").focus();

    // listeners
    $(".input-pin").keyup(function() {
                            pinKeyup($(this));
                          });
    $(".input-pin").focus(function() {
                            pinFocus($(this));
                          });
    $(".input-pin").keydown(function() {
                                pinKeydown($(this));
                            });
    $(".input-pin").focusout(function() {
                                pinFocusOut($(this));
                            });
}

// ensure clearing input value before new value
function pinKeydown(thisObj) {
    thisObj.attr("data-content", "");
    thisObj.val("")
    clearTimeout(timer);
}

// call when new value set on input field
function pinKeyup(thisObj) {
    var position = parseInt(thisObj.attr("id"))
    
    var textLength = thisObj.val().length;
    
    // assign input field value to custom attribute "data-content"
    thisObj.attr("data-content", thisObj.val());

    // handling input field switch after assigning value;
    // if value exists, go to next field or end input;
    // if value is empty, go to previous field due to user tap backspace
    if (textLength > 0) {
        // set timer for changing digit to "●"
        let element = thisObj;
        const timeoutFunction = () => {
            element.val("●");
        }
        timer = setTimeout(timeoutFunction, 500);
        
        if (position > 5) {
            thisObj.blur();

            // Finished 6th digit inpit, it should automatically continue
            // printPin();
        } else {
            let nextInput = thisObj.next("input");
            if (nextInput.val().length == 0) {
                // slow in ios UIWebView, fast in ios WKWebView
                nextInput.focus();
            }
        }
    } else {
        if (position > 1) {
            let prevInput = thisObj.prev("input");
            prevInput.focus();
        }
    }
}

// every focus clear input field value
function pinFocus(thisObj) {
    thisObj.attr("data-content", "");
    thisObj.val("")
}

// mask the pin code with delay 0.5 second after focus out
function pinFocusOut(thisObj) {
    var textLength = thisObj.val().length;
    if (textLength > 0) {
        let element = thisObj;
        const timeoutFunction = () => {
            element.val("●");
        }
        timer = setTimeout(timeoutFunction, 500);
    }
    printPin()
}

// Print Pin
function printPin() {
    let pin = document.getElementById("1").getAttribute("data-content") + document.getElementById("2").getAttribute("data-content") +
    document.getElementById("3").getAttribute("data-content") + document.getElementById("4").getAttribute("data-content") +
    document.getElementById("5").getAttribute("data-content") + document.getElementById("6").getAttribute("data-content");
    
    console.log(pin);
}
                 

