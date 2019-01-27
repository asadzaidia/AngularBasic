import { ToastrService } from 'ngx-toastr';
import { Employee } from './../../shared/employee.model';
import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {

  constructor(private service:EmployeeService,
  private toaster:ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }
  populateForm(emp:Employee){
    this.service.formData=Object.assign({},emp);
  }
  onDelete(EmployeeID:number){
    this.service.deleteEmployee(EmployeeID).subscribe(res=>{
      this.service.refreshList();
      this.toaster.warning("Successfully Deleted!","Emp register app");

    });

  }
}
