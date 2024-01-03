import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksService } from '../../services/tasks.service';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-project-creator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
  ],
  templateUrl: './project-creator.component.html',
  styleUrl: './project-creator.component.css'
})
export class ProjectCreatorComponent implements OnInit {

  @Input() projectsNames: string[] = [];
  private formBuilder: FormBuilder = inject(FormBuilder);
  private tasksService: TasksService = inject(TasksService);

  protected projectForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, this.checkUniqeName()]),
  });

  public ngOnInit(): void {}
  
  public createNewProject(): void {
    this.tasksService.createNewProject(this.projectForm.value.name!);
  }

  private checkUniqeName(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const projectName = control.value;
        if (this.projectsNames.some(name => name === projectName)) {
          return { 'nonUniqueValue': true };
        } 
        if (projectName.includes(' ')) {
          return { 'whiteSpace': true };
        } 
        return null;
      };
  }

}
