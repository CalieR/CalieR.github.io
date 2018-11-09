const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const galleryImgs = document.querySelectorAll(".gallery-img");

let currentlySelected = 0; // index 0, first image

prevBtn.addEventListener("click", function() {
  galleryImgs[currentlySelected].classList.remove("active"); // note even though "active" is a class, note no .here, because .classList is specific unlike .querySelector
  currentlySelected--;
  galleryImgs[currentlySelected].classList.add("active");
  nextBtn.disabled = false;

  if (currentlySelected === 0) {
    // at index 0 of the gallery
    prevBtn.disabled = true;
  }
});

nextBtn.addEventListener("click", function() {
  //   console.log(galleryImgs);
  galleryImgs[currentlySelected].classList.remove("active"); // remove active class from an image
  currentlySelected++; // move onto next image
  galleryImgs[currentlySelected].classList.add("active");
  prevBtn.disabled = false; // could put an 'if' here but dont need to

  if (galleryImgs.length === currentlySelected + 1) {
    nextBtn.disabled = true; // because we are at the last image
  }
});
