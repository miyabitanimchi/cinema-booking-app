let counterForFunc = 0;
let movieData, movieDataPopular, movieDataAnime;
const API_KEY = "6de0031ff9ff7891e34f8d09f9cbc39b";

const fetchAPI = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
    const responsePopular = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
    const responseDailyPopular = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
    const responseAnime = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16`);
    const testAPI2 = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    // console.log(responseAnime);
    console.log(testAPI2);
    // console.log(responseDailyPopular);
    movieData = response.data.results;
    movieDataPopular = responsePopular.data.results;
    movieDataAnime = responseAnime.data.results;
    console.log(movieDataAnime);

    console.log(movieData);
    // console.log(movieDataPopular);
    buildTopPage(movieData);
    createElements(movieData, "movie-collection-now-playing", "position-for-img-and-caption", ".position-for-img-and-caption", "mask", ".mask");
    createElements(movieDataPopular, "movie-collection-popular", "position-for-img-and-caption-for-popular", ".position-for-img-and-caption-for-popular", "mask-popular", ".mask-popular");
    createElements(movieDataAnime, "movie-collection-anime", "position-for-img-and-caption-for-anime", ".position-for-img-and-caption-for-anime", "mask-anime", ".mask-anime");
    // createElements()
  } 
  catch(errors) {
    console.log(`Oops, errors! ${errors}`);
  }
}

// for 
const createElements = (data, elementId, containerElement, containerElementQuery, maskElement, maskElementQuery) => {
  for (let i = 0; i < data.length; i++) {
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
    btnBookSeats.setAttribute("onclick", `fetchAPIForBookSeats(${data[i].id})`);

    const btnAttributes = ["type", "data-bs-toggle", "data-bs-target", "onclick",  "data-bs-dismiss"];
    const btnAttrValues = ["button", "modal", "#exampleModal", `fetchAPIForModal(${data[i].id})`, "modal"];

    for (let j = 0; j < btnAttrValues.length; j++) {
      btnDetails.setAttribute(btnAttributes[j], btnAttrValues[j]);
    }

    elPositionForImgAndCaption[i].appendChild(imgElement);
    imgElement.src = `https://image.tmdb.org/t/p/w200/${data[i].poster_path}`;
    elMask[i].appendChild(pElement);
    pElement.innerText = data[i].title;
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
    const elForTopBookSeatsBtns = document.querySelectorAll(".topBookSeats");
    for (let i = 0; i < elForTopImg.length; i++) {
      let randomNum = Math.floor(Math.random() * data.length);
      elForTopBtns[i].setAttribute("onclick", `fetchAPIForModal(${data[randomNum].id})`);
      elForTopBookSeatsBtns[i].setAttribute("onclick", `fetchAPIForBookSeats(${data[randomNum].id})`);
      // console.log(randomNum);
      console.log(elForTopBtns);
      elForTopImg[i].src = `https://image.tmdb.org/t/p/w500/${data[randomNum].backdrop_path}`
      elForTopTitle[i].innerText = data[randomNum].title;
    }
}
const createSearchFunc = (data) => {
  const datalist = document.getElementById("datalist");
  if (counterForFunc > 0) {
    let currentOptionLength = datalist.childNodes.length;
    for (j = currentOptionLength; j < (currentOptionLength + data.length); j++)  {
      const optionElement = document.createElement("option");
      datalist.appendChild(optionElement);
      // datalist.childNodes[j].value = data[j-currentOptionLength].id;
      datalist.childNodes[j].setAttribute("data-value", `${data[j-currentOptionLength].id}`);
      // datalist.childNodes[j].innerText = data[j-currentOptionLength].title;
      datalist.childNodes[j].setAttribute("value", `${data[j-currentOptionLength].title}`);
    }
  } else {
    for (i = 0; i < data.length; i++) {
      const optionElement = document.createElement("option");
      datalist.appendChild(optionElement);
      // datalist.childNodes[i].value = data[i].id;
      datalist.childNodes[i].setAttribute("data-value", `${data[i].id}`);
      // datalist.childNodes[i].innerText = data[i].title;
      datalist.childNodes[i].setAttribute("value", `${data[i].title}`);
    }
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


// fetch API from search box for modal 
  document.querySelector("#searchBox").addEventListener("input", () => {
    const val = document.getElementById("searchBox").value;
    const dataValue = document.querySelector("#datalist option[value='"+val+"']").dataset.value;
    document.getElementById("submitBtn").setAttribute("onclick", `fetchAPIFromSearchForModal(${dataValue})`);
  })

const fetchAPIFromSearchForModal = async (movieId) => {
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

// genre modal
const sortMovieByGenre = (genreId) => {
  document.getElementById("movie-collection-by-genre").innerHTML = "";
  // for now playing
  let genresArr = [];
  for (let i = 0; i < movieData.length; i++) {
    if (movieData[i].genre_ids.includes(genreId)) {
      genresArr.push(movieData[i]);
    } else {
    }
  }
  for (let i = 0; i < movieDataPopular.length; i++) {
    if (movieDataPopular[i].genre_ids.includes(genreId)) {
      genresArr.push(movieDataPopular[i]);
    } else {
    }
  }
  for (let i = 0; i < movieDataAnime.length; i++) {
    if (movieDataAnime[i].genre_ids.includes(genreId)) {
      genresArr.push(movieDataAnime[i]);
    } else {
    }
  }
  createElements(genresArr, "movie-collection-by-genre", "position-for-img-and-caption-for-genre", ".position-for-img-and-caption-for-genre", "mask-genre", ".mask-genre");
  console.log(genresArr);
}