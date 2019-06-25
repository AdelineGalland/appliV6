import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.page.html',
  styleUrls: ['./new-category.page.scss'],
})

export class NewCategoryPage implements OnInit {

  title: string;
  /*   newId: number;
   */
  constructor(private service: DatabaseService, public toastController: ToastController) {

  }

  ngOnInit() {

  }

  // sécurité !
  // vérifier que title n'existe pas déjà dans la BDD

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.title = form.value['title'];
    console.log(this.title);
    this.service.addCategory(this.title);
    this.presentToast();
    /* this.service.getHighestCatId().then(data => {
      this.newId = data + 1;
      console.log('this.newOd : ' + this.newId)
      this.service.onAddCategory(this.title);
      this.presentToast();
    }); */

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Catégorie \"" + this.title + "\" bien créée !",
      duration: 2000
    });
    toast.present();
  }

  /* ngOnDestroy() {
    console.log("destruction réussie");
  } */
}
