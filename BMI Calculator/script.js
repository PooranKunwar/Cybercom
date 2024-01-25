function calculateBMI(){

    const height = document.querySelector("#height").value;
    const weight = document.querySelector("#weight").value;
    const result = document.querySelector("#result");

    if (height == "" || weight == "") {
        result.innerHTML = "Please enter valid numerical values for height and weight.";
        result.className = "error";
        return;
    }

    else if(!height || isNaN(height) || height < 0){
        result.innerText = "Please provide a valid Height!";
        result.className = "error";
        return;
    }

    else if(!weight || isNaN(weight) || weight < 0){
        result.innerText = "Please provide a valid Weight!";
        result.className = "error";
        return;
    }

    const bmi = (weight / ((height * height) / 10000)).toFixed(2);

    if(bmi < 18.5){
        result.innerText = `Under Weight : ${bmi}`;
        result.className = "underweight";
    }

    else if(bmi >= 18.5 && bmi < 24.9){
        result.innerText = `Normal : ${bmi}`;
        result.className = "normal";
    }

    else if(bmi >= 25 && bmi < 29.9){
        result.innerText = `Over Weight : ${bmi}`;
        result.className = "overweight";
    }

    else if(bmi >= 30 && bmi < 34.9){
        result.innerText = `Obesity (Class I) : ${bmi}`;
        result.className = "overweight";
    }

    else if(bmi >= 35.5 && bmi < 39.9){
        result.innerText = `Obesity (Class II) : ${bmi}`;
        result.className = "obese";
    }

    else{
        result.innerText = `Extreme Obesity: ${bmi}`;
        result.className = "obese";
    }

    
};