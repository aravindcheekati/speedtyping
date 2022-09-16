let timerEl = document.getElementById("seconds");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let resultEl = document.getElementById("result");
let quoteInputEl = document.getElementById("quoteInput");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");
let count = 0;
let timeUniqueId;

function resetQuote() {
    quoteDisplayEl.textContent = "";
    spinnerEl.classList.remove('d-none');
    let options = {
        method: "GET"
    };
    fetch("https://apis.ccbp.in/random-quote", options).then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add('d-none');
            quoteDisplayEl.textContent = jsonData.content;
        });

    let timeId = setInterval(function() {
        timerEl.textContent = count;
        count = count + 1;
    }, 1000);
    timeUniqueId = timeId;
}
resetQuote();

resetBtn.addEventListener('click', function() {
    count = 0;
    resetQuote();
});

function checkQuote() {
    if (quoteInputEl.value === quoteDisplayEl.textContent) {
        clearInterval(timeUniqueId);
        resultEl.textContent = "You typed in " + count + " seconds";
    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }
}

submitBtnEl.addEventListener('click', checkQuote);
