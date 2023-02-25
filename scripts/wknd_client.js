// note - Xconsole.log indicates console used for testing and found to be 
// working as expected.

$(document).ready(readyNow);

// starter variables:
// employee object array
// salary total to display below table.

let staff = [];
let salaryTotal = 0;

function readyNow() {
  //console.log("DOM is locked, rocked, and ready to pop!");

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
  
  // 5 inputs to retrieve entered employee data
  employeeFirstName = $('#firstNameInput').val();
  employeeLastName = $('#lastNameInput').val();
  // formatting of acronyms feels weird. 
  // Surely it's not iDInput because that would be insane
  employeeID = $('#idInput').val(); 
  employeeTitle = $('#titleInput').val();
  employeeSalary = $('#salaryInput').val();
  
  
  // check input fields aren't empty:
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
    alert('Please fill out all fields provided');

  }

  // testing input
  // Xconsole.log('Employee Added:', employee)
  // Xconsole.log(`First staff object status, easy reading version:
  //   First Name: ${staff[0].first}
  //   Last Name: ${staff[0].last}
  //   ID: ${staff[0].id}
  //   Title: ${staff[0].title}
  //   Salary: ${staff[0].salary}
  // `)
  
  

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

function render(){
  // Xconsole.log('Inside render.')

  // to do.
  // update the DOM
  setUpTable();
  // loop through staff to add employees to table.
    for (let i=0; i<staff.length; i++) {
      // Xconsole.log('employee i#', i)
      moddedEmployeeSalary = staff[i].salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      $('.staff-table').append(`
      <tr id='${i}'>
        <td class='staff-table-entry'>${staff[i].first}</td>
        <td class='staff-table-entry'>${staff[i].last}</td>
        <td class='staff-table-entry'>${staff[i].id}</td>
        <td class='staff-table-entry'>${staff[i].title}</td>
        <td class='staff-sal-entry'>$ ${moddedEmployeeSalary}</td>
        <td class='staff-table-entry'>
          <button class='deleteBtn'>
          Delete Employee
          </button>
        </td>
      </tr>
      `
    )}

  // create total salary below table.
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
  // console.log('inside setUpTotalSalary');
  // initial annual salary variable to be manipulated below
  let annualSalaryAmount = 0

  // loop throuhg staff list, retrieve salaries, divide by 12 months
  for (employee of staff) {  
    annualSalaryAmount += Number(employee.salary);

    //console.log('annual salary is', annualSalaryAmount)
  }

  // total monthly salary variable initialization
  let monthlySalaryAmount = 0
  // convert annual salary total to monthly amount
  monthlySalaryAmount = (annualSalaryAmount / 12).toFixed(2)
  // after mucking about with toLocaleString for awhile with no luck, the below puts commas where they go.
  // found on stack overflow. Cannot make heads or tails of it personally but seems to work.
  moddedMonthly = monthlySalaryAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // check if monthly salary amount is > or < 20,000 and change background color
  // as appropriate
  if (monthlySalaryAmount > 20000) {
    $('#totalSalary').css('background-color', 'red');
    
  }

  if (monthlySalaryAmount < 20000) {
    $('#totalSalary').css('background-color', 'white');
  }

  // pull combined monthly salaries into total variable.
  // replace existing total salary displayed with current monthly
  $('#totalSalary').html(`
  <h3 id="totalSalary">Total Monthly: $${moddedMonthly}</h3>
  `)
}