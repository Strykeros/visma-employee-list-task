class Employee {
    constructor(inputId, inputName, inputTitle, inputEmail, inputStartDate) {
        this.employeeId = inputId;
        this.employeeName = inputName;
        this.employeeTitle = inputTitle;
        this.employeeEmail = inputEmail;
        this.employeeStartDate = inputStartDate;
    }

    id(){
        return this.employeeId;
    }

    name(){
        return this.employeeName;
    }    
    
    title(){
        return this.employeeTitle;
    }

    email(){
        return this.employeeEmail;
    }

    startDate(){
        return this.employeeStartDate;
    }
}