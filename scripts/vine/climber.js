ImportJS.pack('vine.climber', function(module)
{
	var climberbase 		= this.import('vine.climberbase');
	var flower 				= this.import('vine.flower');
	var garden				= this.import('vine.garden');
	var point				= this.import('utils.point');
	var utils 				= this.import('utils.utils');
	var circularQueue 		= this.import('utils.circularQueue');

	function climber(params)
	{
		climberbase.call(this, params);

		this._time 				= params.time;
		this._left 				= params.left;
		this._top	 			= params.top;
		this._height 			= params.height;
		this._width 			= params.width;
		this._branchChance 		= params.branchChance;
		this._flower 			= params.flower;
		this._curveDepth 		= params.curveDepth;
		this._numCurvesPerSide 	= params.numCurvesPerSide;
		this._bark 				= params.bark;
		this._girth 			= params.girth;
		this._startCorner 		= params.startCorner;
		this._initialDirection 	= params.direction;
		this._numOfSides		= params.numOfSides;
		this._garden			= params.garden;
		this._corner 			= { 'TL':0, 'TR':1, 'BR':2, 'BL':3 };
		this._currentSide		= 1;
		this._corners.push(new point(this._left, this._top)); //TL
		this._corners.push(new point(this._left + this._width, this._top)); //TR
		this._corners.push(new point(this._left + this._width, this._top + this._height)); //BR
		this._corners.push(new point(this._left, this._top + this._height)); //BL
		this._corners.index = this._corner[this._startCorner];
		this._corners.reverse = (this._direction === 'CW') ? false : true;
		this._currentPoint = this._corners[this._corners.index].clone(); 
		this._timePerSide = Math.floor(this._time / this._numOfSides);
		this._bounds = Matter.Bounds.create(this._left, this._top, this._width, this._height);
		this._garden.updates(this, this._grow);
		this._garden.draws(this, this._draw);
		this._done = this.finish;
		if(this._direction === 'CW')
		{
			this._corners[0].func = this._curveXFunc;
			this._corners[2].func = this._curveXFunc;
			this._corners[1].func = this._curveYFunc;
			this._corners[3].func = this._curveYFunc;
		}
		else
		{
			this._corners[0].func = this._curveYFunc;
			this._corners[2].func = this._curveYFunc;
			this._corners[1].func = this._curveXFunc;
			this._corners[3].func = this._curveXFunc;
		}
		//this._startTime = this._garden.millis;
		this._drawFunction = this._corners.current.func;

		this._distPerSide = this._corners[this._corners.nextIndex].distanceFrom(this._corners[this._corners.index]);
		//return(params.autoStart && this._garden.start(), this);
	}
	
	climber.prototype.finish = function()
	{
		this._seed.drawFlower();
		if(this._currentSide <= this.numOfSides)
		{
			this._currentPoint = this._corners.next.clone();
			this._drawFunction = this._corners.current.func;
			this._distPerSide = this._corners[this._corners.nextIndex].distanceFrom(this._corners[this._corners.index]);
			this._currentSide += 1;
			this._counter = 0;
		}
		else
		{
			this._garden.stop();
		}
	};
	
	climber.prototype = Object.create( climberbase.prototype );
	climber.prototype.constructor = climber; 
	
	module.exports = climber;
});
