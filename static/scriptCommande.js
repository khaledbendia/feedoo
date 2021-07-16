var resultItem =$("<div class='item'>"+
	"<div class='itemImageContainer d-flex flex-wrap align-items-center  justify-content-center'>"+
	"<img src='https://firebasestorage.googleapis.com/v0/b/feedoo-8c622.appspot.com/o/banane.jpg?alt=media&token=44d424b6-74dd-4f9f-bac7-d79c307410ce'>"+
	"</div>"+

	"<div class='itemTitle p-1'>"+
	"	banane"+
	"</div>"+
	"<div class='detail m-4 mt-2 mb-0'>"+
	"<div class='d-flex justify-content-between'>"+
	"<div class='itemUnity text-muted'>1 KG</div>"+
	"<div class='itemPrice text-muted'>90 DA</div>"+
	"</div>"+
	"<div>"+
	"<div class='itemDetails'>950g à 1050g</div>"+
	"</div>"+
	"</div>"+
	"<div class='changeQuantity text-center mx-auto m-3' >"+
	"<div class='addButton buttonClass'>Ajouter</div>"+
	"<div class='quantityContainer   d-flex justify-content-center d-none'>"+
	"<div class='quantityMinus buttonClass w-25'>-</div>"+
	"<div class='quantity w-50'>1</div>"+
	"<div class='quantityPlus buttonClass w-25'>+</div>"+
	"</div>"+
	"</div>"+
	"</div>");
var panierItem = $("<div class='panierItem d-flex mt-1 pb-1'>"+
	"<div class='panierItemImageContainer d-flex flex-wrap align-items-center  justify-content-center'>"+
	"<img src=''>"+
	"</div>"+
	"<div class='panierItemInfo'>"+
	"<div class='panierItemTitle text-center'>Babane</div>"+
	"<div class='mt-1 mb-0'>"+
	"<div class=' d-flex justify-content-between text-muted'>"+
	"<div class='panierItemDetailUnity'>1 KG</div>"+
	"<div class='panierItemDetailPrice'>90 DA</div>"+
	"</div>"+
	"<div>"+
	"<div class='panierItemDetail'>950g à 1050g</div>"+
	"</div>"+
	"</div>"+
	"</div>"+
	"<div class='panierItemQuantity'>"+

	"<div class='panierItemChangeQuantity text-center mx-auto m-3' >"+
	"<div class='panierItemQuantityContainer  mx-auto d-flex justify-content-center'>"+
	"<div class='panierItemQuantityMinus buttonClass w-25'>-</div>"+
	"<div class='panierItemQuantityValue w-50'>1</div>"+
	"<div class='panierItemQuantityPlus buttonClass w-25'>+</div>"+
	"</div>"+

	"</div>"+
	"<div class='panierItemChangeQuantityTotal text-center'>"+
	"270 DA"+
	"</div>"+

	"</div>"+
	"</div>");
$(function(){
	$("#logo").on("click",function(){
		window.location = globalURL;
	});
	//item list quantity
	$("#itemsList").delegate(".addButton","click",function(e){
		$(this).parent().find(".quantity").html("1");
		$(this).parent().find(".quantityContainer").removeClass("d-none");
		$(this).addClass("d-none");
		changeItemQuantity($(this).parent().parent().attr("data"),1);
	});
	$("#itemsList").delegate(".quantityPlus","click",function(e){
		var q = parseInt($(this).parent().find(".quantity").html())+1;
		$(this).parent().find(".quantity").html(q+"");
		changeItemQuantity($(this).parent().parent().parent().attr("data"),q);
	});
	$("#itemsList").delegate(".quantityMinus","click",function(e){
		var q = parseInt($(this).parent().parent().find(".quantity").html())-1;
		if(q<1)
		{
			$(this).parent().parent().find(".quantityContainer").addClass("d-none");
			$(this).parent().parent().find(".addButton").removeClass("d-none");
			changeItemQuantity($(this).parent().parent().parent().attr("data"),0);
			return;
		}
		$(this).parent().find(".quantity").html(q+"");
		changeItemQuantity($(this).parent().parent().parent().attr("data"),q);
	});
	// category
	$("#categoriesContainer>div").on("click",function(e){
		if(!$(this).is('[class*="categorySelected"]'))
		{
			$(this).parent().find(".categorySelected").removeClass("categorySelected");
			$(this).addClass("categorySelected");
			if($(this).html()=="Fruit")
				getItemsByType("fruit");
			else
				getItemsByType("légume");
		}
	});
	// panier
	$("#showPanier").on("click",function(e){
		$("#panierModal").modal('show');
		//getPanierItems();
	});
	
	
	$("#panierModal").delegate(".panierItemQuantityPlus","click",function(e){
		var q = parseInt($(this).closest(".panierItemChangeQuantity").find(".panierItemQuantityValue").html())+1;
		
		$(this).closest(".panierItemChangeQuantity").find(".panierItemQuantityValue").html(q+"");

		var p = getPriceFromTag($(this).closest(".panierItem").find(".panierItemDetailPrice").html());
		$(this).closest(".panierItem").find(".panierItemChangeQuantityTotal").html(q*parseInt(p)+" DA");

		changeTotalSousTotalLivraison();
		changeItemQuantity($(this).closest(".panierItem").attr("data"),q);
	});
	$("#panierModal").delegate(".panierItemQuantityMinus","click",function(e){
		var q = parseInt($(this).closest(".panierItemChangeQuantity").find(".panierItemQuantityValue").html())-1;
		if(q<1)
		{

			changeItemQuantity($(this).closest(".panierItem").attr("data"),0);
			$(this).closest(".panierItem").remove().ready(function(){
				changeTotalSousTotalLivraison();
			});
			return;
		}
		$(this).closest(".panierItemChangeQuantity").find(".panierItemQuantityValue").html(q+"");
		
		var p = getPriceFromTag($(this).closest(".panierItem").find(".panierItemDetailPrice").html());
		$(this).closest(".panierItem").find(".panierItemChangeQuantityTotal").html(q*parseInt(p)+" DA");
		changeTotalSousTotalLivraison();
		changeItemQuantity($(this).closest(".panierItem").attr("data"),q);
	});
	$("#commanderButton").on("click",function(){
		if(localStorage.getItem("panier") !== null)
		{
			if(JSON.parse(localStorage["panier"]).length!=0)
			{
				window.location = globalURL+"validation/";
				return;
			}
		}
		alert("Votre panier est vide");
	});
	$("#hideModalButton").on("click",function(e){
		$("#panierModal").modal('hide');
	});
	/*************/

	getItemsByType("légume");
	if(localStorage.getItem("panier") !== null)
	{
		$("#panierSize").html(JSON.parse(localStorage["panier"]).length);	
	}


});


var globalURL = "http://feedoo.herokuapp.com/";
var panier;


function getItemsByType(_type)
{
	$("#itemsList .item").remove();
	$("#errorContainer").addClass("d-none");
	$("#spinnerContainer").removeClass("d-none");
	$.ajax({
		url: globalURL+"getItems/",
		dataType: 'text',
		type: "POST",
		data: {type:_type},
		success: function(data){
			var json = JSON.parse(data);

			$("#spinnerContainer").addClass("d-none");
			if(json.length==0)
			{
				$("#errorContainer").removeClass("d-none");
				return;
			}
			
			for(var i = 0; i <json.length; i++) {
				oneItemShow(json[i].pk,json[i].fields);
			}
		},
		error:function(error)
		{
			$("#spinnerContainer").addClass("d-none");
			$("#errorContainer").removeClass("d-none");
		}
	});
}
function oneItemShow(pk,obj)
{
	var item = $(resultItem).clone();
	$(item).attr("data",pk);

	$(item).find(".itemTitle").html(obj.name);
	$(item).find(".itemUnity").html(obj.unity);
	$(item).find(".itemDetails").html(obj.moreDesc);

	$(item).find(".itemPrice").html(obj.price+" DA");
	$(item).find("img").attr("src",obj.img);
	var itemQuantity = getItemQuantity(pk);
	if(itemQuantity!=null)
	{
		$(item).find(".quantity").html(itemQuantity);
		$(item).find(".quantityContainer").removeClass("d-none");
		$(item).find(".addButton").addClass("d-none");
	}
	$("#itemsList").append(item);	
}
function changeItemQuantity(pk,q)
{
	//localStorage.removeItem("panier");
	//alert(pk+" "+q);
	if(localStorage.getItem("panier") === null)
	{
		panier = [];
	}
	else
	{
		panier = JSON.parse(localStorage["panier"]);
	}
	if(q==0)
	{
		for(var i =0;i<panier.length;i++)
		{
			if(panier[i][0]==pk)
			{
				panier.splice(i, 1);
				localStorage["panier"] = JSON.stringify(panier);
				$("#panierSize").html(JSON.parse(localStorage["panier"]).length);
				return;
			}
		}
	}
	var exist =false;
	for(var i = 0; i <panier.length; i++) 
	{
		if(pk==panier[i][0])
		{
			exist = true;
			panier[i][1] = q;
			break;
		}

	}	
	if(!exist)
	{	
		panier.push([pk,q]);
	}
	
	localStorage["panier"] = JSON.stringify(panier);
	$("#panierSize").html(JSON.parse(localStorage["panier"]).length);
	
}
function getItemQuantity(pk)
{
	if(localStorage.getItem("panier") === null)
	{
		return null;
	}
	else
	{
		panier = JSON.parse(localStorage["panier"]);
		for(var i=0;i<panier.length;i++)
		{
			if(panier[i][0]==pk)
			{
				return panier[i][1];
			}
		}
		return null;
	}
}
function getPanierItems()
{
	$("#panierItemsList .panierItem").remove();
	$("#spinnerContainerModal").removeClass("d-none");
	$("#panierVide").addClass("d-none");
	if(localStorage.getItem("panier") === null)
	{
		$("#panierVide").removeClass("d-none");
		$("#spinnerContainerModal").addClass("d-none");
		
		return;
	}
	else
	{
		panier = JSON.parse(localStorage["panier"]);
		$.ajax({
			url: globalURL+"getPanierItems/",
			dataType: 'text',
			type: "POST",
			data: {panier:getPanierPK(panier)},
			success: function(data){
				var json = JSON.parse(data);

				$("#spinnerContainerModal").addClass("d-none");
				if(json.length==0)
				{
					$("#panierVide").removeClass("d-none");
					$("#spinnerContainerModal").addClass("d-none");
				}
				for(var i=0;i<json.length;i++)
				{
					var item = $(panierItem).clone();
					$(item).attr("data",panier[i][0]);
					$(item).find(".panierItemQuantityValue").html(panier[i][1]);
					
					$(item).find(".panierItemTitle").html(json[i].fields.name);
					$(item).find(".panierItemDetailUnity").html(json[i].fields.unity);
					$(item).find(".panierItemDetailPrice").html(json[i].fields.price+" DA");
					$(item).find(".panierItemDetail").html(json[i].fields.moreDesc);


					$(item).find("img").attr("src",json[i].fields.img);
					var itemTotal = parseInt(json[i].fields.price)*panier[i][1];
					$(item).find(".panierItemChangeQuantityTotal").html(itemTotal+" DA");
					

					$("#panierItemsList").append(item).ready(function () {
						changeTotalSousTotalLivraison();
					});;	
				}
			},
			error:function(error)
			{
				$("#spinnerContainerModal").addClass("d-none");
				$("#errorContainerModal").removeClass("d-none");
			}
		});
		
	}
}
function getPanierPK(panier)
{
	var array = [];
	for(var i=0;i<panier.length;i++)
	{
		array.push(panier[i][0]);
	}
	return array;
}
function getPriceFromTag(p)
{
	for(var i=0;i<p.length;i++)
	{
		if(p[i]==' ')
		{
			return p.substring(0,i);
		}
	}
}

function changeTotalSousTotalLivraison()
{
	var itemsTotalElement = $(".panierItemChangeQuantityTotal");
	var sous_total=0;
	var livraison =300;
	var total;
	for(var i =0;i<itemsTotalElement.length;i++)
	{
		var p =parseInt(getPriceFromTag($(itemsTotalElement[i]).html()));
		sous_total+=p;
		//alert(itemsTotal.length+" "+p);
	}
	total = sous_total+ livraison;

	$("#panierModal").find("#sous_total").html(sous_total+" DA");
	$("#panierModal").find("#livraison").html(livraison+" DA");
	$("#panierModal").find("#total").html(total+" DA");
}