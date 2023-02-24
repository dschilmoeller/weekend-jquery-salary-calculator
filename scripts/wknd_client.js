// note - Xconsole.log indicates console used for testing and found to be 
// working as expected.

$(document).ready(readyNow);

// starter variables:
// employee object array
let staff = [];

function readyNow() {
  console.log("DOM is locked, rocked, and ready to pop!");

  // click event handler that calls the different functions
  $('#addEmployeeBtn').on('click', addEmployee);

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
    let employee = {
      first: employeeFirstName,
      last: employeeLastName,
      id: employeeID,
      title: employeeTitle,
      salary: employeeSalary
    };

    // push to global staff variable
    staff.push(employee);
    console.log('employee being pushed:', employee)
    console.log('staff is now:', staff)

    // reset inputs
    resetInputFields()


  } else {
    // pop up alert to annoy users
    // alert('Please fill out all fields provided');

  }

  // Xtesting input
  // console.log('Employee Added:', employee)
  console.log(`First staff object status, easy reading version:
    First Name: ${staff.first}
    Last Name: ${staff.last}
    ID: ${staff.id}
    Title: ${staff.title}
    Salary: ${staff.salary}
  `)
  
  

  // Xtesting
  // console.log('Staff ATM:', staff)

  // rendering of DOM
  render();

} // end addEmployee


function resetInputFields(){
  // clear inputs
  $('#firstNameInput').val('');
  $('#lastNameInput').val('');
  $('#idInput').val(''); // caps are still weird.
  $('#titleInput').val('');
  $('#salaryInput').val('');
} // end resetInputFields

function render(){
  // Xconsole.log('Inside render.')

  // to do.
  // update the DOM
  // empty table and recreate headers
  $('.staff-table').empty()
  $('.staff-table').append(`
    <tr>
      <td>First Name</td>
      <td>Last Name</td>
      <td>ID</td>
      <td>Title</td>
      <td>Annual Salary</td>
      <td>Remove Employee</td>
    </tr>
  `)

  // loop through staff to add employees to table.
    for (let i=0; i<staff.length; i++) {
      // Xconsole.log('employee i#', i)
      $('.staff-table').append(`
      <tr id='${i}'>
        <td>${staff[i].first}</td>
        <td>${staff[i].last}</td>
        <td>${staff[i].id}</td>
        <td>${staff[i].title}</td>
        <td>${staff[i].salary}</td>
        <td>
          <button class="deleteBtn">
          Delete Employee
          </button>
        </td>
      </tr>
      `
    )}

}