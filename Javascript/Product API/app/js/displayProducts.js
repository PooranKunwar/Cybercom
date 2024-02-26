let currentPage = 1;
const limit = 12;
let totalPages = 1;

async function fetchProduct(offset, limit) {
    const url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`;

    const container = document.getElementById("product-container");
    container.innerHTML = "";

    try {
        const response = await fetch(url);
        const products = await response.json();
        displayProductsForPage(products);
    } catch (error) {
        console.error(error);
    }
}

function displayProductsForPage(products) {
    const container = document.getElementById("product-container");

    products.forEach((product) => {
        const createDiv = document.createElement("div");
        createDiv.classList.add("card");
        // <h4>Category: ${product.category.name}</h4>
        // <img src="${product.images[0]}" alt="Product"></img>
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

async function deleteProduct(productId) {
    const confirmation = confirm("Are you sure you want to delete this product?");
    
    if (confirmation) {
        const url = `https://api.escuelajs.co/api/v1/products/${productId}`;

        try {
            const response = await fetch(url, {
                method: "DELETE"
            });

            if (response.ok) {
                fetchProduct((currentPage - 1) * limit, limit);
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


async function calculateTotalPages() {
    const url = `https://api.escuelajs.co/api/v1/products`;

    try {
        const response = await fetch(url);
        const products = await response.json();
        totalPages = Math.ceil(products.length / limit);
        displayPaginationButtons();
    } 
    catch (error) {
        console.error(error);
    }
}

function displayPaginationButtons() {
    const paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("pagination-btn");
        button.addEventListener("click", () => {
            currentPage = i;
            fetchProduct((currentPage - 1) * limit, limit);
        });
        paginationContainer.appendChild(button);
    }
}


window.addEventListener("DOMContentLoaded", async () => {
    fetchProduct((currentPage - 1) * limit, limit);
    calculateTotalPages();
});

