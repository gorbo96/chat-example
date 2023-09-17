import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit{
  page:number=1
  zoom:number=1.0
  pages:number=3
  ngOnInit(): void {}
  prevPage(){
    if(this.page>1){
      this.page--
    }    
  }
  nextPage(){
    if(this.page<this.pages){
      this.page++
    }
  }
  zoomIn(){
    if(this.zoom<3.0){
      this.zoom+=0.5
    }
  }
  zoomOut(){
    if(this.zoom>0.5){
      this.zoom-=0.5
    }
  }   
}
