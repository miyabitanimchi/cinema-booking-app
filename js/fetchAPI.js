// const axios = require('axios');

const API_KEY = "6de0031ff9ff7891e34f8d09f9cbc39b";

const fetchAPI = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/4/list/1?api_key=${API_KEY}`);
    const movieData = response.data;
    console.log(movieData);
    showTitle(movieData);
    // showImg(movieData);
    showMovieContents(movieData);
  } 
  catch(errors) {
    console.log(`Oops, errors! ${errors}`);
  }
}

fetchAPI();


// test
const showTitle = (data) => {
  document.getElementById("testDiv").innerText = data.results[0].original_title;
}

const showImg = (data) => {
  const imgElement2 = document.createElement("img");
  document.getElementById("testDiv2").appendChild(imgElement2);
  imgElement2.src = `https://image.tmdb.org/t/p/w200/${data.results[0].poster_path}`;
}

const showMovieContents = (data) => {
  
  for (i = 0; i < data.results.length; i++) {
    const imgElement2 = document.createElement("img");
    document.getElementById("movie-collection").appendChild(imgElement2);
    imgElement2.src = `https://image.tmdb.org/t/p/w200/${data.results[i].poster_path}`;
    console.log(imgElement2.src);
  }
}