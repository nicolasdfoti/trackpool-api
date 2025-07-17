const submitButton = document.getElementById("dashboard-submit");
const form = document.getElementById("dashboard-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userName = document.getElementById("dashboard-name").value;
    const userEmail = document.getElementById("dashboard-email").value;
    const userPlan = document.getElementById("dashboard-select").value;
    const userDate = document.getElementById("dashboard-date").value;
    const userPackage = document.getElementById("dashboard-textarea").value;
    const userAdditional = document.getElementById("dashboard-additional").value;

    const formData = {
        "name": userName,
        "email": userEmail,
        "plan": userPlan,
        "date": userDate,
        "package": userPackage,
        "additional": userAdditional
    }

    try {

        const response = await fetch("https://trackpool-api.onrender.com/loads", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.status === 204) {
            console.log("Saved successfully!");
        } else {
            const result = await response.json();
            console.error("Unexpected response:", result);
        }

    } catch (error) {
        console.error("Error:", error);
    }
})