$(function () {
  const cardsContainer = $("#cardsContainer");
  const searchValue = $("#searchValue");

  $("#getCountries").on("click", () => {
    cardsContainer.html('<div class="loader"></div>');

    getCountriesFromServer()
      .then((result) => {
        draw(result);
      })
      .catch((err) => {
        console.error(err);
      });
  });
  $("#searchOperation").on("click", () => {
    cardsContainer.html('<div class="loader"></div>');
    searchCountriesFromServer(searchValue)
      .then((result) => {
        draw(result);
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
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (countries.length === 0)
        reject(
          "There is a problem with the resource you are looking for with: 'countries.obj.js'"
        );
      resolve(countries);
    }, 3000);
  });
}
function searchCountriesFromServer(searchValue) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (countries.length === 0)
        reject(
          "There is a problem with the resource you are looking for with: 'countries.obj.js'"
        );
      const result = countries.filter((country) =>
        country.name.toLowerCase().includes(searchValue.val().toLowerCase())
      );
      resolve(result);
    }, 3000);
  });
}
