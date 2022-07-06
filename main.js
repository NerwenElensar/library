let myLibrary = [];

// Querying Elements
const formPopUp = document.querySelector(".form-pop-up");

const addBookButton = document.getElementById("add-book-btn");
const submitBookButton = document.getElementById("submit-book-btn");
const cancelBookButton = document.getElementById("cancel-book-btn");

// Pop Up Form

addBookButton.addEventListener("click", openForm);
cancelBookButton.addEventListener("click", closeForm);
formPopUp.addEventListener("submit", (e) => {
  e.preventDefault();
  const book = readFormData(e);
  addBookToLibrary(book);
  closeForm();
  displayBooks();
});

function openForm() {
  formPopUp.style.display = "block";
}

function closeForm() {
  formPopUp.style.display = "none";
}

function readFormData(e) {
  const formData = e.target;

  const author = formData.author.value;
  const title = formData.title.value;
  const pages = formData.pages.value;
  const read = formData.checked;
  return new Book(author, title, pages, read);
}

// Library logic

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function (event) {
  if (this.read === false) {
    this.read = true;
  } else {
    this.read = false;
  }
  const index = event.path[1].dataset.indexNumber;
  setReadMessage(index, this.read);
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  const sect = document.querySelector("section");
  removeAllDisplayedBooks(sect); //remove all Books so they don't show up twice when displaying them again
  myLibrary.forEach((book) => {
    let author = document.createElement("p");
    let title = document.createElement("p");
    let pages = document.createElement("p");
    let read = document.createElement("p");
    author.textContent = `Author: ${book.author}`;
    title.textContent = `Title: ${book.title}`;
    pages.textContent = `Pages: ${book.pages}`;
    const readStatus = checkReadStatus(book.read);
    read.textContent = `Read: ${readStatus}`;

    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-index-number", myLibrary.indexOf(book));
    card.append(createDeleteButton(), author, title, pages, read, createToggleButton(book));
    sect.append(card);
  });
}

function createDeleteButton() {
  const deleteBookCardButton = document.createElement("button");
  deleteBookCardButton.classList.add("delete-btn");
  deleteBookCardButton.innerHTML = "<img src='cancel.png'>";
  deleteBookCardButton.addEventListener("click", removeBookFromLibrary);
  return deleteBookCardButton;
}

function createToggleButton(book) {
  const toggleReadButton = document.createElement("button");
  toggleReadButton.classList.add("toggle-btn");
  toggleReadButton.textContent = "Change read status";
  toggleReadButton.addEventListener("click", book.toggleRead.bind(book));
  return toggleReadButton;
}

function removeBookFromLibrary(event) {
  myLibrary.splice(event.path[2].dataset.indexNumber, 1);
  displayBooks();
}

function removeAllDisplayedBooks(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function setReadMessage(index, readStatus) {
  const cards = document.querySelectorAll(".card");
  const message = checkReadStatus(readStatus);
  cards.forEach((card) => {
    if (card.dataset.indexNumber === index) {
      card.querySelector(":nth-child(5)").textContent = `Read: ${message}`;
    }
  });
}

function checkReadStatus(readStatus) {
  return readStatus === false ? "No" : "Yes";
}

// Example entries
const hobbit = new Book("J.R.R Tolkien", "The Hobbit", 320, true);
const sofie = new Book("Jostein Gaarder", "Sofie's Welt", 618, false);
addBookToLibrary(hobbit);
addBookToLibrary(sofie);
displayBooks();
