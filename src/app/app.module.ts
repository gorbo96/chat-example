import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from './modules/ng-zorro/ng-zorro.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViewerComponent } from './modules/pdf-viewer/pdf-viewer.component';

registerLocaleData(es);


@NgModule({
  declarations: [AppComponent, PdfViewerComponent],
  imports: [BrowserModule,HttpClientModule,FormsModule, BrowserAnimationsModule,NgZorroAntdModule,PdfViewerModule],
  providers: [
    { provide: NZ_I18N, useValue: es_ES }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}