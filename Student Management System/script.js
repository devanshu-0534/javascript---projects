// // Import the student data from your JSON file
// import studentList from './student.json' with { type: 'json' };

// // Confirm data loaded correctly in console
// console.log(studentList[0].first_name); 


// // Function to render the students into the table
// function renderStudents(studentsArray) {
//     // 1. Target the tbody element by its ID
//     const tableBody = document.getElementById('students_list');
    
//     if (!tableBody) {
//         console.error("Error: tbody element with id 'students_list' not found!");
//         return; 
//     }

//     // 2. Map each student object to an HTML table row string
//     const htmlRows = studentsArray.map(student => {
//         // Determine the passing status text based on the boolean value
//         const passingStatusText = student.passing ? 'Passed' : 'Failed';
        
//         return `
//             <tr>
//                 <td>${student.id}</td>
//                 <td>
//                     <div class="student-info">
//                         <img src="${student.img_src}" alt="avatar"> 
//                         ${student.first_name} ${student.last_name}
//                     </div>
//                 </td>
//                 <td>${student.gender}</td>
//                 <td>${student.class}</td>
//                 <td>${student.marks}</td>
//                 <td>${passingStatusText}</td>
//                 <td>${student.email}</td>
//             </tr>
//         `;
//     });

//     // 3. Join the array of HTML strings and set it as the innerHTML of the tbody
//     // This will replace the placeholder <tr> you had initially in your HTML.
//     tableBody.innerHTML = htmlRows.join(' ');
// }

// // Call the function to display the initial data once the script runs
// renderStudents(studentList);


import studentList from './student.json' with { type: 'json' };

const tableBody = document.getElementById('students_list');

function renderStudents(students) {
    tableBody.innerHTML = students.map(student => {
        return `
            <tr>
                <td>${student.id}</td>
                <td>
                    <div class="student-info">
                        <img src="${student.img_src}" alt="avatar">
                        ${student.first_name} ${student.last_name}
                    </div>
                </td>
                <td>${student.gender}</td>
                <td>${student.class}</td>
                <td>${student.marks}</td>
                <td>${student.passing ? 'Passed' : 'Failed'}</td>
                <td>${student.email}</td>
            </tr>
        `;
    }).join('');
}

renderStudents(studentList);




const searchInput = document.getElementById('search');
const searchButton = document.querySelector('.search-bar button');

// SEARCH FUNCTION
function searchStudents() {
    const query = searchInput.value.toLowerCase().trim();

    const filteredStudents = studentList.filter(student => {
        const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();

        return (
            fullName.includes(query) ||
            student.email.toLowerCase().includes(query) ||
            student.gender.toLowerCase().includes(query) ||
            student.city.toLowerCase().includes(query)
        );
    });

    renderStudents(filteredStudents);
}

// BUTTON CLICK
searchButton.addEventListener('click', searchStudents);

// ENTER KEY SUPPORT
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchStudents();
    }
});


const sortAZBtn = document.getElementById('sort-az');
const sortZABtn = document.getElementById('sort-za');
const sortMarksBtn = document.getElementById('sort-marks');
const sortPassingBtn = document.getElementById('sort-passing');
const sortClassBtn = document.getElementById('sort-class');
const sortGenderBtn = document.getElementById('sort-gender');

sortAZBtn.addEventListener('click', () => {
    const sorted = [...studentList].sort((a, b) => {
        const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    renderStudents(sorted);
});

sortZABtn.addEventListener('click', () => {
    const sorted = [...studentList].sort((a, b) => {
        const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        return nameB.localeCompare(nameA);
    });

    renderStudents(sorted);
});

sortMarksBtn.addEventListener('click', () => {
    const sorted = [...studentList].sort((a, b) => a.marks - b.marks);
    renderStudents(sorted);
});

sortPassingBtn.addEventListener('click', () => {
    const passedStudents = studentList.filter(student => student.passing === true);
    renderStudents(passedStudents);
});

sortClassBtn.addEventListener('click', () => {
    const sorted = [...studentList].sort((a, b) => a.class - b.class);
    renderStudents(sorted);
});


// Gender Button Logic Helper Function
function studentRow(student) {
    return `
        <tr>
            <td>${student.id}</td>
            <td>
                <div class="student-info">
                    <img src="${student.img_src}" alt="avatar">
                    ${student.first_name} ${student.last_name}
                </div>
            </td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? 'Passed' : 'Failed'}</td>
            <td>${student.email}</td>
        </tr>
    `;
}
sortGenderBtn.addEventListener('click', () => {
    const males = studentList.filter(s => s.gender === 'Male');
    const females = studentList.filter(s => s.gender === 'Female');

    tableBody.innerHTML = `
        <tr>
            <td colspan="7" style="font-weight:bold; background:#ccc;">
                Male Students
            </td>
        </tr>
        ${males.map(studentRow).join('')}

        <tr>
            <td colspan="7" style="font-weight:bold; background:#ccc;">
                Female Students
            </td>
        </tr>
        ${females.map(studentRow).join('')}
    `;
});
