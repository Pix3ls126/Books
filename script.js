// Array to hold the books
const myLibrary = [];

// Constructor for creating book objects
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Function to add a book to the library
function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

// Function to display books
function displayBooks() {
  const libraryContainer = document.getElementById('library');
  libraryContainer.innerHTML = ''; // Clear the library container first

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.isRead ? 'Yes' : 'No'}</p>
      <button class="toggle-read" data-index="${index}">Toggle Read</button>
      <button class="remove-book" data-index="${index}">Remove</button>
    `;

    libraryContainer.appendChild(bookCard);
  });

  attachEventListeners();
}

// Attach event listeners to buttons
function attachEventListeners() {
  document.querySelectorAll('.toggle-read').forEach((button) => {
    button.addEventListener('click', toggleReadStatus);
  });

  document.querySelectorAll('.remove-book').forEach((button) => {
    button.addEventListener('click', removeBook);
  });
}

// Function to remove a book
function removeBook(e) {
  const index = e.target.getAttribute('data-index');
  myLibrary.splice(index, 1);
  displayBooks();
}

// Function to toggle the read status
function toggleReadStatus(e) {
  const index = e.target.getAttribute('data-index');
  myLibrary[index].isRead = !myLibrary[index].isRead;
  displayBooks();
}

// Add event listener to the "New Book" button
document.getElementById('new-book-btn').addEventListener('click', () => {
  document.getElementById('book-form-container').classList.toggle('hidden');
});

// Add event listener to the book form
document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('is-read').checked;

  addBookToLibrary(title, author, pages, isRead);
  displayBooks();

  // Reset form and hide it
  e.target.reset();
  document.getElementById('book-form-container').classList.add('hidden');
});
