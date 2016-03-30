ImportJS.pack('vine.branch', function(module) 
{
	var climberbase = this.import('vine.climberbase');
	var point = this.import('utils.point');
	var utils = this.import('utils.utils');

	function branch(params,seed)
	{
		climberbase.call(this,params);

		this._timeMax		= utils.randomi(500,2500)
		this._seed 			= seed;
		this._garden 		= params.garden;
		this._startTime 	= this._garden.millis;
		this._currentPoint	= params.currentPoint.clone();
		this._currentPoint	= this._startPoint.clone();
		this._girth 		= utils.randomi(1, params.w - 1);
		this._funcs			= [ _curveXFunc, 
								_curveYFunc, 
								_curveRight, 
								_curveLeft, 
								_curveXL, 
								_curveXR,
								_curveYU,
								_curveYD ];
		this._drawFunction	= this._funcs[utils.randomi(0,7)]; 
		this._curveRadiusX 	= utils.randomi(10,20);
		this._curveRadiusY 	= utils.randomi(10,20); 
		this._garden.updates(this, this._grow);
		this._garden.draws(this, this._draw);
	}
	
	branch.prototype = Object.create( climberbase.prototype );
	branch.prototype.constructor = branch;
	
	branch.prototype._finish = function ()
	{
		this._garden.stop();
		this._garden.remove.bind(this)();
		this._drawFlower();
	};

	console.log('exporting branch');
	module.exports = branch;
});
