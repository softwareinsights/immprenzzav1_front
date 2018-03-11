import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { AbonosInterface } from './abonos.interface';
import { AbonosResponseInterface } from './abonos-response.interface';
import { Component, OnInit } from '@angular/core';
import { AbonosService } from './abonos.service';
import { AbonosAddModalComponent } from './abonos-add-modal/abonos-add-modal.component';
import { AbonosEditModalComponent } from './abonos-edit-modal/abonos-edit-modal.component';

@Component({
selector: 'abonos-table',
templateUrl: './abonos-table.html',
styleUrls: ['./abonos-table.scss'],
})
export class AbonosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idabono';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: AbonosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idorden'] !== undefined) {
          const idorden = +params['idorden'];
          this.findByIdOrden(idorden);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdOrden(id: number): void {
      this.service
        .findByIdOrden(id)
        .subscribe(
            (data: AbonosResponseInterface) => {
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

    printAbono(abonos: AbonosInterface) {
      const innerHTML = `
        <html>
        <head>
        <title>
          Información de Abono a Orden Immprenzza
        </title>
        </head>
        <body>
          <h1>Información Abono</h1>
          <table>
            <tr>
              <td>
              <label for="inputorden_idordenAC" style="font-weight: bold;">Número de Orden</label>
              </td>
              <td>
              ${abonos.orden_idorden}
              </td>
            </tr>
            <tr>
              <td>
              <label for="inputadeudoAnteriorAC" style="font-weight: bold;">Adeudo Anterior</label>
              </td>
              <td>
              ${abonos.adeudoAnterior}
              </td>
            </div>
            <tr>
              <td>
              <label for="inputmontoPagadoAC" style="font-weight: bold;">Monto Abonando</label>
              </td>
              <td>
              ${abonos.montoPagado}
              </td>
            </tr>
            <tr>
              <td>
              <label for="inputadeudoActualAC" style="font-weight: bold;">Adeudo Actual</label>
              </td>
              <td>
              ${abonos.adeudoActual}
              </td>
            </tr>
            <tr>
              <td>
              <label for="inputfechaAC" style="font-weight: bold;">Fecha</label>
              </td>
              <td>
                ${abonos.fecha}
              </td>
            </tr>
            <tr>
              <td>
              <label for="inputhoraAC" style="font-weight: bold;">Hora</label>
              </td>
              <td>
              ${abonos.hora}
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

    addModalShow() {
      const disposable = this.dialogService.addDialog(AbonosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(abonos: AbonosInterface) {
      const disposable = this.dialogService.addDialog(AbonosEditModalComponent, abonos)
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
          this.service.remove(item.idabono)
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
            (data: AbonosResponseInterface) =>  {
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
