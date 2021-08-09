import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WebSocketService} from "../../../../services/web-socket.service";
import {PeerService} from "../../../../services/peer.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  roomName: string;
  currentStream: any;
  listUser: Array<any> = [];

  constructor(private route: ActivatedRoute, private webSocketService: WebSocketService,
              private peerService: PeerService) {
    this.roomName = route.snapshot.paramMap.get('id');
  }

  async ngOnInit(): Promise<void>{
    //this.checkMediaDevices();  
    //this.initPeer();
    this.initSocket();
    console.log("fin proceso!")
  }

  initPeer = async ():Promise<void> => {
    const {peer} = this.peerService;
    peer.on('open', async (id) => {
      const body = {
        idPeer: id,
        roomName: this.roomName
      };
      console.log("uniendose al cuarto")
      console.log(body)
      this.webSocketService.joinRoom(body);
    });


    peer.on('call', callEnter => {
      console.log("agregando la llamada entrante al front")
      callEnter.answer(this.currentStream);
      callEnter.on('stream', (streamRemote) => {
        this.addVideoUser(streamRemote);
      });
    }, err => {
      console.log('*** ERROR *** Peer call ', err);
    });
  }

  initSocket = async ():Promise<void> => {
    this.checkMediaDevices()
    this.initPeer();
    console.log("pasa por aqui?")
    this.webSocketService.cbEvent.subscribe(res => {
      console.log("***********")
      console.log(res.name)
      console.log("***********")
      if (res.name === 'new-user') {
        console.log("SOCKET", res)
        const {idPeer} = res.data;
        console.log("primer stream recibido:",)

        //ultimo registro: ya aparecio la segunda caja de video en ambos clientes
        //la caja es negra, no pude confirmar que efectivamente sea el video del otro cliente
        //actualmente parece haber un problema con el tiempo de espera y el momento en que
        //se consigue el stream de video del navegador
        //tal vez con algo de debug y awaits sera suficiente...
        setTimeout(()=>{
          this.sendCall(idPeer, this.currentStream);
        },1000) 
      }
    })
  }

  checkMediaDevices = async ():Promise<void> => {
    if (navigator && navigator.mediaDevices) {
      this.currentStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      })
      console.log("consegui el stream")
      this.addVideoUser(this.currentStream);
      console.log(this.currentStream)
    } else {
      console.log('*** ERROR *** Not media devices');
    }
  }

  addVideoUser = (stream: MediaStream) => {
    console.log("apunto de agregar el video al front:",stream)
    this.listUser.push(stream);
    console.log("usuarios:")
    const unique = new Set(this.listUser);
    this.listUser = [...unique];
    console.log(this.listUser)
  }

  sendCall = (idPeer, stream) => {
    console.log("enviando la llamada al peer",idPeer)
    console.log("stream es:",stream)
    const newUserCall = this.peerService.peer.call(idPeer, stream);
    console.log("valor del newUserCall:",newUserCall)
    if (!!newUserCall) {
      newUserCall.on('stream', (userStream: MediaStream) => {
        console.log('!!!!!!!!!!!!!!!!!!!!');
        console.log('stream received!');
        console.log('!!!!!!!!!!!!!!!!!!!!');
        this.addVideoUser(userStream);
      })
      newUserCall.on('error',(error)=>{
        console.log(error);
    })
    }
  }

}