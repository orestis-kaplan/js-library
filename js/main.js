if (!localStorage.bookId) {
  localStorage.bookId = 1;
}

function toggleBook() {
  if (document.querySelector('.modal').style.display === 'block')
    document.querySelector('.modal').style.display = 'none';
  else {
    document.querySelector('.modal').style.display = 'block';
  }
}

let testBook = new Book("Lord Of The Rings", "J.R.Tolkin", 500, false);
let myLibrary = buildLibrary();

function buildLibrary() {
  if(localStorage.myLibrary){
    return JSON.parse(localStorage.getItem("myLibrary")).map( book =>
      Object.assign(new Book(),book)
    );
  }
    return [];
}

function createBook() {
  let title = document.querySelector('#bookTitle').value;
  let author = document.querySelector('#bookAuthor').value;
  let pages = document.querySelector('#bookPages').value;
  let addedBook = new Book(title, author, pages, false);
  myLibrary.push(addedBook);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  addBookToLibrary(addedBook);
}

function addBookToLibrary(book) {
  let shelf = document.getElementById("parent");
  shelf.insertAdjacentHTML("beforeend", book.render());
  initRead(book.id);
}

function renderBooks() {
  myLibrary.forEach(function(item) {
    item.prototype = Object.create(Book.prototype);
    addBookToLibrary(item);
  });
}

function removeBook(bookId) {
  let shelf = document.getElementById("parent");
  let bookToBeRemoved = document.getElementById(bookId);
  shelf.removeChild(bookToBeRemoved);
  myLibrary.pop();
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function initRead(bookId) {
  let checkBox =  document.getElementById("checkbox-"+bookId);
  let storageRead = JSON.parse(localStorage.getItem("checkbox-"+bookId));

  if (storageRead === true){
    document.getElementById("checkbox-"+bookId+"-status").innerHTML = true;
  }
  else {
    document.getElementById("checkbox-"+bookId+"-status").innerHTML = false;
  }
}

function changeStatus(bookId) {
  let checkBox =  document.getElementById("checkbox-"+bookId);
  if (checkBox.checked === false){
    document.getElementById("checkbox-"+bookId+"-status").innerHTML = false;
    localStorage.setItem("checkbox-"+bookId, false);
  }
  else{
    document.getElementById("checkbox-"+bookId+"-status").innerHTML = true;
    localStorage.setItem("checkbox-"+bookId,true);
  }
}

window.onload = function() {
  renderBooks();
};
