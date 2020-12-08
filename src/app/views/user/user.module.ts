import { UserService } from './../../services/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { ToggleComponent } from '../../components/toggle/toggle.component';

@NgModule({
  declarations: [UserComponent, ToggleComponent],
  imports: [CommonModule, FormsModule],
  exports: [],
  providers: [UserService],
})
export class UserModule {}
