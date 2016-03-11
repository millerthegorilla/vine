ImportJS.pack('vine.climberbase', function(module) 
{
	var point = this.import('utils.point');
	var utils = this.import('utils.utils');

	function climberbase(params)
	{    

	};
		
	climberbase.prototype._rotX = function(t) 
	{
		//console.log(this._finX + " " + this._tMax + " " + (this._finX / this._tMax));
		//Math.sin(this._numOfRots
		return (Math.sin(((this._numOfRots * 180)/*total num of degrees*/
							* (this._tMax / t))/* multiplied by ratio of time approximating to 1 */
							 % 360) /*expressed as modulo of 360 and sined to give value between -1 and 1 */
							 * this._depth); /*multiplied by the amplitude*/ 
		//return t * (this._tMax / this._height) + Math.sin(t * (this._numOfRots / this._tMax) * Math.PI) * this._depth + this._xx;
	};
	
	climberbase.prototype._rotY =  function(t) 
	{
		return t * (this._height / this._tMax) + Math.sin(t * (this._numOfRots / this._tMax) * Math.PI) * this._depth + this._yy;
	};
	
	climberbase.prototype._normX =  function(t) 
	{
		return (t * (this._finX / this._tMax) + this._xx);
	};
	
	climberbase.prototype._normY =  function(t) 
	{
		return (t * (this._finY / this._tMax) + this._yy);
	};
	
	climberbase.prototype._curveXL =  function(t) 
	{
		return (this._curveRadiusX * Math.cos(t) + (this._xx - this._curveRadiusX));
	};
	
	climberbase.prototype._curveXR =  function(t) 
	{
		return (this._curveRadiusX * Math.cos(t) - (this._xx + this._curveRadiusX));
	};
	
	climberbase.prototype._curveY =  function(t) 
	{
		return (this._curveRadiusY * Math.sin(t) + this._yy);
	};
	
	climberbase.prototype._rotXFunc =  function(t) 
	{
		//return new point(this._rotX(t), this._yy + (this._yy - this._normY(t)));
		return new point(this._startX + this._rotX(t), this._startY - (this._height / (this._height * (this._tMax / t))));
	};
	
	climberbase.prototype._rotYFunc =  function(t) 
	{
		return new point(this._normX(t), this._yy + (this._yy - this._rotY(t)));
	};
	
	climberbase.prototype._curveLeft =  function(t) 
	{
		return new point(this._curveXL(t), this._yy + (this._yy - this._curveY(t)));
	};
	
	climberbase.prototype._curveRight =  function(t) 
	{
		return new point(-this._curveXR(t), this._yy + (this._yy - this._curveY(t)));
	};
	
	climberbase.prototype._grow = function() 
	{	
		this._toPoint = this._func(this._t - 1 /*start at 0*/ );
		if (this._ctx.millis % this._timeSide <= this._tMax) 
		{
			this._ctx.remove.bind(this)();
			this._doneFunc.call(this);
		}
	};
	
	climberbase.prototype._draw =  function() 
	{

		console.log(toPoint.x + " " + toPoint.y);
		this._ctx.save();
		this._ctx.beginPath();
		this._ctx.lineWidth = this._w + this._outline;
		this._ctx.strokeStyle = '#000000';
		this._ctx.moveTo(this._currentPoint.x, this._currentPoint.y);
		this._ctx.lineTo(toPoint.x, toPoint.y);
		this._ctx.stroke();
		this._ctx.beginPath();
		this._ctx.strokeStyle = '#655412';
		this._ctx.lineWidth = this._w;
		this._ctx.moveTo(this._currentPoint.x, this._currentPoint.y);
		this._ctx.lineTo(toPoint.x, toPoint.y);
		this._ctx.stroke();
		this._ctx.restore();
		this._currentPoint = toPoint;
		if (this._hasBranches == true  && this._climbing == true) 
		{ 
			if (this._t > 5 && utils.randomi(0,100) < this._branchChance)
			{
				this._branches.push(new branch({x:toPoint.x,y:toPoint.y,w:this._w,context:this._ctx,branchdepth:this._branchDepth,time:this._tMax}));
			}
		}
	};
	
	climberbase.prototype._drawFlower = function() 
	{
		new flower(this._currentPoint.x,this._currentPoint.y, this._ctx);
		this._ctx.remove.bind(this)();
		//this._climbing = false;
	};
	module.exports = climberbase;
});
