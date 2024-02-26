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
        categoryIdError.textContent = 'Category ID is required';
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

async function addProduct() {
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const categoryId = document.getElementById("categoryId").value;
    const images = document.getElementById("images").value.split(",");

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
            window.location.href = "displayProducts.html";
        } else {
            const errorMessage = await response.text();
            alert(`Failed to add product: ${errorMessage}`);
        }
    } catch (error) {
        console.error("Error adding product:", error);
        alert("An error occurred while adding the product. Please try again later.");
    }
}

document.getElementById("update-form").addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
        addProduct();
    }
});