class BMICalculator {
    constructor() {
      this.calculateBtn = document.getElementById("calculateBtn");
      this.calculateBtn.addEventListener("click", this.calculateBMI.bind(this));
    }
  
    calculateBMI() {
      const weightInput = document.getElementById("weight");
      const heightInput = document.getElementById("height");
      const resultDiv = document.getElementById("result");
  
      const weight = weightInput.value;
      const height = heightInput.value / 100; // convert cm to meters
  
      if (weight > 0 && height > 0) {
        const bmi = weight / (height * height);
        const roundedBMI = bmi.toFixed(2);
        resultDiv.innerText = `Your BMI is: ${roundedBMI}`;
      } else {
        resultDiv.innerText = "Please enter valid values for weight and height.";
      }
    }
  }
  
  const bmiCalculator = new BMICalculator();  
