import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatServiceService } from './chat-service.service';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { MessageParams} from './message-params';
import { MessageGPT} from './message-gpt';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { catchError, takeUntil } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('scrollframe', { read: ElementRef,static:false}) public scrollFrame: ElementRef<any> | undefined;  
  messages:MessageGPT[]=[]
  msgParams:MessageParams= new MessageParams()
  actMsg:MessageGPT=new MessageGPT()
  visiblebox:boolean=false
  record:any
  recording:boolean=false
  audioError:any
  url:any

  constructor(public msg: ChatServiceService,private domSanitizer: DomSanitizer){
  }  

  ngOnInit(): void {}

  /*initiateRecording() {
    this.recording = true;
    let mediaConstraints = {
    video: false,
    audio: true
    };
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }
  successCallback(stream:any) {
    var options = {
    mimeType: "audio/wav",
    numberOfAudioChannels: 1,
    sampleRate: 16000,
    };
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }
  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }
  processRecording(blob:any) {
    this.url = URL.createObjectURL(blob);
    console.log("blob", blob);
    console.log("url", this.url);
  }
  errorCallback(error:any) {
    this.audioError = 'Can not play audio in your browser';
  }
  */

  sendMessage(){    
    let actMsg= new MessageGPT()
    actMsg.data=this.actMsg.data
    this.messages.push(actMsg)
    this.msgParams.question=actMsg.data
    let newMsg= new MessageGPT()
    newMsg.loading=true
    newMsg.system=true
    this.messages.push(newMsg)    
    this.msg.getChatResponse(this.msgParams).subscribe(data=>{
      this.messages[this.messages.length - 1].data=data.data.content
      this.messages[this.messages.length - 1].loading=false
      if (this.scrollFrame!=undefined){      
        this.scrollFrame.nativeElement.scrollTo({
          top: 300,
          left: 0,
          behavior: "instant",
        })
      }
    })
    this.actMsg.data=""
    
  }
  visiblechat(){
    this.visiblebox=!this.visiblebox
  }
}
