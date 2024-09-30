import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '../../shared.module';
import { LoginComponent } from './components/login.component'
import { LoginFormComponent } from '../login-form/login-form.component';

@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [CommonModule, SharedModule]
})
export class LoginModule {}