import { ApplicationRef, ComponentRef, ElementRef, EnvironmentInjector, Injectable, Input, TemplateRef, Type, ViewContainerRef, createComponent, inject } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';
import { Options } from '../shared/modal/modal-options';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

interface Modal {
  id: string,
  component: ComponentType<any>
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // newModalComponent!: ComponentRef<ModalComponent>;
  // options!: Options | undefined;
  
  // constructor(
  //   private appRef: ApplicationRef,
  //   private injector: EnvironmentInjector
  // ) { }

  // open<C>(
  //   vcrOrComponent: ViewContainerRef | Type<C>,
  //   param2?: TemplateRef<Element> | Options,
  //   options?: Options
  // ) {
  //   if (vcrOrComponent instanceof ViewContainerRef) {
  //     // For the first approach, we know that the second param will be of type TemplateRef, so we have to cast it  
  //     this.openWithTemplate(vcrOrComponent, param2 as TemplateRef<Element>);
  //     this.options = options;
  //     console.log('vcrOrComponent instanceof ViewContainerRef')
  //   } else {
  //     this.openWithComponent(vcrOrComponent);
  //     // Same story here : for the second approach, the second param will be of type Options or undefined, since optional 
  //     this.options = param2 as Options | undefined;
  //   }
  // }

  // private openWithTemplate(vcr: ViewContainerRef, content: TemplateRef<Element>) {
  //   // We first start to clear previous views
  //   vcr.clear();
  //   // We create a view with the template content 
  //   const innerContent = vcr.createEmbeddedView(content);

  //   // We create the modal component, and project the template content in the ng-content of the modal component 
  //   this.newModalComponent = vcr.createComponent(ModalComponent, {
  //     environmentInjector: this.injector,
  //     projectableNodes: [innerContent.rootNodes],
  //   });
  // }

  // private openWithComponent(component: Type<unknown>) {
  //   const newComponent = createComponent(component, {
  //     environmentInjector: this.injector,
  //   });

  //   this.newModalComponent = createComponent(ModalComponent, {
  //     environmentInjector: this.injector,
  //     projectableNodes: [[newComponent.location.nativeElement]],
  //   });

  //   document.body.appendChild(this.newModalComponent.location.nativeElement);

  //   // Attach views to the changeDetection cycle
  //   this.appRef.attachView(newComponent.hostView);
  //   this.appRef.attachView(this.newModalComponent.hostView);
  // }

  // close() {
  //   this.newModalComponent.instance.close();
  // }
  private modals: Modal[] = [];
  private matDialog: MatDialog = inject(MatDialog);

  constructor() {}

  public open(id: string, component: ComponentType<any>) : MatDialogRef<any, any> {
    this.modals.push({id, component});
    return this.matDialog.open(component);
  }

  public close(): void {
    this.matDialog.closeAll()
  }

}
