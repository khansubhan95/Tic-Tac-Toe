function convertToSymbol(argument) {
	if (argument==='X')
		return '<i class="fa fa-times sign"></i>'
	else if (argument==='O')
		return '<i class="fa fa-circle-o sign"></i>'
}

function computerPlays(posts,computerSign,compPosts) {
	$("#banner").html("Computer's turn");
	console.log('computer here');
	console.log(posts);
	console.log(compPosts);
	var obj={};
	var choice = posts[Math.floor(Math.random() * posts.length)];
	console.log('computer chose '+choice);
	$("#"+choice).html(convertToSymbol(computerSign));

	posts.splice(posts.indexOf(parseInt(choice)),1);
	compPosts.push(parseInt(choice));
	// return positions;
	obj.positions = posts;
	obj.computerPositions = compPosts;
	$("#banner").html("Player's turn");
	return obj;
}


/**
 * function to check whether a player has won the game
 * takes 2 arguments positions and flag
 * returns an object
 */

function winGame(positions) {
	var winningPositions = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	];
	var obj = {};
	
	for (var i=0;i<winningPositions.length;i++) {
		counter = true;
		for (var j=0;j<winningPositions[i].length;j++) {
			if (positions.indexOf(winningPositions[i][j])===-1) {
				counter = false;
			}
		}
		if (counter) {
			obj.status = true;
		}
	}
	
	return obj; 
}

$(document).ready(function() {
	var playerSign;
	var computerSign;
	var started = true;
	var positions = [0,1,2,3,4,5,6,7,8];
	var playerWin = false;
	var computerWin = false;
	var playerPositions;
	var computerPositions;
	var checked = false;
	$("#choiceModal").modal({
		show: true,
		backdrop: 'static',
		keyboard: false
	});

	$("button").click(function() {
		playerSign = $(this).attr('id');
		if (playerSign==='X')
			computerSign='O';
		else 
			computerSign='X';
	});

	$(".cell").click(function() {
		if (started) {
			positions = [0,1,2,3,4,5,6,7,8];
			playerPositions = [];
			computerPositions = [];
		}
		started = false;
		choice = $(this).attr("id");
		console.log('player chose '+choice);
		console.log(positions.indexOf(parseInt(choice)));

		if (positions.indexOf(parseInt(choice)) !== -1) {
			$("#"+choice).html(convertToSymbol(playerSign));
			playerPositions.push(parseInt(choice));
			playerWin = winGame(playerPositions).status;
			if (playerWin) {
				console.log('player wins the game');
				checked = true;
				positions = [];
				var p = parseInt($("#player-score").html());
				p+=1;
				$("#player-score").html(p+'');
				setTimeout(function(){
					for (var i=0;i<positions.length;i++) 
						$("#"+i).html('&nbsp');
				},3000);
			}
			positions.splice(positions.indexOf(parseInt(choice)),1);
			computerData = computerPlays(positions,computerSign,computerPositions);
			computerPositions = [];
			positions = computerData.positions;
			computerPositions = computerData.computerPositions;
			computerWin = winGame(computerPositions).status;
			if (computerWin) {
				console.log('computer wins the game');
				positions = [];
				checked = true;
				var p = parseInt($("#computer-score").html());
				p+=1;
				$("#computer-score").html(p+'');
				setTimeout(function(){
					for (var i=0;i<positions.length;i++) 
						$("#"+i).html('&nbsp');
				},3000);
			}
		}

		if (positions.length<1) {
			console.log('game over');
			playerWin = winGame(playerPositions);
			if (!checked) {
				if (playerWin) {
					console.log('player wins the game');
					var p = parseInt($("#player-score").html());
					p+=1;
					$("#player-score").html(p+'');
				}
				computerWin = winGame(computerPositions).status;
				if (computerWin) {
					console.log('computer wins the game');
					var p = parseInt($("#computer-score").html());
					p+=1;
					$("#computer-score").html(p+'');
				}
				else 
					console.log("it's a draw");
			}
			started = true;
			checked = false;
			positions = [0,1,2,3,4,5,6,7,8];
			playerPositions = [];
			computerPositions = [];
			setTimeout(function(){
				for (var i=0;i<positions.length;i++) 
					$("#"+i).html('&nbsp');
			},3000);
			
		}
		console.log(positions);
	});

	// Don't touch anything below this line

	$("#new-game").click(function() {
		location.href = location.href; 
		// location.reload();
	});
	
});	