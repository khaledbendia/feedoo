$(function(){
	var globalURL = "http://feedoo.herokuapp.com/";
	$(".commancer").on("click",function(){
		window.location = globalURL+"commande/";
		
	});
	$("#notreConcept").on("click",function(){
		$([document.documentElement, document.body]).animate({
			scrollTop: $("#commentCamarche").offset().top
		}, 75);
	});
	$("#nosAvantages").on("click",function(){
		$([document.documentElement, document.body]).animate({
			scrollTop: $("#lesAvantages").offset().top
		}, 75);
	});
	$("#logo").on("click",function(){
		window.location = globalURL;
	});
})