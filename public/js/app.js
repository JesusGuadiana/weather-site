const weatherForm = document.querySelector("form");
const errorHtml = document.querySelector("#error");
const successHtml = document.querySelector("#success");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = document.querySelector("input").value;

    successHtml.textContent = "Loading...";
    errorHtml.textContent = "";

    fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
        if(!data.error){
            errorHtml.textContent = data.location;
            successHtml.textContent = data.forecastData;
        } else {
            successHtml.textContent = "";
            errorHtml.textContent = data.error;
        }
     })
    })
})