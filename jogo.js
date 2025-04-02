//Moonlander.Um jogo de alunissagem
//Bruna Velôso (https://github.com/Brunaveloso7)]
//28/03/2025


 /** @type {HTMLCanvasElement} */
let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");
 
let x
let velocidadeX;
let angulo;
 
if(Math.round(Math.random()) == 0){
    x = 100;
    velocidadeX = 2
    angulo = -Math.PI/2
}else{
    x = 700
    velocidadeX = -2
    angulo = Math.PI/2  
}
// Dados do módulo lunar
let moduloLunar = {
    posicao: {
        x: 100,
        y: 100
    },
    angulo: angulo,
    largura: 20,
    altura: 20,
    cor:"lightgray",
    motorLigado: false,
    velocidade: {
        x: velocidadeX,
        y: 0
    },
    combustivel: 1000,
    rotacaoAntiHorario : false,
    rotacaoHorario : false
}
 let estrelas =     [];
 for (let i = 0;i <500;i++){
    estrelas[i] = {
        
        x:Math.ramdom() * canvas.width,
        y:Math.ramdom() * canvas.height,
        raio: Math.sqrt(Math.random() * 2),
        trasparencia: 1.0,
        diminuicao: true,
        razaoDeCintilacao: Math.random() * 0.05
    }
    }
// Função para desenhar o módulo lunar
function desenharModuloLunar() {
    contexto.save();
    contexto.beginPath();
    contexto.translate(moduloLunar.posicao.x, moduloLunar.posicao.y);
    contexto.rotate(moduloLunar.angulo);
    contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * -0.5, moduloLunar.largura, moduloLunar.altura);
    contexto.fillStyle = moduloLunar.cor;
    contexto.fill();
    contexto.closePath();
 
    // Desenhar chama se o motor estiver ligado
    if (moduloLunar.motorLigado) {
        desenharChama();
    }
 
    contexto.restore();
}
 
// Função para desenhar a chama do motor
function desenharChama() {
    contexto.beginPath();
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 30);
    contexto.lineTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.closePath();
    contexto.fillStyle = "orange";
    contexto.fill();
}

// Definir o combustível máximo
const COMBUSTIVEL_MAXIMO = 1000;

// Função para mostrar a velocidade vertical
function mostrarVelocidadeVertical() {
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let velocidadeVertical = `Vel. Vertical: ${(10 * moduloLunar.velocidade.y).toFixed(0)}`;
    contexto.fillText(velocidadeVertical, 100, 40);
}

// Função para mostrar a velocidade horizontal
function mostrarVelocidadeHorizontal() {
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let velocidadeHorizontal = `Vel. Horizontal: ${(10 * moduloLunar.velocidade.x).toFixed (0)}`;
    contexto.fillText(velocidadeHorizontal, 100, 60);
}

// Função para mostrar o ângulo
function mostrarAngulo() {
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let angulo = `Ângulo: ${(moduloLunar.angulo * (180 / Math.PI)).toFixed(0)}°`;
    contexto.fillText(angulo, 100, 80);
}

// Função para mostrar o combustível em porcentagem
function mostrarCombustivel() {
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";

    let combustivelPorcentagem = (moduloLunar.combustivel / COMBUSTIVEL_MAXIMO) * 100;
    let combustivel = `Combustível: ${combustivelPorcentagem.toFixed(0)}%`;
    
    contexto.fillText(combustivel, 100, 100);
}

// Função para mostrar a altitude
function mostrarAltitude() {
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";

    let altitude = `Altitude: ${(canvas.height - moduloLunar.posicao.y).toFixed(0)} m`;
    contexto.fillText(altitude, 100, 120);
}

function desenharEstrelas(){
    for (let i;i < estrelas.length; i++){
     let estrela = estrelas[i];
     contexto.beginPath();
     contexto.arc(estrela.x,estrela.y)
     contexto.closePath();
     contexto.fillStyle = "rgba (255,255," + estrela.transparencia +")";
     contexto.fill();
     contexto.restore();
    
    }

}
// Função para exibir todas as informações
function mostrarInformacoes() {
    mostrarVelocidadeVertical();
    mostrarVelocidadeHorizontal();
    mostrarAngulo();
    mostrarCombustivel();
    mostrarAltitude();
    desenharEstrelas();
}
    
 
// Função para atualizar a física do módulo lunar
function atracaoGravitacional() {
    moduloLunar.posicao.x += moduloLunar.velocidade.x;
    moduloLunar.posicao.y += moduloLunar.velocidade.y;
 
    // Controle de rotação
    if (moduloLunar.rotacaoAntiHorario) {
        moduloLunar.angulo += Math.PI / 180; // Rotação anti-horária
    } else if (moduloLunar.rotacaoHorario) {
        moduloLunar.angulo -= Math.PI / 180; // Rotação horária
    }
 
    // Verificar se o motor está ligado
    if (moduloLunar.motorLigado && moduloLunar.combustivel > 0) {
        moduloLunar.velocidade.y -= 0.02; // Acelera para cima
        moduloLunar.combustivel -= 0.5; // Consome combustível
    }
 
    moduloLunar.velocidade.y += 0.01; // Gravidade
 
    // Limitar o módulo lunar ao topo da tela
    if (moduloLunar.posicao.y < 10) {
        moduloLunar.posicao.y = 10;
        moduloLunar.velocidade.y = 0;
    }
}
 
// Função de desenho do jogo
    function desenhar() {
        // Limpar a tela
        contexto.clearRect(0, 0, canvas.width, canvas.height);
    
        // Atualizar a física do módulo lunar
        atracaoGravitacional();
    
        // Desenhar o módulo lunar
        desenharModuloLunar();
    
        // Mostrar informações na tela
        mostrarInformacoes (); // Agora exibe velocidade vertical, horizontal e ângulo
        mostrarCombustivel ();
    
        // Verificar colisão com o solo
        if(moduloLunar.posicao.y >= (canvas.height -0.5 * moduloLunar.altura)){
            if(moduloLunar.velocidade.y >= 0.5 || moduloLunar.velocidade.x != 0 || 5< moduloLunar.angulo|| moduloLunar.angulo< - 5 ){
                contexto.font = "bold 100px Arial";
                contexto.textAlign = "center";
                contexto.textBaseline = "middle";
                contexto.fillStyle = "red";
                return contexto.fillText("Você morreu!", 400, 300);
        }else{
            contexto.font = "bold 100px Arial";
            contexto.textAlign = "center";
            contexto.textBaseline = "middle";
            contexto.fillStyle = "red";
            return contexto.fillText("Você ganhou!", 400, 300)
        }}
    
        // Continuar a animação
        requestAnimationFrame(desenhar);
    }
 
// Função para lidar com pressionamento de teclas
document.addEventListener("keydown", teclaPressionada);
document.addEventListener("keyup", teclaSolta);
 
// Lidar com a pressão das teclas
function teclaPressionada(evento) {
    if (evento.keyCode == 38 && moduloLunar.combustivel > 0) {
        moduloLunar.motorLigado = true; // Acionar motor
    } else if (evento.keyCode == 37) {
        moduloLunar.rotacaoAntiHorario = true; // Rotação anti-horária
    } else if (evento.keyCode == 39) {
        moduloLunar.rotacaoHorario = true; // Rotação horária
    }
}
 
// Lidar com a liberação das teclas
function teclaSolta(evento) {
    if (evento.keyCode == 38) {
        moduloLunar.motorLigado = false; // Desligar motor
    } else if (evento.keyCode == 39    ) {
        moduloLunar.rotacaoAntiHorario = false; // Parar rotação anti-horária
    } else if (evento.keyCode == 37) {
        moduloLunar.rotacaoHorario = false; // Parar rotação horária
    }
}

let gravidade=0.01
function atracaoGravitacional() {
    moduloLunar.posicao.x += moduloLunar.velocidade.x;
    moduloLunar.posicao.y += moduloLunar.velocidade.y;

    if (moduloLunar.rotacaoAntiHorario) {
        moduloLunar.angulo += Math.PI / 180;
    } else if (moduloLunar.rotacaoHorario) {
        moduloLunar.angulo -= Math.PI / 180;
    }

    if (moduloLunar.motorLigado) {
        moduloLunar.velocidade.y -= 0.115 * Math.cos(moduloLunar.angulo);
        moduloLunar.velocidade.x += 0.115 * Math.sin(moduloLunar.angulo);
    }

    moduloLunar.velocidade.y += gravidade;
}
// Iniciar o jogo
desenhar()