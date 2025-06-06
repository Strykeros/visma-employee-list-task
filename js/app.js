
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
            tr.classList.add("table-row");
            tbody.appendChild(tr);

            let tdName = document.createElement('td');
            tdName.classList.add("td-name");
            tdName.textContent = employee.name();
            tr.appendChild(tdName);

            let tdJob = document.createElement('td');
            tdJob.classList.add("td-job");
            tdJob.textContent = employee.title();
            tr.appendChild(tdJob);
        });
  });
}

displayEmployees();