//Get JSON for Home Page from home.json
$(document).ready(function() {

  
  // $( "#datepicker" ).click(datepicker(););
  
	var $title = $('.title');
	var $homeMeta = $('.home-meta');
	var $homeKeywords = $('.home-keywords');
	var $facebook = $('.facebook');
	var $twitter = $('.twitter');
	var $instagram = $('.instagram');
	var $rooms = $('.rooms-main');
	var $homeCenter = $('.home-center-text');
	if(document.URL.indexOf("home.html") >= 0){ 

		$.getJSON("./json/home.json")
		  .done(function( data ) {

		    // ******* HEAD *********  //
		    $title.html(data.PAGETITLE);
		    $homeMeta.prop('content', data.META_DESCRIPTION);
		    $homeKeywords.prop('content', data.META_KEYWORDS);

		    // ******* BODY ********* //
		    $('html').css("background-image" , "url(" + data.SLIDES[0]["IMAGE"] + ")");
		    $homeCenter.html(data.SLIDES[0]["H1"]);
		    // ******* Footer ******** //
		    $facebook.prop('href', data.SOCIAL_ICON1);
		    $twitter.prop('href', data.SOCIAL_ICON2);
		  	$instagram.prop('href', data.SOCIAL_ICON3);

		  })
		  .fail(function( jqxhr, textStatus, error ) {
		    var err = textStatus + ", " + error;
		    console.log( "Request Failed: " + err );

		});
    }
    // if(document.URL.indexOf("rooms/classic-salle-king.html") >= 0)
	$rooms.click(function(){
		event.preventDefault();
		$.getJSON("./json/details.json")
	  		.done(function( json ) {
          $('#home-page').addClass('hidden');
          $('#rooms-page').removeClass('hidden');
				$('html').css("background-image" , "url(" + json.SLIDES[0]["IMAGE"] + ")");
				$url = json.PATH,
	  			$title.html(json.PAGETITLE);
	  			$('.details-box-text').html(json.BLURB1);
          $('.details-header').html(json.H1);
          if(json.BUTTONLINK1 != '') {
            $('.details-button-text').html(json.BUTTONTEXT1 + ' >');
            $('.details-button-link').prop('href', json.BUTTONLINK1);
          } 


						})

			.fail(function( jqxhr, textStatus, error ) {
			    var err = textStatus + ", " + error;
			    console.log( "Request Failed: " + err );

			});
	});

// **End of doc.ready function**
});