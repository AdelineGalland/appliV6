import { Component, OnInit } from '@angular/core';
import { DatabaseService, Category } from '../database.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  category: Category;

  constructor(private db: DatabaseService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      let catId = params.get('id');

      this.db.getCategory(catId).then(data => {
        this.category = data;
        console.log(this.category);
      });
    });
  }

  //getCard(this.category.id, randomCardId) {}

}
