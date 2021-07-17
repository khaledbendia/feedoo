var globalURL =/*"http://127.0.0.1:8000/"*/ "http://feedoo.herokuapp.com/";
var dateItem =$("<input type='text' class='form-control' placeholder='...'>");

var produitItem=$("<div class='produit w-20'>"+
	"<h3>PK : 12</h3>"+
	"<label>name</label>"+
	"<input class='name form-control' type='text'>"+
	"<label>img</label>"+
	"<input class='img form-control' type='text'>"+
	"<label>type</label>"+
	"<input class='type form-control' type='text'>"+
	"<label>price</label>"+
	"<input class='price form-control' type='text'>"+
	"<label>unity</label>"+
	"<input class='unity form-control' type='text'>"+
	"<label>desc</label>"+
	"<input class='desc form-control' type='text'>"+
	"<label>more desc</label>"+
	"<input class='moreDesc form-control' type='text'>"+
	"<label>dispo</label>"+
	"<input class='dispo form-control' type='text'>"+
	"<button class='updateProduit' type='button' class='btn btn-info text-white m-1'>SAVE</button>"+
	"<button class='deleteProduit' type='button' class='btn btn-info text-white m-1'>DELETE</button>"+
	"</div>");
$(function(){
	$("#addDateItem").on("click",function(){
		$("#listDates").append($(dateItem).clone());
	});
	$("#removeDateItem").on("click",function(){
		$("#listDates >input:last").remove();
	});
	$("#validerDateItems").on("click",function(){
		var datesArray=[];
		for(var i=0;i<$("#listDates >input").length;i++)
		{
			datesArray.push($("#listDates >input:nth-child("+(i+1)+")").val());
		}
		validerDateItems(datesArray);
	});
	$("#saveNewProduit").on("click",function(){
		addItem();
	});
	$("#listProduits").delegate(".updateProduit","click",function(){
		updateItem($(this).closest(".produit"));
	});
	$("#listProduits").delegate(".deleteProduit","click",function(){
		deleteItem($(this).closest(".produit"));
	});

	getAllItems();
});
function validerDateItems(datesArray)
{
	$.ajax({
		url: globalURL+"adminApp_dateChanger/",
		dataType: 'text',
		type: "POST",
		data: {dates:datesArray},
		success: function(data){
			alert(data);
		},
		error:function(error)
		{
			alert(error);
		}
	});
}
function addItem()
{
	$.ajax({
		url: globalURL+"adminApp_addItem/",
		dataType: 'text',
		type: "POST",
		data: {
			name:$("#newProduit .name").val(),
			img:$("#newProduit .img").val(),
			type:$("#newProduit .type").val(),
			price:$("#newProduit .price").val(),
			unity:$("#newProduit .unity").val(),
			desc:$("#newProduit .desc").val(),
			moreDesc:$("#newProduit .moreDesc").val(),
			dispo:$("#newProduit .dispo").val(),
		},
		success: function(data){
			alert(data);
		},
		error:function(error)
		{
			alert(error);
		}
	});
}

function getAllItems()
{
	$.ajax({
		url: globalURL+"adminApp_getAllItems/",
		dataType: 'text',
		type: "POST",
		data: {},
		success: function(data){
			var json = JSON.parse(data);
			for(var i=0;i<json.length;i++)
			{
				var item = $(produitItem).clone();
				$(item).attr("data",json[i].pk);
				$(item).find("h3").html("PK : "+json[i].pk)
				$(item).find(".name").val(json[i].fields.name);
				$(item).find(".img").val(json[i].fields.img);
				$(item).find(".type").val(json[i].fields.type);
				$(item).find(".price").val(json[i].fields.price);
				$(item).find(".unity").val(json[i].fields.unity);
				$(item).find(".desc").val(json[i].fields.desc);
				$(item).find(".moreDesc").val(json[i].fields.moreDesc);
				$(item).find(".dispo").val(json[i].fields.dispo);
				$("#listProduits").append(item);
			}
			
		},
		error:function(error)
		{
			alert(error);
		}
	});
}

function updateItem(item)
{
	$.ajax({
		url: globalURL+"adminApp_updateItem/",
		dataType: 'text',
		type: "POST",
		data: {
			pk:$(item).attr("data"),
			name:$(item).find(".name").val(),
			img:$(item).find(".img").val(),
			type:$(item).find(".type").val(),
			price:$(item).find(".price").val(),
			unity:$(item).find(".unity").val(),
			desc:$(item).find(".desc").val(),
			moreDesc:$(item).find(".moreDesc").val(),
			dispo:$(item).find(".dispo").val(),
		},
		success: function(data){
			alert(data);
		},
		error:function(error)
		{
			alert(error);
		}
	});
}
function deleteItem(item)
{
	$.ajax({
		url: globalURL+"adminApp_deleteItem/",
		dataType: 'text',
		type: "POST",
		data: {
			pk:$(item).attr("data"),
		},
		success: function(data){
			alert(data);
		},
		error:function(error)
		{
			alert(error);
		}
	});
}
