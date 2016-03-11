ImportJS.pack('vine.climber', function(module)
{
	var climberbase 		= this.import('vine.climberbase');
	var flower 				= this.import('vine.flower');
	var point				= this.import('utils.point');
	var utils 				= this.import('utils.utils');
	var circularQueue 		= this.import('utils.circularQueue');
	var ctx 				= this.import('vine.sketch');

	function climber(params,seed)
	{
		climberbase.call(this,params);

		if(params.container == null)
		{
			this._container = $('<div id="vinecontainer"></div>');
			$('body').append(this._container);
			this._container.css({"height":"100%","width":"100%","position":"fixed","top":"0px","left":"0px","z-index":"2","pointer-events":"none"});
		}
		else
		{
			this._container = params.container;
		}
		
		this._ctx.updates(this, this._grow);
		this._ctx.draws(this, this._draw);
		
		this._time 				= params.time;
		this._left 				= params.left;
		this._top	 			= params.top;
		this._height 			= params.height;
		this._width 			= params.width;
		this._branchChance 		= params.branchChance;
		this._flower 			= params.flower;
		this._rotDepth 			= params.rotDepth;
		this._numRotsPerSide 	= params.numRotsPerSide;
		this._bark 				= params.bark;
		this._girth 			= params.girth;
		this._startCorner 		= params.startCorner;
		this._initialDirection 	= params.direction;
		ctx.autoPause	 		= params.autoPause;
		this._sides 			= new circularQueue();
		this._side 				= { 'TL':0, 'TR':1, 'BR':2, 'BL':3 };
		this._sides.push(new point(this._left, this._top)); //TL
		this._sides.push(new point(this._left + this._width, this._top)); //TR
		this._sides.push(new point(this._left + this._width, this._top + this.height)); //BR
		this._sides.push(new point(this._left, this._top + this._height)); //BL
		
		this._sides.index = this._side[this._startCorner];
		this._sides.reverse = (this._direction === 'CW') ? false : true;
		
		if(params.autoStart)
		{
			
		}
	}
	
	climber.prototype = Object.create( climberbase.prototype );
	climber.prototype.constructor = climber; 
	
	module.exports = climber;
});
