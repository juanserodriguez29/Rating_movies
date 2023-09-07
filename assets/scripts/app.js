const addMovieModal = document.getElementById("add-modal");
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
const startAddMovieButton = document.querySelector("header button");
// const startAddMovieButton = document.querySelector('header').lastElementChild;
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = addMovieModal.querySelector(".btn--success");
const userInputs = addMovieModal.querySelectorAll("input");
const entryText = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById('delete-modal')

movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const updateUI = () => {
  if (movies.length === 0) {
    entryText.style.display = "block";
  } else {
    entryText.style.display = "none";
  }
};

const cancelMovieDeletion =()=>{
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible')
}

const deleteMovie = (movieId) => {
  let movieIndex = 0
  for (const eachMovie of movies) {
    if (eachMovie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById('movie-list')
  listRoot.children[movieIndex].remove();
  cancelMovieDeletion();
  updateUI();
}

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible')
  toggleBackdrop();
  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive')
  let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger')

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true))

  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger')

  //confirmDeletionButton.removeEventListener('click', deleteMovie.bind(null, movieId))
  cancelDeletionButton.removeEventListener('click', cancelMovieDeletion)
  cancelDeletionButton.addEventListener('click', cancelMovieDeletion)
  confirmDeletionButton.addEventListener('click', deleteMovie.bind(null, movieId))
}

const renderNewMovieElement = (id, title, image, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class='movie-element__image'>
        <img src="${image}" alt="${title}">
    </div>
    <div class='movie-element__info'>
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `;
  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id))
  const listRoot = document.getElementById('movie-list')
  listRoot.append(newMovieElement)
};

const closeMovieModal = ()=>{
  addMovieModal.classList.remove("visible");
}

const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

const backdropClickHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
  clearMovieInputs();
};

const clearMovieInputs = () => {
  for (const eachInput of userInputs) {
    eachInput.value = "";
  }
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearMovieInputs();
  toggleBackdrop();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    ratingValue < 1 ||
    ratingValue > 5
  ) {
    alert("please enter valid values (rating between 1 and 5).");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies);
  clearMovieInputs();
  closeMovieModal();
  toggleBackdrop();
  renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating)
  updateUI();
};

startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
