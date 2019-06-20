import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, DatabaseService } from '../database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  categories: Category[] = [];

  cards: Observable<any[]>;

  category = {};
  card = {};

  //selectedView = 'devs';

  constructor(private db: DatabaseService) {
    console.log("constructeur de homePage");
  }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getCategories().subscribe(categories => {
          this.categories = categories;
          console.log(this.categories);
        })
        this.cards = this.db.getCards();
      }
    });
  }

  addCategory() {
    this.db.addCategory(this.category['title'])
      .then(_ => {
        this.category = {};
      });
  }

  addCard() {
    this.db.addCard(this.card['question'], this.card['answer'], this.card['categoryTitle'])
      .then(_ => {
        this.card = {};
      });
  }


}
