
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
            initModal(modalId);
            addModalContent(modalId, employee.name(), employee.email(), employee.startDate());
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
}

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

const initSearchEvent = () => {
    let searchBox = document.querySelector("#searchBox");

    searchBox.addEventListener("keyup", function (e) {
        initSearch();
    })
}

const initModal = (modalId) => {
    const body = document.querySelector("body");
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
    })
    modalContent.appendChild(closeBtn);

    let modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalContent.appendChild(modalBody);
}

const addModalContent = (modalId, employeeName, employeeEmail, employeeStartDate) => {
    let currentModal = document.querySelector("#modal" + modalId);
    let modalBody = currentModal.querySelector(".modal-body");
    const employeeData = [employeeName, employeeEmail, employeeStartDate];
        const employeeHeadingTxt = ["", "Email:", "Start date:"];

    for (let i = 0; i < employeeData.length; i++) {
        let contactWrap = document.createElement("div");
        contactWrap.classList.add("modal-employee-wrap");
        modalBody.appendChild(contactWrap);

        if (i > 0){
            let heading = document.createElement("h4");
            heading.innerText = employeeHeadingTxt[i];
            heading.classList.add("modal-heading");
            contactWrap.appendChild(heading);
        }

        let paragraph = document.createElement("p");
        paragraph.classList.add("modal-p");
        paragraph.innerText = employeeData[i];
        contactWrap.appendChild(paragraph);
    }
}

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