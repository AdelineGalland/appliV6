
import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';

export interface Category {
  id: number,
  title: string
}

export interface Card {
  id: number,
  question: string,
  answer: string,
  categoryId: number
}

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  categories = new BehaviorSubject([]);
  cards = new BehaviorSubject([]);
  cardsOfCategory = new BehaviorSubject([]);

  selectedCategory: [];

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      console.log('plt ready');
      this.sqlite.create({
        name: 'flashcards.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
        });
    });
  }

  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text' })
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(_ => {
            this.loadCategories();
            this.loadCards();
            this.dbReady.next(true);
            console.log('seedDatabase OK !')
          })
          .catch(e => console.error(e));
      });
  }

  // appelée dans seedDatabase()
  loadCategories() {
    return this.database.executeSql('SELECT * FROM category', [])
      .then(data => {

        // création d'une constante de type Category initialisée à tableau vide.
        let categories: Category[] = [];

        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {

            // on remplit le tableau avec chacune des lignes du résultat de la requête
            categories.push({
              id: data.rows.item(i).id,
              title: data.rows.item(i).title
            });
          }
        }
        // dans la variable categories déclarée dans la class, on met le contenu de la variable categories tout juste modifiée
        this.categories.next(categories);
        console.log(this.categories);
      });
  }

  // appelée dans seedDatabase()
  loadCards() {
    let query = 'SELECT card.question, card.answer, category.title AS categoryTitle FROM card JOIN category ON category.id = card.categoryId';
    return this.database.executeSql(query, []).then(data => {
      let cards = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          cards.push({
            question: data.rows.item(i).question,
            answer: data.rows.item(i).answer,
            categoryTitle: data.rows.item(i).categoryTitle
          });
        }
      }
      this.cards.next(cards);
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getCategories(): Observable<Category[]> {
    return this.categories.asObservable();
  }

  getCategory(id): Promise<Category> {
    console.log('entrée dans getCategory()');
    let query = 'SELECT * FROM category WHERE id = ?';
    return this.database.executeSql(query, [id]).then(data => {
      console.log('id :' + id);
      console.log('data :' + data);
      console.log('data.rows.item(0).title :' + data.rows.item(0).title)
      return {
        id: data.rows.item(0).id,
        title: data.rows.item(0).title
      }
    });
  }

  getHighestCatId() {
    let query = 'SELECT MAX(id) FROM category'
    return this.database.executeSql(query);
  }

  addCategory(title) {
    console.log('entrée dans addCategory()');
    console.log(typeof title);
    let query = 'INSERT INTO category (title) VALUES (?)';
    /* let stringifiedTitle = title.toString();
    console.log(stringifiedTitle); */
    return this.database.executeSql(query, [title]).then(_ => {
      console.log('loadCategories()...');
      this.loadCategories();
    });
  }

  deleteCategory(id) {
    let query = 'DELETE FROM category WHERE id = ?';
    return this.database.executeSql(query, [id]).then(_ => {
      this.loadCategories();
      this.loadCards();
    });
  }

  updateCategory(category: Category) {
    let data = [category.title, category.id];
    console.log(category.title, category.id);
    let query = 'UPDATE category SET title = ? WHERE id = ?';
    return this.database.executeSql(query, data)
      .then(_ => {
        this.loadCategories();
        console.log('catégories bien loadées');
      })
  }

  getCardsOfCategory(catId) {
    // console.log('catID : ' + catId);
    let query = 'SELECT card.id, card.question, card.answer, card.categoryId FROM card WHERE categoryId = ?';
    //voir category.id = catId voire catId
    return this.database.executeSql(query, [catId])
      .then(data => {
        let cards = [];
        // console.log('entrée dans le .then');
        // console.log(data);
        // console.log(data.rows);
        // console.log(data.rows.length);
        if (data.rows.length > 0) {
          // console.log('entrée dans le if');
          for (var i = 0; i < data.rows.length; i++) {
            cards.push({
              id: data.rows.item(i).id,
              question: data.rows.item(i).question,
              answer: data.rows.item(i).answer,
              categoryId: data.rows.item(i).categoryId
            });
          }
          console.log(cards);
          return cards;
        }
        /*        this.cardsOfCategory.next(cards);
               console.log(this.cardsOfCategory); */
      });
  }

  getCards(): Observable<Card[]> {
    return this.cards.asObservable();
  }

  getCard(selectedCategoryId, cardId): Promise<Card> {
    let query = 'SELECT card.question, card.answer FROM card JOIN category ON category.id = card.categoryId WHERE category.id = :catId AND card.id = :cardId';
    return this.database.executeSql(query, [{ "catId": selectedCategoryId }, { "cardId": cardId }]).then(data => {
      return {
        id: data.rows.item(0).id,
        question: data.rows.item(0).question,
        answer: data.rows.item(0).answer,
        categoryId: data.rows.item(0).categoryId
      }
    });
  }

  addCard(question, answer, categoryId) {
    let data = [question, answer, categoryId];
    return this.database.executeSql('INSERT INTO card (question, answer, categoryId) VALUES (?, ?, ?)', data).then(_ => {
      this.loadCards();
    });
  }

}
