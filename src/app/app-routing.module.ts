import { NgModule } from '@angular/core';
import  { RouterModule, Routes } from '@angular/router';
import { EducacionComponent } from './components/educacion/educacion.component';
import { HomeComponent } from './components/home/home.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { GuardGuard } from './service/guard.guard';

//Definición de rutas de navegación
const routes: Routes = [
  {path: 'portfolio', component: PortfolioComponent, canActivate: [GuardGuard]},
  {path: 'iniciar-sesion', component: IniciarSesionComponent},
  {path:'home', component: HomeComponent},
  {path:'registrar-usuario', component: RegistroUsuarioComponent},
  {path:'', redirectTo:'home', pathMatch: 'full'}

  // {path:'', redirectTo:'iniciar-sesion', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
