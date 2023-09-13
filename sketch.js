/*VARIAVEIS DA BOLINHA*/
let xbolinha = 300;
let ybolinha = 200;
let diametro = 20;
let raio = diametro / 2;

/*VELOCIDADE DA BOLINHA*/
let velocidadeXbolinha = 2;
let velocidadeYbolinha = 2;

/*VARIAVEIS DA RAQUETE*/
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

/*VARIAVEIS DA RAQUETE DO OPONENTE*/
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

/*VALOR INICIAL DE COLISÃO*/
let colidiu = false;

/*PLACAR DO JOGO*/
let meusPontos = 0;
let pontosDoOponente = 0;

/*sons do jogo*/
let ponto;
let raquetada;
let trilha;

function preload() {
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  trilha = loadSound("trilha.mp3");
}

function setup() {
  createCanvas(600, 400);
  //trilha.loop();
}

function draw() {
  background("blue");
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostrarRaquete(xRaquete, yRaquete);
  movimentaçãoRaquete();
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  
  //movimentarRaqueteOponente();
  movimentaçãoRaqueteOponente()

  //verificaColisaoRaquete();
  verificaColisaoRaqueteB(xRaquete, yRaquete);
  verificaColisaoRaqueteB(xRaqueteOponente, yRaqueteOponente);

  incluiPlacar();
  marcaPonto();
}

/* MOSTRAR BOLINHA*/
function mostraBolinha() {
  circle(xbolinha, ybolinha, diametro);
}

/* MOSTRAR RAQUETE*/
function mostrarRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

/* MOVIMENTO DA BOLINHA*/
function movimentaBolinha() {
  xbolinha += velocidadeXbolinha;
  ybolinha += velocidadeYbolinha;
}

/* COLISÃO NAS BORDAS */
function verificaColisaoBorda() {
  if (xbolinha + raio > width || xbolinha - raio < 0) {
    velocidadeXbolinha *= -1;
  }
  if (ybolinha + raio > height || ybolinha - raio < 0) {
    velocidadeYbolinha *= -1;
  }
}

/* MOVIMENTAR RAQUETE*/
function movimentaçãoRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

/* MOVIMENTAR RAQUETE OPONENTE*/
function movimentaçãoRaqueteOponente() {
  if (keyIsDown(87)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)) {
    yRaqueteOponente += 10;
  }
}



/*MOVIMENTAR solo RAQUETE DO OPONENTE*/
function movimentarRaqueteOponente() {
  velocidadeYOponente = ybolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;
}

/* COLISAO COM RAQUETE */
function verificaColisaoRaquete() {
  if (
    xbolinha - raio < xRaquete + raqueteComprimento &&
    ybolinha - raio < yRaquete + raqueteComprimento &&
    ybolinha + raio > yRaquete
  ) {
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}

/* COLISAO COM RAQUETE BIBLIOTECA */
function verificaColisaoRaqueteB(x,y) {
  colidiu = collideRectCircle(x,y,raqueteComprimento,raqueteAltura,xbolinha,ybolinha,raio);
  if (colidiu == true) {
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}

/* CRIAR PLACAR */
function incluiPlacar() {
  fill(255);
  textSize(24);
  text(meusPontos, 278, 26);
  text(pontosDoOponente, 321, 26);
}

/* CONTAR PONTOS */
function marcaPonto() {
  if (xbolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xbolinha < 10) {
    pontosDoOponente += 1;
    ponto.play();
  }
}
