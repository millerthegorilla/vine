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
		params.seed 		= this;
		var vine 			= new climber(params);		
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
