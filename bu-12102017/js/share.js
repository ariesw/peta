var dataonload = false;
var onSuccess = ((function(_this) {
	return function(path) {
		var dataURL = "data:image/jpg;base64," + path
		if(!dataonload){
			if(dataURL){
				$(".img-responsive").attr("src",dataURL);
			}
		}
	};
})(this));
function initActionSheet(onSuccess) {
	navigator.camera.getPicture(onSuccess, null, {
		correctOrientation: true,
		quality: 40,
		destinationType: navigator.camera.DestinationType.DATA_URL,
		sourceType: navigator.camera.PictureSourceType.CAMERA
	});
}
$(document).ready(function(){	
	$(".img-responsive").click(function(){
		initActionSheet(onSuccess);
	});
	setTimeout(function(){
		$(".img-responsive").trigger('click');
		setTimeout(function(){
			$(".main-wrap").show();
		}, 500);
	}, 2000);
	url_string = window.location.href;
	var url = new URL(url_string);
	$("#p_latitude").val(url.searchParams.get("lat"));
	$("#p_longitude").val(url.searchParams.get("lng"));
	$(".btn-submt").click(function(){
		var p_name = $("#p_name").val();
		var p_address = $("#p_address").val();
		var p_telephone = $("#p_telephone").val();
		var p_location = $("#p_location").val();
		var p_latitude = $("#p_latitude").val();
		var p_longitude = $("#p_longitude").val();
		var p_accuracy = $("#p_accuracy").val();
		var p_datum = $("#p_datum").val();
		var p_chart_affected = $("#p_chart_affected").val();
		var p_edition = $("#p_edition").val();
		var p_encs_affected = $("#p_encs_affected").val();
		var p_lastnm_used = $("#p_lastnm_used").val();
		var p_other_public_affected = $("#p_other_public_affected").val();
		var p_detail = $("#p_detail").val();
		var p_photo = $(".img-responsive").attr('src');
		var p_deviceuuid = localStorage.getItem("deviceuuid");
		$.ajax({
			url:HOSTDOMAIN+"/index.php?act=add-hidrographic",
			type:'POST',
			data:{p_name:p_name,p_address:p_address,p_telephone:p_telephone,p_location:p_location,p_latitude:p_latitude,p_longitude:p_longitude,p_accuracy:p_accuracy,p_datum:p_datum,p_chart_affected:p_chart_affected,p_edition:p_edition,p_encs_affected:p_encs_affected,p_lastnm_used:p_lastnm_used,p_other_public_affected:p_other_public_affected,p_detail:p_detail,p_photo:p_photo,p_deviceuuid:p_deviceuuid},
			dataType:'json',
			success:function(datax){
				goHome();
				if(datax.data && datax.error <= 0){
					navigator.notification.alert(datax.message.join("\r\n"), function(){
					}, "", "OK");
				}else{
					navigator.notification.alert(datax.message.join("\r\n"), function(){
					
					}, "", "OK");
				}
			},
			error:function(data){
				navigator.notification.alert("Error Connection", function(){
				
				}, "", "OK");
			}
		});
	});
  });