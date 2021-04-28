// const axios = require('axios');

const API_KEY = "6de0031ff9ff7891e34f8d09f9cbc39b";

const fetchAPI = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
    const movieData = response.data;
    console.log(movieData);
    showMovieContents(movieData);
    appendImg(movieData);
    
  } 
  catch(errors) {
    console.log(`Oops, errors! ${errors}`);
  }
}

fetchAPI();


// test
// const showTitle = (data) => {
//   document.getElementById("testDiv").innerText = data.results[0].original_title;
// }

// const showImg = (data) => {
//   const imgElement = document.createElement("img");
//   document.getElementById("testDiv2").appendChild(imgElement);
//   imgElement.src = `https://image.tmdb.org/t/p/w200/${data.results[0].poster_path}`;
// }

const showMovieContents = (data) => {
  
  for (i = 0; i < data.results.length; i++) {
    const divElement = document.createElement("div");
    divElement.classList.add("position-for-img-and-caption");
    document.getElementById("movie-collection").appendChild(divElement);
    console.log(divElement);
    // imgElement.src = `https://image.tmdb.org/t/p/w300/${data.results[i].poster_path}`;


    
    // console.log(pElement);
    // showMovieDescription();
  }
  // appendImg(data);
}

const showMovieDescription = (data) => {
  const pElement = document.createElement("p");
  pElement.classList.add("movie-title");
  pElement.innerText = data.results[i].original_title;
}

const appendImg = (data) => {
  const el = document.querySelectorAll(".position-for-img-and-caption");
  console.log(el);

  for (i = 0; i < el.length; i++) {
    const imgElement = document.createElement("img");
    const pElement = document.createElement("p");
    const overviewElement = document.createElement("p");
    pElement.classList.add("movie-title");
    overviewElement.classList.add("movie-overview");
    
    


    el[i].appendChild(imgElement);
    imgElement.src = `https://image.tmdb.org/t/p/w300/${data.results[i].poster_path}`;
    el[i].appendChild(pElement);
    pElement.innerText = data.results[i].original_title;
    el[i].appendChild(overviewElement);
    overviewElement.innerText = data.results[i].overview;
    console.log(el[i]);
  }

  // for (i = 0; i < data.results.length; i++) {
  //   document.querySelectorAll(".position-for-img-and-caption").appendChild(imgElement)
  //   imgElement.src = `https://image.tmdb.org/t/p/w300/${data.results[i].poster_path}`;
  //   console.log(imgElement);
  // }
}

