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







// function to add a car to the garage
function addNewCar() {
  // console.log('in addNewCar');
  
  // add in attributes
  carYear = $('#yearInput').val(),
  carMake = $('#makeInput').val(),
  carModel = $('#modelInput').val(),
  carImgUrl = $('#imgInput').val(),
  carPrice = $('#priceInput').val()

  // testing - typo in the textarea id source of carImgUrl not working.

  // console.log('car year:', carYear);
  // console.log('car image url:', carImgUrl);
  console.log('Car Price inside add loops is:', carPrice)
  
  // check for fields being filled
  if (carYear && carMake && carModel 
    && carImgUrl && carPrice) {
    let newCar = {
    year: carYear,
    make: carMake,
    model: carModel,
    imgUrl: carImgUrl,
    price: carPrice
    }
    // return newCar for inspection
    // console.log('newCar: ', newCar);
    
    // add newCar to array
    garage.push(newCar);

    // remove a space in the garage
    garageSpacesAvailable -= 1;

    // moved resetInputfields to this location so fields don't empty out if alert
    // is produced from below else statement.
    resetInputFields();

  } else {
    // pop up to fill in your dang info.
    alert('Please fill out all fields.')
  }
  
  // garageSpaces stuff moved to render to allow for removal of cars to release inputs


  // render
  render();
  console.log('garage:', garage)

  // anything else?
  
  
}

// reset input fields.
function resetInputFields() {
  // setter: reset fields to empty strings.
  $('#yearInput').val('');
  $('#makeInput').val('');
  $('#modelInput').val('');
  $('#imgInput').val('');
  $('#priceInput').val('');
}


// function to remove a car from the list.
function deleteCar(){
  console.log('in deleteCar')
  // // next line is DOM visual removal only.
  // $(this).parent().parent().remove()

  // variable for temporary car storage 
  let newGarage = []
  // playing with locating information...dynamically!
  console.log('this is', $(this).parent().parent(``))
  console.log('This id is', $(this).parent().parent().attr('id'))
  // get the number...
  let itemToRemove = Number ($(this).parent().parent().attr('id'))
  // loop to find the number, ignoring the item that matches.
  for (i=0; i<garage.length; i++) {
    if (itemToRemove !== i) { // if id # matches i, the object gets ditched.
      console.log('item with id', itemToRemove, 'will be removed') // just an FYI
      newGarage.push(garage[i]); 
    }
  }

  // set garage to result of above loop and return space to garage
  garage = newGarage;
  garageSpacesAvailable += 1

  // and of course, display changes.
  render()
}

function render() {
  // update the DOM
  // played around with lists for awhile and am making an executive decision 
  // to display this information as a table rather than an unordered list.
  // lining up a <ul> vertically (so the headers look right) 
  // is a non-trivial task that seems unsuited to the desired output.
  
  // empty table & recreate table headers.
  $('.cars-table').empty();
  $('.cars-table').append(`
    <tr>
      <td>Year</td>
      <td>Make</td>
      <td>Model</td>
      <td>Car Image</td>
      <td>Car Price</td>
    <td>Remove Car</td>
  </tr>
  `)
  let newGarageTotal = 0
  // Loop through garage and add cars inside to table.
  for (i=0; i<garage.length; i++) {
    
    newGarageTotal += Number(garage[i].price)
    // $('#garageTotalPrice').val
    console.log(`car imgUrl inside render loop: ${garage[i].imgUrl}`)
    $('.cars-table').append(`
      <tr id="${i}">
        <td>${garage[i].year}</td>
        <td>${garage[i].make}</td>
        <td>${garage[i].model}</td>
        <td><img src="${garage[i].imgUrl}"</td>
        <td>$${garage[i].price}</td>
          <td>
            <button class="deleteBtn">
            Delete Car
            </button>
          </tdd>
      </tr>
          `)
  }
  // moved outside loop so adding is correct.
  console.log('newgaragetotal outside the loop', newGarageTotal)
  $('#garageTotalPrice').empty()
  $('#garageTotalPrice').append(`$ ${newGarageTotal}`)
  
  // check spaces and disable or re-enable inputs as appropriate.
  if ( garageSpacesAvailable < 1 ) {
  // console.log('garage is full')
  $('#yearInput').prop('disabled', true);
  $('#makeInput').prop('disabled', true);
  $('#modelInput').prop('disabled', true);
  $('#imgInput').prop('disabled', true);
  $('#priceInput').prop('disabled', true);
  } else {
    $('#yearInput').prop('disabled', false);
    $('#makeInput').prop('disabled', false);
    $('#modelInput').prop('disabled', false);
    $('#imgInput').prop('disabled', false);
    $('#priceInput').prop('disabled', false);
  }
}