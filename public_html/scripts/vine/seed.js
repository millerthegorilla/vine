ImportJS.pack('vine.seed', function(module) 
{
	var climber = this.import('vine.climber');
	var branch = this.import('vine.branch');
	var garden = this.import('vine.garden');
	var flower = this.import('vine.flower');
	
	var branches = [];
	var flowers = [];
	var seed = function(params)
	{
		this._garden		= new garden({autostart:params.autostart,autoclear:false,autopause:params.autopause});
		params.garden		= this._garden;
		params.seed 		= this;
		var vine 			= new climber(params);	
		this._garden.globalCompositeOperation = 'difference || hard-light';
		
		Object.defineProperty(this, 
							  "running", 
							  {
								get: function() { return garden.running; },
								set: function(val) { (val === true) ? garden.start() : garden.stop(); }
							  });
	};
	
	seed.prototype.growBranch = function(params)
	{
		params.garden = this._garden;
		params.seed = this;
		branches.push(new branch(params));
	};
	
	seed.prototype.growFlower = function(params)
	{
		flowers.push(new flower(params.x, params.y, this._garden));
	};
	
	module.exports = seed;
});
