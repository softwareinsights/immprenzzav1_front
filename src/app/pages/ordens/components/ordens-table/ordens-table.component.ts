import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { OrdensInterface } from './ordens.interface';
import { OrdensResponseInterface } from './ordens-response.interface';
import { Component, OnInit } from '@angular/core';
import { OrdensService } from './ordens.service';
import { OrdensAddModalComponent } from './ordens-add-modal/ordens-add-modal.component';
import { OrdensEditModalComponent } from './ordens-edit-modal/ordens-edit-modal.component';
import { AbonosInterface } from './../../../abonos/components/abonos-table/abonos.interface';
import { AbonosAddModalComponent } from './../../../abonos/components/abonos-table/abonos-add-modal/abonos-add-modal.component';
import { OrdenestadosInterface } from './../../../ordenestados/components/ordenestados-table/ordenestados.interface';
import { OrdenestadosAddModalComponent } from './../../../ordenestados/components/ordenestados-table/ordenestados-add-modal/ordenestados-add-modal.component';
import { OrdenproductosInterface } from './../../../ordenproductos/components/ordenproductos-table/ordenproductos.interface';
import { OrdenproductosAddModalComponent } from './../../../ordenproductos/components/ordenproductos-table/ordenproductos-add-modal/ordenproductos-add-modal.component';

@Component({
selector: 'ordens-table',
templateUrl: './ordens-table.html',
styleUrls: ['./ordens-table.scss'],
})
export class OrdensTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idorden';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: OrdensService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idcliente'] !== undefined) {
          const idcliente = +params['idcliente'];
          this.findByIdCliente(idcliente);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdCliente(id: number): void {
      this.service
        .findByIdCliente(id)
        .subscribe(
            (data: OrdensResponseInterface) => {
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
    insertAbono(ordens: OrdensInterface) {

      // Abono
      const abono: AbonosInterface = {
        'orden_idorden': ordens.idorden,
        'adeudoAnterior': ordens.adeudo
      }

      const disposable = this.dialogService.addDialog(AbonosAddModalComponent, abono)
      .subscribe( data => {
          if (data) {
          this.abonoShowToast(data, ordens.idorden);
          }
      });
    }
    abonoShowToast(data, idorden) {
        if (data.success) {
            this.toastrService.success(data.message);

            // ACTUALIZAR MONTOS CON Orden  
            this.service
              .updateMontos(idorden)
              .subscribe(
                  (data: OrdensResponseInterface) => {
                      if (data.success) {
                        this.showToast(data);
                        this.getAll();
                      } else {
                        this.toastrService.error(data.message);
                      }
                  },
                  error => console.log(error),
                  () => console.log('Get all Items complete'))

        } else {
            this.toastrService.error(data.message);
        }
    }
    viewAbono(ordens: OrdensInterface) {
      this.router.navigate([`/pages/abonos/orden/${ordens.idorden}`]);
    }
    insertOrdenestado(ordens: OrdensInterface) {
      const ordenestado: OrdenestadosInterface = {
        orden_idorden: ordens.idorden
      }
      const disposable = this.dialogService.addDialog(OrdenestadosAddModalComponent, ordenestado)
      .subscribe( data => {
          if (data) {
          this.ordenestadoShowToast(data);
          }
      });
    }
    ordenestadoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewOrdenestado(ordens: OrdensInterface) {
      this.router.navigate([`/pages/ordenestados/orden/${ordens.idorden}`]);
    }
    insertOrdenproducto(ordens: OrdensInterface) {
      const ordenproducto: OrdenproductosInterface = {
        orden_idorden: ordens.idorden
      }
      const disposable = this.dialogService.addDialog(OrdenproductosAddModalComponent, ordenproducto)
      .subscribe( data => {
          if (data) {
          this.ordenproductoShowToast(data);
          }
      });
    }
    ordenproductoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewOrdenproducto(ordens: OrdensInterface) {
      this.router.navigate([`/pages/ordenproductos/orden/${ordens.idorden}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(OrdensAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(ordens: OrdensInterface) {
      const disposable = this.dialogService.addDialog(OrdensEditModalComponent, ordens)
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
          this.service.remove(item.idorden)
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
            (data: OrdensResponseInterface) =>  {
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
