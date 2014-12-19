$(document).ready(function() {

	$(".b-register").click(function() {
		if ($("#main-register").css("display") == "none") {
			$("#real-content").slideToggle(400);
			$("#main-register").slideToggle(400);
		}
	});

	$(".b-login").click(function() {
		if ($("#main-login").css("display") == "none") {
			$("#real-content").slideToggle(400);
			$("#main-login").slideToggle(400);
		}
	});

	$(".b-back").click(function() {
		$("#main-login").hide();
		$("#main-register").hide();
		$("#real-content").slideToggle(400);
	});

});