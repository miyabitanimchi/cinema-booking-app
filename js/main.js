const movies = document.getElementById("movies");
const seats = document.querySelectorAll(".seat:not(.occupied)");
console.log(seats);
// const moviePrice = document.getElementById("price");
const totalPrice = document.getElementById("totalPrice");
const numOfSeats = document.getElementById("numOfSeats");
const movieShowcase = document.getElementById("movieShowcase");

const imgElement = document.createElement("img");
movieShowcase.appendChild(imgElement);

let totalSeatsArr = [];
let selectedtotalSeatsArr = [];
let totalMoviePrice, totalNumOfSeats;

movies.addEventListener("change", () => {
  document.getElementById("price").innerText = movies.value;
  showTotalPrice();
  showMovieImage();
});

seats.forEach((seat) => {
  totalSeatsArr.push(seat);
  
  seat.addEventListener("click", (e) => {
    console.log(seats);
    if (e.target.classList.contains("selected")) {
      let index = selectedtotalSeatsArr.findIndex((seat) => {
        return seat === totalSeatsArr.indexOf(e.target);
      });
      console.log(index);
      selectedtotalSeatsArr.splice(index, 1);
    } else {
      selectedtotalSeatsArr.push(totalSeatsArr.indexOf(e.target));
    }
    e.target.classList.toggle("selected");
    localStorage.setItem("storedSeatsArr", JSON.stringify(selectedtotalSeatsArr));

    showTotalPrice();

    totalNumOfSeats = selectedtotalSeatsArr.length;
    numOfSeats.innerText = totalNumOfSeats;

    console.log(e.target);
    console.log(selectedtotalSeatsArr);
    console.log(totalSeatsArr);
  });
});

// Show total price
const showTotalPrice = () => {
  totalMoviePrice = (movies.value) * (selectedtotalSeatsArr.length);
  console.log(totalPrice);
  totalPrice.innerText = totalMoviePrice;
}

// Show a movie image 
const showMovieImage = () => {
  switch (movies.selectedIndex) {
    case 0:
      imgElement.src = "../img/forrestGump.jpeg";
      break;
    case 1:
      imgElement.src = "../img/borat.jpeg";
      break;
    case 2:
      imgElement.src = "../img/standByMe.jpeg";
      break;
    case 3:
      imgElement.src = "../img/princessMononoke.jpeg";
      break;
    case 4:
      imgElement.src = "../img/spiderMan_into_the_space.jpg";
      break;
    case 5:
      imgElement.src = "../img/interstellar.jpeg";
      break;
  }
}

// Load / Reload
window.addEventListener("load", () => {
  imgElement.src = "../img/forrestGump.jpeg";
  if (localStorage.getItem("storedSeatsArr") !== null) {
    selectedtotalSeatsArr = JSON.parse(localStorage.getItem("storedSeatsArr"));
    for (let i = 0; i < selectedtotalSeatsArr.length; i++ ) {
      console.log(seats[selectedtotalSeatsArr[i]]);
      console.log(selectedtotalSeatsArr);
      seats[selectedtotalSeatsArr[i]].classList.toggle("selected");
    }
  }
})