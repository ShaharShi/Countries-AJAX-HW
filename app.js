$(function () {
  const cardsContainer = $("#cardsContainer");
  const searchValue = $("#searchValue");

  $("#getCountries").on("click", () => {
    cardsContainer.html('<div class="loader"></div>');

    getCountriesFromServer()
      .then((result) => {
        setTimeout(() => {
          draw(result);
        }, 3000)
      })
      .catch((err) => {
        console.error(err);
      });
  });

  $("#searchOperation").on("click", () => {
    cardsContainer.html('<div class="loader"></div>');

    searchCountriesFromServer(searchValue)
      .then((result) => {
        setTimeout(() => {
          draw(result);
        }, 3000)
      })
      .catch((err) => {
        console.error(err);
      });
  });

  function draw(countries) {
    cardsContainer.empty();
    const cardItem = countries.map((country) => {
      return getCardItem(country);
    });
    cardsContainer.append(...cardItem);
  }

  function getCardItem(country) {
    const cardWrapper = $("<div></div>").attr("class", "card-wrapper bg-dark");
    const countryName = $(`<h3>${country.name}</h3>`);
    const flagWrap = $("<div></div>").attr("class", "flag-img");
    const flagImg = $("<img>").attr("src", country.flag);
    const population = $(`<p>Population <br>${country.population}</p>`)
    .attr("class", "population");

    flagWrap.append(flagImg);
    cardWrapper.append(countryName, flagWrap, population);

    return cardWrapper;
  }
});

function getCountriesFromServer() {
  return new Promise((resolve) => {
    $.ajax({
      url: "https://restcountries.eu/rest/v2/all"
    }).done((countries) => {
      resolve(countries)
    })
  })
}

function searchCountriesFromServer(searchValue) {
  return new Promise((resolve) => {
    $.ajax({
      url: "https://restcountries.eu/rest/v2/all"
    }).done((countries) => {
        const result = countries.filter((country) => country.name.toLowerCase().includes(searchValue.val().toLowerCase()))
        resolve(result)
    })
  })
}