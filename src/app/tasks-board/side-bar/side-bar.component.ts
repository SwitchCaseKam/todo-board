import { Component, Input, OnChanges, OnInit, ViewChild, inject, Pipe, PipeTransform, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTree, MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlatNode, TaskNode } from '../models/project.model';
import { FlatTreeControl } from '@angular/cdk/tree';
import { TaskSelectService } from '../services/task-select.service';
import { TasksViewService } from '../services/tasks-view.service';
import { SideBarService } from './side-bar.service';
import { ProjectCreatorComponent } from './project-creator/project-creator.component';
import { ModalService } from '../../services/modal.service';

@Pipe({
  standalone: true,
  name: 'sideBarItemName'
})
export class SideBarItemPipe implements PipeTransform {
  transform(value: string): string {
    return value.split('*/&%^')[0];
  }
}

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    ProjectCreatorComponent,
    SideBarItemPipe
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit, OnChanges {
  
  @ViewChild('tasksTree') tree!: MatTree<any, TaskNode[]>;
  @Input() projects!: TaskNode[];

  private tasksViewService: TasksViewService = inject(TasksViewService);
  private taskSelectService: TaskSelectService = inject(TaskSelectService);
  private sideBarService: SideBarService = inject(SideBarService);
  private modalService: ModalService = inject(ModalService);
  private renderer2: Renderer2 = inject(Renderer2);
  private el: ElementRef = inject(ElementRef);


  private prevExpansionModel: FlatNode[] = [];
  protected treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );
  private _transformer = (node: TaskNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };
  protected treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children,
  );
  protected dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  public ngOnInit(): void {
    this.sideBarService.setTasksListExpansionModel(this.treeControl.expansionModel.selected);
    this.refreshExpandsionModel();
  }

  public ngOnChanges(): void {
    this.refreshExpandsionModel();
  }

  protected hasChild = (_: number, node: FlatNode) => node.expandable;

  protected createNewProject(): void {
    const projectsNames: string[] = [];
    this.projects[0].children?.forEach(p => projectsNames.push(p.name));
    const dialogRef = this.modalService.open('project', ProjectCreatorComponent);
    dialogRef.componentRef?.setInput('projectsNames', projectsNames);
    dialogRef.afterClosed().subscribe();
  }

  protected closeSideBarForMobileView(): void {
    const sideBar = document.querySelector('.tasks-board__side-bar') as HTMLElement;
      if (sideBar) {
        sideBar.style.width = '0';
      } 
  }

  protected selectTask(node: FlatNode): void {
    const currentProject = node.name.split('*/&%^')[1];
    this.tasksViewService.setSelectedProjectName(currentProject);
    this.sideBarService.setTasksListExpansionModel(this.treeControl.expansionModel.selected);
    this.taskSelectService.setCurrentSelectedTaskId(
      Number(node.name.split(' ')[0].replace('[', '').replace(']', ''))
    );
  }

  protected selectProject(node: FlatNode): void {
    this.sideBarService.setTasksListExpansionModel(this.treeControl.expansionModel.selected);
    if (node.level > 1) return;
    this.tasksViewService.setSelectedProjectName(node.name);
  }

  protected expandClicked(): void {
    this.sideBarService.setTasksListExpansionModel(this.treeControl.expansionModel.selected);
  }

  private refreshExpandsionModel(): void {
    this.dataSource.data = this.projects;
    this.prevExpansionModel = this.sideBarService.getTaskListExpansionModel();
    this.prevExpansionModel.forEach(n => {
      this.treeControl.dataNodes.forEach(d => {
        if (n.name === d.name) { this.treeControl.expand(d); }
      });
    });
  }

}
