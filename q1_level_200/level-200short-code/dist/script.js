// TODO: Modify this function
function generateShortCode(storeId, transactionId) {
    const curr_date = new Date();
    const start = new Date(curr_date.getFullYear(), 0, 0);
    const diff = curr_date - start + + (start.getTimezoneOffset() - curr_date.getTimezoneOffset()) * 60 * 1000;
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));

    const transactionCode = encryptBase36(transactionId, 4);
    const storeCode = encryptBase36(storeId, 2);
    const dateCode = encryptBase36(day, 3);

    return `${storeCode}${dateCode}${transactionCode}`;
}

// TODO: Modify this function
function decodeShortCode(shortCode) {
    // Get the respective slices
    const storeCode = shortCode.slice(0, 2);
    const dateCode = shortCode.slice(2, 5);
    const transactionCode = shortCode.slice(5, 9);
    
    // Decrypt
    const storeId = decryptBase36(storeCode);
    const date = decryptBase36(dateCode);
    const transactionId = decryptBase36(transactionCode);

    // Form date object
    const year = new Date().getFullYear();
    const shopDate = new Date(year, 0, date);
  
    return {
        storeId: storeId,
        shopDate: shopDate,
        transactionId: transactionId,
    };
}

const base36Chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encryptBase36(number, maxLength) {
    const maxNumber = Math.pow(36, maxLength) - 1;
    if (number > maxNumber) throw new Error(`Number limit exceeded: ${maxNumber}`);

    let encrypted = '';
    while (number > 0) {
        const remainder = number % 36;
        encrypted = base36Chars[remainder] + encrypted;
        number = Math.floor(number / 36);
    }

    return encrypted.padStart(maxLength, '0');
}

function decryptBase36(base36Str) {
    let number = 0;
    for (let i = 0; i < base36Str.length; i++) {
        const char = base36Str[i];
        const value = base36Chars.indexOf(char);
        number = number * 36 + value;
    }
    return number;
}


// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {

    var storeIds = [175, 42, 0, 9]
    var transactionIds = [9675, 23, 123, 7]

    storeIds.forEach(function (storeId) {
        transactionIds.forEach(function (transactionId) {
            var shortCode = generateShortCode(storeId, transactionId);
            var decodeResult = decodeShortCode(shortCode);
            $("#test-results").append("<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>");
            AddTestResult("Length <= 9", shortCode.length <= 9);
            AddTestResult("Is String", (typeof shortCode === 'string'));
            AddTestResult("Is Today", IsToday(decodeResult.shopDate));
            AddTestResult("StoreId", storeId === decodeResult.storeId);
            AddTestResult("TransId", transactionId === decodeResult.transactionId);
        })
    })
}

function IsToday(inputDate) {
    // Get today's date
    var todaysDate = new Date();
    // call setHours to take the time out of the comparison
    return (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0));
}

function AddTestResult(testName, testResult) {
    var div = $("#test-results").append("<div class='" + (testResult ? "pass" : "fail") + "'><span class='tname'>- " + testName + "</span><span class='tresult'>" + testResult + "</span></div>");
}