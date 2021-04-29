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
    appendImgAndInfoFprNowPlaying(movieData);
    appendImgAndInfoForPopular(response3.data);
  } 
  catch(errors) {
    console.log(`Oops, errors! ${errors}`);
  }
}

const appendImgAndInfoFprNowPlaying = (data) => {

  for (let i = 0; i < data.results.length; i++) {
    const divElementForNowPlaying = document.createElement("div");
    divElementForNowPlaying.classList.add("position-for-img-and-caption");
    document.getElementById("movie-collection-now-playing").appendChild(divElementForNowPlaying);
    console.log(divElementForNowPlaying);
  }
  const el = document.querySelectorAll(".position-for-img-and-caption");
  console.log(el);

  for (let i = 0; i < el.length; i++) {
    const imgElement = document.createElement("img");
    const pElement = document.createElement("p");
    const overviewElement = document.createElement("p");
    pElement.classList.add("movie-title");
    overviewElement.classList.add("movie-overview");
    
    el[i].appendChild(imgElement);
    imgElement.src = `https://image.tmdb.org/t/p/w200/${data.results[i].poster_path}`;
    el[i].appendChild(pElement);
    pElement.innerText = data.results[i].title;
    console.log(el[i]);
  }

  const elForTopImg = document.querySelectorAll(".topimage");
  const elForTopTitle = document.querySelectorAll(".toptitle");
  let randomNum;
  for (let i = 0; i < elForTopImg.length; i++) {
    randomNum = Math.floor(Math.random() * el.length);
    console.log(randomNum);
    elForTopImg[i].src = `https://image.tmdb.org/t/p/w500/${data.results[randomNum].backdrop_path}`
    elForTopTitle[i].innerText = data.results[randomNum].title;
  }
}

const appendImgAndInfoForPopular = (data) => {
  for (let i = 0; i < data.results.length; i++) {
    const divElementForMostPopular = document.createElement("div");
    divElementForMostPopular.classList.add("position-for-img-and-caption-for-popular");
    document.getElementById("movie-collection-popular").appendChild(divElementForMostPopular);
    console.log(divElementForMostPopular);
  }
  const elForPopular = document.querySelectorAll(".position-for-img-and-caption-for-popular");
  console.log(elForPopular);

  for (let i = 0; i < elForPopular.length; i++) {
    const imgElementForPopular = document.createElement("img");
    const pElementForPopular = document.createElement("p");
    pElementForPopular.classList.add("movie-title-for-popular");

    elForPopular[i].appendChild(imgElementForPopular);
    imgElementForPopular.src = `https://image.tmdb.org/t/p/w200/${data.results[i].poster_path}`;
    elForPopular[i].appendChild(pElementForPopular);
    pElementForPopular.innerText = data.results[i].title;
    console.log(elForPopular[i]);
  }
}

fetchAPI();