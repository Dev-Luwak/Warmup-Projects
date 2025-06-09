const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;

const guessField = document.getElementById("guessField");
const guessSubmit = document.querySelector(".guessSubmit");
const resultPara = document.getElementById("result");

guessSubmit.addEventListener("click", function () {
  const userGuess = Number(guessField.value);

  if (!userGuess || userGuess < 1 || userGuess > 100) {
    resultPara.textContent = "⚠️ Enter a number between 1 and 100.";
    resultPara.style.color = "#ffcc00";
    return;
  }

  attempts--;

  if (userGuess === randomNumber) {
    resultPara.textContent = `🎉 Boom! You nailed it! The number was ${randomNumber}.`;
    resultPara.style.color = "#00ff99";
    guessSubmit.disabled = true;
    guessField.disabled = true;
  } else if (attempts === 0) {
    resultPara.textContent = `💀 Game Over! The number was ${randomNumber}.`;
    resultPara.style.color = "#ff3333";
    guessSubmit.disabled = true;
    guessField.disabled = true;
  } else {
    const diff = userGuess - randomNumber;
    let hint = "";

    if (diff > 20) hint = "🔥 Very High!";
    else if (diff > 0) hint = "☝️ Slightly High!";
    else if (diff < -20) hint = "❄️ Very Low!";
    else hint = "👇 Slightly Low!";

    resultPara.textContent = `${hint} ${attempts} attempts left.`;
    resultPara.style.color = "#00bfff";
  }

  guessField.value = "";
  guessField.focus();
});
