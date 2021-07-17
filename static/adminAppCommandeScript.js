var globalURL =/*"http://127.0.0.1:8000/"*/ "http://feedoo.herokuapp.com/";

$(function(){
	getCommandeList();
});


function getCommandeList()
{
	$.ajax({
		url: globalURL+"adminApp_getCommandeList/",
		dataType: 'text',
		type: "POST",
		data: {},
		success: function(data){
			var json = JSON.parse(data);
			for(var i = 0; i <json.length; i++) {
				$("#commandeList").append("<div style = 'border:1px solid black'>PK : "+json[i].pk+", DATE : "+json[i].fields.dateCommande+"</div><br>"+
					"<div>"+json[i].fields.detail+"</div>");

			}
		},
		error:function(error)
		{
		}
	});
	
}