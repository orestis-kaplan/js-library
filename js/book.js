/*jshint esversion: 6 */

function Book(name, author, pages, read) {
  this.id = parseInt(localStorage.bookId);
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
  localStorage.bookId++;
}

// Display each book on the page
Book.prototype.render = function() {
  return `
          <li class="book" id="${this.id}">
            <h4 class="text-center">${this.name}</h4>
            <div class="book-contents">
              <p class="book-info">
                <span>Author: &nbsp</span>
                <span><a>${this.author}</a></span>
              </p>
              <p class="book-info">
                <span>Pages: &nbsp${this.pages}</span>
              </p>
              <p class="book-info">
                <span>Read:&nbsp
                  <input type="checkbox" id="checkbox-${this.id}" onclick="changeStatus(${this.id})">
                  <span id="checkbox-${this.id}-status"></span>
                </span>
              </p>
            </div>
            <div class="text-center">
              <button class="btn delete-button" onclick="removeBook(${this.id})">Delete</button>
            </div>
          </li>
         `;
};
