import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EmpleadotareaestadosService } from './../empleadotareaestados.service';
import { EmpleadotareaestadosInterface } from './../empleadotareaestados.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpleadotareasService } from './../../../../empleadotareas/components/empleadotareas-table/empleadotareas.service';
import { EmpleadotareasAddModalComponent } from './../../../../empleadotareas/components/empleadotareas-table/empleadotareas-add-modal/empleadotareas-add-modal.component';
import { EstadoscrumsService } from './../../../../estadoscrums/components/estadoscrums-table/estadoscrums.service';
import { EstadoscrumsAddModalComponent } from './../../../../estadoscrums/components/estadoscrums-table/estadoscrums-add-modal/estadoscrums-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./empleadotareaestados-add-modal.component.scss')],
  templateUrl: './empleadotareaestados-add-modal.component.html'
})
export class EmpleadotareaestadosAddModalComponent extends DialogComponent<EmpleadotareaestadosInterface, any> implements OnInit, EmpleadotareaestadosInterface {
  _empleadotarea: string[] = [];
  _estadoscrum: string[] = [];

  empleadotarea_idempleadotarea: number;
  estadoscrum_idestadoscrum: number;
  fecha: string;
  hora: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  empleadotarea_idempleadotareaAC: AbstractControl;
  estadoscrum_idestadoscrumAC: AbstractControl;
  fechaAC: AbstractControl;
  horaAC: AbstractControl;

  constructor(
    private service: EmpleadotareaestadosService,
    private empleadotareasService: EmpleadotareasService,
    private estadoscrumsService: EstadoscrumsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'empleadotarea_idempleadotareaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'estadoscrum_idestadoscrumAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'fechaAC' : [''],
    'horaAC' : [''],
    });
    this.empleadotarea_idempleadotareaAC = this.form.controls['empleadotarea_idempleadotareaAC'];
    this.estadoscrum_idestadoscrumAC = this.form.controls['estadoscrum_idestadoscrumAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.horaAC = this.form.controls['horaAC'];
  }
  ngOnInit() {
      this.getEmpleadotarea();
      this.getEstadoscrum();

        // GENERAR FECHA Y HORA ACTUAL
        const date = new Date();
        const month = (date.getMonth() + 1);
        const day = date.getDate();
        const fecha = date.getFullYear() + "-" + ((month < 10) ? "0" : "") + month + "-" + ((day < 10) ? "0" : "") + day;
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const hora = ((hour < 10) ? "0" : "") + hour + ':' + ((minutes < 10) ? "0" : "") + minutes;

        this.fecha = fecha;
        this.hora = hora;

  }
  empleadotareaAddModalShow() {
      const disposable = this.dialogService.addDialog(EmpleadotareasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.empleadotareaShowToast(data);
          }
      });
  }
  empleadotareaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getEmpleadotarea();
      } else {
          this.toastrService.error(result.message);
      }
  }
  estadoscrumAddModalShow() {
      const disposable = this.dialogService.addDialog(EstadoscrumsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.estadoscrumShowToast(data);
          }
      });
  }
  estadoscrumShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getEstadoscrum();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getEmpleadotarea() {
      this.empleadotareasService.all()
      .subscribe(
          (data: any) => this._empleadotarea = data.result,
      );
  }
  getEstadoscrum() {
      this.estadoscrumsService.all()
      .subscribe(
          (data: any) => this._estadoscrum = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: EmpleadotareaestadosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  empleadotarea_idempleadotarea: this.empleadotarea_idempleadotarea,
                  estadoscrum_idestadoscrum: this.estadoscrum_idestadoscrum,
                  fecha: this.fecha,
                  hora: this.hora,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
