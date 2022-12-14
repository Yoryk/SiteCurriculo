var screen = document.getElementById('canvas');
var ctx = screen.getContext('2d');

var jogo = new telas("img/bg/BGgame.png");
var menu = new Menu("img/bg/BGmenu.png");
var gameover = new gameOver("img/bg/BGgame.png");
var creditos = new Creditos("img/bg/BGcreditos.png"); //qualquer hora eu desenho mais fundos

var campo = new Campo(250, 150, 20, 10, 3);
var cronometro = new timer(screen.width / 2, 100, 50);

var player1 = new Player(195, 150, 40, 40, 'orange', 0, 0, 0); // Ayanna
var player2 = new Player(1405, 645, 40, 40, 'green', 0, 0, 1); // Akina
var game = new GameManager(2, "menu");

document.addEventListener("keydown", function(event) {
    // if (event.key === "a") {
    //     player1.x -= 55;
    // } else if (event.key === "d") {
    //     player1.x += 55;
    // } else if (event.key === "w") {
    //     player1.y -= 55;
    // } else if (event.key === "s") {
    //     player1.y += 55;
    // } else if (event.key === "ArrowLeft") {
    //     player2.x -= 55;
    // } else if (event.key === "ArrowRight") {
    //     player2.x += 55;
    // } else if (event.key === "ArrowUp") {
    //     player2.y -= 55;
    // } else if (event.key === "ArrowDown") {
    //     player2.y += 55;
    // }

    switch (event.code) {
        case "KeyA":
            if (event.shiftKey) {
                player1.dir = 1;
            } else {
                player1.x -= 55;
                player1.dir = 1;
            }

            break;
        case "KeyD":
            if (event.shiftKey) {
                player1.dir = 3;
            } else {
                player1.x += 55;
                player1.dir = 3;
            }
            break;
        case "KeyW":
            if (event.shiftKey) {
                player1.dir = 0;
            } else {
                player1.y -= 55;
                player1.dir = 0;
            }
            break;
        case "KeyS":
            if (event.shiftKey) {
                player1.dir = 2;
            } else {
                player1.y += 55;
                player1.dir = 2;
            }
            break;
        case "KeyE":
            player1.Marcar(campo);
            break;
        case "ArrowLeft":
            if (event.shiftKey) {
                player2.dir = 1;
            } else {
                player2.x -= 55;
                player2.dir = 1;
            }
            break;
        case "ArrowRight":
            if (event.shiftKey) {
                player2.dir = 3;
            } else {
                player2.x += 55;
                player2.dir = 3;
            }
            break;
        case "ArrowUp":
            if (event.shiftKey) {
                player2.dir = 0;
            } else {
                player2.y -= 55;
                player2.dir = 0;
            }
            break;
        case "ArrowDown":
            if (event.shiftKey) {
                player2.dir = 2;
            } else {
                player2.y += 55;
                player2.dir = 2;
            }
            break;
        case "Numpad0":
            player2.Marcar(campo);
    }

})



function Start() {
    campo.ApagaQuadrados(); //reseta para dar play again
    campo.CriaQuadrilatero();
    campo.CriaBomba();
    campo.CriaToca();
    game.SetarAguia();
}

function ArteGame() {
    jogo.desenha();
    campo.DesenharCampo();
    player2.DesenhaPlayer();
    player1.DesenhaPlayer();
    cronometro.escreve(cronometro.tempoG, "", "");

}

function UpdateGame() {

    player1.ChecarBombas(campo);
    player2.ChecarBombas(campo);
    player1.Colissao();
    player2.Colissao();
    cronometro.tempo();
    player1.ChecaToca();
    player2.ChecaToca();

    game.ChecarTempo(cronometro);
    game.ChecarPlayers(campo, player1, player2);
    game.ChecarMarcadas(campo);
    game.Aguia(player1, player2, cronometro);
}

function Main() {

    switch (game.state) {
        case "game":
            ArteGame();
            UpdateGame();
            break;
        case "menu":
            menu.desenha();
            //evento de mouse para fazer os botoes
            function muse(evento) {
                menu.x = evento.pageX - screen.offsetLeft;
                menu.y = evento.pageY - screen.offsetTop;
            }
            screen.onclick = muse;
            menu.botao(game);
            break;
        case "gameover":
            gameover.desenha();
            gameover.playeres(game, player1, player2); //desenha os playeres em seus diferentes estados de vitoria ou derrota
            //evento de mouse para fazer os botoes
            function mouse(evento) {
                gameover.x = evento.pageX - screen.offsetLeft;
                gameover.y = evento.pageY - screen.offsetTop;
            }
            screen.onclick = mouse;
            gameover.botao(game);
            break;
        case "creditos": //qualquer dia desses vai ter creditos, lore e how to play aqui
            creditos.desenha();
            creditos.howToPlay();

            function mouuse(eventi) {
                creditos.x = eventi.pageX - screen.offsetLeft;
                creditos.y = eventi.pageY - screen.offsetTop;
            }
            screen.onclick = mouuse;
            creditos.botao(game);
            break;
    }


}

setInterval(Main, 10);