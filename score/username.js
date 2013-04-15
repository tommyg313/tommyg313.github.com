
$(function(){
	$("#go").click(function(){
		console.log("clicked");
		var username = $("#username").val();
		var score = $("#score").val();
		console.log(username);
		console.log(score);
		$("#username").val('');
		$("#score").val('');
		
		var game_title = "Frogger";
		var date = new Date();
		
		var data = {'game_title': game_title, 'username':username, 'score':score, 'created_at':date};
		
		$.post("http://limitless-depths-9044.herokuapp.com/submit.json", data);
		
	});
});

