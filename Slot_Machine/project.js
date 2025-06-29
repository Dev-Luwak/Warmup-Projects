
const prompt = require("prompt-sync")();

const deposit = () => {
    while(true){
        const depositAmount = prompt("Enter a Deposit Amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <=0){
        console.log("Invalid Deposit Amount, Try again.");
        }
        else{
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while(true){
        const Lines = prompt("Enter the Number of Lines to bet on (1-3): ");
        const numberOfLines = parseFloat(Lines);

        if(isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines > 3){
        console.log("Invalid Deposit Amount, Try again.");
        }
        else{
            return numberOfLines;
        }
    }
}

const getBet = (balance) => {
    while(true){
        const bet = prompt("Enter the Bet Amount: ");
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberOfLines <=0 || numberOfLines > balance){
        console.log("Invalid Deposit bet, Try again.");
        }
        else{
            return numberBet;
        }
    }
}

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance);