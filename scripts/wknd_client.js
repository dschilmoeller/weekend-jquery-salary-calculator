$(document).ready(readyNow);

// starter variables:
// employee object array
let staff = [];

function readyNow() {
  console.log("DOM is locked, rocked, and ready to pop!");

  // click event handler that calls the different functions
  $('#addEmployeeBtn').on('click', addEmployee);
  $('.cars-table').on('click', '.deleteBtn', deleteCar);
} // end readyNow


// addEmployee Functino
function addEmployee() {
  // Xconsole.log('inside addEmployee')
  
  // 5 inputs need data from.
  employeeFirstName = $('#firstNameInput').val();
  employeeLastName = $('#lastNameInput').val();
  // formatting of acronyms feels weird. 
  // Surely it's not iDInput because that would be insane
  employeeID = $('#idInput').val(); 
  employeeTitle = $('#titleInput').val();
  employeeSalary = $('#salaryInput').val();
  
  // check inputs have values:
  if (employeeFirstName 
    && employeeLastName 
    && employeeID 
    && employeeTitle 
    && employeeTitle ) {
  // create object to hold variables entered
    let employee = [ {
      first: employeeFirstName,
      last: employeeLastName,
      id: employeeID,
      title: employeeTitle,
      salary: employeeSalary
    }];

    // push to global staff variable
    staff.push(employee);

    // reset inputs
    resetInputFields()


  } else {
    // pop up alert to annoy users
    alert('Please fill out all fields provided');

  }
  // Xtesting input
  // console.log('Your employee:', employee)
  // console.log(`Employee object status, easy reading version:
  //   First Name: ${employee[0].first}
  //   Last Name: ${employee[0].last}
  //   ID: ${employee[0].id}
  //   Title: ${employee[0].title}
  //   Salary: ${employee[0].salary}
  // `)
  
  

  // Xtesting
  // console.log('Staff ATM:', staff)


} // end addEmployee

function resetInputFields(){
  // clear inputs
  $('#firstNameInput').val('');
  $('#lastNameInput').val('');
  $('#idInput').val(''); // caps are still weird.
  $('#titleInput').val('');
  $('#salaryInput').val('');
} // end resetInputFields