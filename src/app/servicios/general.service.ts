import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  proceso: number = 1 // 1 -> trabajar de forma local | 2-> Web service
  
  public URLSERV:string =""
    constructor( private router:Router,
      private toast:ToastController) { 
        if(this.proceso === 1){
          this.URLSERV = "http://localhost:3001/api/"
        }else{
          this.URLSERV = "" //URL del hosting  "http://192.168.1.1:3001/API/"
        }
      }
    
    //funciones generales
    irA(url:string){
      this.router.navigateByUrl(url);
    }
  
    //funcion emite mensaje
    async fun_Mensaje(texto: string, tipo: string = 'success') {
      let t = await this.toast.create({
        message: texto,
        color: tipo,
        duration: 3000
      });
      t.present();
  }

  imagenUrl(urlimagen:any){
    let url=this.URLSERV+urlimagen;
    return url;
  }
}

