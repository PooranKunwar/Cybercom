// XHR


//getData
const getDataUsingXhr = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://reqres.in/api/users", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const responseData = JSON.parse(xhr.responseText);
                console.log(responseData);
            } else {
                console.error('Request failed with status:', xhr.status);
            }
        }
    };
    xhr.send();
};

//getSpecificData
const getSpecificDataUsingXhr = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://reqres.in/api/users/2", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const responseData = JSON.parse(xhr.responseText);
                console.log(responseData);
            } else {
                console.error('Request failed with status:', xhr.status);
            }
        }
    };
    xhr.send();
};

//createData
const createDataUsingXhr = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://reqres.in/api/users/2", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 201) {
                const responseData = JSON.parse(xhr.responseText);
                console.log(responseData);
            } else {
                console.error('Request failed with status:', xhr.status);
            }
        }
    };
    xhr.send(
        {
            name: "Pooran",
            job: "internship",
        }
    );
};

//updateData
const updateDataUsingXhr = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://reqres.in/api/users/2", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const responseData = JSON.parse(xhr.responseText);
                console.log(responseData);
            } else {
                console.error('Request failed with status:', xhr.status);
            }
        }
    };
    xhr.send(
        {
            name: "Pooran",
            job: "internship",
        }
    );
};

//deleteData
const deleteDataUsingXhr = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "https://reqres.in/api/users/4", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 204) {
                console.log('Request successful. No content returned.');
            } else {
                console.error('Request failed with status:', xhr.status);
            }
        }
    };
    xhr.send();
};


// Ajax


$(document).ready(function () {

    //getData
    $('#getDataUsingAjax').click(function () {
        $.ajax({
            url: "https://reqres.in/api/users",
            type: "GET",
            success: function (response) {
                console.log("Request Successful:", response);
            },
            error: function (xhr, status, error) {
                console.error("Error making request:", error);
            }
        });
    });

    //getSpecificData
    $('#getSpecificDataUsingAjax').click(function () {
        $.ajax({
            url: "https://reqres.in/api/users/2",
            type: "GET",
            success: function (response) {
                console.log("Request Successful:", response);
            },
            error: function (xhr, status, error) {
                console.error("Error making request:", error);
            }
        });
    });

    //createData
    $('#createDataUsingAjax').click(function () {
        $.ajax({
            url: "https://reqres.in/api/users",
            type: "POST",
            data: {
                name: "John",
                age: 30
            },
            success: function (response) {
                console.log("Request Successful:", response);
            },
            error: function (xhr, status, error) {
                console.error("Error making request:", error);
            }
        });
    });

    //updateData
    $('#updateDataUsingAjax').click(function () {
        $.ajax({
            url: "https://reqres.in/api/users/3",
            type: "PUT",
            data: {
                name: "Updated John",
                age: 35
            },
            success: function (response) {
                console.log("Request Successful:", response);
            },
            error: function (xhr, status, error) {
                console.error("Error making request:", error);
            }
        });
    });

    //deleteData
    $('#deleteDataUsingAjax').click(function () {
        $.ajax({
            url: "https://reqres.in/api/users/2",
            type: "DELETE",
            success: function (response) {
                console.log("Request Successful:", response);
            },
            error: function (xhr, status, error) {
                console.error("Error making request:", error);
            }
        });
    });

});


// Fetch


//getData
const getDataUsingFetch = () => {

    fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "GET",
        headers: {
            "Content-Type": "application/app"
        },
    })

        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            displayData(data);
        })
        .catch((error) => console.error(error))
}

//displayApiData
function displayData(data) {
    const list = document.createElement('ul');
    data.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${todo.id}, Title: ${todo.title}, Completed: ${todo.completed}`;
        list.appendChild(listItem);
    });
    document.body.appendChild(list);
}

//getSpecificData
const getSpecificDataUsingFetch = () => {

    fetch("https://reqres.in/api/users/2", {
        method: "GET",
        headers: {
            "Content-Type": "application/app"
        },
    })

        .then((response) => rseponse.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error))
}

//createData
const createDataUsingFetch = () => {

    fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/app"
        },
        body: {
            name: "Pooran",
            job: "Intern",
        }
    })

        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error))
}

//updateData
const updateDataUsingFetch = () => {

    fetch("https://reqres.in/api/users/2", {
        method: "PUT",
        body: {
            name: "Pooran",
            job: "Intern",
        },
    })

        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error))
}

//deleteData
const deleteDataUsingFetch = () => {

    fetch("https://reqres.in/api/users/2", {
        method: "DELETE",
    })

        .then(response => {
            if (response.ok) {
                console.log('Data deleted successfully');
            } else {
                console.error('Failed to delete data');
            }
        })
        .catch(error => console.error('Error deleting data:', error));
}