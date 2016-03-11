ImportJS.pack('vine.branch', function(module) 
{
	var climberbase = this.import('vine.climberbase');
	var point = this.import('utils.point');
	var utils = this.import('utils.utils');

	function branch(params)
	{
		climberbase.call(this,params);
		this._branchDepth = 0;
		this._branchChance = 90;
		this._outline = .1;
		this._hasBranches = false;
		this._t = 0;
		this._depth = 3;
		this._numOfRots = 3;
		this._tMax = params.time;
		this._doneFunc = null;
		this._x = params.x;
		this._y = params.y;
		this._currentPoint = new point(this._x, this._y);
		this._w = utils.random(1, params.w - 1);
		this._branchdepth = params.branchdepth + 1;
		this._branches = [];
		this._drawCurve();
		this._ctx = params.context;
		this._ctx.updates(this, this._grow);
		this._ctx.draws(this, this._draw);
	}
	
	branch.prototype = Object.create( climberbase.prototype );
	branch.prototype.constructor = branch;
	
	branch.prototype._drawCurve = function ()
	{
		this._xx = this._currentPoint.x;
		this._yy = this._currentPoint.y;
		this._t = 0;		
		this._finX = utils.randomi(20,40);
		this._finY = utils.randomi(20,40);
		
		switch (utils.randomi(0,3)) 
		{
			case 0:
			  this._func = this._rotXFunc;
			  this._tInc = 1;
			  break;
			case 1:
			  this._func = this._rotYFunc;
			  this._tInc = 1;
			  this._finX = -(this._finX);
			  this._finY = -(this._finY);
			  break;
			case 2:
			  this._func = this._curveLeft;
			  this._tMax = Math.PI * utils.random(.4,.6);
			  this._finX = -(this._finX);
			  this._finY = -(this._finY);
			  break;
			case 3:
			  this._func = this._curveRight;
			  this._tMax = Math.PI * utils.random(.4,.6);
			  break;
			default:
			  break;
		}
		if (this._func == this._curveRight || this._func == this._curveLeft) 
		{
			this._tInc = 0.1;
			this._curveRadiusX = utils.randomi(10,20);
			this._curveRadiusY = utils.randomi(10,20);
		}
		this._doneFunc = this._drawFlower;
	};

	console.log('exporting branch');
	module.exports = branch;
});
