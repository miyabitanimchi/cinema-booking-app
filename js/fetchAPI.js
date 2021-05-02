let counterForFunc = 0;
const API_KEY = "6de0031ff9ff7891e34f8d09f9cbc39b";

const fetchAPI = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
    const responsePopular = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);

    const movieData = response.data;
    const movieDataPopular = responsePopular.data;

    console.log(movieData);
    console.log(movieDataPopular);
    buildTopPage(movieData);
    createElements(movieData, "movie-collection-now-playing", "position-for-img-and-caption", ".position-for-img-and-caption", "mask", ".mask");
    createElements(movieDataPopular, "movie-collection-popular", "position-for-img-and-caption-for-popular", ".position-for-img-and-caption-for-popular", "mask-popular", ".mask-popular");
  } 
  catch(errors) {
    console.log(`Oops, errors! ${errors}`);
  }
}

const createElements = (data, elementId, containerElement, containerElementQuery, maskElement, maskElementQuery) => {
  for (let i = 0; i < data.results.length; i++) {
    const divContainerElement = document.createElement("div");
    divContainerElement.classList.add(containerElement);
    const divContainerElementforPAndBtn = document.createElement("div");
    divContainerElementforPAndBtn.classList.add(maskElement);

    document.getElementById(elementId).appendChild(divContainerElement);
    document.getElementById(elementId).childNodes[i].appendChild(divContainerElementforPAndBtn);
    // console.log(divContainerElement);
  }
  const elPositionForImgAndCaption = document.querySelectorAll(containerElementQuery);
  const elMask = document.querySelectorAll(maskElementQuery);
  
  for (let i = 0; i < elPositionForImgAndCaption.length; i++) {
    const imgElement = document.createElement("img");
    const pElement = document.createElement("p");
    pElement.classList.add("movie-title");
    const btnDetails = document.createElement("button");
    btnDetails.classList.add("btn-details", "btn", "btn-primary");
    const btnBookSeats = document.createElement("a");
    btnBookSeats.href = "./bookingSeats.html";
    btnBookSeats.classList.add("btn-book-seats", "btn", "btn-primary");

    const btnAttributes = ["type", "data-bs-toggle", "data-bs-target", "onclick"];
    const btnAttrValues = ["button", "modal", "#exampleModal", `fetchAPIForModal(${data.results[i].id})`];

    for (let j = 0; j < btnAttrValues.length; j++) {
      btnDetails.setAttribute(btnAttributes[j], btnAttrValues[j]);
    }

    elPositionForImgAndCaption[i].appendChild(imgElement);
    imgElement.src = `https://image.tmdb.org/t/p/w200/${data.results[i].poster_path}`;
    elMask[i].appendChild(pElement);
    pElement.innerText = data.results[i].title;
    elMask[i].appendChild(btnDetails);
    elMask[i].appendChild(btnBookSeats);
    btnDetails.innerHTML = "See Details";
    btnBookSeats.innerHTML = "Book Seats";
  }
  createSearchFunc(data);
}

const buildTopPage = (data) => {
    const elForTopImg = document.querySelectorAll(".topimage");
    const elForTopTitle = document.querySelectorAll(".toptitle");
    const elForTopBtns = document.querySelectorAll(".modal-class")
    for (let i = 0; i < elForTopImg.length; i++) {
      let randomNum = Math.floor(Math.random() * data.results.length);
      elForTopBtns[i].setAttribute("onclick", `fetchAPIForModal(${data.results[randomNum].id})`);
      // console.log(randomNum);
      console.log(elForTopBtns);
      elForTopImg[i].src = `https://image.tmdb.org/t/p/w500/${data.results[randomNum].backdrop_path}`
      elForTopTitle[i].innerText = data.results[randomNum].title;
    }
}
const createSearchFunc = (data) => {
  // if (counterForFunc > 0) {
  //   for (j = 0; j < )
  // } 
  for (i = 0; i < data.results.length; i++) {
    const optionElement = document.createElement("option");
    document.getElementById("datalist").appendChild(optionElement);
    document.getElementById("datalist").childNodes[i].value = data.results[i].id;
    document.getElementById("datalist").childNodes[i].innerText = data.results[i].title;
  }
  counterForFunc++;
  console.log(counterForFunc);
}
fetchAPI();

const fetchAPIForModal = async (movieId) => {
  try {
    const responseTrailer = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
    const responseDetails = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    const responseCredits = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)
   
    console.log(responseDetails);
    console.log(responseTrailer);
    console.log(responseCredits);
    showDetails(responseDetails, responseTrailer, responseCredits);
  }
  catch(errors) {
    console.log(`Oops, errors! ${errors}`);
  }
}

const showDetails = (details, trailerData, credits) => {
  const genreContainer = document.getElementById("genre-container");
  const childDivs = document.getElementsByClassName("genre");
  console.log(childDivs);
  console.log(genreContainer.hasChildNodes());

  // resset childnodes (divs for previous genres)
  while (genreContainer.hasChildNodes()) {
    genreContainer.removeChild(genreContainer.firstChild);
    }
  document.getElementById("movieTitle").innerText = details.data.title;
  document.getElementById("tagline").innerText = `- ${details.data.tagline} -`;

  for (let i = 0; i < details.data.genres.length; i++) {
    const elForGenre = document.createElement("div");
    elForGenre.classList.add("genre"); 
    genreContainer.appendChild(elForGenre);
    genreContainer.childNodes[i].innerText = details.data.genres[i]["name"];
  }
  // show trailer
  document.getElementById("trailer").src = `https://www.youtube.com/embed/${trailerData.data.results[0].key}?rel=0&autoplay=1&mute=1&playsinline=1&loop=1&playlist=${trailerData.data.results[0].key}&controls=0&disablekb=1`;
  document.getElementById("trailer-name").innerText = trailerData.data.results[0].name;

  // show overview
  document.getElementById("overview").innerText = details.data.overview;

  // show cast and crew
  for (let i = 0; i < 5; i++) {
    document.getElementById("cast").childNodes[i].innerText = `${credits.data.cast[i]["name"]}, `;
    document.getElementById("crew").childNodes[i].innerHTML = `<b>${credits.data.crew[i]["job"]}:</b> ${credits.data.crew[i]["name"]}`
    
    if (i === 4) {
      document.getElementById("cast").childNodes[i].innerText = `${credits.data.cast[i]["name"]}`;
    }
    // console.log(document.getElementById("crew").childNodes[i]);
    console.log(document.getElementById("cast").childNodes[i]);
  }

  // show director
  document.getElementById("director").innerText = credits.data.crew[0]["name"];
}
