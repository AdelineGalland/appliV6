import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.page.html',
  styleUrls: ['./new-card.page.scss'],
})
export class NewCardPage implements OnInit {

  categoryId: number;
  question: string;
  answer: string;

  constructor(private route: ActivatedRoute, private service: DatabaseService, public toastController: ToastController) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let stringId = params.get('idCategory');
      this.categoryId = parseInt(stringId, 10);
      // console.log('id de la catégorie sélectionnée : ' + this.categoryId);
    })
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    this.question = form.value['question'];
    // console.log(this.question);
    this.answer = form.value['answer'];
    // console.log(this.answer);
    this.service.addCard(this.question, this.answer, this.categoryId);
    form.reset();
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Flashcard bien créée !",
      duration: 2000
    });
    toast.present();
  }
}
