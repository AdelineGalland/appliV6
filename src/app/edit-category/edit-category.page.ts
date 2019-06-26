import { Component, OnInit } from '@angular/core';
import { DatabaseService, Category } from '../database.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.page.html',
  styleUrls: ['./edit-category.page.scss'],
})
export class EditCategoryPage implements OnInit {

  category: Category;

  constructor(private db: DatabaseService, private toastController: ToastController, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      let catId = params.get('id');
      console.log('catId: ' + catId);
      this.db.getDatabaseState().subscribe(rdy => {
        if (rdy) {
          this.db.getCategory(catId).then(data => {
            this.category = data;
            console.log(this.category);
          });
        };
      });
    });
  }

  ngOnInit() {

  }

  //validators pattern : https://ionicthemes.com/tutorials/about/forms-and-validation-in-ionic

  onEditCategory() {
    console.log(this.category);
    this.db.updateCategory(this.category).then(_ => {
      this.presentToast();
    })

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Catégorie n°" + this.category.id + " bien modifiée !",
      duration: 2000
    });
    toast.present();
  }
}

