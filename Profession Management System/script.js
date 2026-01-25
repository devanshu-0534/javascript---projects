const submitBtn = document.getElementById("submitButton");
const container = document.getElementById("container");
const msgRef = document.getElementById("msg_ref");
const nameInput = document.getElementById("name");
const professionInput = document.getElementById("profession");
const ageInput = document.getElementById("age");
const dataNotFoundMsg = document.querySelector('.data_not_found');


// Function to display messages (error/success)
function displayMessage(message, isError) {
    msgRef.textContent = message;
    msgRef.className = isError ? 'msg error-msg' : 'msg success-msg';
}

submitBtn.addEventListener("click", function(e){
    e.preventDefault();

    const name = nameInput.value.trim();
    const profession = professionInput.value.trim();
    const age = ageInput.value.trim();

    // 1. Validation Logic
    if(name === "" || profession === "" || age === ""){
        displayMessage('Error: Please make sure all fields are filled before adding in an employee list.', true);
        return; // Stop execution if validation fails
    }

    // 2. If validation passes
    displayMessage('Success - Employee Added!', false);

    // 3. Hide 'Data Not Found' message
    if (dataNotFoundMsg) {
        dataNotFoundMsg.style.display = 'none';
    }

    // Create the new employee row container
    const employeeRow = document.createElement("div");
    employeeRow.classList.add('employee-row');

    // Use a complex innerHTML string to structure the separate parts
    employeeRow.innerHTML = `
        <div class="employee-entry">
            <span>Name: ${name}</span>
            <span>Profession: ${profession}</span>
            <span>Age: ${age}</span>
        </div>
        <div class="delete-btn-wrapper">
            <button class="delete-btn">Delete User</button>
        </div>
    `;
    
    container.appendChild(employeeRow);

    // Clear inputs after successful addition
    nameInput.value = "";
    professionInput.value = "";
    ageInput.value = "";
});

// 4. Event delegation for delete buttons
container.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete-btn")) {
        // Remove the grand-parent element (the entire employee-row)
        e.target.closest('.employee-row').remove(); 

        // 5. Check if container is empty after deletion and show 'Data Not Found'
        // We filter the list of children to only count elements that are employee rows
        const remainingEmployees = Array.from(container.children).filter(child => child.classList.contains('employee-row'));

        if (remainingEmployees.length === 0) {
             if (dataNotFoundMsg) {
                 dataNotFoundMsg.style.display = 'block';
             }
        }
      }
});
