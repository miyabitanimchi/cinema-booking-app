const seats = document.querySelectorAll(".seat:not(.occupied)");
const numOfSeats = document.getElementById("numOfSeats");
const numOfAdults = document.getElementById("numOfAdults");
const numOfYouthSeniorStudent = document.getElementById("numOfYouthSeniorStudent");
const moviedate = document.getElementById("moviedate");

const imgElement = document.createElement("img");
document.getElementById("movieShowcase").appendChild(imgElement);

let totalSeatsArr = [];
let selectedtotalSeatsArr = [];
let totalMoviePrice, totalTicketPrice, totalNumOfSeats;
let priceAdult = priceOthers = 0;

numOfAdults.addEventListener("change", () => {
  priceAdult = numOfAdults.value * 15;
  localStorage.setItem("numOfAdults", numOfAdults.selectedIndex);
  showTotalPrice();
});

document.getElementById("moviedate").addEventListener("change", () => {
  localStorage.setItem("moviedate", moviedate.selectedIndex);
  console.log(moviedate.selectedIndex);
})

numOfYouthSeniorStudent.addEventListener("change", () => {
  priceOthers = numOfYouthSeniorStudent.value * 12;
  localStorage.setItem("numOfYouthSeniorStudent", numOfYouthSeniorStudent.selectedIndex);
  showTotalPrice();
});

const showTotalPrice = () => {
  totalTicketPrice = priceAdult + priceOthers;
  document.getElementById("totalPrice").innerText = totalTicketPrice;
  localStorage.setItem("totalTicketPrice", totalTicketPrice);
}

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
    showNumOfSeats();
  });
});

// Show the total number of the seats selected
const showNumOfSeats = () => {
  // Calculate the number of seats selected
  totalNumOfSeats = selectedtotalSeatsArr.length;
  numOfSeats.innerText = totalNumOfSeats;
}

document.getElementById("resetSeats").addEventListener("click", () => {
  selectedtotalSeatsArr = [];
  localStorage.removeItem("storedSeatsArr");
  localStorage.removeItem("totalTicketPrice");
  localStorage.removeItem("numOfAdults");
  localStorage.removeItem("numOfYouthSeniorStudent");
  numOfAdults.selectedIndex = "0";
  numOfYouthSeniorStudent.selectedIndex = "0";
  moviedate.selectedIndex = "0";
  document.getElementById("totalPrice").innerText = 0;
  seats.forEach((seat) => {
    seat.classList.remove("selected");
  });
  numOfSeats.innerText = 0;
  priceAdult = priceOthers = 0;
})
// Load / Reload
window.onload= () => {
  document.getElementById("movie-title-bookseats").innerText = localStorage.getItem("movieTitle");
  numOfAdults.selectedIndex = localStorage.getItem("numOfAdults");
  moviedate.selectedIndex = localStorage.getItem("moviedate");
  numOfYouthSeniorStudent.selectedIndex = localStorage.getItem("numOfYouthSeniorStudent");
  imgElement.src = `https://image.tmdb.org/t/p/w200/${localStorage.getItem("moviePosterpath")}`;
  document.getElementById("tomorrow").innerText = moment().add(1,'days').format('MMMM Do, YYYY');
  document.getElementById("dayafter").innerText = moment().add(2, 'days').format('MMMM Do, YYYY');
  
  if (localStorage.getItem("totalTicketPrice") !== null) {
    document.getElementById("totalPrice").innerText = localStorage.getItem("totalTicketPrice");
  } else {
    document.getElementById("totalPrice").innerText = 0;
  }
  if (localStorage.getItem("storedSeatsArr") !== null) {
    selectedtotalSeatsArr = JSON.parse(localStorage.getItem("storedSeatsArr"));
    for (let i = 0; i < selectedtotalSeatsArr.length; i++ ) {
      seats[selectedtotalSeatsArr[i]].classList.toggle("selected");
    }

    showNumOfSeats();
  }
};

document.getElementById("buyTicketBtn").addEventListener("click", () => {
  // reset modal
  document.getElementById("notice").innerText = "";
  document.getElementById("modalForCheckoutLabel").innerText = "";
  document.getElementById("confirm-date").innerText = "";
  document.getElementById("confirm-adult").innerText = "";
  document.getElementById("confirm-others").innerText = "";
  document.getElementById("confirm-totalPrice").innerText = "";
  let totalNumOfPeople = Number(numOfAdults.value) + Number(numOfYouthSeniorStudent.value);

  if (selectedtotalSeatsArr.length > totalNumOfPeople || selectedtotalSeatsArr.length < totalNumOfPeople) {
    document.getElementById("backOrBuyTicketsBtn").innerText = "Back to booking page";
    document.getElementById("notice").innerText = "The number of selected seats and the number of tickets are incorrect.";
    
  } else if (totalNumOfPeople === 0) {
    document.getElementById("backOrBuyTicketsBtn").innerText = "Back to booking page";
    document.getElementById("notice").innerText = "Please select seats and the number of tickets.";
  } else {
    document.getElementById("backOrBuyTicketsBtn").innerText = "Buy Tickets";
    document.getElementById("modalForCheckoutLabel").innerText = localStorage.getItem("movieTitle");
    document.getElementById("confirm-date").innerText = `• Date: ${moviedate.options[moviedate.selectedIndex].text}`;
    document.getElementById("confirm-adult").innerText = `• Adult(18+): ${numOfAdults.value}`;
    document.getElementById("confirm-others").innerText = `• Youth(4-17)/Senior(65+)/Student: ${numOfYouthSeniorStudent.value}`;
    document.getElementById("confirm-totalPrice").innerText = `• Total Price: $${document.getElementById("totalPrice").innerText}`;
  }
  console.log(totalNumOfPeople);
});