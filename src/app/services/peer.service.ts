import {Injectable} from '@angular/core';
import Peer from 'peerjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeerService {
  peer: any;

  constructor() {
    this.peer = new Peer(undefined, {
      host: environment.PEERJS_HOST,
      path: environment.PEERJS_PATH,
      port: environment.PEERJS_PORT,
      secure: false
    });

    //ya el servidor de peerjs esta corriendo y funcionando en BE
    //faltaria es integrar los room con FE y BE del proyecto 
  }
}
