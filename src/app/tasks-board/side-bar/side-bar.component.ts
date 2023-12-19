import { AfterViewChecked, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTree, MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlatNode, TaskNode } from '../models/project.model';
import { FlatTreeControl } from '@angular/cdk/tree';
import { TaskSelectService } from '../services/task-select.service';
import { TasksViewService } from '../services/tasks-view.service';
import { SideBarService } from './side-bar.service';
import { TasksService } from '../services/tasks.service';
import { ProjectCreatorComponent } from './project-creator/project-creator.component';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    ProjectCreatorComponent
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit, OnDestroy, OnChanges {
  
  @ViewChild('tasksTree') tree!: MatTree<any, TaskNode[]>;

  @Input() projects!: TaskNode[];

  private tasksViewService: TasksViewService = inject(TasksViewService);
  private tasksService: TasksService = inject(TasksService);
  private taskSelectService: TaskSelectService = inject(TaskSelectService);
  private sideBarService: SideBarService = inject(SideBarService);
  private modalService = inject(ModalService);
  private prevExpansionModel: FlatNode[] = [];
  private selectedProject: string = '';

  public ngOnInit(): void {
    this.sideBarService.setTasksListExpansionModel(this.treeControl.expansionModel.selected);
    this.dataSource.data = this.projects;
    this.prevExpansionModel = this.sideBarService.getTaskListExpansionModel();
    this.prevExpansionModel.forEach(n => {
      this.treeControl.dataNodes.forEach(d => {
        if (n.name === d.name) { this.treeControl.expand(d); }
      });
    });
  }


  public ngOnChanges() {
    this.dataSource.data = this.projects;
    this.prevExpansionModel = this.sideBarService.getTaskListExpansionModel();
    this.prevExpansionModel.forEach(n => {
      this.treeControl.dataNodes.forEach(d => {
        if (n.name === d.name) { this.treeControl.expand(d); }
      });
    });
  }

  public ngOnDestroy(): void {
    
  }

  protected createNewProject(): void {
    const projectsNames: string[] = [];
    this.projects[0].children?.forEach(p => projectsNames.push(p.name));
    const dialogRef = this.modalService.open('project', ProjectCreatorComponent);
    dialogRef.componentRef?.setInput('projectsNames', projectsNames);
    dialogRef.afterClosed().subscribe();
  }

  protected selectTask(node: FlatNode): void {
    this.sideBarService.setTasksListExpansionModel(this.treeControl.expansionModel.selected);
    this.taskSelectService.setCurrentSelectedTaskId(
      Number(node.name.split(' ')[0].replace('[', '').replace(']', ''))
    );
  }

  protected selectProject(node: FlatNode): void {
    this.sideBarService.setTasksListExpansionModel(this.treeControl.expansionModel.selected);
    if (node.level > 1) return;
    this.tasksViewService.setSelectedProjectName(node.name);
    this.selectedProject = node.name;

  }

  protected expandClicked(): void {
    this.sideBarService.setTasksListExpansionModel(this.treeControl.expansionModel.selected);
  }

  private _transformer = (node: TaskNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;
}
