// const BREEDS_URL = "https://dog.ceo/api/breeds/image/random";
// const select = document.querySelector(".breeds");

// function addDoggo() {
//   //show loading spinner

//   // fetch returns a 'promise' (an object that returns a future value)
//   fetch(BREEDS_URL)
//     .then(function(response) {
//       return response.json(); // process the response into something we can use (an object)
//     })
//     .then(function(data) {
//       // inject the returned processed response here:
//       const img = document.createElement("img");
//       img.src = data.message;
//       img.alt = "cute doggo";

//       document.querySelector(".doggos").appendChild(img);

//       //stop showing loading spinner
//     });
// }

// document.querySelector(".add-doggo").addEventListener("click", addDoggo);

const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
const select = document.querySelector(".breeds");

fetch(BREEDS_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const breedsObject = data.message;
    const breedsArray = Object.keys(breedsObject);

    for (let i = 0; i < breedsArray.length; i++) {
      const option = document.createElement("option");
      option.value = breedsArray[i];
      option.innerText = breedsArray[i];
      // .appendChild is an element method, a bit like the .push() on an array.
      select.appendChild(option);
    }
  });

function buildDogUrl(dogBreed) {
  return `https://dog.ceo/api/breed/${dogBreed}/images/random`;
}

const img = document.querySelector(".dog-img");
const spinner = document.querySelector(".spinner");

function showLoadingSpinner() {
  console.log("showing loading spinner...");
  spinner.classList.add("show");
  img.classList.remove("show");
}

async function getNewDoggo(url) {
  console.log(`get the ${url}`);
  const res = await fetch(url);
  const resJson = await res.json();
  console.log(resJson);
  return resJson.message;
}

function showNewDoggo(dogUrl) {
  console.log(`Here's your doggo ${dogUrl}`);
  // use the URL to change the current image
  document.getElementById("doggo").src = dogUrl;
}

function hideLoadingSpinner() {
  console.log("Hiding loading spinner");
  // listening for the 'load' event - means the img is loaded so hide the spinner and show the image
  // use an event listener ("load") on the img tag
  img.classList.add("show");
  spinner.classList.remove("show");
}

function appendDoggo(dogBreed, dogUrl) {
  const img = document.createElement("img");

  img.alt = dogBreed;
  img.src = dogUrl;

  document.querySelector(".doggos").appendChild(img);
}

// the process continues here, as a result of the change event happening:
async function onBreedChange(event) {
  let dogBreed = event.target.value;
  let url = buildDogUrl(dogBreed);

  showLoadingSpinner();

  let dogPic = await getNewDoggo(url); // async function returns a promise.  A promise needs to be awaited

  showNewDoggo(dogPic);
  //   appendDoggo(dogBreed, dogPic);

  hideLoadingSpinner();
} // end of process

select.addEventListener("change", onBreedChange); // this event listener is what enables the process of getting a new image to start

img.addEventListener("load", function() {
  // hide the spinner, show the image
});
