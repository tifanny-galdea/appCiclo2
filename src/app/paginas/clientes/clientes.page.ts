import { GeneralService } from 'src/app/servicios/general.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import{IonicModule, LoadingController, IonItemSliding} from '@ionic/angular'
import { ClientesService } from 'src/app/servicios/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ClientesPage implements OnInit {

  objetoRespuesta: any;
  listaClientes: any[] = []

  constructor(
    private servClientes: ClientesService,
    private loading: LoadingController,
    public servG: GeneralService
  ) { }

  ngOnInit() {
    this.cargarClientes();
  }

  async cargarClientes(){
    let l= await this.loading.create()
    l.present()
    this.servClientes.getClientes().subscribe(
      (respuesta: any)=>{
        this.objetoRespuesta = respuesta;
        //console.log(this.objetoRespuesta);
        if(this.objetoRespuesta.cant>0){
          this.listaClientes = this.objetoRespuesta.data;
          console.log(this.listaClientes)
          l.dismiss();
        }else{
          console.log("NO hay datos")
          this.servG.fun_Mensaje("NO hay datos")
        }
      },(error: any)=>{
        l.dismiss();
        this.servG.fun_Mensaje("Error al recuperar los datos")
      }
    );
  }

  fun_editar(id:number, ionitemsliding: IonItemSliding){
    ionitemsliding.close();
    //console.log("Editar " + id)
    this.servG.irA('/cliente/'+id)
  }

  fun_eliminar(id:number, ionitemsliding: IonItemSliding){
    ionitemsliding.close();
    //console.log("Eliminar "+id)
  }

}
