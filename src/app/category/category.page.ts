import { Component, OnInit } from '@angular/core';
import { DatabaseService, Category, Card } from '../database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  category: Category;
  cards = [];
  card: Card;

  isCategoryEmpty: boolean;

  constructor(private db: DatabaseService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      let catId = params.get('id');
      console.log('catId: ' + catId);
      this.db.getDatabaseState().subscribe(rdy => {
        if (rdy) {
          this.db.getCategory(catId).then(data => {
            console.log(data);
            this.category = data;
            console.log('this.category : ' + this.category);
            console.log('this.category.title : ' + this.category.title);
            console.log('this.category.id : ' + this.category.id);
          }).then(_ => {
            this.db.getCardsOfCategory(catId).then(data => {
              console.log('data :' + data);
              if (data == undefined) {
                this.isCategoryEmpty = true;
                console.log(this.isCategoryEmpty);
              }
              else {
                this.isCategoryEmpty = false;
                console.log(this.isCategoryEmpty);
                console.log(data);
                this.cards = data;
                console.log(this.cards);
              };
            });
          });
        }
      });
    });
  }

  ngOnInit() {
  }



  //getCard(this.category.id, randomCardId) {}

}
