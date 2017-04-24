//url from https://www.random.org which gives us random numbers through their APIs
//all parameters explained in http://api.jquery.com/jQuery.ajax/

var cells; //declare variable to be acessible everywhere
var player = 'pink';
var pink = 'pink';
var green = 'green';
var gameOver = false;
var player1Score = 0;
var player2Score = 0;

var media;

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    media = new Media("file:///android_asset/www/dog-howling-yapping-daniel_simon.mp3");
}

//create a function to check if player won
function playerWon(events){

	var win;

	//check horizontal lines
	for(line = 0; line <cells; line++){
		win = true;
		for(col = 0; col < cells; col++){
			if( ! $('tr[data-y=' + line + '] > td[data-x=' + col + ']').hasClass(player) ){
				win = false;
				break;
			}
		}
		if (win == true){
			break;
		}
	}

	if(win == true){
		setTimeout(function(){
			alert('Winner');
		}, 100);
		media.play();
		return true;
	}

	//check vertical lines
	for(col = 0; col <cells; col++){
		win = true;
		for(line = 0; line < cells; line++){
			if( ! $('tr[data-y=' + line + '] > td[data-x=' + col + ']').hasClass(player) ){
				win = false;
				break;
			}
		}
		if (win == true){
			break;
		}
	}

	if(win == true){
		setTimeout(function(){
			alert('Winner');
		}, 100);
		media.play();
		return true;
	}

	//check \ diagonal lines
	win = true;
	for(i = 0; i <cells; i++ ){
		if( ! $('tr[data-y=' + i + '] > td[data-x=' + i + ']').hasClass(player) ){
			win = false;
			break;		
		}
	}

	if(win == true){
		setTimeout(function(){
			alert('Winner');
		}, 100);
		media.play();
		return true;
	}

	//check / diagonal lines
	win = true;
	for(i = 0; i <cells; i++ ){
		var y = (cells-1)-i;
		if( ! $('tr[data-y=' + y + '] > td[data-x=' + i + ']').hasClass(player) ){
			win = false;
			break;		
		}
	}

	if(win == true){
		setTimeout(function(){
			alert('Winner');
		}, 100);
		media.play();
		return true;
	}

	return false;

}

//check for tie
/*
function checkTie(){
	if(gameOver == true && ( player1Score == 0 && player2Score == 0 ) ){
		alert("it's a tie!");
	}
	return;
}*/

function newGame(){
	if(player1Score == 3 || player2Score == 3){
		alert("Player " + player + " has won the tournament ");
		return;
	}

	gameOver = false;
	$.ajax({
		type: 'GET',
		url: 'https://www.random.org/integers/',
		data: {
			num:1,
			min: 3,
			max: 4,
			base: 10,
			col:1,
			base:10,
			format: 'plain'
		},
		error: function(xhr, errorcode){

		},
		success: function(data, code, xhr){
			$('table').empty();
			cells = data; //our variable is now defined
			//append table data dynamically depending on the random number we get from the request. First append <tr>
			for(i = 0; i < cells; i++){
				y = i;
				$('table').append('<tr data-y=' + i + '></tr>');
			}

			//then append <td>
			for(j = 0; j < cells; j++){
				x = j; //give ids for all <td> and get coordinates for all
				$('tr').append('<td data-x=' + j + '></td>');
			}

			//get all the clicks on all <td> and alternate colors depending on player
			$('td').click(function(ev){
				navigator.vibrate(500);

				if(gameOver){
					alert("Game over");
					return;
				}

				var elemento = $(ev.currentTarget);

				//only allow clicking if the element does not have a class
				if( elemento.hasClass(pink) || elemento.hasClass(green) ){
					return;
				}
				//add css color class
				elemento.addClass(player);

				if(playerWon(elemento)){
					gameOver = true;
					if (player == pink){
						player1Score ++;
						$("#player1").html(player1Score);
					} else {
						player2Score ++;
						$("#player2").html(player2Score);
					}
					return;
				}

				if(player === 'pink'){
					player = green;
				
				} else {
					player = pink;
				}
				
			});

		}
	});
}

$(document).ready(function(){

	newGame();

	$("#player1").html(player1Score);
	$("#player2").html(player2Score);

	
	$("#newGame").click(function(){
		console.log('ok');
		newGame();
	});
	
});
