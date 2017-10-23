var button = document.querySelector(".main-nav__toggle");
var header = document.querySelector(".page-header");
var mainNav = document.querySelector(".main-nav__list");
var imagePosition = document.querySelector(".intro");
var titlePosition = document.querySelector(".intro__title");
var marketImage = document.querySelector(".market");

button.classList.add("main-nav__burger");
header.classList.add("page-header__opacity");
mainNav.classList.add("main-nav__hide");

button.addEventListener("click", function (evt) {
	evt.preventDefault();
	button.classList.toggle("main-nav__burger");
	header.classList.toggle("page-header__opacity");
  mainNav.classList.toggle("main-nav__hide");
});

if (imagePosition) {
  imagePosition.classList.add("intro__image-position");
  titlePosition.classList.add("intro__title--position");
  button.addEventListener("click", function (evt) {
  	evt.preventDefault();
  	imagePosition.classList.toggle("intro__image-position");
    titlePosition.classList.toggle("intro__title--position");
  });
}

if (marketImage) {
  marketImage.classList.add("market__image-position");
  button.addEventListener("click", function (evt) {
  	evt.preventDefault();
  	marketImage.classList.toggle("market__image-position");
  });
}
