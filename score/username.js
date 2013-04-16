
$(function(){
	$("#go").click(function(){
		//console.log("clicked");
		var username = $("#username").val();
		var score = $("#score").val();
		$("#username").val('');
		$("#score").val('');
		
		//var score = 2100.0;
		var game_title = 'MegaMan';
		var date = new Date();
		
		//date = String(date);
		
		//console.log(date);
		
		var data = {'game_title': game_title, 'username':username, 'score':score, 'created_at':date};
		
		$.post("http://limitless-depths-9044.herokuapp.com/submit.json", data);
		
	});
});

