const movies = document.getElementById("movies");
const seats = document.querySelectorAll(".seat:not(.occupied)");
const numOfSeats = document.getElementById("numOfSeats");

const imgElement = document.createElement("img");
document.getElementById("movieShowcase").appendChild(imgElement);

let totalSeatsArr = [];
let selectedtotalSeatsArr = [];
let totalMoviePrice, totalNumOfSeats;

// movies.addEventListener("change", () => {
//   showPrice();
//   showMovieImage();
// });

seats.forEach((seat) => {
  totalSeatsArr.push(seat);
  seat.addEventListener("click", (e) => {
    if (e.target.classList.contains("selected")) {
      let index = selectedtotalSeatsArr.findIndex((seat) => {
        return seat === totalSeatsArr.indexOf(e.target);
      });
      selectedtotalSeatsArr.splice(index, 1);
    } else {
      selectedtotalSeatsArr.push(totalSeatsArr.indexOf(e.target));
    }
    e.target.classList.toggle("selected");
    localStorage.setItem("storedSeatsArr", JSON.stringify(selectedtotalSeatsArr));
    // showPrice();
    showNumOfSeats();
  });
});

// Show the total number of the seats selected
const showNumOfSeats = () => {
  // Culculate the number of seats selected
  totalNumOfSeats = selectedtotalSeatsArr.length;
  numOfSeats.innerText = totalNumOfSeats;
}

// Show total price
// const showPrice = () => {
//   document.getElementById("price").innerText = movies.value;
//   totalMoviePrice = (movies.value) * (selectedtotalSeatsArr.length);
//   document.getElementById("totalPrice").innerText = totalMoviePrice;
// }

// Show a movie image 
const showMovieImage = () => {
  switch (movies.selectedIndex) {
    case 0:
      imgElement.src = "./img/forrestGump.jpeg";
      break;
    case 1:
      imgElement.src = "./img/borat.jpeg";
      break;
    case 2:
      imgElement.src = "./img/standByMe.jpeg";
      break;
    case 3:
      imgElement.src = "./img/princessMononoke.jpeg";
      break;
    case 4:
      imgElement.src = "./img/spiderMan_into_the_space.jpg";
      break;
    case 5:
      imgElement.src = "./img/interstellar.jpeg";
      break;
  }
  localStorage.setItem("storedSelectedIndex", movies.selectedIndex);
}

document.getElementById("resetSeats").addEventListener("click", () => {
  localStorage.removeItem("storedSeatsArr");
  seats.forEach((seat) => {
    seat.classList.remove("selected");
  });
  numOfSeats.innerText = 0;
})
// Load / Reload
window.onload= () => {
  document.getElementById("movie-title-bookseats").innerText = localStorage.getItem("movieTitle");
  imgElement.src = `https://image.tmdb.org/t/p/w200/${localStorage.getItem("moviePosterpath")}`;
  document.getElementById("tomorrow").innerText = moment().add(1,'days').format('MMMM Do, YYYY');
  document.getElementById("dayafter").innerText = moment().add(2, 'days').format('MMMM Do, YYYY');
  // movies.selectedIndex = localStorage.getItem("storedSelectedIndex");
  // showMovieImage();
  // showPrice();
  if (localStorage.getItem("storedSeatsArr") !== null) {
    selectedtotalSeatsArr = JSON.parse(localStorage.getItem("storedSeatsArr"));
    for (let i = 0; i < selectedtotalSeatsArr.length; i++ ) {
      console.log(seats[selectedtotalSeatsArr[i]]);
      console.log(selectedtotalSeatsArr);
      seats[selectedtotalSeatsArr[i]].classList.toggle("selected");
    }
    
    showNumOfSeats();
    // showPrice();
  }
};

let currentDate = moment().format('MMMM Do YYYY');
console.log(currentDate);

let tmrwDate = moment().add(1,'days').format('MMMM Do YYYY');
console.log(tmrwDate);

let dayAfterTmrw = moment().add(2, 'days').format('MMMM Do YYYY');
console.log(dayAfterTmrw);