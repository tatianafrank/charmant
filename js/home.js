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
	  			// getContent($url, true);
	  			// history.pushState(state, null, $url);
			    // Adding popstate event listener to handle browser back button  
			    // window.addEventListener("popstate", function(e) {
			         
			    //     // Get State value using e.state
			    //     getContent(location.pathname, false);
			    // });
			     
			   //  function getContent(url, addEntry) {
			   //      $.get(url)
			   //      .done(function( data ) {
			             
			   //          // Updating Content on Page
			   //          $('html').html(data);
			             
			   //          if(addEntry == true) {
			   //              // Add History Entry using pushState
			   //              history.pushState(null, null, url); 
			   //          }
			             
			   //      });

						})

			.fail(function( jqxhr, textStatus, error ) {
			    var err = textStatus + ", " + error;
			    console.log( "Request Failed: " + err );

			});
	});

$(function(){
  
  // For each .bbq widget, keep a data object containing a mapping of
  // url-to-container for caching purposes.
  $('.bbq').each(function(){
    $(this).data( 'bbq', {
      cache: {
        // If url is '' (no fragment), display this div's content.
        '': $(this).find('.bbq-default')
      }
    });
  });
  
  // For all links inside a .bbq widget, push the appropriate state onto the
  // history when clicked.
  $('.bbq a[href^=#]').live( 'click', function(e){
    var state = {},
      
      // Get the id of this .bbq widget.
      id = $(this).closest( '.bbq' ).attr( 'id' ),
      
      // Get the url from the link's href attribute, stripping any leading #.
      url = $(this).attr( 'href' ).replace( /^#/, '' );
    
    // Set the state!
    state[ id ] = url;
    $.bbq.pushState( state );
    
    // And finally, prevent the default link click behavior by returning false.
    return false;
  });
  
  // Bind an event to window.onhashchange that, when the history state changes,
  // iterates over all .bbq widgets, getting their appropriate url from the
  // current state. If that .bbq widget's url has changed, display either our
  // cached content or fetch new content to be displayed.
  $(window).bind( 'hashchange', function(e) {
    
    // Iterate over all .bbq widgets.
    $('.bbq').each(function(){
      var that = $(this),
        
        // Get the stored data for this .bbq widget.
        data = that.data( 'bbq' ),
        
        // Get the url for this .bbq widget from the hash, based on the
        // appropriate id property. In jQuery 1.4, you should use e.getState()
        // instead of $.bbq.getState().
        url = $.bbq.getState( that.attr( 'id' ) ) || '';
      
      // If the url hasn't changed, do nothing and skip to the next .bbq widget.
      if ( data.url === url ) { return; }
      
      // Store the url for the next time around.
      data.url = url;
      
      // Remove .bbq-current class from any previously "current" link(s).
      that.find( 'a.bbq-current' ).removeClass( 'bbq-current' );
      
      // Hide any visible ajax content.
      that.find( '.bbq-content' ).children( ':visible' ).hide();
      
      // Add .bbq-current class to "current" nav link(s), only if url isn't empty.
      url && that.find( 'a[href="#' + url + '"]' ).addClass( 'bbq-current' );
      
      if ( data.cache[ url ] ) {
        // Since the widget is already in the cache, it doesn't need to be
        // created, so instead of creating it again, let's just show it!
        data.cache[ url ].show();
        
      } else {
        // Show "loading" content while AJAX content loads.
        that.find( '.bbq-loading' ).show();
        
        // Create container for this url's content and store a reference to it in
        // the cache.
        data.cache[ url ] = $( '<div class="bbq-item"/>' )
          
          // Append the content container to the parent container.
          .appendTo( that.find( '.bbq-content' ) )
          
          // Load external content via AJAX. Note that in order to keep this
          // example streamlined, only the content in .infobox is shown. You'll
          // want to change this based on your needs.
          .load( url, function(){
            // Content loaded, hide "loading" content.
            that.find( '.bbq-loading' ).hide();
          });
      }
    });
  })
  
  // Since the event is only triggered when the hash changes, we need to trigger
  // the event now, to handle the hash the page may have loaded with.
  $(window).trigger( 'hashchange' );
  
});

	

// $( ".rooms" ).addEventListener("click", function() {
//   alert( "Handler for .click() called." );
// });

// **End of doc.ready function**
});