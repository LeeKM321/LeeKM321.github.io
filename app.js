
//게임에 필요한 데이터 객체
const gameData = {
    secret : Math.floor(Math.random()*100) + 1,
    answer : null, //사용자가 클릭한 숫자
    min : 1,
    max : 100
};

//숫자 아이콘 생성 함수
function makeNumberIcons() {
    //id=numbers인 div 태그 안에다가 숫자 아이콘을 배치해야 합니다.
    //숫자 아이콘의 개수는 객체가 가지고 있는 min, max에 따라 달라집니다.
    //숫자 아이콘은 div태그이고, 클래스 이름은 icon으로 매깁니다.

    const $numbers = document.getElementById('numbers');
    const $frag = document.createDocumentFragment();

    console.log('min: ' + gameData.min);
    console.log('max: ' + gameData.max);

    for(let i=gameData.min; i<=gameData.max; i++) {
        const $icon = document.createElement('div');
        $icon.classList.add('icon');
        $icon.textContent = i;
        $frag.appendChild($icon);
    }

    $numbers.appendChild($frag);
    return $numbers;
}

//up, down 애니메이션을 작동시킬 클래스 추가/제거 함수 정의
function executeUpDownAnimation(isUp) {
    document.getElementById('up').classList.toggle('selected', isUp);
    document.getElementById('down').classList.toggle('selected', !isUp);
}


//정답을 판별해 주는 함수 정의
function checkAnswer($numbers, $target) {
    //객체에서 정답과 사용자의 선택값 가져오기.
    const {secret, answer} = gameData;
    console.log(secret);

    //숫자 범위를 화면에 표시하기 위한 요소 취득
    const $begin = document.getElementById('begin');
    const $end = document.getElementById('end');

    //정답을 맞췄을 때는 정답처리를 하는 함수 호출(processCorrect)
    //up 또는 down일 경우에는 min과 max값 변경.
    //begin과 end값도 변경.
    //aside 태그의 애니메이션을 담당할 executeUpDownAnimation 호출.
    if(secret === answer) {
        processCorrect($target);
        return;
    } else if(secret < answer) {
        //down일 경우
        gameData.max = answer - 1;
        $end.textContent = answer - 1;
        executeUpDownAnimation(false);
    } else {
        //up인 경우
        gameData.min = answer + 1;
        $begin.textContent = answer + 1;
        executeUpDownAnimation(true);
    }

    //판별 후에는 아이콘을 재 배치.
    clearNumberIcons($numbers); //현재 렌더링 되어 있는 아이콘들을 전체 삭제.
    makeNumberIcons(); //min, max가 변경되어 있기 때문에 그에 맞춰서 아이콘을 다시 배치.

}

//아이콘 전체 삭제 함수
function clearNumberIcons($numbers) {
    console.log('아이콘 전체 삭제!');
    [...$numbers.children].forEach($icon => $numbers.removeChild($icon));
}



//정답을 맞췄을 시 처리를 수행할 함수 정의
function processCorrect($target) {
    //축하메세지 박스를 나타나게 하는 코드.
    //축하 박스는 평소에는 숨겨져 있음. 이제 드러나도 된다는 신호.
    const $finish = document.getElementById('finish');
    $finish.classList.add('show');

    //정답 아이콘을 움직이게 하는 코드
    $target.setAttribute('id', 'move');
}   


//핵심 실행 로직 즉시 실행 함수 (main 역할)
(function() {

    //생성된 아이콘들에게 이벤트를 걸어주기 위해
    //아이콘 생성 후 아이콘들의 부모 요소를 리턴받을 예정입니다.
    const $numbers = makeNumberIcons();

    //숫자 아이콘을 클릭(선택) 했을 때의 이벤트 (부모 요소에 이벤트 설정해서 전파)
    $numbers.addEventListener('click' , function(e) {
        if(!e.target.matches('#numbers > .icon')) {
            return;
        }

        console.log(`${e.target.textContent} 클릭됨!`);
        gameData.answer = +e.target.textContent;

        //정답 체크 함수 호출!
        checkAnswer($numbers, e.target);
    });


})();

