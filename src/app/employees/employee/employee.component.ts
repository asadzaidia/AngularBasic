import { Employee } from './../../shared/employee.model';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service:EmployeeService,
  
private toaster:ToastrService) { }

  ngOnInit() {
    this.resetForm();//on startup form is empty
  }

  resetForm(form?:NgForm){ //function to reset form in angular
    //form? means nullable return type it may be empty aur having a parameter
    if(form!=null)
    form.resetForm();

    this.service.formData = {
      EmployeeID:null,
      Fullname:'',
      EMPCode:'',
      Mobile:'',
      Position:'',

    }
  }

  onSubmit(form:NgForm){
    if(form.value.EmployeeID == null){
      this.inserted(form);
    }else{
      this.updated(form);
    }
    
  }

  inserted(form:NgForm){
    this.service.postEmployee(form.value).subscribe(res=>{//since post returning to it is catching the data
      this.toaster.success("Successfully Registerd!","Emp register app");
      this.resetForm(form);
      this.service.refreshList();
    });
  }
  updated(form:NgForm){
    this.service.putEmployee(form.value).subscribe(res=>{
      this.toaster.info("Successfully Updated!","Emp register app");
      this.resetForm(form);
      this.service.refreshList();
    });
  }




}
