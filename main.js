let myLibrary = [];

// Querying Elements
const formPopUp = document.querySelector(".form-pop-up");

const addBookButton = document.getElementById("add-book-btn");
const submitBookButton = document.getElementById("submit-book-btn");
const cancelBookButton = document.getElementById("cancel-book-btn");

addBookButton.addEventListener("click", openForm);
cancelBookButton.addEventListener("click", closeForm);
submitBookButton.addEventListener("click", () => {
  const book = readFormData();
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

function readFormData() {
  const author = formPopUp.elements["author"].value;
  const title = formPopUp.elements["title"].value;
  const pages = formPopUp.elements["pages"].value;
  const read = formPopUp.elements["read"].checked;
  return new Book(author, title, pages, read);
}

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  console.log(this);
  this.read = this.read === false ? true : false;
  console.log(this.read);
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
    read.textContent = `Read: ${book.read}`;

    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-index-number", myLibrary.indexOf(book));
    card.append(author, title, pages, read, createToggleButton(book), createDeleteButton());
    sect.append(card);
  });
}

function createDeleteButton() {
  const deleteBookCardButton = document.createElement("button");
  deleteBookCardButton.classList.add("delete-btn");
  deleteBookCardButton.textContent = "Delete book";
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
  myLibrary.splice(event.path[1].dataset.indexNumber, 1);
  displayBooks();
}

function removeAllDisplayedBooks(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

// Just for testing purpose TODO: Remove after fully implemented
const hobbit = new Book("J.R.R Tolkien", "The Hobbit", 320, true);
const sofie = new Book("Jostein Gaarder", "Sofie's Welt", 618, false);
addBookToLibrary(hobbit);
addBookToLibrary(sofie);
displayBooks();
