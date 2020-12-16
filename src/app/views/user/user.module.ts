import { SharedComponentsModule } from '../../components/shared-components.module';
import { CrossBoxComponent } from '../../components/skills/cross-box/cross-box.component';
import { UserService } from '../../services/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { ToggleComponent } from '../../components/toggle/toggle.component';

@NgModule({
  declarations: [UserComponent, ToggleComponent, CrossBoxComponent],
  imports: [CommonModule, FormsModule, SharedComponentsModule],
  providers: [UserService],
})
export class UserModule {}
