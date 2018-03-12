import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {

  Server: string = 'http://ec2-52-34-75-49.us-west-2.compute.amazonaws.com:3000/';
  ApiUrl: string = '';
  // imageServerWithApiUrl: string = 'http://aidihosting.com/proyectos/proyectura_api/v1/';
  imageServerWithApiUrl: string = 'http://localhost/proyectura_api/v1/';
  ServerWithApiUrl = this.Server + this.ApiUrl;
}
