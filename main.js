//url from https://www.random.org which gives us random numbers through their APIs
//all parameters explained in http://api.jquery.com/jQuery.ajax/

var cells; //declare variable to be acessible everywhere
var player = 'pink';
var pink = 'pink';
var green = 'green';

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
	}
}

$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: 'https://www.random.org/integers/',
		data: {
			num:1,
			min: 3,
			max: 5,
			base: 10,
			col:1,
			base:10,
			format: 'plain'
		},
		error: function(xhr, errorcode){

		},
		success: function(data, code, xhr){
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

				//add css color class
				$(ev.currentTarget).addClass(player);

				playerWon($(ev.currentTarget));

				if(player === 'pink'){
					player = green;
				} else {
					player = pink;
				}

			});

		}
	});

	
});


//callback function 
/*
$(document).ready(function(){
	getParameters();
}); */