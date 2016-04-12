var bannerAdUnit = "ca-app-pub-3096329003114803/4364957374";
var interstitialAdUnit = "ca-app-pub-4906074177432504/1649035673";
var isOverlap = true; //true: overlap, false: split
var isTest = false;


document.addEventListener("deviceready", function(){
	window.admob.setUp(bannerAdUnit, interstitialAdUnit, isOverlap, isTest);
	//
	window.admob.onBannerAdPreloaded = function() {
		/*alert('onBannerAdPreloaded');*/
	};
	window.admob.onBannerAdLoaded = function() {
		/*alert('onBannerAdLoaded');*/
	};
	window.admob.onBannerAdShown = function() {
		/*alert('onBannerAdShown');*/
	};
	window.admob.onBannerAdHidden = function() {
		/*alert('onBannerAdHidden');*/
	};	
	//
	window.admob.onInterstitialAdPreloaded = function() {
		alert('onInterstitialAdPreloaded');
	};
	window.admob.onInterstitialAdLoaded = function() {
		alert('onInterstitialAdLoaded');
	};
	window.admob.onInterstitialAdShown = function() {
		alert('onInterstitialAdShown');
	};
	window.admob.onInterstitialAdHidden = function() {
		alert('onInterstitialAdHidden');
	};
	
	window.admob.showBannerAd('bottom-center', 'SMART_BANNER');
	
}, false);


$(document).ready( function() {
	$.support.cors                 = true;
    $.mobile.allowCrossDomainPages = true;
    $.mobile.pushStateEnabled      = false;
		
	$.ajax({
		type: "GET",
		url: "http://92.222.33.109/ofiouco/incidencias.xml",
		dataType: "xml",
		success: parseXmlINC
	});
	
	$.ajax({
		type: "GET",
		url: "http://92.222.33.109/ofiouco/localidad_27030.xml",
		dataType: "xml",
		success: parseXmlMET
	});
	
	var mySwiper = new Swiper ('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true
    }) 

});


function parseXmlINC(xml)
{
  var count=0;
  var countlugo=0;
  $("#incidencias").append("<ul>");	

  $(xml).find("raiz").each(function(){
	var fechahora = $(this).attr("fecha_hora");
	$("#incidencias").append("<center><strong>"+fechahora+"</center></strong>");  
  });
  
  $(xml).find("incidencia").each(function()
  {
	var carretera = $(this).find("carretera").text();
	var autonomia = $(this).find("autonomia").text();
	
	if(carretera == " A-8 " && autonomia == " GALICIA ")
	{
		$("#incidencias").append("<li>Tipo: "+$(this).find("tipo").text()+"</li>");
		$("#incidencias").append("<li>Causa: "+$(this).find("causa").text()+"</li>");
		$("#incidencias").append("<li>Nivel de alerta: "+$(this).find("nivel").text()+"</li>");
		$("#incidencias").append("<li>Tramo afectado: "+$(this).find("pk_inicial").text()+"-"+$(this).find("pk_final").text()+"</li>");
		countlugo++;
	}
	count++;

  });  
  $("#incidencias").append("</ul>");	
  $("#incidencias").append("<div><p>"+countlugo+" incidencias en la A-8 en Lugo.</p>");
  $("#incidencias").append("<p>"+count+" incidencias analizadas en total.</p></div>");
}

function parseXmlMET(xml)
{
  $(xml).find("root").each(function()
  {
	var productor = $(this).find("productor").text();
	var municipio = $(this).find("nombre").text();
	
	$("#meteo").append("<span style='font-size:10px;'>"+productor+"</span><br>");
	$("#meteo").append("Población: "+municipio+" / ");
	$("#meteo").append($(this).find("provincia").text()+"<br><br>");
	
	
	$(xml).find("dia").each(function()
	{
		var fecha = $(this).attr("fecha");
		$("#meteo").append("<strong>"+fecha+"</strong>");
		$("#meteo").append("<br><br>");
		

		$("#meteo").append("Probabilidad de precipitación<br>");		
		$(this).find("prob_precipitacion").each(function()
		{
			var periodo = $(this).attr("periodo");				
			$("#meteo").append("<div style='float:left;width:14%;background:#D8D8D8;'>"+periodo+"<br>"+$(this).text()+"</div>");
			
		});
		$("#meteo").append("<br><br><br>");
		$("#meteo").append("Cota de nieve<br>");
		$(this).find("cota_nieve_prov").each(function()
		{
			var periodo = $(this).attr("periodo");				
			$("#meteo").append("<div style='float:left;width:14%;background:#D8D8D8;'>"+periodo+"<br>"+$(this).text()+"</div>");
			
		});
		$("#meteo").append("<br><br>");
		$("#meteo").append("Estado del cielo<br>");
		$(this).find("estado_cielo").each(function()
		{
			var periodo = $(this).attr("periodo");				
			var descripcion = $(this).attr("descripcion");				
			if(descripcion == "Poco nuboso")
			{
				descripcion = "<img src='images/tiempo/Poco_nuboso.png' width='25'>";
			}
			if(descripcion == "Nubes altas")
			{
				descripcion = "<img src='images/tiempo/Nubes_altas.png' width='25'>";
			}
			if(descripcion == "Muy nuboso")
			{
				descripcion = "<img src='images/tiempo/Muy_nuboso.png' width='25'>";
			}
			if(descripcion == "Nuboso")
			{
				descripcion = "<img src='images/tiempo/Nuboso.png' width='25'>";
			}
			if(descripcion == "Muy nuboso con lluvia escasa")
			{
				descripcion = "<img src='images/tiempo/muy_nuboso_con_lluvia_escasa.png' width='25'>";
			}
			if(descripcion == "Muy nuboso con lluvia")
			{
				descripcion = "<img src='images/tiempo/muy_nuboso_con_lluvia.png' width='25'>";
			}			
			if(descripcion == "Cubierto con lluvia")
			{
				descripcion = "<img src='images/tiempo/cubierto_con_lluvia.png' width='25'>";
			}	
			if(descripcion == "Intervalos nubosos con lluvia")
			{
				descripcion = "<img src='images/tiempo/intervalos_nubosos_con_lluvia.png' width='25'>";
			}
			if(descripcion == "Cubierto con lluvia escasa")
			{
				descripcion = "<img src='images/tiempo/cubierto_con_lluvia_escasa.png' width='25'>";
			}
			if(descripcion == "Intervalos nubosos con lluvia escasa")
			{
				descripcion = "<img src='images/tiempo/Intervalos_nubosos_con_lluvia_escasa.png' width='25'>";
			}				
			//$("#meteo").append(periodo+":"+$(this).text()+"/"+descripcion);
			$("#meteo").append("<div style='float:left;width:14%;background:#D8D8D8;'>"+periodo+"<br>"+descripcion+"</div>");
			
		});
		$("#meteo").append("<br><br><br><br>");
		$("#meteo").append("Viento<br>");
		$(this).find("viento").each(function()
		{
			var periodo = $(this).attr("periodo");								
			$("#meteo").append("<div style='float:left;width:14%;background:#D8D8D8;'>"+periodo+"<br>"+$(this).text()+"</div>");
			
		});
		$("#meteo").append("<br><br><br><br>");
		return false;

	});
	

	
  });
}