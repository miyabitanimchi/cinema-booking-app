let counterForFunc = 0;
let movieData, movieDataPopular, movieDataAnime;
const API_KEY = "6de0031ff9ff7891e34f8d09f9cbc39b";

const fetchAPI = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
    const responsePopular = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
    const responseDailyPopular = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
    const responseAnime = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16`);
    const testAPI2 = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    
    console.log(testAPI2);
    movieData = response.data.results;
    movieDataPopular = responsePopular.data.results;
    movieDataAnime = responseAnime.data.results;
    console.log(movieDataAnime);

    console.log(movieData);
    buildTopPage(movieData);
    createElements(movieData, "movie-collection-now-playing", "position-for-img-and-caption", ".position-for-img-and-caption", "mask", ".mask");
    createElements(movieDataPopular, "movie-collection-popular", "position-for-img-and-caption-for-popular", ".position-for-img-and-caption-for-popular", "mask-popular", ".mask-popular");
    createElements(movieDataAnime, "movie-collection-anime", "position-for-img-and-caption-for-anime", ".position-for-img-and-caption-for-anime", "mask-anime", ".mask-anime");
  } 
  catch(errors) {
    console.log(`Oops, errors! ${errors}`);
  }
}

// build main page
const createElements = (data, elementId, containerElement, containerElementQuery, maskElement, maskElementQuery) => {
  for (let i = 0; i < data.length; i++) {
    const divContainerElement = document.createElement("div");
    divContainerElement.classList.add(containerElement);
    const divContainerElementforPAndBtn = document.createElement("div");
    divContainerElementforPAndBtn.classList.add(maskElement);

    document.getElementById(elementId).appendChild(divContainerElement);
    document.getElementById(elementId).childNodes[i].appendChild(divContainerElementforPAndBtn);
  }
  const elPositionForImgAndCaption = document.querySelectorAll(containerElementQuery);
  const elMask = document.querySelectorAll(maskElementQuery);
  
  for (let i = 0; i < elPositionForImgAndCaption.length; i++) {
    const imgElement = document.createElement("img");
    const pElement = document.createElement("p");
    pElement.classList.add("movie-title");
    const btnDetails = document.createElement("button");
    btnDetails.classList.add("btn-details", "btn");
    const btnBookSeats = document.createElement("a");
    btnBookSeats.href = "./bookingSeats.html";
    btnBookSeats.classList.add("btn-book-seats", "btn");
    btnBookSeats.setAttribute("onclick", `fetchAPIForBookSeats(${data[i].id}, "${data[i].title}", "${data[i].poster_path}")`);

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

// build carousel part
const buildTopPage = (data) => {
  const elForTopImg = document.querySelectorAll(".topimage");
  const elForTopTitle = document.querySelectorAll(".toptitle");
  const elForTopBtns = document.querySelectorAll(".modal-class")
  const elForTopBookSeatsBtns = document.querySelectorAll(".topBookSeats");

  // make not duplicate numbers for indices
  let randomNumArr = [];
  for (let i = 0; i < elForTopImg.length; i++) {
    while (true) {
      let temp = Math.floor(Math.random() * data.length);
      if(!randomNumArr.includes(temp)) {
        randomNumArr.push(temp);
        break;
      }
    }
  }
  // create carousel
  for (let i = 0; i < randomNumArr.length; i++) {
    elForTopBtns[i].setAttribute("onclick", `fetchAPIForModal(${data[randomNumArr[i]].id})`);
    elForTopBookSeatsBtns[i].setAttribute("onclick", `fetchAPIForBookSeats(${data[randomNumArr[i]].id}, "${data[randomNumArr[i]].title}", "${data[randomNumArr[i]].poster_path}")`);
    elForTopImg[i].src = `https://image.tmdb.org/t/p/w500/${data[randomNumArr[i]].backdrop_path}`
    elForTopTitle[i].innerText = data[randomNumArr[i]].title;
  }
}
// create options for search box
const createSearchFunc = (data) => {
  const datalist = document.getElementById("datalist");
  if (counterForFunc > 0) {
    let currentOptionLength = datalist.childNodes.length;
    for (j = currentOptionLength; j < (currentOptionLength + data.length); j++)  {
      const optionElement = document.createElement("option");
      datalist.appendChild(optionElement);
      datalist.childNodes[j].setAttribute("data-value", `${data[j-currentOptionLength].id}`);
      datalist.childNodes[j].setAttribute("value", `${data[j-currentOptionLength].title}`);
    }
  } else {
    for (i = 0; i < data.length; i++) {
      const optionElement = document.createElement("option");
      datalist.appendChild(optionElement);
      datalist.childNodes[i].setAttribute("data-value", `${data[i].id}`);
      datalist.childNodes[i].setAttribute("value", `${data[i].title}`);
    }
  }
  counterForFunc++;
}

fetchAPI();

// onclick function on See Details btn
const fetchAPIForModal = async (movieId) => {
  try {
    const responseTrailer = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
    const responseDetails = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    const responseCredits = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
    console.log(responseDetails);
    showDetails(responseDetails, responseTrailer, responseCredits);
  }
  catch(errors) {
    console.log(`Oops, errors! ${errors}`);
  }
}

// create details for inside of modals
const showDetails = (details, trailerData, credits) => {
  const genreContainer = document.getElementById("genre-container");
  const childDivs = document.getElementsByClassName("genre");
  console.log(childDivs);
  console.log(genreContainer.hasChildNodes());

  // append onclickAttribute on book seats 
  document.getElementById("bookseatsBtnInDetails").setAttribute("onclick", `fetchAPIForBookSeats(${details.data.id}, "${details.data.title}", "${details.data.poster_path}")`);

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
    console.log(document.getElementById("cast").childNodes[i]);
  }

  // show release date
  document.getElementById("releasedate").innerText = details.data.release_date;
}

// fetch API from search box for modal 
  document.querySelector("#searchBox").addEventListener("input", () => {
    const val = document.getElementById("searchBox").value;
    const dataValue = document.querySelector("#datalist option[value='"+val+"']").dataset.value;
    document.getElementById("submitBtn").setAttribute("onclick", `fetchAPIFromSearchForModal(${dataValue})`);
  })

// onclick function on search submit btn
const fetchAPIFromSearchForModal = async (movieId) => {
  try {
    const responseTrailer = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
    const responseDetails = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    const responseCredits = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
   
    showDetails(responseDetails, responseTrailer, responseCredits);
  }
  catch(errors) {
    console.log(`Oops, errors! ${errors}`);
  }
}

// genre modal
const sortMovieByGenre = (genreId, genreName) => {
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
  
  if (genresArr.length === 0) {
    document.getElementById("movie-collection-by-genre").innerText = "No movies found";
  }

  // remove duplicate movies
  const genreArrIds = genresArr.map((elm) => {
    return elm.id;
  });
  const filteredGenreArr = genresArr.filter((elm, index) => {
    return genreArrIds.indexOf(elm.id) === index;
  });

  console.log(filteredGenreArr);

  document.getElementById("modalForGenresLabel").innerText = `Genre: ${genreName}`;
  createElements(filteredGenreArr, "movie-collection-by-genre", "position-for-img-and-caption-for-genre", ".position-for-img-and-caption-for-genre", "mask-genre", ".mask-genre");
}

const fetchAPIForBookSeats = (movieId, movieTitle, moviePosterPath) => {
  console.log(movieTitle);
  localStorage.setItem("movieTitle", movieTitle);
  localStorage.setItem("moviePosterpath", moviePosterPath);
}
