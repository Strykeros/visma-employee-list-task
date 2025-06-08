class EmployeeStats {
    static employeeList;
    static employeeNames;


    constructor(employees) {
        EmployeeStats.employeeList = employees;
    }

    // returns total employees in company
    totalEmployees() {
        return EmployeeStats.employeeList.length;
    }

    // returns newest employee in company
    newestEmployee() {
        let convertedMap = new Map();
        let employeeMap = new Map();
        const employees = EmployeeStats.employeeList;

        // converts date string to Date object
        for (let employee of employees) {
            let dateStr = employee.startDate().split("-");
            let empDate = new Date(dateStr);
            employeeMap.set(employee.name(), empDate);
        }

        // sort map in ascending order
        let sortedMap = new Map([...employeeMap.entries()].sort((a, b) => a[1] - b[1]));

        // converts Dates back to date strings
        sortedMap.forEach((value, key) => {
            let dateStr = value.toLocaleDateString('lv-LV');
            convertedMap.set(key, dateStr);
        });

        // gets the last date from map
        convertedMap = [...convertedMap].at(convertedMap.size - 1);

        return new Map([convertedMap]);
    }

    // returns median employee tenure in company
    medianTeamTenure() {
        let timestamp;
        let employeeDates = [];
        let sortedTimestamps = [];
        const employees = EmployeeStats.employeeList;

        for(let employee of employees){
            let empDate = employee.startDate();
            employeeDates.push(empDate);
        }

        // converts dates to timestamps
        for (let i = 0; i < employeeDates.length; i++) {
            let dateStr = employeeDates[i];
            let convertedDate = new Date(dateStr).getTime();
            sortedTimestamps.push(convertedDate);
        }

        sortedTimestamps.sort((firstDate, secondDate) => firstDate - secondDate);
        
        // finds the middle value in array
        let median = Math.floor(sortedTimestamps.length / 2);
        if(sortedTimestamps.length % 2 === 1){
            timestamp = sortedTimestamps[median];
        }
        else{
            timestamp = (sortedTimestamps[median - 1] + sortedTimestamps[median]) / 2;
        }

        let medDate = new Date(timestamp);
        let now = new Date();

        // calculates time in milliseconds
        // converts to days, and them months, using average month length
        let tenureMilisecs = now - medDate;
        let tenureDays = Math.floor(tenureMilisecs / (1000 * 60 * 60 * 24));
        let tenureMonths = Math.floor(tenureDays / 30.44);
        return tenureMonths
    }

}