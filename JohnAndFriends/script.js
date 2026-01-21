let arr = [
  { id: 1, name: "john", age: "18", profession: "developer" },
  { id: 2, name: "jack", age: "20", profession: "developer" },
  { id: 3, name: "karen", age: "19", profession: "admin" },
];

// Part 1: Print Developers by Map
function PrintDeveloperbyMap() {
  arr.map((employee) => {
    if (employee.profession === "developer") {
      console.log(employee);
    }
  });
}

// Part 2: Print Developers by ForEach
function PrintDeveloperbyForEach() {
  arr.forEach((employee) => {
    if (employee.profession === "developer") {
      console.log(employee);
    }
  });
}

// Part 3: Add Data
function addData() {
  const newEmployee = {
    id: 4,
    name: "susan",
    age: "20",
    profession: "intern",
  };

  arr.push(newEmployee);
  console.log(arr);
}

// Part 4: Remove Admin
function removeAdmin() {
  const filteredArr = arr.filter(
    (employee) => employee.profession !== "admin"
  );
  console.log(filteredArr);
}

// Part 5: Concatenate Array
function concatenateArray() {
  const newArr = [
    { id: 5, name: "alex", age: "22", profession: "designer" },
    { id: 6, name: "emma", age: "21", profession: "tester" },
    { id: 7, name: "mike", age: "23", profession: "manager" },
  ];

  const combinedArray = arr.concat(newArr);
  console.log(combinedArray);
}