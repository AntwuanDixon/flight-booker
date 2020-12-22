// import datepicker from 'js-datepicker';
// const datepicker = require('js-datepicker')
// const picker = datepicker(selector, options)
// console.log(picker);

const flightType = document.querySelector('#flight-type');
const departDate = document.querySelector('#depart-date');

giveDefaultDate(departDate);
const returnDate = document.querySelector('#return-date');
giveDefaultDate(returnDate);
const flightOption = document.querySelector('.flight-option');
const bookBtn = document.querySelector('#book-btn');
toggleReturnInput();
let departDateUTC = new Date (departDate.value);


function giveDefaultDate (field) {
    let d = new Date();
    field.defaultValue = d.getFullYear() + "-" + (d.getMonth() + 1) + '-' + d.getDate();
}

bookBtn.addEventListener('click', () => {
    function makeFlightMessage() {
        let flightTypePure = flightType.options[flightType.selectedIndex].text.toLowerCase();
        if (flightTypePure === 'round trip') {
            let flightMessage = "Your " + flightTypePure + " flight was successfully booked." + "\nDeparting: " + departDate.value + "\nReturning: " + returnDate.value;
            return flightMessage;
        } else {
            let flightMessage = "Your " + flightTypePure + " flight was successfully booked." + "\nDeparting: " + departDate.value;
            return flightMessage;
        }
    }
    alert(makeFlightMessage())
});

flightType.addEventListener('change', () => {
    toggleReturnInput();
    checkDateLogic();
})

departDate.addEventListener('input', () => {  
    checkDateFormat(departDate);
})

returnDate.addEventListener('input', () => {
    checkDateFormat(returnDate);
})

function toggleReturnInput () {
    let opt;
    for (let i = 0; i < flightType.options.length; i++) {
        opt = flightType.options[i];
        if (opt.selected === true) {
            break;
        }
    }
    if (opt.value === 'one-way') {
        returnDate.disabled = true;
    } else {
        returnDate.disabled = false;
    }
}

function checkDateFormat(date) {
    let dateUTC = convertToUTC(date);
    if (Object.prototype.toString.call(dateUTC) === "[object Date]") {
        if (isNaN(dateUTC.getTime())) {
            console.log('button disabled');
            bookBtn.disabled = true;
            date.style.backgroundColor = '#ff9d9d';
            
        } else {
            bookBtn.disabled = false;
            date.style.backgroundColor = 'white';
            checkDateIsFuture(dateUTC);
        }
      } else {
        bookBtn.disabled = true;
        date.style.backgroundColor = '#ff9d9d';
      }
}

function convertToUTC(date) {
    let dateUTC = new Date(date.value);
    return dateUTC;
}

function checkDateLogic() {
    let flightTypePure = flightType.options[flightType.selectedIndex].text.toLowerCase();
    if (flightTypePure === 'round trip') {
        if (convertToUTC(departDate) > convertToUTC(returnDate)) {
            bookBtn.disabled = true;
            console.log("Error! Depart date is after return date.")
        } else {
            bookBtn.disabled = false;
        }
    }
}

function checkDateIsFuture(date) {
    let today = new Date();
    let todayNoTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let dateNoTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (dateNoTime < todayNoTime) {
        bookBtn.disabled = true;
    } else {
        bookBtn.disabled = false;
        checkDateLogic();
    }
}