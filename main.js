let myLibrary = [];

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

    const sect = document.querySelector("section");
    sect.append(card);
  });
}

const hobbit = new Book("J.R.R Tolkien", "The Hobbit", 320, true);
const sofie = new Book("Jostein Gaarder", "Sofie's Welt", 618, false);
