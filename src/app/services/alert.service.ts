import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AlertService {
  error(errorMessage) {
    return Swal.fire({
      title: errorMessage,
      icon: 'error',
    });
  }
  success(successMessage) {
    return Swal.fire({
      title: successMessage,
      icon: 'success',
    });
  }
}