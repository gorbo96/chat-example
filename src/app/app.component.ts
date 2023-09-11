import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ChatServiceService } from './chat-service.service';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { MessageParams} from './message-params';
import { MessageGPT} from './message-gpt';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { catchError, takeUntil } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  messages:MessageGPT[]=[]
  msgParams:MessageParams= new MessageParams()
  actMsg:MessageGPT=new MessageGPT()
  visiblebox:boolean=false
  
  constructor(public msg: ChatServiceService){
  }

  ngOnInit(): void {}

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
    })
    this.actMsg.data=""
  }
  visiblechat(){
    this.visiblebox=!this.visiblebox
  }
}
