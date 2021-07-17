$(function(){
var globalURL =/*"http://127.0.0.1:8000/"*/ "http://feedoo.herokuapp.com/";
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
	$("#imgFacebook").on("click",function(){
		window.location = "https://www.facebook.com/FeedooStore";
	});
	$("#imgInstagram").on("click",function(){
		window.location = "https://www.instagram.com/feedooStore/";
	});
})