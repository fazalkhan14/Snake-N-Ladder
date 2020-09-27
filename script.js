var activePlayer,scores,gamePlay,dice;
var snakes = [{from:16,to:6},{from:49,to:11},{from:47,to:26},{from:64,to:60},{from:87,to:24},{from:93,to:73},{from:98,to:78}];
var ladders = [{from:1,to:38},{from:9,to:31},{from:21,to:42},{from:26,to:84},{from:51,to:67},{from:71,to:91},{from:80,to:100}];

init();

document.querySelectorAll('.dice').forEach(function(item) {
    item.addEventListener('click', function(event) {
        if(!gamePlay) return
        else{
        var id = event.currentTarget.id;
        if(activePlayer !== +id){
            return
        }
        dice =Math.floor(Math.random() * 6) + 1;
        document.querySelector('.player-'+activePlayer+'-panal')
        var diceDom = document.querySelector('.player-'+activePlayer+'-panal .dice');
        diceDom.style.display = 'block';
        var diceImg = document.querySelector('.player-'+activePlayer+'-panal .dice img');
        diceImg.src = 'dice-' + dice + '.png';
        if(dice === 6 || scores[0] !== null || scores[1] !== null)
            movePawn()
        else
            nextPlayer();
    }
    })
  })

function movePawn(){
    if(dice === 6 && scores[activePlayer] === null){
        scores[activePlayer] = 0
        return;
    }
    if(scores[activePlayer]!== null){
    var prevPosition = scores[activePlayer];
    if(prevPosition)
        document.querySelector('.box'+prevPosition).innerHTML = prevPosition ;
    scores[activePlayer] += dice;
    //Dont move pawn if the sum is greater than 100
    if(scores[activePlayer] > 100){
        scores[activePlayer] -= dice
    }
    var pawn = document.querySelector('.pawn'+activePlayer).innerHTML;
    var pawnDiv = document.createElement("DIV")
    pawnDiv.innerHTML = pawn;
    pawnDiv.classList.add("boxPawn");
    //CHECK if the position has snake or ladder within it and only then append.
    var newPosition = gamePawn(scores[activePlayer]);
    scores[activePlayer] = newPosition;
    document.querySelector('.box'+newPosition).appendChild(pawnDiv);
    if(scores[activePlayer] === 100){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panal').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panal').classList.remove('active');
        gamePlay = false; 
    }
    }
    nextPlayer()
    
}

function gamePawn(scores){
// return the updated position if snake or ladder is present
    var newPosition;
    for(var i=0;i<snakes.length;i++){
        if(snakes[i].from === scores){
            newPosition = snakes[i].to;
            return newPosition;
        }
        else{
            newPosition = scores;
        }
    }
    for(var i=0;i<ladders.length;i++){
        if(ladders[i].from === scores){
            newPosition = ladders[i].to;
            return newPosition;
        }
        else{
            newPosition = scores;
        }
    }
    return newPosition
}

function nextPlayer(){
    //if score is not null
    if(dice === 6 && scores[activePlayer] !== null)
        return
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panal').classList.toggle('active');
    document.querySelector('.player-1-panal').classList.toggle('active'); 

}

document.querySelector('.btn-new').addEventListener('click', init);

function resetAll(){
    document.querySelector('.player-0-panal').classList.add('active');
    document.querySelector('.player-1-panal').classList.remove('active'); 
    var prevPosition1 = scores[0];
    if(prevPosition1){
        document.querySelector('.box'+prevPosition1).innerHTML = prevPosition1 ;
        var div1 = document.createElement('div');
        div1.id = 'BluePawn';
        div1.innerHTML = '<img src="file:///C:/Users/ADMIN/Downloads/blue-pawn.svg">';
        div1.classList.add("pawn0");
        document.querySelector("#name-0").appendChild(div1);
    }
    var prevPosition2 = scores[1];
    if(prevPosition2){
        document.querySelector('.box'+prevPosition2).innerHTML = prevPosition2 ;
        var div2 = document.createElement('div');
        div2.id = 'RedPawn';
        div2.innerHTML = '<img src="file:///C:/Users/ADMIN/Downloads/red-pawn.svg">';
        div2.classList.add("pawn1");
        document.querySelector("#name-1").appendChild(div2)
    }
    var text1 = document.querySelector('#name-0').textContent;
    var text2 = document.querySelector('#name-1').textContent;
    if(text1 === "Winner!"){
        document.querySelector('#name-0').textContent = "Player 1"
        document.querySelector('.player-0-panel').classList.remove('winner');
    }
    if(text2 === "Winner!"){
        document.querySelector('#name-1').textContent = "Player 2"
        document.querySelector('.player-1-panel').classList.remove('winner');
    }
}

function init(){
    activePlayer = 0;
    if(scores && (scores[0] !== null || scores[1] !== null)){
        resetAll()
    }
    scores = [null,null];
    gamePlay = true; 
}