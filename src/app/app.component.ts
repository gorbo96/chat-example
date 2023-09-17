import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatServiceService } from './chat-service.service';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { MessageParams} from './message-params';
import { MessageGPT} from './message-gpt';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { catchError, takeUntil } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DomSanitizer } from '@angular/platform-browser';
import {PdfViewerComponent} from './modules/pdf-viewer/pdf-viewer.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('scrollframe', { read: ElementRef,static:false}) scrollFrame: ElementRef<any> | undefined;  
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

  async sendMessage(){    
    let actMsg= new MessageGPT()
    actMsg.data=this.actMsg.data
    this.messages.push(actMsg)
    this.msgParams.question=actMsg.data   
    this.actMsg.data=""    
    await this.scrollBottom()
    let newMsg= new MessageGPT()
    newMsg.loading=false
    newMsg.system=true
    newMsg.data="respuesta"
    this.messages.push(newMsg)
    await this.scrollBottom()
    /*
    let aux= await this.msg.getChatResponse(this.msgParams).toPromise()
    this.messages[this.messages.length - 1].data=aux.data.content
    this.messages[this.messages.length - 1].loading=false    
    await this.scrollBottom()
    */
  }
  visiblechat(){
    this.visiblebox=!this.visiblebox
  }
  async scrollBottom(){
    await new Promise(f => setTimeout(f, 100));
    if (this.scrollFrame!=undefined){
      this.scrollFrame.nativeElement.scrollTo({
        top: this.scrollFrame.nativeElement.scrollHeight,
        left: 0,
        behavior: "instant",
      })
    }
  }
}
