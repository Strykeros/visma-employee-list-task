
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

    for (let i = 0; i < titles.length; i++) {
        let th = document.createElement("th");
        th.innerText = titles[i];
        theader.appendChild(th);
    }

    employeeList.then(employees => {
        const tbody = document.querySelector('.table-body');
        employees.forEach(employee => {
            let tr = document.createElement("tr");
            tr.classList.add("employee-row");
            tbody.appendChild(tr);

            let tdName = document.createElement('td');
            tdName.classList.add("employee-cell");
            tdName.textContent = employee.name();
            tr.appendChild(tdName);

            let tdJob = document.createElement('td');
            tdJob.classList.add("employee-cell");
            tdJob.textContent = employee.title();
            tr.appendChild(tdJob);
        });
  });
}

const initSearch = () => {
    let searchBox = document.querySelector("#searchBox");    
    let cellTxt;
    let employeeRow = document.getElementsByClassName("employee-row");
    let searchInput = searchBox.value.toUpperCase();

    for(let i = 0; i < employeeRow.length; i++){
        let employeeCol = employeeRow[i].getElementsByClassName("employee-cell")[0];
        if(employeeCol !== null){            
            cellTxt = employeeCol.innerText;
            if(cellTxt.toUpperCase().indexOf(searchInput) > -1){
                employeeRow[i].classList.remove("hide-row");
            }
            else{
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


displayEmployees();
initSearchEvent();