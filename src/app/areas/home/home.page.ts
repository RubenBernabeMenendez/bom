import { Component } from '@angular/core';
import {DbService} from "../shared/db.service";
import {ConfigPartidaService} from "../services/config-partida.service";
import {ConfigPartida} from "../models/ConfigPartida";
import {TipoPartidaService} from "../services/tipo-partida.service";
import {TipoPartida} from "../models/TipoPartida";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  array: ConfigPartida[] = [];

  constructor(private configPartidaService: ConfigPartidaService, private tipoPartidaService: TipoPartidaService) {
  }

  storeData() {
    this.configPartidaService.add(2, 3, 1, 'N').then((scs) => {
      alert(scs.insertId);
    });
  }
  ionViewDidEnter() {
    this.configPartidaService.findAll().then((scs: ConfigPartida[]) => {
        if (scs.length > 0) {
          this.array = scs;
          for (let i = 0; i < scs.length; i++) {
            this.tipoPartidaService.findById(scs[i].tipoPartida.tipoPartidaId).then( (tipoPartida: TipoPartida) => {
              this.array[i].tipoPartida = tipoPartida;
            });
            //alert(scs[i].configPartidaId + ' ' + scs[i].tipoPartida.tipoPartidaId + scs[i].tipoPartida.nombre + ' ' + scs[i].rolesJugador);
          }
        }
      }
    );
  }

}
