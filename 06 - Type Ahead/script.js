const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data))

function findMatches(word, cities) {
    return cities.filter(place => {
        const regex = new RegExp(word, 'gi')
        return place.city.match(regex) || place.state.match(regex);
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function displayMatches() {
    const matches = findMatches(this.value, cities)
    const html = matches.map(place => {
        const regex = new RegExp(this.value, 'ig');
        const highlighted = `<span class="hl">${this.value}</span>`;
        const cityName = place.city.replace(regex, highlighted)
        const stateName = place.state.replace(regex, highlighted)
        return `
            <li> 
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>
        `;
    }).join('');

    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);