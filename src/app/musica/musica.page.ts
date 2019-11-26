import { Component, OnInit } from '@angular/core';
import { Musica } from '../entities/musica';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { DBService } from '../services/db.service';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.page.html',
  styleUrls: ['./musica.page.scss'],
  providers: [DBService, AuthenticationService]
})
export class MusicaPage {
  newMusica: Musica;

  lista: Musica[];


  constructor(private dbService: DBService, private authService: AuthenticationService) {
    this.lista = [];
    this.newMusica = new Musica();

    this.inicializarMusicas();
  }

  async inicializarMusicas() {
    this.lista = await this.dbService.listWithUIDs<Musica>('musicas');
  }

  async adicionarMusicas() {
    await this.dbService.insertInList('musicas', this.newMusica);

    this.inicializarMusicas();

    alert('Música cadastrada com sucesso!');

    this.newMusica = new Musica();
  }

  async remove(key: string) {
    await this.dbService.remove('musicas', key);

    alert('Musica removida com sucesso!');

    this.inicializarMusicas();
  }

  edit(musica) {
    musica.isEditing = true;
  }

  cancelEdit(musica) {
    musica.isEditing = false;
  }

  confirmEdit(musica) {
    this.dbService.update('usuarios', musica.uid, {artista: musica.artista, name: musica.name, album: musica.album, duracao: musica.duracao, genero: musica.genero});
    musica.isEditing = false;
  }
  

}
