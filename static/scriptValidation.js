var globalURL = "http://feedoo.herokuapp.com/";
var dateItem = $("<div class='dateItem form-check'>"+
	"<input class='form-check-input' type='radio' name='radiosDates'  value='7:00 à 9:00 Le 12 dec 2021'>"+
	"<label class='form-check-label' >"+
	"7:00 à 9:00 Le 12 dec 2021"+
	"</label>"+
	"</div>");
var dateSelectedValue;
$(function(){
	$("#logo").on("click",function(){
		window.location = globalURL;
	});

	getLocalStorage();

	var informationPanel = $("#informationPanel");
	var adressePanel = $("#adressePanel");
	var datePanel = $("#datePanel");
	var validationPanel = $("#validationPanel");
	$("#informationSuivant").on('click',function(){
		var v = validationInformation();
		if(v)
		{
			informationPanel.addClass("d-none");
			adressePanel.removeClass("d-none");
			mapContent();
			$("#steps>div:nth-child(2)").addClass("stepSelected");
		}
		
	});


	$("#adressePrecedent").on('click',function(){
		informationPanel.removeClass("d-none");
		adressePanel.addClass("d-none");
		$("#steps>div:nth-child(2)").removeClass("stepSelected");
	});
	$("#adresseSuivant").on('click',function(){
		var v = validationAdresse();
		if(v)
		{
			getDates();
			adressePanel.addClass("d-none");
			datePanel.removeClass("d-none");
			$("#steps>div:nth-child(3)").addClass("stepSelected");
		}
		
	});



	$("#datePrecedent").on('click',function(){
		adressePanel.removeClass("d-none");
		datePanel.addClass("d-none");
		mapContent();
		$("#steps>div:nth-child(3)").removeClass("stepSelected");
	});
	$("#dateSuivant").on('click',function(){
		dateSelectedValue = validationDate();
		if(dateSelectedValue!=null)
		{
			validationPanelShow();
			datePanel.addClass("d-none");
			validationPanel.removeClass("d-none");
			$("#steps>div:nth-child(4)").addClass("stepSelected");
		}
		
	});



	$("#validationPrecedent").on('click',function(){
		validationPanelShow();
		datePanel.removeClass("d-none");
		validationPanel.addClass("d-none");
		$("#steps>div:nth-child(4)").removeClass("stepSelected");
	});
	$("#validationSuivant").on('click',function(){
		sendRequest();
	});

	$("#OK").on('click',function(){
		$("#OK_Modal").modal("hide");
		window.location=globalURL;
	});
});
function getLocalStorage()
{
	if(localStorage.getItem("nom") !== null)
	{
		$("#nom").val(localStorage["nom"]);
		$("#prenom").val(localStorage["prenom"]);
		$("#telephone").val(localStorage["telephone"]);
	}
	
}
function validationInformation()
{
	var nom = $("#nom").val();
	var prenom = $("#prenom").val();
	var telephone = $("#telephone").val();

	var regexString = /^[a-zA-Z]+$/
	var regexNumbers = /^\d+$/;

	if(!regexString.test(nom))
	{
		$("#nom").next('.invalid-feedback').addClass("d-block");
		$("#nom").addClass("is-invalid");
		return false;
	}
	if(!regexString.test(prenom))
	{
		$("#prenom").next('.invalid-feedback').addClass("d-block");
		$("#prenom").addClass("is-invalid");
		return false;
	}
	
	
	if((telephone.length!=10 )||(!regexNumbers.test(telephone))||(telephone[0]!='0'))
	{
		$("#telephone").next('.invalid-feedback').addClass("d-block");
		$("#telephone").addClass("is-invalid");
		return false;
	}
	localStorage["nom"] = nom;
	localStorage["prenom"] = prenom;
	localStorage["telephone"] = telephone;
	return true;
}
function validationAdresse()
{
	try
	{
		var plusDeSpecification = $("#plusDeSpecification").val();
		localStorage["LngLat"] =JSON.stringify(marker.getLngLat());
		localStorage["plusDeSpecification"] = plusDeSpecification;
		return true;
	}
	catch(e){
		return false;
	}
}
function validationDate()
{
	return $('#dateList input[name=radiosDates]:checked').val();
}
function getDates()
{
	$("#dateList .dateItem").remove();
	$("#dateSpinnerContainer").removeClass("d-none");
	$("#dateErrorContainer").addClass("d-none");
	$.ajax({
		url: globalURL+"getDates/",
		dataType: 'text',
		type: "POST",
		data: {},
		success: function(data){
			var json = JSON.parse(data);
			$("#dateSpinnerContainer").addClass("d-none");
			$("#dateErrorContainer").addClass("d-none");
			for(var i=0;i<json.length;i++)
			{
				var item = $(dateItem).clone();
				if(i==0)
					$(item).find("input").attr("checked",true);
				$(item).find("input").val(json[i].fields.range);
				$(item).find("label").html(json[i].fields.range);

				$("#dateList").append(item);
			}
		},
		error:function(error)
		{
			$("#dateSpinnerContainer").addClass("d-none");
			$("#dateErrorContainer").removeClass("d-none");
		}
	});
}
function validationPanelShow()
{
	var panier = JSON.parse(localStorage["panier"]);

	$("#validationPanel input").prop("checked",false);
	$("#validationDate").html(dateSelectedValue);
	$.ajax({
		url: globalURL+"getTotalPanier/",
		dataType: 'text',
		type: "POST",
		data: {
			pks : getPanierPK(panier),
			quantities : getPanierQuantity(panier)
		},
		success: function(data){
			$("#validationTotal").html(data+" DA");
			$("#validationNom").html(localStorage["nom"]);
			$("#validationPrenom").html(localStorage["prenom"]);
			$("#validationTelephone").html(localStorage["telephone"]);
			$("#validationPlusDeSpecification").html(localStorage["plusDeSpecification"]);
			
		},
		error:function(error)
		{
			alert(error);
		}
	});	
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
function getPanierQuantity(panier)
{
	var array = [];
	for(var i=0;i<panier.length;i++)
	{
		array.push(panier[i][1]);
	}
	return array;
}

function sendRequest()
{
	if(!$("#agree").is(":checked"))
	{
		$("#agree").parent().find('div').addClass("d-block");
		return;
	}
	var panier = JSON.parse(localStorage["panier"]);
	$.ajax({
		url: globalURL+"sendRequest/",
		dataType: 'text',
		type: "POST",
		data: {
			pks : getPanierPK(panier),
			quantities : getPanierQuantity(panier),
			nom : localStorage["nom"],
			prenom : localStorage["prenom"],
			telephone : localStorage["telephone"],
			LngLat : JSON.stringify(localStorage["LngLat"]),
			plusDeSpecification : localStorage["plusDeSpecification"],
			date : dateSelectedValue
		},
		success: function(data){
			$("#OK_Modal").modal("show");
		},
		error:function(error)
		{
			alert("error");
		}
	});	
}

