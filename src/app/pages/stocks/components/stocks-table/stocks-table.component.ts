import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { StocksInterface } from './stocks.interface';
import { StocksResponseInterface } from './stocks-response.interface';
import { Component, OnInit } from '@angular/core';
import { StocksService } from './stocks.service';
import { StocksAddModalComponent } from './stocks-add-modal/stocks-add-modal.component';
import { StocksEditModalComponent } from './stocks-edit-modal/stocks-edit-modal.component';
import { SalidastocksInterface } from './../../../salidastocks/components/salidastocks-table/salidastocks.interface';
import { SalidastocksAddModalComponent } from './../../../salidastocks/components/salidastocks-table/salidastocks-add-modal/salidastocks-add-modal.component';

@Component({
selector: 'stocks-table',
templateUrl: './stocks-table.html',
styleUrls: ['./stocks-table.scss'],
})
export class StocksTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idstock';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: StocksService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.getAll();
    }
    insertSalidastock(stocks: StocksInterface) {
      const salidastock: SalidastocksInterface = {
        stock_idstock: stocks.idstock
      }
      const disposable = this.dialogService.addDialog(SalidastocksAddModalComponent, salidastock)
      .subscribe( data => {
          if (data) {
          this.salidastockShowToast(data);
          }
      });
    }
    salidastockShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewSalidastock(stocks: StocksInterface) {
      this.router.navigate([`/pages/salidastocks/stock/${stocks.idstock}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(StocksAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(stocks: StocksInterface) {
      const disposable = this.dialogService.addDialog(StocksEditModalComponent, stocks)
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
          this.service.remove(item.idstock)
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
            (data: StocksResponseInterface) =>  {
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
