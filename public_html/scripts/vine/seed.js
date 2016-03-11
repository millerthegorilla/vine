ImportJS.pack('vine.seed', function() {
	var climber = this.import('vine.climber');
	var branch = this.import('vine.branch');
	var sketch = this.import('vine.sketch');
	
	var branches = [];
	var seed = function(params)
	{
		var vine = new climber(params,this);
			
		var growBranch = function(currentPoint)
		{
			branches.push(new branch({x:tempPoint.x,y:tempPoint.y,w:vine._w,branchdepth:vine._branchDepth},this));
		}
		
		Object.defineProperty(this, 
							  "growBranch", 
							  { set: function(currentPoint) { growBranch(currentPoint); } });
		Object.defineProperty(this, 
							  "running", 
							  {
								get: function() { return ctx.running; },
								set: function(val) { (val === true) ? ctx.start() : ctx.stop(); }
							  });
	};
	module.exports = seed;
});
