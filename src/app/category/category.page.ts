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

  constructor(private db: DatabaseService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      let catId = params.get('id');
      this.db.getCategory(catId).then(data => {
        this.category = data;
        console.log(this.category);
      }).then(_ => {
        this.db.getCardsOfCategory(catId);
        console.log(this.db.getCardsOfCategory(catId));
      })
    });
  }

  //getCard(this.category.id, randomCardId) {}

}
