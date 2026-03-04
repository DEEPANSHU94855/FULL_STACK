const fs = require("fs");
const readline = require("readline");

const DATA_FILE = "employee.json";

let employees = [];

if (fs.existsSync(DATA_FILE)) {
    employees = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function saveEmployees() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(employees, null, 2));
}

function showMenu() {
    console.log("\n1. Add Employee");
    console.log("2. View Employees");
    console.log("3. Update Employee");
    console.log("4. Delete Employee");
    console.log("5. Exit");

    rl.question("Enter your choice: ", handleMenu);
}

function handleMenu(choice) {
    switch (choice) {
        case "1":
            addEmployee();
            break;
        case "2":
            viewEmployees();
            break;
        case "3":
            updateEmployee();
            break;
        case "4":
            deleteEmployee();
            break;
        case "5":
            rl.close();
            break;
        default:
            console.log("Invalid choice");
            showMenu();
    }
}

function addEmployee() {
    rl.question("Enter ID: ", id => {

        if (!id || employees.find(emp => emp.id == id)) {
            console.log("Invalid or Duplicate ID");
            return showMenu();
        }

        rl.question("Enter Name: ", name => {

            if (!name.trim()) {
                console.log("Name cannot be empty");
                return showMenu();
            }

            rl.question("Enter Department: ", dept => {

                employees.push({
                    id: id,
                    name: name,
                    department: dept
                });

                saveEmployees();
                console.log("Employee added successfully");
                showMenu();
            });
        });
    });
}

function viewEmployees() {
    if (employees.length === 0) {
        console.log("No employees found");
    } else {
        employees.forEach(emp => {
            console.log(
                "ID:", emp.id,
                "Name:", emp.name,
                "Department:", emp.department
            );
        });
    }
    showMenu();
}

function updateEmployee() {
    rl.question("Enter Employee ID to update: ", id => {

        let emp = employees.find(e => e.id == id);

        if (!emp) {
            console.log("Employee not found");
            return showMenu();
        }

        rl.question("Enter New Name: ", name => {
            rl.question("Enter New Department: ", dept => {

                if (name.trim()) emp.name = name;
                if (dept.trim()) emp.department = dept;

                saveEmployees();
                console.log("Employee updated successfully");
                showMenu();
            });
        });
    });
}

function deleteEmployee() {
    rl.question("Enter Employee ID to delete: ", id => {

        let index = employees.findIndex(e => e.id == id);

        if (index === -1) {
            console.log("Employee not found");
        } else {
            employees.splice(index, 1);
            saveEmployees();
            console.log("Employee deleted successfully");
        }

        showMenu();
    });
}

showMenu();