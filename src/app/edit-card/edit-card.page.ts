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
  catId: string;
  cardId: number;

  constructor(private db: DatabaseService, private toastController: ToastController, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {

      let stringCardId = params.get('idCard');
      this.cardId = parseInt(stringCardId, 10);

      this.catId = params.get('idCategory');
      console.log('cardId + catId : ' + this.cardId + ' / ' + this.catId);
      this.db.getDatabaseState().subscribe(rdy => {
        if (rdy) {
          console.log(this.cardId);
          this.db.getCard(this.cardId).then(data => {
            console.log(data);
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

  onEditCard() {
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
