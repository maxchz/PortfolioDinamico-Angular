import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificacionToastService {

  constructor( private toast: ToastrService) { }

  showSuccess(texto: string, titulo: string){
    this.toast.success(texto, titulo,  {
      tapToDismiss: true,
      disableTimeOut: true,
      positionClass: 'toast-bottom-left',
      onActivateTick: true,
    });
  };

  showError(texto: string, titulo: string){
    this.toast.error(texto, titulo, {
      tapToDismiss: true,
      disableTimeOut: true,
      positionClass: 'toast-bottom-left',
      onActivateTick: true,
    });
  };
}
