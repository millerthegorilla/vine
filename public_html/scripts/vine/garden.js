ImportJS.pack('vine.garden', function(module) 
{		
		function garden(params)
		{
			this.flowerbed = (params.context) ? Sketch.augment(params) : Sketch.create(params);
			this.flowerbed.update_funcs = [];
			this.flowerbed.draw_funcs = [];
			this.flowerbed.draws = function(scope, func) { this.draw_funcs.push([scope,func]); };		
			this.flowerbed.updates = function(scope, func) { this.update_funcs.push([scope,func]); };
		
			this.flowerbed.update = function () 
			{
				for(var i=0; i<this.update_funcs.length; i++)
				{
					this.update_funcs[i][1].call(this.update_funcs[i][0]);
				}
			};
			
			this.flowerbed.draw = function () 
			{
				for(var i=0; i<this.draw_funcs.length; i++)
				{
					this.draw_funcs[i][1].call(this.draw_funcs[i][0]);
				}
			};
			
			this.flowerbed.remove = function()
			{
				var flat = [].concat.apply([], garden.update_funcs);
				var col = flat.indexOf(this) / 2;
				garden.update_funcs.splice(col,1);
				flat = [].concat.apply([], garden.draw_funcs);
				col = flat.indexOf(this) / 2;
				garden.draw_funcs.splice(col,1);
			};
			return (this.flowerbed);
		};
		
		garden.prototype.start = function() { this.flowerbed.start(); };
		garden.prototype.stop = function() { this.flowerbed.stop(); };
			
		module.exports = garden;
});
