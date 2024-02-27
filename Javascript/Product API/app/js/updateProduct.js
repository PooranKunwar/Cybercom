const validateProductTitle = () => {
    var productTitleInput = document.getElementById("title");
    var productTitleError = document.getElementById("title-error");
    var productTitle = productTitleInput.value.trim();
  
    if (productTitle === "") {
      productTitleError.textContent = "Please enter product title";
      return false;
    } else {
      productTitleError.textContent = "";
      return true;
    }
};
  
const validateProductPrice = () => {
    var productPriceInput = document.getElementById("price");
    var productPriceError = document.getElementById("price-error");
    var productPrice = productPriceInput.value.trim();
  
    if (productPrice === "") {
      productPriceError.textContent = "Please enter a valid price";
      return false;
    } else {
      productPriceError.textContent = "";
      return true;
    }
};
  
const validateProductDescription = () => {
    var productDescriptionInput = document.getElementById("description");
    var productDescriptionError = document.getElementById("description-error");
    var productDescription = productDescriptionInput.value.trim();
  
    if (productDescription === "") {
      productDescriptionError.textContent = "Please enter product description";
      return false;
    } else {
      productDescriptionError.textContent = "";
      return true;
    }
};

const validateForm = () => {
    var isProductTitleValid = validateProductTitle();
    var isProductPriceValid = validateProductPrice();
    var isProductDescriptionValid = validateProductDescription();
  
    return (
      isProductTitleValid && isProductPriceValid && isProductDescriptionValid
    );
};

const fetchProductDetails = (productId) => {
    const url = `https://api.escuelajs.co/api/v1/products/${productId}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        return response.json();
      })
      .then((product) => {
        fillFormWithProductDetails(product);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        alert(
          "An error occurred while fetching product details. Please try again later."
        );
      });
};
  
const fillFormWithProductDetails = (product) => {
    document.getElementById("title").value = product.title;
    document.getElementById("price").value = product.price;
    document.getElementById("description").value = product.description;
};
  
const submitUpdatedProduct = (productId) => {
    const productTitle = document.getElementById("title").value;
    const productPrice = document.getElementById("price").value;
    const productDescription =
      document.getElementById("description").value;
  
    const url = `https://api.escuelajs.co/api/v1/products/${productId}`;
    const data = {
      title: productTitle,
      price: productPrice,
      description: productDescription,
    };
  
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update product data");
        }
        alert("Product data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating product data:", error);
        alert(
          "An error occurred while updating product data. Please try again later."
        );
      });
};

  
function submitForm() {
    if (validateForm()) {
      const productId = new URLSearchParams(window.location.search).get("id");
      if (productId) {
        submitUpdatedProduct(productId);
      } else {
        console.error("Product ID not provided in the URL.");
        alert("Product ID not provided in the URL. Please try again.");
      }
    } else {
      alert("Form data is invalid. Please check and try again.");
    }
}
  
document.getElementById("update-form").addEventListener("submit", function (event) {
    event.preventDefault();
    submitForm();
});
  
window.addEventListener("DOMContentLoaded", () => {
    const productId = new URLSearchParams(window.location.search).get("id");
    if (productId) {
      fetchProductDetails(productId);
    } else {
      console.error("Product ID not provided in the URL.");
      alert("Product ID not provided in the URL. Please try again.");
    }
});
