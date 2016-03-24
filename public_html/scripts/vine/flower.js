ImportJS.pack('vine.flower', function(module, exports)
{
	var utils 		= this.import('utils.utils');
	var garden	 	= this.import('vine.garden');
/*
 * from an example of sketchjs (http://soulwire.github.io/sketch.js/)
 * http://codepen.io/molefrog/pen/pilHJ
 * 
*/
	function flower(x,y,context)
	{
		this._garden = context;
		this._x = x;
		this._y = y;			
		this._flower = generateFlower();
		
		this.types = {
			"wave-green" : function(that) {

				this._garden.fillStyle = that.colorPrimary;

				var radius = abs(that.x_0);
				this._garden.beginPath();
				var angleStep = TWO_PI/140;

				this._garden.moveTo(radius*cos(0.0), radius*sin(0.0));
				for(var angle = 0.0; angle < TWO_PI; angle += angleStep) {

					var rad = 
						radius + 
						that.params[0] * sin(angle * that.params[1]);

					this._garden.lineTo(
						 rad * cos(angle), 
						 rad * sin(angle));
				};
				
				this._garden.lineTo(
					radius*cos(0.0), 
					radius*sin(0.0));

				this._garden.fill();
			},
			
			"wave-red" : function(that) {
				this._garden.fillStyle = that.colorSecondary;

				var radius = abs(that.x_0);
				this._garden.beginPath();
				var angleStep = TWO_PI/140;

				this._garden.moveTo(radius*cos(0.0), radius*sin(0.0));
				for(var angle = 0.0; angle < TWO_PI; angle += angleStep) {

					var rad = 
						radius + 
						that.params[0] * sin(angle * that.params[1]);

					this._garden.lineTo(
						 rad * cos(angle), 
						 rad * sin(angle));
				};

				this._garden.lineTo(
					radius*cos(0.0), 
					radius*sin(0.0));

				this._garden.fill();
			}
		};

		function generateFlower() 
		{
			var flower = [];

			var previousRadius = 0.0;
			while(previousRadius <= 1.0) {
				previousRadius += utils.random(0.1, 0.2);
				if(previousRadius > 1.0) break;

				var colorPrimary = 
					'rgb(' + 
						utils.randomi(150, 200) + ',' +
						utils.randomi(45, 55) + ',' +
						utils.randomi(50, 100) + ')';

				var colorSecondary =
					'rgb(' + 
						utils.randomi(60, 90) + ',' +
						utils.randomi(150, 200) + ',' +
						utils.randomi(60, 90) + ')';

				var params = [
					utils.random(.7, 1.05),
					utils.randomi(4, 12),
					utils.random(8, 8),
					utils.random(0.5, 2)
				];
				
				var iter = 0;

				flower.unshift({
					radius 			: previousRadius,
					colorPrimary 	: colorPrimary,
					colorSecondary  : colorSecondary,
					type 			: utils.random(['wave-red', 'wave-green']),
					params 			: params,
					x_0 			: utils.random(0.5,0.2),
					x_1				: 0.2,
					iter			: iter
				});
			}	

			return flower;
		}
		
		//this._garden.updates(this, this.update);
		this._garden.draws(this, this.draw);
	}

	flower.prototype.draw = function() 
	{
		if(this._garden.running === false) { this._garden.start(); };
		this._garden.save();

		this._garden.translate( this._x, this._y);	

		this._garden.scale(5, 7);

		for( var j = 0; j < this._flower.length; ++j ) {
			this.types[this._flower[j].type].bind(this)(this._flower[j]);
		}

		this._garden.restore();
	};

	flower.prototype.update = function() 
	{

		for( var j = 0;j < this._flower.length; ++j ) {
							
			var dt = 0.05;
			
			var _l = this._flower[j];
			
			var _v = (_l.x_0 - _l.x_1) / dt;

			var _f = 0.8;

			var r = abs(_l.x_0);
			if(r !== 0) {
				_f += _l.params[2] * (_l.radius - r ) * _l.x_0 / (r) +  _l.params[3] * (-_v);
			}

			var x = 2 * _l.x_0 - _l.x_1 + _f * dt * dt;

			_l.x_1 = _l.x_0;
			_l.x_0 = x;
		}

	};
	module.exports = flower;
});
