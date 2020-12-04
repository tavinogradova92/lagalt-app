import { UserService } from './../../services/user.service';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, FormsModule],
  exports: [],
  providers: [UserService],
})
export class UserModule {}
