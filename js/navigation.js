$(document).ready(function(){
	$('.hamburger').click(function(){
		$.getJSON("./json/navigation.json")
		.done(function(json){
			var $j = json['NAVIGATION'];
			$('.about').html($j[0]['LINKTITLE']);
			$('.about').prop('href', $j[0]['PATH']);
			$('.rooms').html($j[1]['LINKTITLE']);
			$('.rooms').prop('href', $j[1]['PATH']);
			$('.events').html($j[2]['LINKTITLE']);
			$('.events').prop('href', $j[2]['PATH']);
			$('.hood').html($j[3]['LINKTITLE']);
			$('.hood').prop('href', $j[3]['PATH']);
			$('.blog').html($j[4]['LINKTITLE']);
			$('.blog').prop('href', $j[4]['PATH']);
			$('.careers').html($j[5]['LINKTITLE']);
			$('.careers').prop('href', $j[5]['PATH']);
			$('.page-overlay').addClass('open');
			$('.mobile-nav').addClass('open');
			$('body').click(function(){
				$('.page-overlay').removeClass('open');
				$('.mobile-nav').removeClass('open');
				$('.about').html('');
				$('.rooms').html('');
				$('.events').html('');
				$('.hood').html('');
				$('.blog').html('');

			});
		})
	});
});

