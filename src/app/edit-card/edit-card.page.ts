import { Component, OnInit } from '@angular/core';
import { DatabaseService, Card } from '../database.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.page.html',
  styleUrls: ['./edit-card.page.scss'],
})
export class EditCardPage implements OnInit {

  card: Card;

  constructor(private db: DatabaseService, private toastController: ToastController, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      let cardId = params.get('idCard');
      let catId = params.get('idCategory');
      console.log('cardId + catId : ' + cardId + catId);
      this.db.getDatabaseState().subscribe(rdy => {
        if (rdy) {
          this.db.getCard(cardId).then(data => {
            this.card = data;
            console.log(this.card);
          });
        };
      });
    });
  }

  ngOnInit() {

  }

  //validators pattern : https://ionicthemes.com/tutorials/about/forms-and-validation-in-ionic

  onEditCategory() {
    console.log(this.card);
    this.db.updateCard(this.card).then(_ => {
      this.presentToast();
    })

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Flashcard n°" + this.card.id + " bien modifiée !",
      duration: 2000
    });
    toast.present();
  }

  onDeleteCard() {
    console.log(this.card.id);
    this.db.deleteCard(this.card.id).then(_ => {
      console.log('delete card ok');

    })
  }

}
