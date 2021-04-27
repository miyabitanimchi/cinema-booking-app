// const axios = require('axios');

const API_KEY = "6de0031ff9ff7891e34f8d09f9cbc39b";


// const fetchAPI = () => {
//   fetch(`https://api.themoviedb.org/3/movie/550?api_key=${api}`).then((response) => {
//     console.log(response);
//     if (!response.ok) {
//       alert("Oops, there is an error");
//       return;
//     }
//     response.json().then((data) => {
//       console.log(data);
//       console.log(data.original_title);
//     })
//   });
// }

const fetchAPI = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/4/list/1?api_key=${API_KEY}`);
    const movieData = response.data;
    console.log(movieData);
    showTitle(movieData);
    showImg(movieData);
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
