ImportJS.pack('utils.point',function(module,exports) 
{
	var utils = this.import('utils.utils');
	
	var point = function(x, y)
	{    
		this.x = utils.defaultValue(x, 0);
		this.y = utils.defaultValue(y, 0);
	}
    
    point.prototype.distance = function(p1, p2) 
	{
		return Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2));
	}

	point.prototype.clone = function() 
	{
		var point = new point(this.x, this.y);
		return point;
	}	
		
	point.prototype.equals = function(point) 
	{
		return (point.x == this.x && point.y == this.y);
	}
 
	module.exports = point;
});
