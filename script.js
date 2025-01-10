const apikey = "cur_live_7vnQbJtkaLmfEaWpco9qS2NAv5OqEw08My3umk1B";
const url = `https://api.currencyapi.com/v3/latest?apikey=${apikey}`;

const form = document.getElementById("form");
const inputamount = document.getElementById("input-amount");
const result = document.getElementById("convertedAmount");
const fromcurrency = document.getElementById("fromcurrency");
const tocurrency = document.getElementById("tocurrency");

async function fetchCurrencyRates() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        return data.data; 
    } catch (error) {
        console.error("Error fetching currency rates:", error);
        result.textContent = "Error fetching currency rates";
        throw error;
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const amount = parseFloat(inputamount.value);
    const fromCurrencyValue = fromcurrency.value;
    const toCurrencyValue = tocurrency.value;

    if (isNaN(amount) || amount <= 0) {
        result.textContent = "Invalid Amount Entered";
        return;
    }

    try {
        const rates = await fetchCurrencyRates();

        const fromRate = rates[fromCurrencyValue].value;
        const toRate = rates[toCurrencyValue].value;

        if (fromRate === undefined || toRate === undefined) {
            result.textContent = "Conversion rate not available for the selected currency pair.";
            return;
        }

        const convertedAmount = ((amount / fromRate) * toRate).toFixed(2);
        result.textContent = `${convertedAmount} ${toCurrencyValue}`;
    } catch (error) {
        result.textContent = "Error processing your request.";
    }
});
