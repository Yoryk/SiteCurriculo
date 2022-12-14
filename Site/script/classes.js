class Campo {

    constructor(x, y, largura, altura, dificuldade) {
        this.altura = altura;
        this.largura = largura;
        this.x = x;
        this.y = y;
        this.dificulade = dificuldade;
    }
    index = this.dificuldade;
    quadrados = [

    ];



    CriaQuadrilatero() {
        var quadradosTotal = this.largura * this.altura;

        var posX = this.x;
        var posY = this.y;
        var rand = 0;

        for (var x = 0; x < quadradosTotal; x++) {

            rand = parseInt(Math.random() * 3);
            var quadradoTemp = new Quadrado(posX, posY, 50, 'black', false, false, false, rand);
            this.quadrados.push(quadradoTemp);
            // console.log(quadradoTemp.grama);
            // console.log(this.quadrados.length);

            posX += quadradoTemp.lado + 5;
            if (posX + quadradoTemp.lado > this.x + (this.largura * (quadradoTemp.lado + 5))) {
                posX = this.x;
                posY += quadradoTemp.lado + 5;
            }
        }
    }

    DesenharCampo() {

        var quadradosTotal = this.largura * this.altura;
        ctx.font = "15px Arial";


        for (var x = 0; x < quadradosTotal; x++) {

            this.quadrados[x].DesenhaQuadrilatero();

        }
    }

    bombas = [

    ];

    CriaBomba() {
        var total = this.quadrados.length;
        var random;

        for (var x = 0; x < 10; x++) {
            random = parseInt(Math.random() * total);
            this.quadrados[random].bomba = true;
            // this.quadrados[random].marcado = true;
            // console.log(random);
            this.bombas.push(this.quadrados[random]);
            console.log(this.bombas[x]);
        }

    }


    CriaToca() {
        var total = this.quadrados.length;
        var random;

        for (var x = 0; x < 10; x++) {
            random = parseInt(Math.random() * total);
            this.quadrados[random].toca = true;

        }
    }
    ApagaQuadrados() {
        this.quadrados = [

        ];
        this.bombas = [

        ];
    }

}

class Quadrado {

    constructor(x, y, lado, cor, bomba, marcado, toca, grama) {
        this.x = x;
        this.y = y;
        this.lado = lado;
        this.cor = cor;
        this.bomba = bomba;
        this.marcado = marcado;
        this.toca = toca;
        this.grama = grama;

    }


    DesenhaQuadrilatero() {

        var Img = new Image();
        Img.src = "img/grama/mato_" + this.grama + ".png";
        ctx.drawImage(Img, this.x, this.y, 50, 50);
        if (this.toca) {
            // ctx.fillStyle = 'blue';
            // ctx.fillRect(this.x+15, this.y+15, this.lado-15, this.lado-15);
            Img.src = "img/grama/toca.png";
            ctx.drawImage(Img, this.x, this.y, 50, 50);
        }
        if (this.marcado) {
            // ctx.fillStyle = 'pink';
            // ctx.fillRect(this.x+15, this.y+15, this.lado-15, this.lado-15);
            Img.src = "img/flag/theflag.png";
            ctx.drawImage(Img, this.x, this.y, 50, 50);
        }

        // if (this.bomba) {
        //     ctx.fillStyle = 'blue';
        //     ctx.fillRect(this.x+15, this.y+15, this.lado-15, this.lado-15);
        // }


    }
}

class Player {
    constructor(x, y, sizeX, sizeY, cor, dir, pontos, id) {
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.cor = cor;
        this.dir = dir;
        this.pontos = pontos;
        this.id = id;
    }
    escondido = false;
    svx = 0;
    svy = 0;

    aura = [

    ];

    ChecarBombas(obj) {
        var auraSize = 56;
        var bombasPerto = 0;
        // this x = 460
        // this y = 210
        this.aura.x = this.x - auraSize;
        this.aura.y = this.y - auraSize;
        this.aura.xLength = (this.aura.x + (auraSize * 3)) - 2;
        this.aura.yHeight = (this.aura.y + (auraSize * 3)) - 2;

        for (var x = 0; x < obj.quadrados.length; x++) {
            if (obj.quadrados[x].x > this.aura.x && obj.quadrados[x].x < this.aura.xLength &&
                obj.quadrados[x].y > this.aura.y && obj.quadrados[x].y < this.aura.yHeight) {
                // console.log(x);
                if (obj.quadrados[x].bomba == true) {
                    bombasPerto++;
                }
            }
        }

        ctx.font = "50px Arial";
        ctx.fillStyle = '#CF27F580';
        ctx.textAlign = "left";
        ctx.fillText(bombasPerto, this.x + 7, this.y + 10, 50);
        ctx.textAlign = "left";


    }
    ChecaToca() {
        for (var x = 0; x < campo.quadrados.length; x++) {
            if (campo.quadrados[x].toca) {
                if (campo.quadrados[x].x == this.x && campo.quadrados[x].y == this.y) { //entrou na toca se escondeu
                    console.log("pusou");
                    this.escondido = true;
                    this.svx = this.x; //salva as posições atuais para saber quando o player se moveu assim saindo da toca
                    this.svy = this.y;
                }
            }
        }
        if (this.svx != this.x || this.svy != this.y) { //quando o player sai da toca aparece de novo
            this.escondido = false;
        }
    }
    DesenhaPlayer() {

        var img = new Image();
        if (!this.escondido) {
            switch (this.id) {
                case 0:
                    img.src = "img/ratos/player1/player1_" + this.dir + ".png";
                    ctx.drawImage(img, this.x, this.y, this.sizeX, this.sizeY);
                    break;
                case 1:
                    img.src = "img/ratos/player2/player2_" + this.dir + ".png";
                    ctx.drawImage(img, this.x, this.y, this.sizeX, this.sizeY);
                    break;
            }


        }

        // ctx.fi llStyle= this.cor;
        // ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
    }

    Colissao() { //quando o player colide com os limites do mapa ele é teleportado para dentro novamente
        if (this.y < 95) {
            this.y += 55;
        }
        if (this.y > 700) {
            this.y -= 55;
        }
        if (this.x > 1400) {
            this.x -= 55;
        }
        if (this.x < 195) {
            this.x += 55;
        }
    }



    Marcar(campo) {
        switch (this.dir) {
            case 0:
                for (var x = 0; x < campo.quadrados.length; x++) {
                    if (campo.quadrados[x].x == this.x && campo.quadrados[x].y == this.y - 55) {
                        if (campo.quadrados[x].bomba) {
                            if (campo.quadrados[x].marcado) {
                                campo.quadrados[x].marcado = false;
                                this.pontos -= 100;
                            } else {
                                campo.quadrados[x].marcado = true;
                                this.pontos += 100;
                            }
                        } else if (campo.quadrados[x].marcado) {
                            campo.quadrados[x].marcado = false;
                        } else {
                            this.pontos -= 50;
                            campo.quadrados[x].marcado = true;

                        }
                    }
                }
                break;
            case 3:
                for (var x = 0; x < campo.quadrados.length; x++) {
                    if (campo.quadrados[x].x == this.x + 55 && campo.quadrados[x].y == this.y) {
                        if (campo.quadrados[x].bomba) {
                            if (campo.quadrados[x].marcado) {
                                campo.quadrados[x].marcado = false;
                                this.pontos -= 100;
                            } else {
                                campo.quadrados[x].marcado = true;
                                this.pontos += 100;
                            }
                        } else if (campo.quadrados[x].marcado) {
                            campo.quadrados[x].marcado = false;
                        } else {
                            this.pontos -= 50;
                            campo.quadrados[x].marcado = true;

                        }
                    }
                }
                break;
            case 2:
                for (var x = 0; x < campo.quadrados.length; x++) {
                    if (campo.quadrados[x].x == this.x && campo.quadrados[x].y == this.y + 55) {
                        if (campo.quadrados[x].bomba) {
                            if (campo.quadrados[x].marcado) {
                                campo.quadrados[x].marcado = false;
                                this.pontos -= 100;
                            } else {
                                campo.quadrados[x].marcado = true;
                                this.pontos += 100;
                            }
                        } else if (campo.quadrados[x].marcado) {
                            campo.quadrados[x].marcado = false;
                        } else {
                            this.pontos -= 50;
                            campo.quadrados[x].marcado = true;

                        }
                    }
                }
                break;
            case 1:
                for (var x = 0; x < campo.quadrados.length; x++) {
                    if (campo.quadrados[x].x == this.x - 55 && campo.quadrados[x].y == this.y) {
                        if (campo.quadrados[x].bomba) {
                            if (campo.quadrados[x].marcado) {
                                campo.quadrados[x].marcado = false;
                                this.pontos -= 100;
                            } else {
                                campo.quadrados[x].marcado = true;
                                this.pontos += 100;
                            }
                        } else if (campo.quadrados[x].marcado) {
                            campo.quadrados[x].marcado = false;
                        } else {
                            this.pontos -= 50;
                            campo.quadrados[x].marcado = true;

                        }
                    }
                }
                break;
        }


    }

}

class GameManager {

    constructor(dif, state) {
        this.dif = dif;
        this.state = state;
    }
    quem = 0; //para saber qual player que fez a merda
    ChecarTempo(timer) {
        if (timer.tempoG <= 0) {
            this.state = "gameover";
            this.quem = 2; //indentifica a merda 
        }
    }


    bombSound = new Audio('audio/explosion.wav');
    

    ChecarPlayers(campo, p1, p2) {
        for (var x = 0; x < campo.quadrados.length; x++) {
            if (campo.quadrados[x].bomba && !campo.quadrados[x].marcado) {
                if (campo.quadrados[x].x == p1.x && campo.quadrados[x].y == p1.y) {
                    console.log("pusou");
                    this.state = "gameover";
                    this.bombSound.play();
                    this.quem = 0; //indentifica quem morreu
                } else if (campo.quadrados[x].x == p2.x && campo.quadrados[x].y == p2.y) {
                    console.log("pusou");
                    this.state = "gameover";
                    this.bombSound.play();
                    this.quem = 1; //indentifica quem morreu
                }

                // if(campo.quadrados[x].x == p1.x && campo.quadrados[x].x == p1.y || campo.quadrados[x].x == p2.x && campo.quadrados[x].x == p2.y){
                //     console.log("pisou na bomba");
                // }
                // console.log(x);
            }
        }

    }

    aguiaSound = new Audio('audio/aguia.wav');
    voou = false;
    rand = 0;

    SetarAguia() {
        
        this.bombSound.loop = false;

        this.aguiaSound.loop = false;
        this.rand = parseInt((Math.random() * 100) + 1);
        this.voou = false;
        console.log(this.voou + " " + this.rand);
    }

    Aguia(p1, p2, timer) {
        switch (this.dif) {
            case 1:
                if (timer.tempoG == 60 && !this.voou) {
                    if (this.rand > 0) {
                        console.log("a");
                        this.aguiaSound.play();
                        setTimeout(() => {
                            if (!p1.escondido) {
                                this.state = "gameover";
                                this.quem = 0;
                            } else if (!p2.escondido) {
                                this.state = "gameover";
                                this.quem = 1;
                            }
                        }, 5000);
                        this.voou = true;
                        this.rand = 0;
                    }
                }
                break;
            case 2: 
                if (timer.tempoG == 90 && !this.voou) {
                    if (this.rand > 50) {
                        this.aguiaSound.play();
                        setTimeout(() => {
                            if (!p1.escondido) {
                                this.state = "gameover";
                                this.quem = 0;
                            } else if (!p2.escondido) {
                                this.state = "gameover";
                                this.quem = 1;
                            }
                        }, 5000);
                        this.voou = true;
                    }
                } else if (timer.tempoG == 45) {
                    if (this.voou) {
                        this.voou = false;
                        if (this.rand > 0) {                            
                            this.aguiaSound.play();
                            setTimeout(() => {
                                if (!p1.escondido) {
                                    this.state = "gameover";
                                    this.quem = 0;
                                } else if (!p2.escondido) {
                                    this.state = "gameover";
                                    this.quem = 1;
                                }
                            }, 5000);
                            this.voou = true;
                            this.rand = 0;
                        } else {
                            this.voou = true;
                        }
                    }
                }
                break;
        }
    }


    ChecarMarcadas(campo) {
        // console.log(campo.bombas.every(this.bombCheck));
        
        if (campo.bombas.every(e => {
                return e.marcado == true;
            })) {
            this.state = "gameover";
            this.quem = 3;
            console.log("a");
        }
    }

}

class hud { //classe que constroi as huds do jogo
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    escreve(texto1, texto2, texto3) { //divide o texto em 3 partes para uma melhor estetica da combinação entre texto e variaveis
        ctx.font = this.size + "px Georgia";
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(texto1 + texto2 + texto3, this.x, this.y);
    }
}
class timer extends hud { //classe responsavel pelo temporizador do jogo
    tempoP = 0;
    tempoG = 120; ////////arrumar aqui
    tempo() { // relogio
        this.tempoP++;
        if (this.tempoP >= 100) {
            this.tempoG--;
            this.tempoP = 0;
        }
    }
}
class telas {
    constructor(BG) {
        this.BG = BG;
    }
    x = 0;
    y = 0;
    desenha() {
        var Img = new Image();
        Img.src = this.BG;
        ctx.drawImage(Img, 0, 0, screen.width, screen.height);
        // console.log("A");
    }
}

class Menu extends telas { // vai ter uma seleção de faci ou dificil em algum momento aqui
    botao(game) {
        //botao q redireciona para o jogo (easy)
        var Img = new Image();
        Img.src = "img/bg/botao.png";
        ctx.drawImage(Img, 675, 375, 250, 225);
        ctx.font = "60px Georgia";
        ctx.fillStyle = 'black';
        ctx.fillText("Easy", 725, 450);
        ctx.fillText("Ayanna e Akina",600,200);
        if (this.x > 675 && this.x < 925 && this.y > 375 && this.y < 490) {
            game.state = "game";
            game.dif = 1;
            //variaveis devem ser resetadas para dar play again
            this.x = 0;
            this.y = 0;
            player1 = new Player(195, 150, 40, 40, 'orange', 0, 0, 0); // Ayanna
            player2 = new Player(1405, 645, 40, 40, 'green', 0, 0, 1); // Akina
            cronometro.tempoG = 120; /////////////arrumar aqui
            cronometro.tempoP = 0;
            Start();
        }
        //botão q redireciona para o jogo(hard)
        var Img = new Image();
        Img.src = "img/bg/botao.png";
        ctx.drawImage(Img, 675, 550, 250, 225);
        ctx.font = "60px Georgia";
        ctx.fillStyle = 'black';
        ctx.fillText("Hard", 725, 625);
        if (this.x > 675 && this.x < 925 && this.y > 550 && this.y < 675) {
            game.state = "game";
            game.dif = 2;
            //variaveis devem ser resetadas para dar play again
            this.x = 0;
            this.y = 0;
            player1 = new Player(195, 150, 40, 40, 'orange', 0, 0, 0); // Ayanna
            player2 = new Player(1405, 645, 40, 40, 'green', 0, 0, 1); // Akina
            cronometro.tempoG = 120; /////////////arrumar aqui
            cronometro.tempoP = 0;
            Start();
        }
        //botao que redireciona para os creditos
        var Img = new Image();
        Img.src = "img/bg/botao.png";
        ctx.drawImage(Img, 675, 725, 250, 225);
        ctx.font = "60px Georgia";
        ctx.fillStyle = 'black';
        ctx.fillText("Como", 725, 775);
        ctx.fillText("Jogar", 725, 827);
        if (this.x > 675 && this.x < 925 && this.y > 700 && this.y < 850) {
            game.state = "creditos";
            this.x = 0;
            this.y = 0;
        }
    }
}
class gameOver extends telas { // em algum momento a tela d vitória vai estra aqui 
    botao(game) { //botao que redireciona para o menu
        // ctx.fillStyle= 'black';
        // ctx.fillRect(675,600, 250, 150);
        var Img = new Image();
        Img.src = "img/bg/botao.png";
        ctx.drawImage(Img, 675, 600, 250, 225);
        ctx.font = "60px Georgia";
        ctx.fillStyle = 'black';
        ctx.textAlign = "center";
        ctx.fillText("Menu", 800, 675);
        ctx.textAlign = "left";
        if (this.x > 675 && this.x < 925 && this.y > 600 && this.y < 730) {
            game.state = "menu";
            this.x = 0;
            this.y = 0;
            this.vitoriaSound.pause();
            this.vitoriaSound.currentTime = 0;
        }
    }

    vitoriaSound = new Audio('audio/cambodja.wav');

    playeres(game, p1, p2) { //descombre quem morreu para fazer diferentes telas d game over
        switch (game.quem) {
            
            case 0:
                ctx.font = "30px Georgia";
                ctx.fillStyle = 'white';
                ctx.fillText("Infelizmente, Ayanna se descuidou... É uma grande preda para todos... A missão falhou...",100,100);
                var Img = new Image();
                Img.src = "img/ratos/player2/player2_5.png";
                ctx.drawImage(Img, 925, 600, 200, 200);
                break;
            case 1:
                ctx.font = "30px Georgia";
                ctx.fillStyle = 'white';
                ctx.fillText("Infelizmente, Akina se descuidou... É uma grande preda para todos... A missão falhou...",100,100);
                var Img = new Image();
                Img.src = "img/ratos/player1/player1_5.png";
                ctx.drawImage(Img, 475, 600, 200, 200);
                break;
            case 2: //caso percam por tempo
            ctx.font = "30px Georgia";
                ctx.fillStyle = 'white';
                ctx.fillText("Infelizmente, o tempo acabou...A missão falhou...",100,100);
                var Img = new Image();
                var Imge = new Image();
                Img.src = "img/ratos/player1/player1_5.png";
                ctx.drawImage(Img, 475, 600, 200, 200);
                Imge.src = "img/ratos/player2/player2_5.png";
                ctx.drawImage(Imge, 925, 600, 200, 200);
                break;
                //vitórias
            case 3:
                ctx.font = "30px Georgia";
                ctx.fillStyle = 'white';
                ctx.fillText("A missão foi uma sucesso!!!",100,100);
                var Img = new Image();
                var Imge = new Image();
                var qual = p1.pontos > p2.pontos ? 6 : 4;
                var quar = p2.pontos > p1.pontos ? 6 : 4;
                this.vitoriaSound.play();
                Img.src = "img/ratos/player1/player1_" + qual + ".png";
                ctx.drawImage(Img, 475, 600, 200, 200);
                Imge.src = "img/ratos/player2/player2_" + quar + ".png";
                ctx.drawImage(Imge, 925, 600, 200, 200);

                break;
        }
    }
}
class Creditos extends telas {
    howToPlay() { //depois de fazer saporra inteira eu fui pensare q era mil vezes mais facil fazer isso no pics arts numa imagem pura q ia dar 3 linha d codigo... 
        var Img = new Image();
        var Imge = new Image();
        var img = new Image();
        var imge = new Image();
        // ctx.textAlign = "center";
        ctx.fillStyle = '#000000A0';
        ctx.fillRect(0,0,screen.width,screen.height);
        ctx.fill();
        ctx.font = "30px Georgia";
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'white';
        ctx.fillText("Ratos vindos da universidade da Tanzânia são convocados para limpar campos repletos de bombas no Camboja!", 50, 50);
        ctx.fillText("Com seu olfato treinado, Ayanna e Akina são capazes de localizar explosivos próximos para identificá-los...", 50, 100);
        
        Img.src = "img/ratos/player1/player1_0.png";
        ctx.drawImage(Img, 700, 150, 200, 200);
        ctx.fillText("Use W,S,D,A para controlar Ayanna", 50, 200);
        ctx.fillText("Aperte E para marcar os explosivos", 50, 250);
        ctx.fillText("Segure SHIFT para girar no mesmo eixo", 50, 300);

        //
        Imge.src = "img/ratos/player2/player2_0.png";
        ctx.drawImage(Imge, 700, 350, 200, 200);
        ctx.fillText("Use as setas direcionais para controlar Akina", 50, 400);
        ctx.fillText("Aperte NumpadO para marcar os explosivos", 50, 450);
        ctx.fillText("Segure SHIFT para girar no mesmo eixo", 50, 500);

        //
        img.src = "img/grama/toca.png";
        ctx.drawImage(img, 1250, 525, 100, 100);
        ctx.fillText("Fique atento com o grito das águias... Se esconda nas tocas a mais rapido possivel!!!", 50, 600);

        //
        // imge.src = "img/bg/IF.jpg";
        // ctx.drawImage(imge, 50, 790, 250, 110);
        ctx.fillText("Jogo criado por Uriel Duarte de Oliveira e Giordano Bruno Razzolini", 50, 700);
        ctx.fillText("Em colaboração com o Instituto Federal do Paraná campus Curitiba. ", 50, 750);

    }
    botao(game) { //botao que redireciona para o menu
        var Img = new Image();
        Img.src = "img/bg/botao.png";
        ctx.drawImage(Img, (screen.width / 2) - 100 , 775, 200, 200);
        ctx.font = "55px Georgia";
        ctx.fillStyle = 'black';
        // ctx.textAlign = "center";
        ctx.fillText("Menu", (screen.width / 2) - 71 , 845);
        if (this.x > (screen.width / 2) - 100 && this.x < (screen.width / 2) + 100 && this.y > 775 && this.y < 975) {
            game.state = "menu";
            this.x = 0;
            this.y = 0;

        }
    }

}