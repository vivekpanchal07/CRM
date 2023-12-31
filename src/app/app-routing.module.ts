import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceFormatComponent } from './shared/invoice-format/invoice-format.component';
import { SignInComponent } from './login/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
