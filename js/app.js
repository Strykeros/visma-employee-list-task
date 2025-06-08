const body = document.querySelector("body");

// gets employee data from json
const getEmployees = () => {
    const employees = [];

    return fetch('employees.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(employee => {
                employees.push(
                    new Employee(employee.id, employee.name, employee.title, employee.email, employee.startDate)
                );
            });
            return employees;
        });
};

// renders employee table and statistics
const displayEmployees = () => {
    const titles = ["Name", "Job title"]
    const employeeList = getEmployees();
    const theader = document.querySelector('.table-header');
    let modalId = 1;

    for (let i = 0; i < titles.length; i++) {
        let th = document.createElement("th");
        th.classList.add("employee-header");
        th.innerText = titles[i];
        theader.appendChild(th);
    }

    employeeList.then(employees => {
        const tbody = document.querySelector('.table-body');

        employees.forEach(employee => {
            const imgDir = "../img/person.png";
            initModal(modalId);            
            addModalContent(modalId, employee.name(), imgDir, employee.email(), employee.startDate());
            let currentModal = document.querySelector("#modal" + modalId);

            let tr = document.createElement("tr");
            tr.classList.add("employee-row");
            tr.addEventListener("click", function (e) {
                currentModal.classList.remove("hide-modal");
                currentModal.classList.add("show-modal");
            })
            tbody.appendChild(tr);

            let tdName = document.createElement('td');
            tdName.classList.add("employee-cell");
            tdName.textContent = employee.name();
            tr.appendChild(tdName);

            let tdJob = document.createElement('td');
            tdJob.classList.add("employee-cell");
            tdJob.textContent = employee.title();
            tr.appendChild(tdJob);

            modalId++;
        });   
    });

    displayEmployeeStats();
}

// displays employee statistics
const displayEmployeeStats = () => {
    const employeeList = getEmployees();
    
    employeeList.then(employees => {
        const statistics = new EmployeeStats(employees);
        employeeCount(statistics);
        newEmployee(statistics);
        medianTenure(statistics);
    });
}

// displays number of employees
const employeeCount = (employees) => {
    let employeeWrapper = document.querySelector(".employee-count-wrapper");

    let employeeCount = document.createElement("h2");
    employeeCount.classList.add("employees-count");
    employeeCount.innerText = employees.totalEmployees();
    employeeWrapper.appendChild(employeeCount);

    let employeeCountTxt = document.createElement("p");
    employeeCountTxt.classList.add("employees-count");
    employeeCountTxt.innerText = "Total employees";
    employeeWrapper.appendChild(employeeCountTxt);
}

// displays newest employee
const newEmployee = (employees) => {
    let employeeWrapper = document.querySelector(".newest-employee-wrapper");
    let employeeMap = employees.newestEmployee();
    let newestEmp = [...employeeMap.keys()][0];

    let employeeCount = document.createElement("h2");
    employeeCount.classList.add("employees-count");
    employeeCount.innerText = newestEmp;
    employeeWrapper.appendChild(employeeCount);

    let employeeCountTxt = document.createElement("p");
    employeeCountTxt.classList.add("employees-count");
    employeeCountTxt.innerText = "Newest employee";
    employeeWrapper.appendChild(employeeCountTxt);
}

// displays all employee median tenure
const medianTenure = (employees) => {
    let tenureWrapper = document.querySelector(".employee-tenure-wrapper");
    let medianTenure = employees.medianTeamTenure();

    let employeeCount = document.createElement("h2");
    employeeCount.classList.add("employees-count");
    employeeCount.innerText = medianTenure + " days";
    tenureWrapper.appendChild(employeeCount);

    let employeeCountTxt = document.createElement("p");
    employeeCountTxt.classList.add("employees-count");
    employeeCountTxt.innerText = "Median tenure";
    tenureWrapper.appendChild(employeeCountTxt);
}

// initializes search functionality
const initSearch = () => {
    let searchBox = document.querySelector("#searchBox");
    let cellTxt;
    let employeeRow = document.getElementsByClassName("employee-row");
    let searchInput = searchBox.value.toUpperCase();

    for (let i = 0; i < employeeRow.length; i++) {
        let employeeCol = employeeRow[i].getElementsByClassName("employee-cell")[0];
        if (employeeCol !== null) {
            cellTxt = employeeCol.innerText;
            if (cellTxt.toUpperCase().indexOf(searchInput) > -1) {
                employeeRow[i].classList.remove("hide-row");
            }
            else {
                employeeRow[i].classList.add("hide-row");
            }
        }
    }
}

// initializes search event
const initSearchEvent = () => {
    let searchBox = document.querySelector("#searchBox");

    searchBox.addEventListener("keyup", function (e) {
        initSearch();
    })
}

// initializes employee modal
const initModal = (modalId) => {
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.id = "modal" + modalId;
    body.appendChild(modal);

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modal.appendChild(modalContent);

    let closeBtn = document.createElement("span");
    closeBtn.classList.add("close");
    closeBtn.innerText = "x";
    closeBtn.addEventListener("click", function (e) {
        modal.classList.add("hide-modal");
        modal.classList.remove("show-modal");
        body.classList.remove("no-scroll");
    })
    modalContent.appendChild(closeBtn);

    let modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalContent.appendChild(modalBody);
}

// adds label heading
const addModalContent = (modalId, employeeName, employeeImg, employeeEmail, employeeStartDate) => {
    let currentModal = document.querySelector("#modal" + modalId);
    let modalBody = currentModal.querySelector(".modal-body");
    const employeeData = [employeeImg, employeeName, employeeEmail, employeeStartDate];
    const employeeHeadingTxt = ["", "", "Email:", "Start date:"];

    for (let i = 0; i < employeeData.length; i++) {
        let contactWrap = document.createElement("div");
        contactWrap.classList.add("modal-employee-wrap");
        modalBody.appendChild(contactWrap);

        if (i > 1){
            initModalHeading(i, employeeHeadingTxt, contactWrap)
        } 

        if (i === 0){
            initModalImg(contactWrap, employeeName, employeeImg);
        }        
        else{
            initModalParagraph(i, employeeData, contactWrap)
        }
    }
}

// adds heading in modal
const initModalHeading = (index, employeeHeadingTxt, parent) => {
    let heading = document.createElement("h4");
    heading.innerText = employeeHeadingTxt[index];
    heading.classList.add("modal-heading");
    parent.appendChild(heading);       
}

// adds employee image
const initModalImg = (parent, employeeName, employeeImg) => {
    let img = document.createElement("img");
    img.classList.add("modal-employee-img")
    img.alt = employeeName + "'s picture";
    img.src = employeeImg;
    parent.appendChild(img);
}

// adds information about employee
const initModalParagraph = (index, employeeData, parent) => {
    let paragraph = document.createElement("p");
    paragraph.classList.add("modal-p");
    paragraph.innerText = employeeData[index];
    parent.appendChild(paragraph);
}

// adds event listener to close modal, if clicked outside of it
window.addEventListener("click", function (e) {
    let modals = document.querySelectorAll(".modal");

    for (let i = 0; i < modals.length; i++) {
        if (e.target === modals[i]) {
            modals[i].classList.add("hide-modal");
            modals[i].classList.remove("show-modal");
        }
    }
})

displayEmployees();
initSearchEvent();