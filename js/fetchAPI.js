const API_KEY = "6de0031ff9ff7891e34f8d09f9cbc39b";

const fetchAPI = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
    const response2 = await axios.get(`https://api.themoviedb.org/3/movie/460465/videos?api_key=${API_KEY}&language=en-US`);

    const movieData = response.data;
    const videoData = response2.data.results[1].key;

    // document.getElementById("testIframe").src = `https://www.youtube.com/embed/${videoData}?modestbranding=1&rel=0&showinfo=0&autoplay=1&mute=1&playsinline=1&loop=1&playlist=${videoData}&controls=0&disablekb=1`;
    console.log(movieData);
    console.log(videoData);
    showMovieContents(movieData);
    appendImgAndInfo(movieData);
    
  } 
  catch(errors) {
    console.log(`Oops, errors! ${errors}`);
  }
}


// const showTopInfo = (data) => {
//   const elForTopImg = document.querySelectorAll(".topimage");

//   for (i = 0; i < elForTopImg.length; i++) {
//     const randomNum = Math.floor(Math.random() * elForTopImg.length);
//     console.log(randomNum);
//   }
// }
// showTopInfo();

const showMovieContents = (data) => {
  
  for (let i = 0; i < data.results.length; i++) {
    const divElement = document.createElement("div");
    divElement.classList.add("position-for-img-and-caption");
    document.getElementById("movie-collection").appendChild(divElement);
    console.log(divElement);
  }
}

const appendImgAndInfo = (data) => {
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
    pElement.innerText = data.results[i].original_title;
    // el[i].appendChild(overviewElement);
    // overviewElement.innerText = data.results[i].overview;
    console.log(el[i]);
  }

  const elForTopImg = document.querySelectorAll(".topimage");
  for (let i = 0; i < elForTopImg.length; i++) {
    let randomNum = Math.floor(Math.random() * el.length);
    console.log(randomNum);
    elForTopImg[i].src = `https://image.tmdb.org/t/p/w500/${data.results[randomNum].backdrop_path}`
  }
}

fetchAPI();