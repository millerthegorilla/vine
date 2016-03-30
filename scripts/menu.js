$(function() {

	$('li').on('mouseenter', function () 
	{
		$(this).find('ul').first().hide().show('slide', 
		{
			direction: "left", easing:"easeInOutQuart" 
		}, 2000);

	}).on('mouseleave', function () 
						{
							$(this).find('ul').first().hide('slide', 
															{
																direction: "left", easing:"easeInOutQuart"
															}, 
															1000);
						});
		
	$('#page').on('mouseenter', function () 
								{
									$('#page').css({'z-index':'3'});
								}).on('mouseleave', function () 
													{
														$('#page').css({'z-index':'1'});
													});
		
	$('a').click(function (event) 
	{
			event.preventDefault();
			var pageid = $(this).attr('href').replace(/^#/, '');
			if(pageid != undefined && pageid != $.address.path())
			{
				$('#page').hide('slide', { direction: "left", easing: "easeInBack"}, 2000, function() {
					urlLoad(pageid);
					$('#page').show('slide', {direction: "right", easing: "easeOutBounce" }, 2000);
				});
			}
	});
		
	$.address.init(function(event) 
	{
		//$.address.crawlable(true);
		urlLoad("home.html");
		$.address.change(function(event) { console.log(this + " value : " + event.value +
													   "path : " + event.path )});
	});

	function urlLoad(pageid) {
		console.log (pageid);
			$.address.path(pageid);
			//$.address.attr('href').replace(/^#/, '');
			$.ajax({
	//put a call to a php file that checks for admin timeout and returns html using echo after read_file()
				url:'/pages/' + pageid,
				data: { swfaddress : pageid  },
				dataType: "html",
				success: function(data) {
					$('#page').html(data);
					var bob = $('.pagetitle').text();
					$("#title").html('<h1>' + $('#page').find('.pagetitle').text() + '</h1>');
					
					$.address.title($('#page').find('.pagetitle').text());				
				}
			});
		};
});
