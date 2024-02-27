let currentPage = 1;
const limit = 12;
let totalPages = 1;
let productsData = [];

function displayProductsForPage(products) {
    const container = document.getElementById("product-container");
    container.innerHTML = "";
    // <img src="${product.images[0]}" alt="Product"></img>
    products.forEach((product) => {
        const createDiv = document.createElement("div");
        createDiv.classList.add("card");
        createDiv.innerHTML = `
            <h3 class="category">Category: ${product.category.name}</h3 >
            <h3>${product.title}</h3>
            
            <p>${product.description}</p>
            <p class="price">Price: $${product.price}/-</p>
            <div class="button-container">
                <button class="edit-btn" onclick="editProduct(${product.id})">Edit</button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        `;
        container.appendChild(createDiv);
    });
}

async function populateCategories() {
    const categorySelect = document.getElementById("category-select");

    try {
        const response = await fetch("https://api.escuelajs.co/api/v1/categories");
        const categories = await response.json();

        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

document.getElementById("category-select").addEventListener("change", async () => {
    const selectedCategoryId = document.getElementById("category-select").value;
    
    const container = document.getElementById("product-container");
    container.innerHTML = "";

    try {
        let url = "https://api.escuelajs.co/api/v1/products/";
        
        if (selectedCategoryId !== "") {
            url += `?categoryId=${selectedCategoryId}`;
        }else{
            alert("Product is not aviable")
        }

        const response = await fetch(url);
        const products = await response.json();
        displayProductsForPage(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
});

document.getElementById("sort-select").addEventListener("change", () => {
    applySorting();
    displayProductsForPage(productsData);
});

function applySorting() {
    const sortBy = document.getElementById("sort-select").value;
    if (sortBy === "price_asc") {
        sortProductsByPriceAscending();
    } else if (sortBy === "price_desc") {
        sortProductsByPriceDescending();
    } else if (sortBy === "alphabetical_asc") {
        sortProductsByAlphabeticalAscending();
    } else if (sortBy === "alphabetical_desc") {
        sortProductsByAlphabeticalDescending();
    }
}

function sortProductsByPriceAscending() {
    productsData.sort((a, b) => a.price - b.price);
}

function sortProductsByPriceDescending() {
    productsData.sort((a, b) => b.price - a.price);
}

function sortProductsByAlphabeticalAscending() {
    productsData.sort((a, b) => a.title.localeCompare(b.title));
    displayProductsForPage(productsData);
}

function sortProductsByAlphabeticalDescending() {
    productsData.sort((a, b) => b.title.localeCompare(a.title));
    displayProductsForPage(productsData);
}

async function deleteProduct(productId) {
    const confirmation = confirm("Are you sure you want to delete this product?");

    if (confirmation) {
        const url = `https://api.escuelajs.co/api/v1/products/${productId}`;

        try {
            const response = await fetch(url, {
                method: "DELETE"
            });

            if (response.ok) {
                fetchProducts((currentPage - 1) * limit, limit);
                alert("Product deleted successfully!");
            } else {
                alert("Failed to delete product.");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("An error occurred while deleting the product. Please try again later.");
        }
    }
}

async function editProduct(productId) {
    window.location.href = `updateProduct.html?id=${productId}`;
}

function addProduct() {
    window.location.href = `addProduct.html`;
}

async function searchProducts() {
    const searchInput = document.getElementById("search-input").value.trim();

    const url = `https://api.escuelajs.co/api/v1/products?title=${encodeURIComponent(searchInput)}`;

    const container = document.getElementById("product-container");
    container.innerHTML = "";

    try {
        const response = await fetch(url);
        const products = await response.json();
        if (products.length === 0) {
            alert("No products found with the given title.");
            return;
        }
        displayProductsForPage(products);
    } catch (error) {
        console.error(error);
    }
}

async function fetchProducts(offset, limit) {
    const url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`;

    const container = document.getElementById("product-container");
    container.innerHTML = "";

    try {
        const response = await fetch(url);
        const products = await response.json();
        productsData = products;
        applySorting();
        displayProductsForPage(products);
    } catch (error) {
        console.error(error);
    }
}

function calculateTotalPages() {
    const url = `https://api.escuelajs.co/api/v1/products`;

    fetch(url)
        .then(response => response.json())
        .then(products => {
            totalPages = Math.ceil(products.length / limit);
            displayPaginationButtons();
        })
        .catch(error => {
            console.error(error);
        });
}

function displayPaginationButtons() {
    const paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const button = createPaginationButton(i, i.toString());
        paginationContainer.appendChild(button);
    }
}

function createPaginationButton(page, label) {
    const button = document.createElement("button");
    button.textContent = label;
    button.classList.add("pagination-btn");
    button.addEventListener("click", () => {
        currentPage = page;
        fetchProducts((currentPage - 1) * limit, limit);
    });

    if (page <= 0 || page > totalPages) {
        button.disabled = true;
    }

    return button;
}

populateCategories();

window.addEventListener("DOMContentLoaded", async () => {
    fetchProducts(0, limit);
    calculateTotalPages();
});
