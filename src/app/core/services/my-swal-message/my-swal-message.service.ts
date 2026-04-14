import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})

export class MySwalMessageService {

  succesMsg(message: string) {
    Swal.fire({
      title: `${message}`,
      icon: "success",
      draggable: true,
      showConfirmButton: false,
      timer: 1500,
    });
  }


  errorMsg(message: string) {
    Swal.fire({
      title: `${message}`,
      icon: "error",
      draggable: true,
      showConfirmButton: false,
      timer: 1500,
    });
  }


  succesAddedItemToast(list: string) {
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    }).fire({
      icon: "success",
      title: `Item Added to ${list}`
    });
  }

  succesDeletetItemToast(list: string) {
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    }).fire({
      icon: "warning",
      title: `Item Deleted to ${list}`
    });
  }



}
