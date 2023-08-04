import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { GetallComponent } from './getall/getall.component';
import { WebpageComponent } from './webpage/webpage.component';
import { UpdateComponent } from './update/update.component';
import { ModalComponent } from './modal/modal.component';

const routes: Routes = [
    {
        path:'',
        component:RegisterComponent
    },
    {
        path:'getall',
        component:GetallComponent
    },
    {
        path:'webpage',
        component:WebpageComponent
    },
    {
        path:'update',
        component:UpdateComponent
    },
    {
        path:'modal',
        component:ModalComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
