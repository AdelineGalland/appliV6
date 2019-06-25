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

  constructor(private db: DatabaseService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      let catId = params.get('id');
      console.log('catId: ' + catId);
      this.db.getDatabaseState().subscribe(rdy => {
        if (rdy) {
          this.db.getCategory(catId).then(data => {
            this.category = data;
            console.log('this.category : ' + this.category);
            console.log('this.category.title : ' + this.category.title);
          }).then(_ => {
            this.db.getCardsOfCategory(catId).then(data => {
              this.cards = data;
            })
          })
        }
      })

    });
  }

  ngOnInit() {


  }

  //getCard(this.category.id, randomCardId) {}

}
