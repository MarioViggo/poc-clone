import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { LoginModule } from './login.module';
import { LoginFormComponent } from '../login-form/login-form.component';
import { SharedModule } from '@app/shared/shared.module';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LoginModule],
})
export class LoginRoutingModule {}