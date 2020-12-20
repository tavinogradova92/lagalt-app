import { SessionState } from './session.state';
import { SessionFacade } from './session.facade';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [SessionFacade, SessionState],
})
export class SessionModule {}
