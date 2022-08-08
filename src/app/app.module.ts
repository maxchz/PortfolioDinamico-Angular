import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { SobreMiComponent } from './components/sobre-mi/sobre-mi.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { HabilidadesComponent } from './components/habilidades/habilidades.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InterceptorService } from './service/interceptor.service';
import { DatosPortfoliosService } from './service/datos-portfolios.service';
import { HomeComponent } from './components/home/home.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EditDialogComponent } from './components/meterial/edit-dialog/edit-dialog.component';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreaUsuarioDialogComponent } from './components/meterial/crea-usuario-dialog/crea-usuario-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { EditarUsuarioDialogComponent } from './components/meterial/editar-usuario-dialog/editar-usuario-dialog.component';
import { CreaSobreMiDialogComponent } from './components/meterial/crea-sobre-mi-dialog/crea-sobre-mi-dialog.component';
import { MensajePantallaComponent } from './components/mensaje-pantalla/mensaje-pantalla.component';
import { CreaExperienciaDialogComponent } from './components/meterial/crea-experiencia-dialog/crea-experiencia-dialog.component';
import { EditaExperienciaDialogComponent } from './components/meterial/edita-experiencia-dialog/edita-experiencia-dialog.component';
import { EliminaExperienciaDialogComponent } from './components/meterial/elimina-experiencia-dialog/elimina-experiencia-dialog.component';
import { CreaEducacionDialogComponent } from './components/meterial/crea-educacion-dialog/crea-educacion-dialog.component';
import { EditaEducacionDialogComponent } from './components/meterial/edita-educacion-dialog/edita-educacion-dialog.component';
import { EliminaEducacionDialogComponent } from './components/meterial/elimina-educacion-dialog/elimina-educacion-dialog.component';
import { CreaProyectoDialogComponent } from './components/meterial/crea-proyecto-dialog/crea-proyecto-dialog.component';
import { EditaProyectoDialogComponent } from './components/meterial/edita-proyecto-dialog/edita-proyecto-dialog.component';
import { EliminaProyectoDialogComponent } from './components/meterial/elimina-proyecto-dialog/elimina-proyecto-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    SobreMiComponent,
    ExperienciaComponent,
    EducacionComponent,
    ProyectosComponent,
    HabilidadesComponent,
    ContactoComponent,
    IniciarSesionComponent,
    PortfolioComponent,
    FooterComponent,
    HomeComponent,
    RegistroUsuarioComponent,
    EditDialogComponent,
    CreaUsuarioDialogComponent,
    EditarUsuarioDialogComponent,
    CreaSobreMiDialogComponent,
    MensajePantallaComponent,
    CreaExperienciaDialogComponent,
    EditaExperienciaDialogComponent,
    EliminaExperienciaDialogComponent,
    CreaEducacionDialogComponent,
    EditaEducacionDialogComponent,
    EliminaEducacionDialogComponent,
    CreaProyectoDialogComponent,
    EditaProyectoDialogComponent,
    EliminaProyectoDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),



  ],
  providers: [DatosPortfoliosService,
   { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
   {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
