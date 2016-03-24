ImportJS.pack('vine.climberbase', function(module) 
{
	var point 			= this.import('utils.point');
	var utils 			= this.import('utils.utils');
	var circularQueue	= this.import('utils.circularQueue');
	var garden	 		= this.import('vine.garden');
	var flower			= this.import('vine.flower');
	
	function climberbase(params)
	{
		this._seed			= params.seed;
		this._corners		= new circularQueue();
		this._drawFunction 	= null;
		this._distPerSide	= null;
		this._timePerSide	= null;
		this._startTime 	= null;
		this._done			= null;
		this._counter		= 0;
		this._numCurvesPerSide = null;
		this._curveDepth	= null;
		this._toPoint = new point(0,0);
		Math.degrees = function(rad)
		{
			return rad*(180/Math.PI);
		}
	 
		Math.radians = function(deg)
		{
			return deg * (Math.PI/180);
		}

	};
		
	climberbase.prototype._rot = function() 
	{	/*
		* curve travels through 180 degrees with the zenith at 90 degrees
		* for the purpose of Math.sin
		*/
		
		var distancePerCurve = (this._distPerSide / this._numCurvesPerSide);
		var rotationPerCurve = 90;
		var tick = this._counter % distancePerCurve;
		var distanceAtCurveExtreme = distancePerCurve / 2;
		var degreesPerTick = 180 / distancePerCurve;
		var distancePerTick = degreesPerTick * tick;
		//here = here * Math.PI / 180;
		//console.log(here);
		//here = Math.sin(here); 
		return Math.sin(distancePerTick);
	};
	
	climberbase.prototype._rotY =  function()
	{
		return this._garden.millis - this._startTime * (this._height / this._timePerSide) + Math.sin(t * (this._numOfRots / this._tMax) * Math.PI) * this._depth + this._yy;
	};
	
	climberbase.prototype._normX =  function()
	{
		return (this._garden.millis - this._startTime * (this._finX / this._timePerSide) + this._xx);
	};
	
	climberbase.prototype._normY =  function()
	{
		return (this._garden.millis - this._startTime * (this._finY / this._timePerSide) + this._yy);
	};
	
	climberbase.prototype._curveXL =  function() 
	{
		return (this._curveRadiusX * Math.cos(this._garden.millis - this._startTime) + (this._xx - this._curveRadiusX));
	};
	
	climberbase.prototype._curveXR =  function() 
	{
		return (this._curveRadiusX * Math.cos(this._garden.millis - this._startTime) - (this._xx + this._curveRadiusX));
	};
	
	climberbase.prototype._curveYU =  function() 
	{
		return (this._curveRadiusY * Math.sin(this._garden.millis - this._startTime) + this._yy);
	};
	
	climberbase.prototype._curveYD =  function() 
	{
		return (this._curveRadiusY * Math.sin(this._garden.millis - this._startTime) + this._yy);
	};

	climberbase.prototype._curveYFunc =  function() 
	{
		
		var distancePerCurve = (this._distPerSide / this._numCurvesPerSide);
		var rotationPerCurve = 180;
		var tick = Math.floor(this._counter / distancePerCurve) * distancePerCurve + (this._counter % distancePerCurve);
		var distanceAtCurveExtreme = distancePerCurve / 2;
		var degreesPerTick = rotationPerCurve / distancePerCurve;
		var distancePerTick = degreesPerTick * tick;
		this._counter++;
		//return tick * (this._distPerSide / this._tMax) + Math.sin(t * (this._numOfRots / this._tMax) * Math.PI) * this._d + this._xx;
		//here = here * Math.PI / 180;
		//console.log(here);
		//here = Math.sin(here); 
		return new point((this._corners[this._corners.index].x + (Math.sin(Math.radians(degreesPerTick * tick)) * this._curveDepth)),
						this._corners[this._corners.index].y - tick);
		//var d = this._corners[this._corners.nextIndex].y - this._corners[this._corners.index].y;
		//console.log(d);
		//this._counter++;
		//return new point(this._corners[this._corners.index].x + this._rot(),
			//			this._corners[this._corners.index].y - this._counter);
 		//console.log(this._garden.dt);
		//return new point(this._corners[this._corners.index].x + this._rot(), 
			//			(this._counter / d) * d);
							//this._currentPoint.y - 20);//Math.round((this._garden.millis / this._timePerSide) * this._distPerSide));								
					/*((this._corners[this._corners.nextIndex].y -  
								)) * 
								(this._timePerSide / this._garden.millis % this._timePerSide)));*/
	};
	
	climberbase.prototype._curveXFunc =  function() 
	{
		var d = this._corners[this._corners.nextIndex].x - this._corners[this._corners.index].x;
		return new point(this._corners[this._corners.index].y + this._rot(), 
						(this._garden.millis / d) * d);
		//return new point(Math.round((this._corners[this._corners.nextIndex].y - this._corners[this._corners.index].y) * (this._timePerSide / this._garden.millis % this._timePerSide)), this._currentPoint.y + this._rot());
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
		if(!this._garden.running) { this._garden.start(); };
		if (this._garden.millis > this._stemLength && this._branchChance && utils.randomi(0,100) < this._branchChance)
		{
			this._seed.growBranch({currentPoint:this._currentPoint, girth:this._girth});	
		}
	
		if (this._toPoint.y >= this._distPerSide + this._corners[this._corners.index].y) 
		{
			this._done();
		}
		else
		{
			this._toPoint = this._drawFunction.bind(this)();
		}
	};
	
	climberbase.prototype._draw =  function() 
	{
		console.log(this._toPoint.x + " " + this._toPoint.y);
		this._garden.save();
		this._garden.beginPath();
		this._garden.lineWidth = this._w + this._outline;
		this._garden.strokeStyle = '#000000';
		this._garden.moveTo(this._currentPoint.x, this._currentPoint.y);
		this._garden.lineTo(this._toPoint.x, this._toPoint.y);
		this._garden.stroke();
		this._garden.beginPath();
		this._garden.strokeStyle = '#655412';
		this._garden.lineWidth = this._w;
		this._garden.moveTo(this._currentPoint.x, this._currentPoint.y);
		this._garden.lineTo(this._toPoint.x, this._toPoint.y);
		this._garden.stroke();
		this._garden.restore();
		delete this._currentPoint;
		this._currentPoint = this._toPoint.clone();
	};
	
	climberbase.prototype.finish = function() {};
	
	climberbase.prototype._drawFlower = function() 
	{
		this._seed.growFlower;
		this._garden.remove.bind(this)();
	};
	
	module.exports = climberbase;
});
