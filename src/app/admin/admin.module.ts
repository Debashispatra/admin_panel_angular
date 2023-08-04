import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
// import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GetallComponent } from './getall/getall.component';
import { WebpageComponent } from './webpage/webpage.component';
import { UpdateComponent } from './update/update.component';
import { ToastrModule } from 'ngx-toastr';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    RegisterComponent,
    // LoginComponent,
    GetallComponent,
    WebpageComponent,
    UpdateComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ]
})
export class AdminModule { }
