const dateInput = document.querySelector("#date-input");
const checkButton = document.querySelector("#check-button");
const output = document.querySelector(".output");
const delayGif = document.querySelector("#delay-gif");
const privacyMsg = document.querySelector(".privacy-notice");
const closeButton = document.querySelector("#close-button");


delayGif.style.display = "none";
output.style.display = "none";
privacyMsg.style.display = "block";

const date_formats = ['ddmmyyyy', 'mmddyyyy', 'yyyymmdd', 'ddmmyy', 'mmddyy', 'yymmdd'];

function reverseString(str) {
    // var charArray = str.split('');
    // var reverseCharArray = charArray.reverse();
    // var reversedStr = reverseCharArray.join('');

    var reversedStr = str.split('').reverse().join('');
    return reversedStr;
}

function isPalindrome(str) {
    var reversedStr = reverseString(str);
    return str == reversedStr;
}

function dateToString(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    };

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = '' + date.day;
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = '' + date.month;
    }

    dateStr.year = '' + date.year;

    return dateStr;
}

function getDateFormats(date) {

    var dateStr = dateToString(date);
    var allDateFormats = [];

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    allDateFormats.push(ddmmyyyy);
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    allDateFormats.push(mmddyyyy);
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    allDateFormats.push(yyyymmdd);
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(2, 4);
    allDateFormats.push(ddmmyy);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(2, 4);
    allDateFormats.push(mmddyy);
    var yymmdd = dateStr.year.slice(2, 4) + dateStr.month + dateStr.day;
    allDateFormats.push(yymmdd);

    return allDateFormats;
}

function checkPalindromeAllFormats(date) {
    const allDateFormats = getDateFormats(date);
    let flag = false;
    for (var i = 0; i < allDateFormats.length; i++) {
        var dateFormat = allDateFormats[i];
        if (isPalindrome(dateFormat)) {
            flag = true;
            break;
        }
    }
    return [flag,dateFormat,i];
}

function isLeapYear(year) {
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        return true;
    } else {
        return false;
    }
}

function getNextDate(date) { //31 - 12 - 2017

    var day = date.day + 1; //32
    var month = date.month; //3
    var year = date.year; //2012

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //feb check
    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month += 1;
            }
        } else {
            if (day > 28) {
                day = 1;
                month += 1;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month += 1; // 1 - 4 -2012
        }
    }

    if (month > 12) {
        month = 1;
        year += 1;
    }
    return {
        day: day,
        month: month,
        year: year
    }

}


function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month == 1 && day < 1) {
        day = 31;
        month = 12;
        year -= 1;
    } else if (month === 3) {
        if (isLeapYear(year)) {
            if (day < 1) {
                day = 29;
                month -= 1;
            }
        } else {
            if (day < 1) {
                day = 28;
                month -= 1;
            }
        }
    } else {
        if (day < 1 && daysInMonth[month - 2] >= 0) { //  01/05/2015 - 1 = (dayInMonth(month-2) (5-2=3/4))/04/2015
            day = daysInMonth[month - 2];
            month -= 1;
        }
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date) {
    let cnt = 0;
    let nextDate = getNextDate(date);
    let result = {
        day: '',
        month: '',
        year: '',
        cnt: '',
        dateFormat: '',
        i:0
    };

    while (1) {
        cnt++;
        var nextArr = checkPalindromeAllFormats(nextDate);
        if (nextArr[0]) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    result.day = '' + nextDate.day;
    result.month = '' + nextDate.month;
    result.year = '' + nextDate.year;
    result.cnt = '' + cnt;
    result.dateFormat = nextArr[1];
    result.i = nextArr[2];

    return result;
}

function getPreviousPalindromeDate(date) {
    let c = 0;
    let previousDate = getPreviousDate(date);
    let result = {
        day: '',
        month: '',
        year: '',
        cnt: '',
        dateFormat: '',
        i:0
    };

    while (1) {
        c++;
        var preArr = checkPalindromeAllFormats(previousDate);
        if (preArr[0]) {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }

    result.day = '' + previousDate.day;
    result.month = '' + previousDate.month;
    result.year = '' + previousDate.year;
    result.cnt = '' + c;
    result.dateFormat = preArr[1];
    result.i = preArr[2];

    return result;
}

function findPalindromeDate(date) {
    const date_1 = getNextPalindromeDate(date);
    const date_2 = getPreviousPalindromeDate(date);

    if (Number(date_1.cnt) < Number(date_2.cnt))
        return date_1;
    else
        return date_2;
}

closeButton.addEventListener("click", function hidePolicyMsg() {
    privacyMsg.style.display = "none";
})

checkButton.addEventListener("click", function clickHandler() {
    output.style.display = "block";

    var bdayStr = dateInput.value;

    if (bdayStr == '') {
        output.innerText = "Select a date";
    } else {
        output.style.display = 'none'
        delayGif.style.display = 'block'
        setTimeout(() => {
            output.style.display = 'block'
            delayGif.style.display = 'none'
            process(bdayStr)
        }, 3300)
    }

})

function process(bdayStr) {
    var dateVal = bdayStr.split('-');

    const dateObj = {
        day: Number(dateVal[2]),
        month: Number(dateVal[1]),
        year: Number(dateVal[0])
    };

    const ifPalindrome = checkPalindromeAllFormats(dateObj);

    if (ifPalindrome[0]) {
        output.innerText = ` Your birthdate is a palindrome!🥳🤩🤩and format is
        ${ifPalindrome[1]} ~ ${date_formats[ifPalindrome[2]]}`;
    } else {
        const nextDateObj = findPalindromeDate(dateObj);
        //(cond)?(true):(false)
        (nextDateObj.cnt > 1)?(output.innerText = `Your birthdate is not a palindrome. The nearest palindrome date is ${nextDateObj.day}/${nextDateObj.month}/${nextDateObj.year} in format ${date_formats[nextDateObj.i]}, you missed it by ${nextDateObj.cnt} days! 🙁`):(output.innerText = `Your birthdate is not a palindrome. The nearest palindrome date is ${nextDateObj.day}/${nextDateObj.month}/${nextDateObj.year} in format ${date_formats[nextDateObj.i]}, you missed it by ${nextDateObj.cnt} day! 🙁`)
    }
}
