import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-getall',
  templateUrl: './getall.component.html',
  styleUrls: ['./getall.component.css']
})
export class GetallComponent implements OnInit {
  rows:any[] | undefined;
  data:any[] | undefined;
  userName:string='';
  greetingMsg:string='';
  form = new FormGroup({
    user_name: new FormControl("", [Validators.required]),
    user_email: new FormControl("", [Validators.required, Validators.email]),
    user_password: new FormControl("", [Validators.required]),
  });
  constructor(private service:AdminServiceService,private router: Router,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.getall();
  }

  openModel(){
    const modalDiv=document.getElementById('myModal')
    if (modalDiv!= null) {
      modalDiv.style.display='block'
    }
  }
  closeModel(){
    const modalDiv=document.getElementById('myModal')
    if (modalDiv!= null) {
      modalDiv.style.display='none'
    }
  }

  addUser(){
    this.service.addUser(this.form.value).subscribe((result)=>{
      console.log(result);
      // this.toaster.success('Data added successfully!', 'Success');
      this.form.reset();
      this.closeModel()
      this.getall()
    })
  }

  getall(){  
      this.service.getall().subscribe((res)=>{
        console.log(res);
        var get=res.updated_data.data
        this.userName=res.updated_data.user_name
        this.greetingMsg=res.updated_data.greeting_message
        this.rows=get;
        this.data=this.rows
      })
  }
  adminLogout(){
    localStorage.removeItem('LoginToken');
    this.router.navigate([''])
  }
  
  delete(id:any){
    this.service.deleteUser(id).subscribe((res)=>{
      console.log(res);
      if (res) {
        
        ///////
        this.getall()
      }
    })
  }
  popup(id:any){
    if(confirm("Are you sure to delete "+ id )) {
      this.delete(id)
    }
  }

}
