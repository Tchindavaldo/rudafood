import { Injectable } from '@angular/core';
import { ToastButton, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string, duration = 10000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      cssClass: 'monToast',
      swipeGesture: 'vertical',
      buttons: this.toastButtons,
    });

    // toast.onDidDismiss().then(event => console.log(event));
    await toast.present();
  }

  public toastButtons: (string | ToastButton)[] = [
    {
      side: 'end' as 'end', // Ensuring the type is correct
      icon: 'close-circle-outline',
      role: 'cancel',
      handler: () => {},
    },
  ];
}
