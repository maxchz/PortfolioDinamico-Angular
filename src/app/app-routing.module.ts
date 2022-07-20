import { NgModule } from '@angular/core';
import  { RouterModule, Routes } from '@angular/router';
import { EducacionComponent } from './components/educacion/educacion.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { GuardGuard } from './service/guard.guard';

//Definición de rutas de navegación
const routes: Routes = [
  {path: 'portfolio', component: PortfolioComponent, canActivate: [GuardGuard]},
  {path: 'iniciar-sesion', component: IniciarSesionComponent},
  {path:'', redirectTo:'iniciar-sesion', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
