ImportJS.pack('vine.garden', function(module) 
{		
		function garden(params)
		{
			//inject canvas and context
			/*var canvasel = $('<canvas id="aniCanvas"></canvas>');		
			(params.container) ? $(params.container).append(canvasel) : $('body').append(canvasel);
			var canvas = canvasel[0];
			var context = canvas.getContext("2d");
			canvasel.css({"height":"100%","width":"100%","position":"absolute","top":"0","left":"0","z-index":"100"});
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;
			*/
			//matter initialisation
			var backgroundOptions = new Object();
			var backgroundBody = Matter.Body.create(backgroundOptions);
			var boundingVertices = Matter.Vertices.create({x:0,y:0},
														  {x:0,y:canvas.clientHeight},
														  {x:canvas.clientWidth,y:0},
														  {x:canvas.clientWidth,y:canvas.clientHeight}, backgroundBody);
			var renderBounds = Matter.Bounds.create(boundingVertices);
			var render = Matter.Render.create({
										   options: { 
											   wireframes: false,
											   showShadows: true,
											   height:canvas.clientHeight, 
											   width:canvas.clientWidth }, 
										   element:container,
										   bounds:renderBounds,
										   hasBounds: true
										});
			//render.canvas.css({"height":"100%","width":"100%","position":"absolute","top":"0","left":"0","z-index":"100"});
			var engine;
			render.clear = function () {};
			render.world = function (engine) {};							   
			//var grid = Matter.Grid.create();
			var options = {render:render};//,grid:grid};
			// create a Matter.js engine
			engine = Engine.create(options);
			Matter.Render.setPixelRatio(render,'auto');
			var group = Body.nextGroup(true);
			var runner = Matter.Runner.create();	
			// add all the runner (animation loop) to the world
			World.add(engine.world, [runner]);
			// run the engine
			//var pairs = Matter.Pairs.create();
			Matter.Events.on(runner, "beforeRender", function(event) 
			{
				this.draw();
			});
			
			Matter.Events.on(runner, "afterRender", function(event) 
			{
				this.update();
			});
			
			Matter.Runner.start(runner, engine);	
			
			Object.defineProperty(this, 
							  "growing", 
							  {
								get: function() { return Matter.Runner.enabled; },
								set: function(val) { (val === true) ? Matter.Runner.start(runner,engine) 
																	: Matter.Runner.stop(runner); }
							  });
		};
		
		garden.prototype.update_funcs = [];
		garden.prototype.draw_funcs = [];
		garden.prototype.drawStack = function(scope, func) { this.draw_funcs.push([scope,func]); };		
		garden.prototype.updates = function(scope, func) { this.update_funcs.push([scope,func]); };
	
		garden.prototype.update = function () 
		{
			for(var i=0; i<this.update_funcs.length; i++)
			{
				this.update_funcs[i][1].call(this.update_funcs[i][0]);
			}
		};
		
		garden.prototype.draw = function () 
		{
			for(var i=0; i<this.draw_funcs.length; i++)
			{
				this.draw_funcs[i][1].call(this.draw_funcs[i][0]);
			}
		};
		
		garden.prototype.remove = function()
		{
			var flat = [].concat.apply([], garden.update_funcs);
			var col = flat.indexOf(this) / 2;
			garden.update_funcs.splice(col,1);
			flat = [].concat.apply([], garden.draw_funcs);
			col = flat.indexOf(this) / 2;
			garden.draw_funcs.splice(col,1);
		};
		garden.prototype.start = function() { this.flowerbed.start(); };
		garden.prototype.stop = function() { this.flowerbed.stop(); };
			
		module.exports = garden;
});
