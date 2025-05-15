import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from 'src/app/servicios/clientes.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
  standalone: true,
  imports: [IonInput, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ClientePage implements OnInit {
  id: number = 0;
  public objCliente: any = {
    cli_id: 0,
    cli_identificacion: "",
    cli_nombre: "",
    cli_telefono: "",
    cli_correo: "",
    cli_direccion: "",
    cli_pais: "",
    cli_ciudad: ""
  };

  constructor(
    private route: ActivatedRoute, //capturar lo que está en la URL
    private servC: ClientesService
  ) { 
    this.id = this.route.snapshot.params["id"]?this.route.snapshot.params["id"]:0;
    //console.log("Cliente: "+this.id)
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    if(this.id>0){
      //recuperar datos de clientes con el ID
      this.servC.getClienteXid(this.id).subscribe(
        (respuesta:any)=>{
          this.objCliente = respuesta;
          console.log(this.objCliente);
        }
      );
    }else{
      console.log("Nuevo Cliente")
    }
  }


}
