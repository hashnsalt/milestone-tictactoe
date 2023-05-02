// 모든 로직을 담당하는 파일.
// 사용자의 입력을 받아서 유효성을 검사하고 저장하는 파일.


function openPlayerConfig(event){
  // const clickedBtn = event.target.dataset['player-id'];
  // '-' 대쉬는 점표기법과 함께 사용할 수 없기 때문에(ex, dataset.player-id(X)) '[]'안에서 사용해줌.
  editedPlayer =+ event.target.dataset.playerid; // +'1' => 1 :편집 중인 데이터(id-data)를 저장하고 있음.
  playerConfigOverlay.style.display = 'block';
  backdropElement.style.display = 'block';
}

function closePlayerConfig(){
  playerConfigOverlay.style.display = 'none';
  backdropElement.style.display = 'none';
  formElement.firstElementChild.classList.remove('error');
  errorOutputElement.textContent = '';
  formElement.firstElementChild.lastElementChild.value = ''; //이렇게 설정해 줌으로 인해
  //firstElementChild: div, lastElementChild: div 안의 input
  //firstElementChild랑 firstChild의 차이. firstChild는 일반 text까지 포함함, firstElementChild는 태그만 포함.
}

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enterPlayername = formData.get('playername').trim();
  //덮어쓸 계획이 없고 한번만 추출해서 사용할 것이기 때문에 상수를 사용하는 편이 좋음.
  //.trim()은 초와 공백을 잘라내는 기능을 하는 메서드임. -> '    MAX' ==> 'MAX'

  // console.log(enterPlayername);

  if (!enterPlayername) {

//방법1
    event.target.firstElementChild.classList.add('error'); 
    
    //방법2 event.target.firstElementChild.className = 'error';

    errorOutputElement.textContent = 'please enter a valid name!';
    return;//return을 실행하면 호출한 함수의 실행이 중단됨.
  }



  const updatedPlayerDataElement = document.getElementById('player-' + editedPlayer + '-data');
updatedPlayerDataElement.children[1].textContent = enterPlayername; //article의 h3에 등록된 user 이름 기록

  // 방법1.
  // if(editedPlayer === 1) {
  //   player[0].name = enterPlayername;
  // } else {
  //   player[1].name = enterPlayername;
  // }
  // if-else를 사용할수도 있음.

  /// 위의 코드를 방법2로 refactoring

  player[editedPlayer - 1].name = enterPlayername;
  //editedPlayer는 player의 data-playerid를 가짐. 이를 배열에 이용하여 enterPlayername에 집어 넣음.

  closePlayerConfig();


}

//preventDefault(): 요청을 보내는 브라우저 기본 동작(리로드 동작)을 방지해서 자바스크립에서 해당 양식 제출을 처리할 수 있기 때문에 중요함.

// FormData는 폼을 쉽게 보내도록 도와주는 객체. FormData 객체는 HTML 폼 데이터를 나타냄.
//HTML에 form태그가 있기 때문에 해당 양식에 입력된 값을 자동으로 추출해주기 위해 FormData()객체를 사용할 것임.
//입력된 값을 추출해주기 위해 event.target을 FormData값으로 전달할 수 있음. 왜냐하면 이 이벤트 객체(FormData)에는 이 이벤트를 담당 HTML을 가르키는 target 속성이 있기 때문.

//formData 객체에서 사용할 수 있는 메서드 중 get()메서드를 사용하여 사용자 입력 중 하의 값을 얻을 수 있음. 괄호안()에 입력할 수 있는 값을 집어 넣음.
//여기서는 input의 id인 playname의 값을 받아 문자열(text)로 get에 전달됨.
