let myLibrary = [];
let formPopUp = document.querySelector(".form-pop-up");

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

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  const sect = document.querySelector("section");
  removeAllDisplayedBooks(sect);
  myLibrary.forEach((book) => {
    let author = document.createElement("p");
    let title = document.createElement("p");
    let pages = document.createElement("p");
    let read = document.createElement("p");
    author.textContent = `Author: ${book.author}`; // create dom element with text
    title.textContent = `Title: ${book.title}`;
    pages.textContent = `Pages: ${book.pages}`;
    read.textContent = `Read: ${book.read}`;

    let card = document.createElement("div");
    card.classList.add("card");
    card.append(author, title, pages, read);

    sect.append(card);
  });
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
