let gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
]; //gameData가 저장되어 이 저장된 값으로 게임의 승자를 구분하겠음.

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false; //game이 끝났는지 끝나지 않았는지를 명확히 하여 game이 끝났다면 field를 더이상 사용할 수 없게 끔 비활성화 시키기위해 사용.

const player = [
  {
    name: '',
    symbol: 'X'
  },
  {
    name: '',
    symbol: 'O'
  },
]

const playerConfigOverlay = document.getElementById('config-overlay')
const backdropElement = document.getElementById('backdrop');
const formElement = document.querySelector('form');
const errorOutputElement = document.getElementById('config-errors');
const gameArea = document.getElementById('active-game');
//btnElement
const activePlayerName = document.getElementById('active-player-name');//game player가 누군지 표시하기위해 정의.
const gameOver = document.getElementById('game-over');



const editPlayer1Btn = document.getElementById('edit-player1');
const editPlayer2Btn = document.getElementById('edit-player2');
// document(객체)를 이용하여 버튼에 access
const cancelConfigBtn = document.getElementById('cancel-config-btn');
const startNewGameBtn = document.getElementById('start-game-btn');
// const gameField = document.querySelectorAll('#game-board li');//방법1
const gameBoard = document.getElementById('game-board');


editPlayer1Btn.addEventListener('click', openPlayerConfig);
editPlayer2Btn.addEventListener('click', openPlayerConfig);


cancelConfigBtn.addEventListener('click', closePlayerConfig);
backdropElement.addEventListener('click', closePlayerConfig);

//이 파일에서 addEventListener('click', function(){}); 이런식으로 클릭 이벤트시 일어나는 함수를 지정해 줄 수 있지만, 여기서는 함수의 정의는 config.js에서 해줌.
//왜냐하면, config.js가 플레이어 구성 관련된 모든 로직을 가지고 있기 때문임.

//config.js에서 정의한 function 함수인 openPlayerConfig를 이렇게 사용할 수 있음.

formElement.addEventListener('submit', savePlayerConfig);
//submit: 제출 이벤트가 발생하는 javascript form btn에 내장되어 있는 이벤트.

startNewGameBtn.addEventListener('click', startNewGame);

// 방법1_main
// for (const gameFieldEl of gameField) {
//   gameFieldEl.addEventListener('click', selectGameField);//li의 게임 field에 player가 게임을 플레이 할 수 있는 selectGameField 함수 정의.
// }


//방법2 위의 querySelectorAll을 사용하지 않고 id그대로 받아 쓸 수 있는 방법.
gameBoard.addEventListener('click', selectGameField);
//이렇게 만들어도 작동은 하지만 li들 사이의 간격(gap)을 누르면 gameField가 사라지고 해당 player들은 li field가 아닌 ol field 안에서 작동하게 된다.