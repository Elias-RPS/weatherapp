const cityForm = document.querySelector('[data-js="change-location"]');
const cityNameContainer = document.querySelector('[data-js="city-name"]');
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]');
const cityTemperatureContainer = document.querySelector(
  '[data-js="city-temperature"]'
);
const cityCard = document.querySelector('[data-js="city-card"]');
let timeImg = document.querySelector('[data-js="time"]');
let timeIconContainer = document.querySelector('[data-js="time-icon"]');

const insertIconIntoDom = (WeatherIcon) =>
  `<img src="./src/icons/${WeatherIcon}.svg"/>`;

const isDayOrNightImg = (IsDayTime) =>
  (timeImg.src = IsDayTime
    ? "./src/day.svg"
    : (timeImg.src = "./src/night.svg"));

const showCityCard = () => {
  if (cityCard.classList.contains("d-none")) {
    cityCard.classList.remove("d-none");
  }
};

const insertWeatherDataIntoDOM = (
  LocalizedName,
  WeatherText,
  Temperature,
  WeatherIcon
) => {
  cityNameContainer.textContent = LocalizedName;
  cityWeatherContainer.textContent = WeatherText;
  cityTemperatureContainer.textContent = Temperature.Metric.Value;
  timeIconContainer.innerHTML = insertIconIntoDom(WeatherIcon);
};

cityForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const inputValue = event.target.city.value;
  const [{ Key, LocalizedName }] = await getCityData(inputValue);
  const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] =
    await getCityWeather(Key);

  showCityCard();
  isDayOrNightImg(IsDayTime);

  insertWeatherDataIntoDOM(
    LocalizedName,
    WeatherText,
    Temperature,
    WeatherIcon
  );
  cityForm.reset();
});
