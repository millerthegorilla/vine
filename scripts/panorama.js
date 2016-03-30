$(function() 
{
	$.fn.animatecss = function(anim, time, cb) 
	{

		if (time) this.css('-webkit-transition', time / 1000 + 's');

		this.addClass(anim);

		if ($.isFunction(cb)) {

			setTimeout(function() {

				// Ensure that the element is available inside the callback.
				$(this).each(cb);

			}, (time) ? time : 250);

		}

		return this;
	};


	var cycleImages = function()
	{
		var $active = $('#panorama .active');
		var $next = ($active.next().length > 0) ? $active.next() : $('#panorama img:first');
		$next.css('z-index',2);//move the next image up the pile
		$active.animatecss('blur-out',250, function(){//});
		//$active.fadeOut(1500,function()
		//{//fade out the top image
			$active.css('z-index',1).show().removeClass('active');//reset the z-index and unhide the image
			$next.css('z-index',3).addClass('active');//make the next image the top one
		});
    }
	setInterval(cycleImages, 7000);
})
