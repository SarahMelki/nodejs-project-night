// Insert Javascript here


// Create Class to check if cards match

class MatchCards {
    constructor(cards) {
        this.cardsArray = cards;
    }

    startGame() {
        this.active = true;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.toggleCards();
        this.shuffleCards(this.cardsArray);
    }

    youWin() {
        document.querySelector('add_a_class_to_display_win').classList.add('hidden');
    }


    // maybe the 'hidden' class in the HTML/CSS could be called 'visible' instead, but I kept it the way Dan wrote it
    // might need to add a class 'matched' in the CSS file as such, (when card is facing front)
    // .card.matched .card-front .squirtle {
    //     animation: add some value here;
    //   }
    // to be able to compare while using the methods below

    // this method here can be commented out/deleted if it's being tackled by someone else
    toggleCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('hidden');
            card.classList.remove('matched'); //this is the added class from my side
        });
    }


    // this method here can also be commented out/deleted if it's being tackled by someone else
    flipCard(card) {
        if(this.canFlipCard(card)) {
            card.classList.add('hidden');

            if(this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }

    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else 
            this.cardMismatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }
   

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched'); //this is the added class from my side
        card2.classList.add('matched');
        if(this.matchedCards.length === this.cardsArray.length)
            this.youWin();
    }
   
    // backend part?
    shuffleCards(cardsArray) { 
        for (let i = cardsArray.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            cardsArray[randomIndex].style.order = i;
            cardsArray[i].style.order = randomIndex;
        }
    }
    getCardType(card) {
        return card.getElementsByClassName('squirtle')[0].src;
    }
    canFlipCard(card) {
        return !this.active && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}
