ImportJS.pack('vine.climber', function(module)
{
	var climberbase = this.import('vine.climberbase');
	var flower = this.import('vine.flower');
	var point = this.import('utils.point');
	var utils = this.import('utils.utils');
	var branch = this.import('vine.branch');
	
	function climber(params)
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
		this._ctx = Sketch.create({autostart:false,autoclear:false,autopause:true,container:this._container[0]});
		this._ctx.update_funcs = [];
		this._ctx.draw_funcs = [];
		this._ctx.draws = function(scope, func) { this.draw_funcs.push([scope,func]); };		
		this._ctx.updates = function(scope, func) { 
			this.update_funcs.push([scope,func]); 
			};
		this._ctx.update = function () 
		{
			for(var i=0; i<this.update_funcs.length; i++)
			{
				this.update_funcs[i][1].call(this.update_funcs[i][0]);
			}
		}
		this._ctx.draw = function () 
		{
			for(var i=0; i<this.draw_funcs.length; i++)
			{
				this.draw_funcs[i][1].call(this.draw_funcs[i][0]);
			}
		}
		this._ctx.remove = function()
		{
			var flat = [].concat.apply([], this._ctx.update_funcs);
			var col = flat.indexOf(this) / 2;
			this._ctx.update_funcs.splice(col,1);
			flat = [].concat.apply([], this._ctx.draw_funcs);
			col = flat.indexOf(this) / 2;
			this._ctx.draw_funcs.splice(col,1);
		}
		this._ctx.globalCompositeOperation = 'difference || hard-light';
		this._ctx.updates(this, this._grow);
		this._ctx.draws(this, this._draw);

		this._flower = null;
		this._branchChance = params.branchChance;
		this._branchDepth = 0;
		this._outline = 1;
		this._w = 6;
		this._finX = 0;
		this._finY = params.height;
		this._time = params.time;
		this._depth = 9;
		this._currentPoint = new point(params.startX, params.startY);
		this._numOfRots = 3;
		this._hasBranches = true;
		this._func =  this._rotXFunc;
		this._doneFunc = this._drawTop;
		this._tInc = 1;
		this._tid = null;
		this._branches = null;
		this._width = params.width;
		this._timeSide = params.height * (this._tMax / params.height + params.width);
		this._timeTop = params.width * (this._tMax / params.height + params.width);
		this._startX = params.startX;
		this._startY = params.startY;
		this._height = params.height;
		this._branches = [];
		this._drawCurve();
	}
	
	climber.prototype = Object.create( climberbase.prototype );
	climber.prototype.constructor = climber; 
	
	climber.prototype._drawCurve = function() 
	{
		this._xx = this._currentPoint.x;
		this._yy = this._currentPoint.y;
		this._tMax = this._timeSide;
		this._t = 0;
		this._curveRadiusX = 20;
		this._curveRadiusY = 20;
		this._func = this._rotXFunc.bind(this);
		this._tInc = 1;
		this._ctx.start();
	};
	
	climber.prototype._drawTop = function() 
	{
		new flower(this._currentPoint.x, this._currentPoint.y, this._ctx);
		this._tInc = 1;
		this._xx = this._currentPoint.x;
		this._yy = this._currentPoint.y;
		this._finX = -(this._width);
		this._finY = 0;
		this._t = 0;
		this._w = 4;
		this._tMax = this._timeTop;
		this._func = this._rotYFunc.bind(this);
		this._doneFunc = function () { this._climbing = false; this._drawFlower.bind(this)() };
	};

	module.exports = climber;
});
