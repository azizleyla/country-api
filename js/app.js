//get url
const url = "https://restcountries.eu/rest/v2/all";
//make reference to html elements
const cardsContainer = document.querySelector('.cards');

const modeIcon = document.getElementById('mode');
const header = document.querySelector('header');
const select = document.querySelector('.search-filter');
const searchInput = document.getElementById('search-input');


//Update UI
function updateUI(countries, className) {
    cardsContainer.innerHTML = "";
    countries.forEach(country => {
        const { name, population, region, capital, flag } = country;
        const formattedPopulation = population.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        const element = `
        <div class="card ${className}">
         <div class="card__img">
            <img src="${flag}">
         </div>
         <div class="card__content">
           <h1 class="card__name">${name}</h1>
          <div class="card__details">
             <p class="card__details--population">Population: <span>${formattedPopulation}</span></p>
             <p class="card__details--region">Region: <span>${region}</span></p>
             <p class="card__details--capital">Capital: <span>${capital}</span></p>
          </div>
         </div>
    </div>`

        cardsContainer.insertAdjacentHTML('beforeend', element);

    })


}
let countries = [];
//fetch Data
function getData() {
    fetch(url).then(res => {
        return res.json();
    }).then(data => {

        updateUI(data);
        countries = data;

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
        updateUI(filtered, "")
    }

}

select.addEventListener('change', function () {
    const value = this.value;
    const filteredByRegion = countries.filter(item => item.region === value);
    // value === 'default' ? updateUI(countries) : updateUI(filteredByRegion);
    if (value === "default") {
        if (document.body.classList.contains('darkMode')) {
            updateUI(countries, 'darkMode');
        } else {
            updateUI(countries, "")
        }
    } else {

        if (document.body.classList.contains('darkMode')) {
            updateUI(filteredByRegion, 'darkMode');
        } else {
            updateUI(filteredByRegion, "")
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

    })
})
