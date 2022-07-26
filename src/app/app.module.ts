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
    EditDialogComponent
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
    MatInputModule

  ],
  providers: [DatosPortfoliosService,
   { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
   {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
