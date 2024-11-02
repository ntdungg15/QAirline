// bookticket.js

document.addEventListener("DOMContentLoaded", () => {
    // Get element references
    const roundTripRadio = document.getElementById("roundTripRadio");
    const oneWayRadio = document.getElementById("oneWayRadio");
    const multiCityRadio = document.getElementById("multiCityRadio");
    const fromLocation = document.getElementById("fromLocation");
    const toLocation = document.getElementById("toLocation");
    const swapIcon = document.getElementById("swapIcon");
    const departDate = document.getElementById("departDate");
    const returnDate = document.getElementById("returnDate");
    const passengerClass = document.getElementById("passengerClass");
    const searchButton = document.getElementById("searchButton");
    const discountLink = document.querySelector(".discount-code a");

    // State to store the discount code
    let discountCode = "";

    // Handle flight type change
    roundTripRadio.addEventListener("change", () => {
        returnDate.disabled = false;
    });

    oneWayRadio.addEventListener("change", () => {
        returnDate.disabled = true;
        returnDate.value = ""; // Clear return date if disabled
    });

    multiCityRadio.addEventListener("change", () => {
        // Additional logic for multi-city if required
        returnDate.disabled = false;
    });

    // Handle location swap
    swapIcon.addEventListener("click", () => {
        const temp = fromLocation.value;
        fromLocation.value = toLocation.value;
        toLocation.value = temp;
    });

    // Handle discount code entry
    discountLink.addEventListener("click", () => {
        const code = prompt("Enter your discount code:");
        if (code) {
            discountCode = code;
            discountLink.innerText = `Mã ưu đãi: ${discountCode}`;
        }
    });

    // Handle form validation
    function validateForm() {
        if (!fromLocation.value || !toLocation.value) {
            alert("Please fill in both 'From' and 'To' locations.");
            return false;
        }
        if (!departDate.value) {
            alert("Please select a departure date.");
            return false;
        }
        if (roundTripRadio.checked && !returnDate.value) {
            alert("Please select a return date for a round-trip flight.");
            return false;
        }
        return true;
    }

    // Handle form submission
    searchButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default form submission

        // Validate form inputs
        if (!validateForm()) return;

        // Collect form data
        const formData = {
            flightType: roundTripRadio.checked
                ? "Khứ hồi"
                : oneWayRadio.checked
                    ? "Một chiều"
                    : "Nhiều thành phố",
            fromLocation: fromLocation.value,
            toLocation: toLocation.value,
            departDate: departDate.value,
            returnDate: returnDate.value,
            passengerClass: passengerClass.value,
            discountCode: discountCode
        };

        console.log("Form Submitted", formData);


        // Example: Make an API call here
        // fetch('/api/book-flight', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     alert("Flight booking successful!");
        // })
        // .catch(error => {
        //     console.error("Error booking flight:", error);
        // });
    });
});


