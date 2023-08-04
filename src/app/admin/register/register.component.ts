import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateError: string | undefined
  form = new FormGroup({
    user_name: new FormControl("", [Validators.required]),
    user_email: new FormControl("", [Validators.required, Validators.email]),
    user_password: new FormControl("", [Validators.required]),
  });
  constructor(private service: AdminServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.service.register(this.form.value).subscribe((result: any) => {
      console.log("backend response---", result);

      if (result) {
        // this.validateError = 'You are successfully registered'
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your registration successfull',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        this.validateError = 'all fields required'
      }
      this.form.reset();
      // this.generateExcel();
    })
  }

  generateExcel():void{
    this.service.getall().subscribe((data)=>{
      console.log(data);
      const workbook=XLSX.utils.book_new();
      const worksheet=XLSX.utils.json_to_sheet(data.updated_data)
      console.log(worksheet);
      XLSX.utils.book_append_sheet(workbook,worksheet,'Sheet1');
      const excelBuffer=XLSX.write(workbook,{bookType:'xlsx',type:'array'})
      const excelBlob=new Blob([excelBuffer],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
      saveAs(excelBlob,'data.xlsx')
    });
  }
  login() {
    var enteredValue = this.form.value
    var data = {
      'user_email': enteredValue.user_email,
      'user_password': enteredValue.user_password
    }
    this.service.login(data).subscribe((response: any) => {
      console.log('response received-----', response);
      // var token=response.Data.token
      var role = response.Data.role
      console.log('role--', role);
      localStorage.setItem('LoginToken', response.Data.token)
      if (response.Data.statusCode === 0) {
        if (role == 0) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
          ///////
          this.router.navigate(['/webpage'])
        }
        else {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
          ////////
          this.router.navigate(['/getall'])
        }
      }
    })
  }

}
