import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './components/room/room.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';



@NgModule({
  declarations: [
    RoomComponent,
    VideoPlayerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RoomModule { }
