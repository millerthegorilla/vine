ImportJS.pack('vine.seed', function() {
	var climber = this.import('vine.climber');
	var branch = this.import('vine.branch');
	
	var seed =  OOPS.extend({
		_constructor_: function(context)
		{
			this.vine = new climber(context);
		},
		
		_growBranch: function(currentPoint)
		{
			this.branches.push(new branch({x:tempPoint.x,y:tempPoint.y,w:this._w,context:this._ctx,branchdepth:this._branchDepth}));
		}
	});
	module.exports = seed;
});
