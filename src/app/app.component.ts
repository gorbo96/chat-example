import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ChatServiceService } from './chat-service.service';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { MessageParams} from './message-params';
import { MessageGPT} from './message-gpt';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { catchError, takeUntil } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DomSanitizer } from '@angular/platform-browser';
import {PdfViewerComponent} from './modules/pdf-viewer/pdf-viewer.component'
import {AudioRecordingService} from './audio-recording.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy{
  @ViewChild('scrollframe', { read: ElementRef,static:false}) scrollFrame: ElementRef<any> | undefined;  
  messages:MessageGPT[]=[]
  msgParams:MessageParams= new MessageParams()
  actMsg:MessageGPT=new MessageGPT()
  visiblebox:boolean=false  
  recordElemnts:boolean=false

  isRecording:boolean=false  
  recordedTime:any
  blobUrl:any
  teste:any

  record:any
  audioError:any
  url:any
  

  constructor(private msg: ChatServiceService,private sanitizer: DomSanitizer,private audioRecordingService: AudioRecordingService,){
    this.audioRecordingService.recordingFailed().subscribe(() => (this.isRecording = false))
    this.audioRecordingService.getRecordedTime().subscribe(time => (this.recordedTime = time))
    this.audioRecordingService.getRecordedBlob().subscribe(data => {
      this.teste = data;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );
    });
  }  

  ngOnInit(): void {}

  startRecording() {
    if (!this.isRecording) {
      this.recordElemnts= true
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;      
    }
  }

  sendRecord(){

  }

  clearRecordedData() {
    this.blobUrl = null;
    this.recordElemnts=false
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

  /*
  initiateRecording() {
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
    //var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    //this.record = new StereoAudioRecorder(stream, options);
    //this.record.record();
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
    newMsg.loading=true
    newMsg.system=true    
    this.messages.push(newMsg)
    await this.scrollBottom()    
    let aux= await this.msg.getChatResponse(this.msgParams).toPromise()
    this.messages[this.messages.length - 1].data=aux.data.content
    this.messages[this.messages.length - 1].loading=false    
    await this.scrollBottom()
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
