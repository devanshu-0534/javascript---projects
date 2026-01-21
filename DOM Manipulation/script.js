let count = 0;

const countDiv = document.getElementById("count");
const errorDiv = document.getElementById("error");
const incrementBtn = document.getElementById("incrementBtn");
const decrementBtn = document.getElementById("decrementBtn");
const clearBtn = document.getElementById("clearBtn");

function updateUI() {
    countDiv.textContent = `Your Current Count is : ${count}`;

    if (count > 0) {
    clearBtn.style.display = "inline-block";
    } else {
    clearBtn.style.display = "none";
    }
}

incrementBtn.addEventListener("click", () => {
    count++;
    errorDiv.style.display = "none";
    updateUI();
});

decrementBtn.addEventListener("click", () => {
    if (count === 0) {
    errorDiv.style.display = "block";
    } else {
    count--;
    errorDiv.style.display = "none";
    updateUI();
    }
});

clearBtn.addEventListener("click", () => {
    count = 0;
    errorDiv.style.display = "none";
    updateUI();
});