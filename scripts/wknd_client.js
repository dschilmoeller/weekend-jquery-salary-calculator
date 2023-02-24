// note - Xconsole.log indicates console used for testing and found to be 
// working as expected.

$(document).ready(readyNow);

// starter variables:
// employee object array
let staff = [];
let salaryTotal = 0;

function readyNow() {
  console.log("DOM is locked, rocked, and ready to pop!");

  // click event handler for adding employee (static)
  $('#addEmployeeBtn').on('click', addEmployee);
  // click event handler for removing employee (dynamic)
  $('.staff-table').on('click', '.deleteBtn', pinkSlipper);
  // initial render
  render()
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
    // Xconsole.log('employee being pushed:', employee)
    // Xconsole.log('staff is now:', staff)

    // reset inputs
    resetInputFields()


  } else {
    // pop up alert to annoy users
    // alert('Please fill out all fields provided');

  }

  // Xtesting input
  // console.log('Employee Added:', employee)
  console.log(`First staff object status, easy reading version:
    First Name: ${staff[0].first}
    Last Name: ${staff[0].last}
    ID: ${staff[0].id}
    Title: ${staff[0].title}
    Salary: ${staff[0].salary}
  `)
  
  

  // Xtesting
  // console.log('Staff ATM:', staff)

  // rendering of DOM
  render();

} // end addEmployee

function pinkSlipper() {
  // Xconsole.log('inside remove employee.');
  
  let newStaffRoster = []
  let employeeToRemove = Number ($(this).parent().parent().attr('id'));
  // playing with finding things dynamically.
  // console.log('this is', $(this))
  // console.log('This id is', $(this).parent().parent().attr('id'))
  for (i=0; i<staff.length; i++) {
    if (employeeToRemove !== i) {
      console.log('Staff with internal ID', employeeToRemove, 'will be removed');
      newStaffRoster.push(staff[i]);
    }
  }
  // change staff to reflect the new order
  staff = newStaffRoster;

  // console.log('Staff is now', staff);
  
  // render staff without the removed employee.
  render()
}

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
  setUpTable();
  // loop through staff to add employees to table.
    for (let i=0; i<staff.length; i++) {
      // Xconsole.log('employee i#', i)
      $('.staff-table').append(`
      <tr id='${i}'>
        <td class='staff-table-entry'>${staff[i].first}</td>
        <td class='staff-table-entry'>${staff[i].last}</td>
        <td class='staff-table-entry'>${staff[i].id}</td>
        <td class='staff-table-entry'>${staff[i].title}</td>
        <td class='staff-sal-entry'>$ ${staff[i].salary}</td>
        <td class='staff-table-entry'>
          <button class='deleteBtn'>
          Delete Employee
          </button>
        </td>
      </tr>
      `
    )}

  setUpTotalSalary();
}

function setUpTable() {
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

}

function setUpTotalSalary() {
  console.log('inside setUpTotalSalary');
  let salaryAmount = 0

  for (employee of staff) {  
    salaryAmount += Number(employee.salary);
    console.log('Salary is', salaryAmount)
  }
  // pull combined salary's into total variable.
  // may not be needed.
  $('#totalSalary').html(`
  <h3 id="totalSalary">Total Monthly: $${salaryAmount}.00</h3>
  `)
}