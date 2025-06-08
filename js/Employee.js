class Employee {
    constructor(inputId, inputName, inputTitle, inputEmail, inputStartDate) {
        this.employeeId = inputId;
        this.employeeName = inputName;
        this.employeeTitle = inputTitle;
        this.employeeEmail = inputEmail;
        this.employeeStartDate = inputStartDate;
    }

    // returns employee id
    id(){
        return this.employeeId;
    }
    // returns employee name
    name(){
        return this.employeeName;
    }    
    
    // returns employee title
    title(){
        return this.employeeTitle;
    }

    // returns employee email
    email(){
        return this.employeeEmail;
    }

    // returns employee start date
    startDate(){
        return this.employeeStartDate;
    }
}