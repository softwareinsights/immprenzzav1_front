import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PersonasService } from './../personas.service';
import { PersonasInterface } from './../personas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SexosService } from './../../../../sexos/components/sexos-table/sexos.service';
import { SexosAddModalComponent } from './../../../../sexos/components/sexos-table/sexos-add-modal/sexos-add-modal.component';
import { CiudadsService } from './../../../../ciudads/components/ciudads-table/ciudads.service';
import { CiudadsAddModalComponent } from './../../../../ciudads/components/ciudads-table/ciudads-add-modal/ciudads-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./personas-add-modal.component.scss')],
  templateUrl: './personas-add-modal.component.html'
})
export class PersonasAddModalComponent extends DialogComponent<PersonasInterface, any> implements OnInit, PersonasInterface {
  _sexo: string[] = [];
  _ciudad: string[] = [];

  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  emailPersonal: string;
  telefonoCasa: string;
  telefonoOficina: string;
  edad: number;
  sexo_idsexo: number;
  ciudad_idciudad: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  nombreAC: AbstractControl;
  apellidoPaternoAC: AbstractControl;
  apellidoMaternoAC: AbstractControl;
  emailPersonalAC: AbstractControl;
  telefonoCasaAC: AbstractControl;
  telefonoOficinaAC: AbstractControl;
  edadAC: AbstractControl;
  sexo_idsexoAC: AbstractControl;
  ciudad_idciudadAC: AbstractControl;

  constructor(
    private service: PersonasService,
    private sexosService: SexosService,
    private ciudadsService: CiudadsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'nombreAC' : ['',Validators.compose([Validators.required,Validators.maxLength(45)])],
    'apellidoPaternoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(45)])],
    'apellidoMaternoAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'emailPersonalAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'telefonoCasaAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'telefonoOficinaAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'edadAC' : ['',Validators.compose([Validators.maxLength(2)])],
    'sexo_idsexoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'ciudad_idciudadAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    });
    this.nombreAC = this.form.controls['nombreAC'];
    this.apellidoPaternoAC = this.form.controls['apellidoPaternoAC'];
    this.apellidoMaternoAC = this.form.controls['apellidoMaternoAC'];
    this.emailPersonalAC = this.form.controls['emailPersonalAC'];
    this.telefonoCasaAC = this.form.controls['telefonoCasaAC'];
    this.telefonoOficinaAC = this.form.controls['telefonoOficinaAC'];
    this.edadAC = this.form.controls['edadAC'];
    this.sexo_idsexoAC = this.form.controls['sexo_idsexoAC'];
    this.ciudad_idciudadAC = this.form.controls['ciudad_idciudadAC'];
  }
  ngOnInit() {
      this.getSexo();
      this.getCiudad();
  }
  sexoAddModalShow() {
      const disposable = this.dialogService.addDialog(SexosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.sexoShowToast(data);
          }
      });
  }
  sexoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getSexo();
      } else {
          this.toastrService.error(result.message);
      }
  }
  ciudadAddModalShow() {
      const disposable = this.dialogService.addDialog(CiudadsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.ciudadShowToast(data);
          }
      });
  }
  ciudadShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getCiudad();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getSexo() {
      this.sexosService.all()
      .subscribe(
          (data: any) => this._sexo = data.result,
      );
  }
  getCiudad() {
      this.ciudadsService.all()
      .subscribe(
          (data: any) => this._ciudad = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: PersonasInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  nombre: this.nombre,
                  apellidoPaterno: this.apellidoPaterno,
                  apellidoMaterno: this.apellidoMaterno,
                  emailPersonal: this.emailPersonal,
                  telefonoCasa: this.telefonoCasa,
                  telefonoOficina: this.telefonoOficina,
                  edad: this.edad,
                  sexo_idsexo: this.sexo_idsexo,
                  ciudad_idciudad: this.ciudad_idciudad,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
