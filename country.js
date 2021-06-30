// console.log('ttt');
// const params = new URLSearchParams(window.location)

const url = `https://restcountries.eu/rest/v2/name/${window.location.href.split('=')[1]}?fullText=true`

let country
function getData() {
    fetch(url).then(res => {
        return res.json();
    }).then(data => {

        country = data[0]

    })
};
getData()