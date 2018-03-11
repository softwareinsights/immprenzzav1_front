import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdentareasInterface } from './ordentareas.interface';
import { OrdentareasResponseInterface } from './ordentareas-response.interface';
import { Component, OnInit } from '@angular/core';
import { OrdentareasService } from './ordentareas.service';
import { OrdentareasAddModalComponent } from './ordentareas-add-modal/ordentareas-add-modal.component';
import { OrdentareasEditModalComponent } from './ordentareas-edit-modal/ordentareas-edit-modal.component';
import { ArchivosInterface } from './../../../archivos/components/archivos-table/archivos.interface';
import { ArchivosAddModalComponent } from './../../../archivos/components/archivos-table/archivos-add-modal/archivos-add-modal.component';
import { EmpleadotareasInterface } from './../../../empleadotareas/components/empleadotareas-table/empleadotareas.interface';
import { EmpleadotareasAddModalComponent } from './../../../empleadotareas/components/empleadotareas-table/empleadotareas-add-modal/empleadotareas-add-modal.component';
import { OrdentareaestadosInterface } from './../../../ordentareaestados/components/ordentareaestados-table/ordentareaestados.interface';
import { OrdentareaestadosAddModalComponent } from './../../../ordentareaestados/components/ordentareaestados-table/ordentareaestados-add-modal/ordentareaestados-add-modal.component';

@Component({
selector: 'ordentareas-table',
templateUrl: './ordentareas-table.html',
styleUrls: ['./ordentareas-table.scss'],
})
export class OrdentareasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idordentarea';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: OrdentareasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService,
      private modalService: NgbModal,
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idtarea'] !== undefined) {
          const idtarea = +params['idtarea'];
          this.findByIdTarea(idtarea);
          this.backpage = true;
        }
        if (params['idordenproducto'] !== undefined) {
          const idordenproducto = +params['idordenproducto'];
          this.findByIdOrdenproducto(idordenproducto);
          this.backpage = true;
        }


        
        if (params['idempleadotarea'] !== undefined) {
          const idempleadotarea = +params['idempleadotarea'];
          this.findByIdEmpleadotarea(idempleadotarea);
          this.backpage = true;
        }

        
        if (!this.backpage) {
          this.getAll();
        }
      });
    }



    private findByIdEmpleadotarea(id: number): void {
      this.service
        .findByIdEmpleadotarea(id)
        .subscribe(
            (data: OrdentareasResponseInterface) => {
                if (data.success) {
                  this.data = data.result;
                } else {
                  this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }




    private findByIdTarea(id: number): void {
      this.service
        .findByIdTarea(id)
        .subscribe(
            (data: OrdentareasResponseInterface) => {
                if (data.success) {
                  this.data = data.result;
                } else {
                  this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdOrdenproducto(id: number): void {
      this.service
        .findByIdOrdenproducto(id)
        .subscribe(
            (data: OrdentareasResponseInterface) => {
                if (data.success) {
                  this.data = data.result;
                } else {
                  this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    backPage() {
        window.history.back();
    }



    finalizarOrdenTarea(ordentareas: OrdentareasInterface) {
      const ordentareaestado: OrdentareaestadosInterface = {
        'ordentarea_idordentarea': ordentareas.idordentarea,
        'estadoscrum_idestadoscrum': 4,
      };
      const disposable = this.dialogService.addDialog(OrdentareaestadosAddModalComponent, ordentareaestado)
      .subscribe( data => {
          if (data) {
          this.ordentareaestadoShowToast(data);
          }
      });
    }



    addFile(id: number, descripcion: string) {
      const activeModal = this.modalService.open(UploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Agregar Archivos a Tarea de Orden';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Orden';
    }

    insertArchivo(ordentareas: OrdentareasInterface) {
      const archivo: ArchivosInterface = {
        ordentarea_idordentarea: ordentareas.idordentarea
      };
      const disposable = this.dialogService.addDialog(ArchivosAddModalComponent, archivo)
      .subscribe( data => {
          if (data) {
          this.archivoShowToast(data);
          }
      });
    }
    archivoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewArchivo(ordentareas: OrdentareasInterface) {
      this.router.navigate([`/pages/archivos/ordentarea/${ordentareas.idordentarea}`]);
    }
    insertEmpleadotarea(ordentareas: OrdentareasInterface) {
      const empleadotarea: EmpleadotareasInterface = {
        ordentarea_idordentarea: ordentareas.idordentarea
      };
      const disposable = this.dialogService.addDialog(EmpleadotareasAddModalComponent, empleadotarea)
      .subscribe( data => {
          if (data) {
          this.empleadotareaShowToast(data);
          }
      });
    }
    empleadotareaShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewEmpleadotarea(ordentareas: OrdentareasInterface) {
      this.router.navigate([`/pages/empleadotareas/ordentarea/${ordentareas.idordentarea}`]);
    }
    insertOrdentareaestado(ordentareas: OrdentareasInterface) {
      const ordentareaestado: OrdentareaestadosInterface = {
        ordentarea_idordentarea: ordentareas.idordentarea
      };
      const disposable = this.dialogService.addDialog(OrdentareaestadosAddModalComponent, ordentareaestado)
      .subscribe( data => {
          if (data) {
          this.ordentareaestadoShowToast(data);
          }
      });
    }
    ordentareaestadoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
            this.getAll();
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewOrdentareaestado(ordentareas: OrdentareasInterface) {
      this.router.navigate([`/pages/ordentareaestados/ordentarea/${ordentareas.idordentarea}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(OrdentareasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(ordentareas: OrdentareasInterface) {
      const disposable = this.dialogService.addDialog(OrdentareasEditModalComponent, ordentareas)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      },
      error => console.log(error),
      () => console.log('Modified complete'));
    }
    onDeleteConfirm(event, item): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
          this.service.remove(item.idordentarea)
          .subscribe(
              (data) => this.showToast(data),
              error => console.log(error),
              () => console.log('Delete completed')
          );
      } else {
          console.log('item cancelado');
      }
    }
    showToast(result) {
      if (result.success) {
        this.toastrService.success(result.message);

        this.route.params.subscribe(params => {
          if (params['idtarea'] !== undefined) {
            const idtarea = +params['idtarea'];
            this.findByIdTarea(idtarea);
            this.backpage = true;
          }
          if (params['idordenproducto'] !== undefined) {
            const idordenproducto = +params['idordenproducto'];
            this.findByIdOrdenproducto(idordenproducto);
            this.backpage = true;
          }
          if (!this.backpage) {
            this.getAll();
          }
        });
      } else {
        this.toastrService.error(result.message);
      }
    }
    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data: OrdentareasResponseInterface) =>  {
                if (data.success) {
                  this.data = data.result;
                } else {
                  this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
