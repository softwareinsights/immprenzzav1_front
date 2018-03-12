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

// import ExportToCSV from "@molteni/export-csv";


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


    descargarCSV() {

      // const exporter = new ExportToCSV();
      // exporter.exportColumnsToCSV(this.data, 'ordenes.csv');

    }


    entregarOrden(ordens: OrdensInterface) {
      this.service.entregarOrden(ordens)
        .subscribe(
           (data: OrdensResponseInterface) => {
                if (data.success) {

                  this.toastrService.success(data.message);

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

                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'));
    }



    finalizarOrden(ordens: OrdensInterface) {
      this.service.finalizarOrden(ordens)
        .subscribe(
           (data: OrdensResponseInterface) => {
                if (data.success) {

                  this.toastrService.success(data.message);

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

                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'));
    }

    sendFactura(ordens: any) {
      const innerHTML = `
        <html>
        <head>
        <title>
          Factura
        </title>
        </head>
        <body>
          <h2>Información de Factura</h2>
          <table>
            <tr>
              <td>
              <label for="inputorden_idordenAC" style="font-weight: bold;">Nó de Orden</label>
              </td>
              <td>
              ${ordens.idorden}
              </td>
            </tr>
            <tr>
              <td>
              <label for="inputorden_idordenAC" style="font-weight: bold;">Cliente</label>
              </td>
              <td>
              ${ordens.cliente_cliente_idcliente}
              </td>
            </tr>
            <tr>
              <td>
              <label for="inputadeudoAnteriorAC" style="font-weight: bold;">Subtotal</label>
              </td>
              <td>
              ${ordens.subtotal}
              </td>
            </div>
            <tr>
              <td>
              <label for="inputmontoPagadoAC" style="font-weight: bold;">Total</label>
              </td>
              <td>
              ${ordens.total}
              </td>
            </tr>
            <tr>
              <td>
              <label for="inputadeudoActualAC" style="font-weight: bold;">Monto Cubierto</label>
              </td>
              <td>
              ${ordens.cubierto}
              </td>
            </tr>
            <tr>
              <td>
              <label for="inputadeudoActualAC" style="font-weight: bold;">Monto Abonado</label>
              </td>
              <td>
              ${ordens.abonado}
              </td>
            </tr>
            <tr>
              <td>
              <label for="inputadeudoActualAC" style="font-weight: bold;">Monto Adeudado</label>
              </td>
              <td>
              ${ordens.adeudo}
              </td>
            </tr>
            <tr>
              <td>
              <label for="inputfechaAC" style="font-weight: bold;">Fecha</label>
              </td>
              <td>
                ${ordens.fecha}
              </td>
            </tr>
            <tr>
              <td>
              <label for="inputhoraAC" style="font-weight: bold;">Hora</label>
              </td>
              <td>
              ${ordens.hora}
              </td>
            </tr>
          </table>
        </body>
        </html> 
      `;
      const ventimp = window.open(' ', 'popimpr');
      ventimp.document.write(innerHTML);
      ventimp.document.close();
      ventimp.print();
      ventimp.close();
    }

    printOrden(ordens: any) {
      const innerHTML = `
        <html>
        <head>
        <title>
          Información de Orden Immprenzza
        </title>
        </head>
        <body>
          <h1>Información Orden</h1>
          <table>
            <tr>
              <td>
              <label for="inputorden_idordenAC" style="font-weight: bold;">Nó de Orden</label>
              </td>
              <td>
              ${ordens.idorden}
              </td>
            </tr>
            <tr>
              <td>
              <label for="inputorden_idordenAC" style="font-weight: bold;">Cliente</label>
              </td>
              <td>
              ${ordens.cliente_cliente_idcliente}
              </td>
            </tr>
            <tr>
              <td>
              <label for="inputadeudoAnteriorAC" style="font-weight: bold;">Subtotal</label>
              </td>
              <td>
              ${ordens.subtotal}
              </td>
            </div>
            <tr>
              <td>
              <label for="inputmontoPagadoAC" style="font-weight: bold;">Total</label>
              </td>
              <td>
              ${ordens.total}
              </td>
            </tr>
            <tr>
              <td>
              <label for="inputadeudoActualAC" style="font-weight: bold;">Monto Cubierto</label>
              </td>
              <td>
              ${ordens.cubierto}
              </td>
            </tr>
            <tr>
              <td>
              <label for="inputadeudoActualAC" style="font-weight: bold;">Monto Abonado</label>
              </td>
              <td>
              ${ordens.abonado}
              </td>
            </tr>
            <tr>
              <td>
              <label for="inputadeudoActualAC" style="font-weight: bold;">Monto Adeudado</label>
              </td>
              <td>
              ${ordens.adeudo}
              </td>
            </tr>
            <tr>
              <td>
              <label for="inputadeudoActualAC" style="font-weight: bold;">Factura</label>
              </td>
              <td>
              ${(ordens.factura) ? 'Si' : 'No'}
              </td>
            </tr>


            <tr>
              <td>
              <label for="inputfechaAC" style="font-weight: bold;">Fecha</label>
              </td>
              <td>
                ${ordens.fecha}
              </td>
            </tr>
            <tr>
              <td>
              <label for="inputhoraAC" style="font-weight: bold;">Hora</label>
              </td>
              <td>
              ${ordens.hora}
              </td>
            </tr>
          </table>
        </body>
        </html> 
      `;
      const ventimp = window.open(' ', 'popimpr');
      ventimp.document.write(innerHTML);
      ventimp.document.close();
      ventimp.print();
      ventimp.close();
    }





    printReporte(ordens: any) {
      let innerHTML = `
        <html>
        <head>
        <title>
          Reporte de Órdenes
        </title>
        </head>
        <body>
          <h1 style="text-align: center;">Reporte de Órdenes</h1>
          <table>
            <tr>
              <th>
                Nó de Orden
              </th>
              <th>
                Cliente
              </th>
              <th>
                Subtotal
              </th>
              <th>
                Total
              </th>
              <th>
                Monto Cubierto
              </th>
              <th>
                Monto Abonado
              </th>
              <th>
                Monto Adeudado
              </th>
              <th>
                Factura
              </th>
              <th>
                Fecha
              </th>
              <th>
                Hora
              </th>
            </tr>`;

      for (let element in ordens) {

        innerHTML += `
            <tr>
              <td>
                ${ordens[element].idorden}
              </td>
              <td>
                ${ordens[element].cliente_cliente_idcliente}
              </td>
              <td style="text-align: right;">
                ${ordens[element].subtotal}
              </td>
              <td style="text-align: right;">
                ${ordens[element].total}
              </td>
              <td style="text-align: right;">
                ${ordens[element].cubierto}
              </td>
              <td style="text-align: right;">
                ${ordens[element].abonado}
              </td>
              <td style="text-align: right;">
                ${ordens[element].adeudo}
              </td>
              <td>
                ${(ordens[element].factura) ? 'Si' : 'No'}
              </td>
              <td>
                ${ordens[element].fecha}
              </td>
              <td>
                ${ordens[element].hora}
              </td>
            </tr>`;
      }

      innerHTML += 
          `</table>
        </body>
        </html> 
      `;
      const ventimp = window.open(' ', 'popimpr');
      ventimp.document.write(innerHTML);
      ventimp.document.close();
      ventimp.print();
      ventimp.close();
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
                  (_data: OrdensResponseInterface) => {
                      if (data.success) {
                        this.showToast(_data);
                        this.getAll();
                      } else {
                        this.toastrService.error(_data.message);
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
            this.getAll();
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
            this.ordenproductoShowToast(data, ordens.idorden);
          }
      });
    }


    ordenproductoShowToast(data, idorden) {
        if (data.success) {
            this.toastrService.success(data.message);

            // ACTUALIZAR MONTOS CON Orden  
            this.service
              .updateMontos(idorden)
              .subscribe(
                  (_data: OrdensResponseInterface) => {
                      if (data.success) {
                        this.showToast(_data);
                        this.getAll();
                      } else {
                        this.toastrService.error(_data.message);
                      }
                  },
                  error => console.log(error),
                  () => console.log('Get all Items complete'))

        } else {
            this.toastrService.error(data.message);
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
