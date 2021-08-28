alert("Olá, seja bem-vindo!");


var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; //array vazio pra salvar as cores aleatórias
var userClickedPattern = []; //array vazio pra pegar os inputs do usuário

var level = 0;
var started = false; //inicia como falso, depois de clicar assume true


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//detecta quando a class .btn (ou seja botão) é acionado (clicado)
$(".btn").click(function() { //função construtora é anonima

  var userChosenColour = $(this).attr("id"); //atributo id que é o nome do botão que foi selecionado e chamou essa função
  //this por causa da função construtora

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour); //chamar função pra executar som das cores
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);//index da ultima resposta
})


//Checar se o usuário esta acertando
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");
    playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);


      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
  }

}

function startOver() {

  level = 0;
  gamePattern = [];
  started = false;
}


function nextSequence() {
  userClickedPattern = [];//novo array vazio para o proximo nivel
  level++;

  $("#level-title").text("Level " + level);

  //Math.floor retornar menor numero inteiro
  //Math.random retorna num aleatorio [0, 1[, multiplicar por 4 terei numeros de 0 3,99999999
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber]; //o numero aleatorio indicara a posição do array, e assim teremos as cores aleatorias salva nessa variavel

  gamePattern.push(randomChosenColour); //inclui no array existente a nova cor aleatoria, o retorno é o nnovo tamanho do array

  // precisa de '#' pra acessar id + cor aleatória é o nome (id) do botão
  $("#" + randomChosenColour).fadeIn(150).fadeOut(100).fadeIn(150);
  //fadeIn = opaco (150) tempo que ira ficar opaco
  //fadeOut = transparente

  playSound(randomChosenColour);
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); //acessar a pasta com os áudios da cor aleatória
  //Audio() cria um htmlAudioElement com js
  audio.play(); //chamar o elemento de audio
}
