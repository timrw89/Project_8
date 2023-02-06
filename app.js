// global variables
let employees = [];
const urlAPI =  `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const employeeSearch = document.getElementById("search");
employeeSearch.addEventListener('keyup', e => {
    let currentValue = e.target.value.toLowerCase();
    let searchItem = document.querySelectorAll('h2.name');
    searchItem.forEach(item => {
        if (item.textContent.toLowerCase().includes(currentValue)) {
            item.parentNode.parentNode.style.display ="flex";
        } else { 
            item.parentNode.parentNode.style.display ="none";
        }
    })
});



//fetch data from API
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

//functions--------------------------

function displayEmployees (employeeData) {
    employees = employeeData;

//store the employee HTML as we create it
    let employeeHTML = '';

//loop through each employee and create HTML Markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

//template literals
    employeeHTML += `
    <div class="card" data-index="${index}">
        <img src="${picture.large}" alt="picture1" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
        </div>
    </div>
    `

        
    });
    gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {

    //use object destructuring make our template literal cleaner
    let { name, dob, phone, email,
         location: { city, street, state, postcode },
          picture } = employees[index];
    let date = new Date(dob.date);

    const modalHTML = `
    <img class="avatar" src="${picture.large}" alt="picture1" />
    <div class="modal-text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
        <p>Birthday:
            ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

//Event Listeners
gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest(".card");
       
        const index = card.getAttribute('data-index');
        
        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});


