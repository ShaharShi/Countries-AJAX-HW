function getCountriesFromServer() {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (countries.length === 0) reject("There is a problem with the resource you are looking for with: 'countries.obj.js'")
            resolve(countries)
        }, 2000);
    })
} 

$(function() {

    const cardsContainer = $('#cardsContainer');

    $('#getCountries').on('click', () => {

        getCountriesFromServer().then((countries) => {
            draw(countries)
    
        }).catch((err) => {
            console.log(err)
        })
    })

    function draw(countries) {
        cardsContainer.empty();

        const cardItem = countries.map(country => {
            return getCardItem(country);    
        });
        cardsContainer.append(...cardItem);
    }

    function getCardItem(country) {
        const cardWrapper = $('<div></div>').attr('class', 'card-wrapper');
        const countryName = $(`<h3>${country.name}</h3>`);
        const flagWrap = $('<div></div>').attr('class', 'flag-img');
        const flagImg = $('<img>').attr('src', country.flag);
        const population = $(`<p>Population <br>${country.population}</p>`).attr('class', 'population');

        flagWrap.append(flagImg);
        cardWrapper.append(countryName, flagWrap, population);

        return cardWrapper;
    }

});

