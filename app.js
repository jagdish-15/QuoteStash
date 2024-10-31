let button = document.querySelector("button");
let quote = document.querySelector("#quote");
let author = document.querySelector("#author");

async function getApiResponse() {
    try {
        let url = `https://api.allorigins.win/get?url=https://favqs.com/api/qotd&timestamp=${new Date().getTime()}`;
        let apiResponse = await axios.get(url);
        return JSON.parse(apiResponse.data.contents).quote;
    } catch (err) {
        return {body: "Error: Quote not found!!", author: "Author"};
    }
}

button.addEventListener("click", async () => {
    quote.innerText = "Loading......";
    author.innerText = "-Author";
    let response = await getApiResponse();
    quote.innerText = `"${response.body}"`;
    author.innerText = `-${response.author}`;
});