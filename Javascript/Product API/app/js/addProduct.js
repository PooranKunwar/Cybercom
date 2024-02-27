function validateForm() {
    let isValid = true;

    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.textContent = '');

    const titleInput = document.getElementById('title');
    const titleError = document.getElementById('title-error');
    if (!titleInput.value.trim()) {
        titleError.textContent = 'Title is required';
        isValid = false;
    }

    const priceInput = document.getElementById('price');
    const priceError = document.getElementById('price-error');
    if (!priceInput.value.trim()) {
        priceError.textContent = 'Price is required';
        isValid = false;
    } else if (isNaN(priceInput.value.trim())) {
        priceError.textContent = 'Price must be a number';
        isValid = false;
    }

    const descriptionInput = document.getElementById('description');
    const descriptionError = document.getElementById('description-error');
    if (!descriptionInput.value.trim()) {
        descriptionError.textContent = 'Description is required';
        isValid = false;
    }

    const categoryIdInput = document.getElementById('categoryId');
    const categoryIdError = document.getElementById('categoryId-error');
    if (!categoryIdInput.value.trim()) {
        categoryIdError.textContent = 'Category is required';
        isValid = false;
    }

    const imagesInput = document.getElementById('images');
    const imagesError = document.getElementById('images-error');
    if (!imagesInput.value.trim()) {
        imagesError.textContent = 'Images are required';
        isValid = false;
    }

    return isValid;
}

async function populateCategories() {
    const categorySelect = document.getElementById("categoryId");

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

populateCategories();


async function addProduct() {
    const titleInput = document.getElementById("title");
    const priceInput = document.getElementById("price");
    const descriptionInput = document.getElementById("description");
    const categoryIdInput = document.getElementById("categoryId");
    const imagesInput = document.getElementById("images");

    const title = titleInput.value;
    const price = priceInput.value;
    const description = descriptionInput.value;
    const categoryId = categoryIdInput.value;
    const images = imagesInput.value.split(",");

    const url = "https://api.escuelajs.co/api/v1/products/";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                price,
                description,
                categoryId,
                images
            })
        });

        if (response.ok) {
            alert("Product added successfully!");
            clearFormFields();
        } else {
            const errorMessage = await response.text();
            alert(`Failed to add product: ${errorMessage}`);
        }
    } catch (error) {
        console.error("Error adding product:", error);
        alert("An error occurred while adding the product. Please try again later.");
    }
}

function clearFormFields() {
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";
    document.getElementById("categoryId").value = "";
    document.getElementById("images").value = "";
}


document.getElementById("update-form").addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
        addProduct();
    }
});