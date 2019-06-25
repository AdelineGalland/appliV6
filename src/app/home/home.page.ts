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

  hasCards: boolean;

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
    this.db.onAddCategory(this.category['title'])
      .then(_ => {
        this.category = {};
      });
  }

  onAddCard() {
    this.db.onAddCard(this.card['question'], this.card['answer'], this.card['categoryId'])
      .then(_ => {
        this.card = {};
      });
  }
}
