import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {WebsocketsService} from "../../../services/websockets.service";

@Component({
  selector: 'app-ruta-bienvenido',
  templateUrl: './ruta-bienvenido.component.html',
  styleUrls: ['./ruta-bienvenido.component.css']
})
export class RutaBienvenidoComponent implements OnInit {

  salaId=0
  nombre=""

  salas = [
    {numero:1, color: '#86d9c3'},
    {numero:2, color: '#8bbfe5'},
    {numero:3, color: '#86D9C3FF'},
    {numero:4, color: '#8bbfe5'},
    {numero:5, color: '#86D9C3FF'},
    {numero:6, color: '#8bbfe5'},
    {numero:7, color: '#86D9C3FF'},
    {numero:8, color: '#8bbfe5'},
    {numero:9, color: '#86D9C3FF'},
  ]
  constructor(private readonly router:Router,
              private readonly webSocketService:WebsocketsService) { }

  ngOnInit(): void {
  }

  setId(idSala:number){
    this.salaId=idSala
  }

  continuar(){
    this.webSocketService.ejecutarEventoUnirseSala(+this.salaId,this.nombre)
    this.router.navigate(['/salaEspera/'+this.salaId+'/'+this.nombre])

  }
}
