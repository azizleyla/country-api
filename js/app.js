//get url
const url = "https://restcountries.eu/rest/v2/all";
//make reference to html elements
const cardsContainer = document.querySelector('.cards');
const container = document.querySelectorAll('.container')[1];
const modeIcon = document.getElementById('mode');
const header = document.querySelector('header');
const select = document.querySelector('.search-filter');
const searchInput = document.getElementById('search-input');
const modeText = document.querySelector('.header__mode-text')
const singleCountry = document.querySelector('.single-card');

let displayElement = false;
let countries = [];

//Update UI
function updateUI(countries, className) {
    cardsContainer.innerHTML = "";



    countries.forEach(country => {
        const countryEl = document.createElement('div');
        countryEl.classList.add('card', className)
        const { name, population, region, capital, flag, nativeName, subregion, languages, borders, currencies, topLevelDomain } = country;

        const formattedPopulation = population.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        countryEl.innerHTML = `
    <a href="/country.html?name=${name}">
         <div class="card__img">
            <img src="${flag}">
         </div>
         <div class="card__content">
             <h1 class="card__name">${name}</h1>
          <div class="card__details">
             <p>Population: <span>${formattedPopulation}</span></p>
             <p>Region: <span>${region}</span></p>
             <p>Capital: <span>${capital}</span></p>
          </div>
         </div></a>`

        cardsContainer.appendChild(countryEl);


    })


}
function back() {
    container.style.display = "block"
    singleCountry.style.display = "none"
}


//fetch Data
function getData() {
    fetch(url).then(res => {
        return res.json();
    }).then(data => {

        updateUI(data);
        countries = data;
        console.log(data);

    })
};
getData()

searchInput.addEventListener('keyup', function () {
    filterData(countries);
})
//search data

function filterData(countries) {
    const value = searchInput.value.trim().toLowerCase();
    const filtered = countries.filter(x => x.name.toLowerCase().includes(value));

    if (document.body.classList.contains('darkMode')) {
        updateUI(filtered, 'darkMode');
    } else {
        updateUI(filtered)
    }

}
//select tag
const regions = [
    { name: "Americas" },
    { name: "Africa" },
    { name: "Asia" },
    { name: "Europe" },
    { name: "Oceania" }
];

regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region.name;
    option.textContent = region.name;
    select.appendChild(option)
})


select.addEventListener('change', function () {
    const value = this.value;
    const filteredByRegion = countries.filter(item => item.region === value);
    // value === 'default' ? updateUI(countries) : updateUI(filteredByRegion);
    if (value === '0') {
        if (document.body.classList.contains('darkMode')) {
            updateUI(countries, 'darkMode');
        } else {
            updateUI(countries)
        }
    } else {

        if (document.body.classList.contains('darkMode')) {
            updateUI(filteredByRegion, 'darkMode');
        } else {
            updateUI(filteredByRegion)
        }
    }

})



//dark mode and light mode
modeIcon.addEventListener('click', function () {
    document.body.classList.toggle('darkMode');
    header.classList.toggle('darkMode');
    searchInput.classList.toggle('darkMode');
    select.classList.toggle('darkMode');
    cardsContainer.querySelectorAll('.card').forEach(card => {
        card.classList.toggle('darkMode');
    });
    singleCountry.querySelector('.btn').classList.toggle('darkMode')
    singleCountry.querySelectorAll('.border').forEach(border => {
        border.classList.toggle('darkMode')
    })

    modeText.textContent === 'Dark Mode' ? modeText.textContent = "Light Mode" : modeText.textContent = "Dark Mode"
})




