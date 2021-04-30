const API_KEY = "6de0031ff9ff7891e34f8d09f9cbc39b";

const fetchAPI = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
    // const response2 = await axios.get(`https://api.themoviedb.org/3/movie/460465/videos?api_key=${API_KEY}&language=en-US`);
    const responsePopular = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);

    const movieData = response.data;
    const movieDataPopular = responsePopular.data;
    // const videoData = response2.data.results[1].key;

    console.log(movieData);
    console.log(movieDataPopular);
    // console.log(videoData);
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
    console.log(divContainerElement);
  }
  const elPositionForImgAndCaption = document.querySelectorAll(containerElementQuery);
  const elMask = document.querySelectorAll(maskElementQuery);
  console.log(elMask.length);
  
  for (let i = 0; i < elPositionForImgAndCaption.length; i++) {
    const imgElement = document.createElement("img");
    const pElement = document.createElement("p");
    pElement.classList.add("movie-title");
    const btnDetails = document.createElement("button");
    btnDetails.classList.add("btn-details", "btn", "btn-primary");
    const btnBookSeats = document.createElement("button");
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
}

const buildTopPage = (data) => {
    const elForTopImg = document.querySelectorAll(".topimage");
    const elForTopTitle = document.querySelectorAll(".toptitle");
    const elForTopBtns = document.querySelectorAll(".modal-class")
    for (let i = 0; i < elForTopImg.length; i++) {
      let randomNum = Math.floor(Math.random() * data.results.length);
      elForTopBtns[i].setAttribute("onclick", `fetchAPIForModal(${data.results[randomNum].id})`);
      console.log(randomNum);
      console.log(elForTopBtns);
      elForTopImg[i].src = `https://image.tmdb.org/t/p/w500/${data.results[randomNum].backdrop_path}`
      elForTopTitle[i].innerText = data.results[randomNum].title;
    }
}

fetchAPI();

const fetchAPIForModal = async (movieId) => {
  try {
    const responseVideo = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
    const responseDetails = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
    const videoKey = responseVideo.data.results[0].id;
    console.log(videoKey);
    console.log(responseDetails);
    showDetails(responseDetails);
  }
  catch(errors) {
    console.log(`Oops, errors! ${errors}`);
  }
}

const showDetails = (details) => {
  const genreContainer = document.getElementById("genre-container");
  const childDivs = document.getElementsByClassName("genre");
  console.log(childDivs);
  if (genreContainer.hasChildNodes) {
    for (let i = 0; i < childDivs.length; i++) {
      genreContainer.removeChild(childDivs[0]);
    }
  }
  document.getElementById("movieTitle").innerText = `${details.data.title}`;
  document.getElementById("tagline").innerText = `- ${details.data.tagline} -`;

  for (let i = 0; i < details.data.genres.length; i++) {
    const elForGenre = document.createElement("div");
    elForGenre.classList.add("genre"); 
    console.log(elForGenre);
    genreContainer.appendChild(elForGenre);
    genreContainer.childNodes[i].innerText = `${details.data.genres[i]["name"]}`
  }

}