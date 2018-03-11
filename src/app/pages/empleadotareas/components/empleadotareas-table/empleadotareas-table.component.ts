import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EmpleadotareasInterface } from './empleadotareas.interface';
import { EmpleadotareasResponseInterface } from './empleadotareas-response.interface';
import { Component, OnInit } from '@angular/core';
import { EmpleadotareasService } from './empleadotareas.service';
import { EmpleadotareasAddModalComponent } from './empleadotareas-add-modal/empleadotareas-add-modal.component';
import { EmpleadotareasEditModalComponent } from './empleadotareas-edit-modal/empleadotareas-edit-modal.component';
import { EmpleadotareaestadosInterface } from './../../../empleadotareaestados/components/empleadotareaestados-table/empleadotareaestados.interface';
import { EmpleadotareaestadosAddModalComponent } from './../../../empleadotareaestados/components/empleadotareaestados-table/empleadotareaestados-add-modal/empleadotareaestados-add-modal.component';

@Component({
selector: 'empleadotareas-table',
templateUrl: './empleadotareas-table.html',
styleUrls: ['./empleadotareas-table.scss'],
})
export class EmpleadotareasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idempleadotarea';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: EmpleadotareasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idempleado'] !== undefined) {
          const idempleado = +params['idempleado'];
          this.findByIdEmpleado(idempleado);
          this.backpage = true;
        }
        if (params['idordentarea'] !== undefined) {
          const idordentarea = +params['idordentarea'];
          this.findByIdOrdentarea(idordentarea);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdEmpleado(id: number): void {
      this.service
        .findByIdEmpleado(id)
        .subscribe(
            (data: EmpleadotareasResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdOrdentarea(id: number): void {
      this.service
        .findByIdOrdentarea(id)
        .subscribe(
            (data: EmpleadotareasResponseInterface) => {
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
    insertEmpleadotareaestado(empleadotareas: EmpleadotareasInterface) {
      const empleadotareaestado: EmpleadotareaestadosInterface = {
        empleadotarea_idempleadotarea: empleadotareas.idempleadotarea
      }
      const disposable = this.dialogService.addDialog(EmpleadotareaestadosAddModalComponent, empleadotareaestado)
      .subscribe( data => {
          if (data) {
          this.empleadotareaestadoShowToast(data);
          }
      });
    }
    empleadotareaestadoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
            this.getAll();
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewOrdenTarea(empleadotareas: EmpleadotareasInterface) {
      this.router.navigate([`/pages/ordentareas/empleadotarea/${empleadotareas.idempleadotarea}`]);
    }
    viewEmpleadotareaestado(empleadotareas: EmpleadotareasInterface) {
      this.router.navigate([`/pages/empleadotareaestados/empleadotarea/${empleadotareas.idempleadotarea}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(EmpleadotareasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(empleadotareas: EmpleadotareasInterface) {
      const disposable = this.dialogService.addDialog(EmpleadotareasEditModalComponent, empleadotareas)
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
          this.service.remove(item.idempleadotarea)
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
        this.getAll();
      } else {
        this.toastrService.error(result.message);
      }
    }
    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data: EmpleadotareasResponseInterface) =>  {
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
