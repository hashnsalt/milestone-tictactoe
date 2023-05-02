// 게임의 실행에 관련된 모든것을 제어하는 파일.
function resetBtn() {
  location.reload(true);
}

function resetGame() { //NEW GAME 버튼을 클릭하면 발생할 초기화들.
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOver.firstElementChild.innerHTML = 'Your won, <span id="winner-name">PLAYER NAME</span>!' //innerHTML을 사용하면 안의 HTML태그들도 사용할 수 있게 끔 해줌.
  gameOver.style.display = 'none';

  let gameBoardIndex = 0;
  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){//gameData reset
      gameData[i][j] = 0;

      //여기서부터 화면상에 나타나는 game field reset
      const gameBoardItem = gameBoard.children[gameBoardIndex];
      gameBoardItem.textContent = ''; //game field 화면 초기화.
      gameBoardItem.classList.remove('disabled');
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if(player[0].name === '' || player[1].name === '') {
    alert('Please set custom player name for both players!');
    return;
  }

  resetGame();

  activePlayerName.textContent = player[activePlayer].name; //NEWGAME 버튼을 누르면 첫번째 플레이어 이름이 초기값으로 설정 됨.
  gameArea.style.display = 'block';
}

function switchPlayer(){
  if(activePlayer === 0){
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerName.textContent = player[activePlayer].name; //이를 설정해주면서 game field 위에 현제 player name이 바뀜.
}


function selectGameField(event) {
  // console.log(event.target.tagName);
  if(event.target.tagName !== 'LI' || gameIsOver) {
    return;
  } //return으로 반환하기 전에는 li필드 사이의 간격을 클릭하면 ol field로 전환이 되었지만, return문을 넣으면 그 다음 오는 모든 코드들은 실행을 하지 않으므로 ol field로 실행 되지 않음. tagName은 항상 대문자로 작성할 것.
  //gameIsOver의 값이 true일때 return되어 다른 값을 사용할 수 없게끔 만듬.

  const selectedField = event.target;


  const selectedCol = selectedField.dataset.col - 1; // html 돔에 설정한 data값을 불러와 해당 field를 선택 했을 때, 열값을 selectedCol 변수에 저장함. -1을 해준 이유는, 원래 배열 값은 0부터 시작인데, HTML DOM에 설정한 data-col값은 1부터 시작을 했기 때문임(행도 이와 같음)
  const selectedRow = selectedField.dataset.row - 1;

  if(gameData[selectedRow][selectedCol] > 0) {
    alert('Please select an empty field!');
    return;
  } //이미 다른 유저가 field를 선택했다면 다른 유저가 다시 선택할 수 없도록 비활성화 시킴.


  selectedField.textContent = player[activePlayer].symbol;//activePlayer는 app.js에서 초기화 0로 정의해 놓았기 때문에, player[0]인 게임 플레이어가 가진 배열 객체 데이터(symbol)을 가져와 이용함.
  //그래서 클릭하면 symbol:X가 gamefield에 찍히게 됨.
  selectedField.classList.add('disabled');//이미 field에 symbol이 찍힌 곳은 disabled 클래스를 추가하여 비활성화 시킴.


  gameData[selectedRow][selectedCol] = activePlayer + 1; //이렇게 계산한 데이터 행과 열 값을 배열 값으로 가져와 저장하면서 play하고 있는 해당 user의 정보를 저장함(player[0] = 1로 player[1] = 2로. 여기서 0의 값을 사용하지 않는 이유는, 어떤 player도 없는 user값이 0이기 때문임.)
  // console.log(gameData); //배열 데이터 확인.
  
  const winnerId = checkGameOver();
  
  if(winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer(); //정의한 switchPlayer함수를 불러서 player[0]의 paly가 끝나면 player[1]로 game player가 바뀜.


}

function checkGameOver() {
  // if(gameData[0][0] === gameData [0][1] && gameData[0][1] === gameData[0][2]){//이와 같이 작성하면 Player가 누군지는 모르지만, 같은 Player가 한줄을 완성했다는 걸 알 수 있음.
  //   //잘못된 방법==> if(gameData[0][0] === 1 && gameData[0][1] === 1 && gameData[0][2] === 1){...} 이와 같이 사용해주면 해주면 player1 뿐만 아니라 2도 중복된 코드를 사용하기 때문에 불필요함.
    
    //BUT 위와 같은 정의도 논리적 오류가 존재함. 왜냐하면 초기값은 [0, 0, 0] 배열을 가지므로 같기 때문에 결과값을 0을 가짐.
    // 그렇기 때문에 아래와 같이 데이터가 가지는 값이 0보다 커야하는 구문을 추기해 줌.
  // if (gameData[0][0] > 0 && gameData[0][0] === gameData[0][1] && gameData [0][2]) {
  //   return gameData[0][0]; //gameData를 반환하면 승리 playerid를 알 수 있음.
  // } //하지만 이와 같은 코드를 작성하면 0,1,2 행 모든 코드를 똑같이 작성해줘야 한다는 코드 중복이 발생하여 불필요 함.


  //그러므로 중복을 없애주기 위해 for문으로 변수를 사용하여 돌리겠음.

  //Checking the rows for equality
  for(let i = 0; i < 3; i++) {
    if (gameData[i][0] > 0 && gameData[i][0] === gameData[i][1] && gameData[i][1] === gameData[i][2]) {
      return gameData[i][0];
    }
  } //이처럼 작성하면 모든 행을 if문으로 돌려야하는 번거로움을 줄일 수 있음.


  //Checking for columns for equality
  for(let i = 0; i < 3; i++) {
    if(gameData[0][i] > 0 && gameData[0][i] === gameData[1][i] && gameData[1][i] === gameData[2][i]){
      return gameData[0][i];
    }
  }

  //Top left to bottom right
  if(gameData[0][0] > 0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]) {
    return gameData[0][0];
  }

  //Bottom left to Top right
  if(gameData[2][0] > 0 && gameData[2][0] === gameData[1][1] && gameData[1][1] === gameData[0][2]){
    return gameData[2][0];
  }

  if(currentRound === 9) {
    return -1;
  }//무승부 일때

  return 0; //게임이 아직 끝나지 않았고, 승자가 없을 때.
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOver.style.display = 'block';

  if (winnerId > 0) {
    const winnerName = player[winnerId - 1].name;
    gameOver.firstElementChild.firstElementChild.textContent = winnerName;
  } else {//무승부 일때 나타내는 문장
    gameOver.firstElementChild.textContent = 'It\'s a draw!'; // 문자열을 표현하는 기호 안에 '(홑따옴표)를 사용하고 싶다면 \백슬래시와 함께 사용해주면 됨. 여기서 사용하는 \ 백슬래시는 아직 문자열이 끝나지 않았다는 표시를 해주는 특수 구문임.
  }
}