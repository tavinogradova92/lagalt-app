import { SharedComponentsModule } from './../../components/shared-components.module';
import { ProjectCreationContainer } from './project-creation/container/project-creation.container';
import { ProjectsRoutingModule } from './project-routing.module';
import { ProjectCreationComponent } from './project-creation/component/project-creation.component';
import { ProjectDetailsPageComponent } from './project-details-page/project-details-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ProjectDetailsPageComponent,
    ProjectCreationComponent,
    ProjectCreationContainer,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectsRoutingModule,
    SharedComponentsModule,
  ],
  providers: [],
})
export class ProjectsModule {}
