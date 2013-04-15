
$(function(){
	$("#go").click(function(){
		console.log("clicked");
		var username = $("#username").val();
		var score = $("#score").val();
		console.log(username);
		console.log(score);
		$("#username").val('');
		$("#score").val('');
		
		//$.post("http://limitless-depths-9044.herokuapp.com/hello", { "username":username, "score":score } );

		var text = '{ "username":'+username+', "score":'+score+' }';
		$.post("http://localhost:3000/stuff",'{"name":"Tom","age":"22"}');
		
	});
});

