import { Component, OnInit } from '@angular/core';
import { DatabaseService, Category } from '../database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  currentCategory: Category;
  // contiendra le numéro de la catégorie précédemment sélectionnée
  catId: number;
  // contiendra le tableau déclaré dans flashcardsService
  cardsList: any[];

  // utilisé l'index "au hasard du" tableau
  randomIndex: number;
  //numéro ("id") de la flashcard actuellement affichée (commence à 1)
  currentCardsNumber: number;
  // réponse de la flashcard actuelle
  currentAnswer: string;
  //question de la flashcard suivante / mais initialisée comme question de la flashcard actuelle
  currentQuestion: string;

  //prendra la valeur quand la question aura été posée et qu'il faudra afficher la réponse
  questionDisplayed: boolean;
  //prendra la valeur "true" pour indiquer le moment où toutes les flashcards ont été vues
  stackCompleted: boolean;

  //tableau provisoire : copie du tableau, à laquelle on retirera les élements au fur et à mesure de leur utilisation
  currentArray: any[];

  constructor(private db: DatabaseService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    //mise à false pour que la question puisse s'afficher
    this.questionDisplayed = false;
    //mise à false pour que les cards puissent s'afficher
    this.stackCompleted = false;

    // récupération de la catégorie avec son id
    this.route.paramMap.subscribe(params => {

      // récupération de l'id dans l'URL
      this.catId = parseInt(params.get('id'));
      console.log('this.catId : ' + this.catId);
      // récupéartion de la catégorie correspondante
      this.db.getCategory(this.catId)
        .then(data => {
          this.currentCategory = data;
          console.log('currentCategory id : ' + this.currentCategory.id);
        }).then(_ => {
          console.log('this.currentCategory du .then: ' + this.currentCategory);
          console.log(this.currentCategory.id);
          //récupération du tableau de cartes de la catégorie sélectionnée
          this.db.getCardsOfCategory(this.currentCategory.id)
            .then(data => {
              console.log('data : ' + data);
              this.cardsList = data;
              console.log('this.cardsList : ' + this.cardsList);
            })
            .then(_ => {
              // copie de ce tableau dans un tableau modifiable
              this.currentArray = this.cardsList.slice();
              console.log(this.currentArray);
              // récupération d'une 1ère carte au hasard
              this.getRandomFlashcard();
            })
        }
        )
      /* 
      console.log('ça marche'); */
    });


  }

  getRandomFlashcard() {

    console.log('current array de get random' + this.currentArray);
    //détermination d'un index au hasard, inférieur à la taille du tableau
    this.randomIndex = Math.floor(Math.random() * 10);
    //console.log(this.randomIndex);

    while (this.randomIndex > (this.currentArray.length - 1)) {
      this.randomIndex = this.randomIndex - this.currentArray.length;
      //console.log(this.randomIndex);
    }
    /*     console.log('this.currentArray[this.randomIndex].index : ' + this.currentArray[this.randomIndex].index);
        //initialisation des variables avec les valeurs correspondant à cet indice au hasard
        this.currentCardsNumber = this.currentArray[this.randomIndex].index; */
    //console.log(this.currentArray[this.randomIndex].idFlashcard);
    this.currentQuestion = this.currentArray[this.randomIndex].question;
    //console.log(this.currentArray[this.randomIndex].question);
    this.currentAnswer = this.currentArray[this.randomIndex].answer;
    //console.log(this.currentArray[this.randomIndex].answer);
    return this.randomIndex;
  }

  onDisplayAnswer() {
    //changement de la valeur pour pouvoir débloquer le component "réponse"
    this.questionDisplayed = true;
  }

  onGetNextQuestion() {
    //suppression de la flashcard actuelle (avec son randomIndex) du tableau courant
    //console.log(this.currentArray);
    this.currentArray.splice(this.randomIndex, 1);
    //console.log(this.currentArray);

    if (this.currentArray.length > 0) {
      this.getRandomFlashcard();
    } else {
      //permet de ne plus afficher les components Q&R, et de débloquer le bouton de retour à l'accueil
      this.stackCompleted = true;
    }

    //changement de la valeur pour pouvoir débloquer le component "question"
    this.questionDisplayed = false;
    return this.currentArray;
  }
}
