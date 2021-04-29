const API_KEY = "6de0031ff9ff7891e34f8d09f9cbc39b";

const fetchAPI = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
    // const response2 = await axios.get(`https://api.themoviedb.org/3/movie/460465/videos?api_key=${API_KEY}&language=en-US`);
    const response3 = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);

    console.log(response3.data);
    const movieData = response.data;
    // const videoData = response2.data.results[1].key;

    console.log(movieData);
    // console.log(videoData);
    buildTopPage(movieData);
    createElements(movieData, "movie-collection-now-playing", "position-for-img-and-caption", ".position-for-img-and-caption", "mask", ".mask");
    createElements(response3.data, "movie-collection-popular", "position-for-img-and-caption-for-popular", ".position-for-img-and-caption-for-popular", "mask-popular", ".mask-popular");
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
    for (let i = 0; i < elForTopImg.length; i++) {
      let randomNum = Math.floor(Math.random() * data.results.length);
      console.log(randomNum);
      elForTopImg[i].src = `https://image.tmdb.org/t/p/w500/${data.results[randomNum].backdrop_path}`
      elForTopTitle[i].innerText = data.results[randomNum].title;
    }
}

fetchAPI();