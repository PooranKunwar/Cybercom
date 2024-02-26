const url = "https://dummyjson.com/quotes";
const localStorageKey = "quotes";
const tbody = document.getElementById("tableData");
const search = document.getElementById("txtSearch");
const button = document.getElementById("btn");
const addButton = document.getElementById("addBtn");
const spinner = document.getElementById("spinner");

let currentPage = 1;
const itemsPerPage = 5;
let quotesData = [];

const showSpinner = () => {
  spinner.style.display = "block";
};

const hideSpinner = () => {
  spinner.style.display = "none";
};

const fetchData = () => {
  showSpinner();
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      hideSpinner();
      let quotelocalData =
        JSON.parse(localStorage.getItem(localStorageKey)) || [];
      quotesData = [...data.quotes, ...quotelocalData];
      quotesData = quotesData.sort((a, b) => a.author.localeCompare(b.author));
      renderQuotes(currentPage);
      renderPagination();
    });
};

document.addEventListener("DOMContentLoaded", fetchData);

const renderQuotes = (page) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageQuotes = quotesData.slice(startIndex, endIndex);

  let output = "";
  pageQuotes.forEach((quotes, index) => {
    const currentIndex = startIndex + index + 1;
    output += ` <tr>
      <th>${currentIndex}</th>
      <td>${quotes.author}</td>
      <td>${quotes.quote}</td> 
      <td>
        <button class="btn btn-primary" onclick="editQuote(${quotes.id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteQuote(${quotes.id})">Delete</button>
      </td>
    </tr> `;
  });
  tbody.innerHTML = output;
};

const renderPagination = () => {
  const pageCount = Math.ceil(quotesData.length / itemsPerPage);
  let paginationHTML = "";
  for (let i = 1; i <= pageCount; i++) {
    paginationHTML += `<li class="page-item ${i === currentPage ? "active" : ""}"><button class="page-link" onclick="changePage(${i})">${i}</button></li>`;
  }
  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const changePage = (page) => {
  currentPage = page;
  renderQuotes(currentPage);
  renderPagination();
};

const searchQuotes = () => {
  const searchText = search.value.trim().toLowerCase();

  if (searchText === "") {
    fetchData();
    return;
  }

  quotesData = quotesData.filter((quote) =>
    quote.author.toLowerCase().includes(searchText)
  );
  currentPage = 1;
  renderQuotes(currentPage);
  renderPagination();
};

button.addEventListener("click", searchQuotes);

function validateForm(event) {
  event.preventDefault();

  var nameInput = document.getElementById("txtName");
  var quoteInput = document.getElementById("txtQuote");
  var nameError = document.getElementById("nameError");
  var quoteError = document.getElementById("quoteError");

  nameError.textContent = "";
  quoteError.textContent = "";

  if (nameInput.value.trim() === "" || quoteInput.value.trim() === "") {
    nameError.style.color = "red";
    quoteError.style.color = "red";

    nameError.textContent = "Author Name is required";
    quoteError.textContent = "Quote is required";

    return true;
  }
}

const addQuotes = (event) => {
  validateForm(event);
  if (validateForm(event)) {
    return;
  }

  let Author = document.getElementById("txtName").value;
  let Quote = document.getElementById("txtQuote").value;
  let quoteData = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  const newData = {
    id: Date.now(),
    quote: Quote,
    author: Author,
  };

  quoteData.push(newData);
  localStorage.setItem(localStorageKey, JSON.stringify(quoteData));
  alert("record added!!!");
};
addButton.addEventListener("click", addQuotes);

const deleteQuote = (id) => {
  const confirmation = confirm("are you sure you want to delete this?");
  if (confirmation) {
    const index = quotesData.findIndex((quote) => quote.id === id);
    let quotelocalData =
          JSON.parse(localStorage.getItem(localStorageKey)) || [];
    let localIndex = quotelocalData.findIndex(
      (element) => element.id === quotesData[index].id
    );

    if (localIndex !== -1) {
      quotelocalData.splice(localIndex, 1);
      localStorage.setItem(localStorageKey, JSON.stringify(quotelocalData));
    } else {
      alert("Delete Successfully");
    }
  }
};

const editQuote = (id) => {
  let quotelocalData = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  const index = quotelocalData.findIndex((quote) => quote.id === id);

  if (index !== -1) {
    let quoteToUpdate = quotelocalData[index]; 

    document.getElementById("txtName").value = quoteToUpdate.author;
    document.getElementById("txtQuote").value = quoteToUpdate.quote;
    
    addButton.removeEventListener("click", addQuotes);
    
    addButton.textContent = "Update";
    addButton.addEventListener("click", function () {
      const newAuthor = document.getElementById("txtName").value.trim();
      const newQuote = document.getElementById("txtQuote").value.trim();

      if (newAuthor !== "" && newQuote !== "") {
        quoteToUpdate.author = newAuthor;
        quoteToUpdate.quote = newQuote;
        quotelocalData[index] = quoteToUpdate;
        localStorage.setItem(localStorageKey, JSON.stringify(quotelocalData));
        renderQuotes(currentPage);
        document.getElementById("txtName").value = "";
        document.getElementById("txtQuote").value = "";
      } 
      else {
        alert("Author name and quote cannot be empty.");
      }
    });
  } 
  else {
    alert("Quote not found in local storage.you can not edit this.");
  }
};