ImportJS.pack('utils.utils',function(module,exports)
{
		var utils = {};
		utils.defaultValue = function(value, fallback) 
		{
			return (typeof value != 'undefined') ? value : fallback;
		};

		utils.randomi = function(a, b) 
		{
			return Math.floor(Math.random() * (b-a+1) + a);
		};
    
		utils.isArray = function( object ) 
		{
			return Object.prototype.toString.call( object ) == '[object Array]';
		};

		utils.isNumber = function( object ) 
		{
			return typeof object == 'number';
		};
		
		utils.random = function( min, max ) 
		{
			if ( utils.isArray( min ) )
				return min[ ~~( Math.random() * min.length ) ];
			if ( !utils.isNumber( max ) )
				max = min || 1, min = 0;
			return min + Math.random() * ( max - min );
		};
		
		utils.Collection = OOPS.extend(
		{
			// When creating the collection, we are going to work off
			// the core array. In order to maintain all of the native
			// array features, we need to build off a native array.
			_collection: null,
			_constructor_: function()
			{	
				this._collection = Object.create( Array.prototype );

			// Initialize the array. This line is more complicated than
			// it needs to be, but I'm trying to keep the approach
			// generic for learning purposes.
				this._collection = (Array.apply( collection, arguments ) || collection);

			// Add all the class methods to the collection.
				this.injectClassMethods( _collection );

			// Return the new collection object.
				return( collection );
			},
			// Define the static methods.
			_statics_: 
			{
				injectClassMethods: function( collection )
				{
					// Loop over all the prototype methods and add them
					// to the new collection.
					for (var method in Collection.prototype)
					{
						// Make sure this is a local method.
						if (Collection.prototype.hasOwnProperty( method )){

							// Add the method to the collection.
							collection[ method ] = Collection.prototype[ method ];

						}
					}
					return( collection );
				},
				fromArray:function( array )
				{
					var collection = Collection.apply( null, array );
					// Return the new collection.
					return( collection );
				},
				isArray: function( value )
				{
					// Get it's stringified version.
					var stringValue = Object.prototype.toString.call( value );
					// Check to see if the string representation denotes array.
					return( stringValue.toLowerCase() === "[object array]" );
				}
			},
			add: function( value )
			{

				// Check to see if the item is an array.
				if (Collection.isArray( value )){

					// Add each item in the array.
					for (var i = 0 ; i < value.length ; i++)
					{
						// Add the sub-item using default push() method.
						Array.prototype.push.call( this, value[ i ] );
					}
				}
				else 
				{
					// Use the default push() method.
					Array.prototype.push.call( this, value );
				}
				// Return this object reference for method chaining.
				return( this );
			},
			// I add all the given items to the collection.
			addAll: function()
			{
				// Loop over all the arguments to add them to the
				// collection individually.
				for (var i = 0 ; i < arguments.length ; i++){

					// Add the given value.
					this.add( arguments[ i ] );
				}
				// Return this object reference for method chaining.
				return( this );
			},
			//stubbed out until I need it
			remove: function () {},
			removeAll: function (newArrayRef) 
			{
				for(var i = 0; i < this.length; ++i)
				{
					if(newArrayRef && Collection.isArray(newArrayRef) )
					{
						newArrayRef.push(Array.prototype.pop.call(this));
					}
					else
					{
						Array.prototype.pop.call(this);
					}
				}
			},
			clear: function () 
			{
				for(var i = 0; i < this.length; ++i)
				{
					delete this[i];
				}
				this.length = 0;
			}
		});

		//included to remember from 
		//http://stackoverflow.com/questions/7282151/load-external-font-with-javascript-and-jquery
		utils.addHeadStyleFont = function(jqselector, fontUrl)
		{
			$(jqselector).prepend("<style type=\"text/css\">" + 
										"@font-face {\n" +
											"\tfont-family: \"myFont\";\n" + 
											"\tsrc: local('☺'), url(" + fontUrl + ") format('opentype');\n" + 
										"}\n" + 
											"\tp.myClass {\n" + 
											"\tfont-family: myFont !important;\n" + 
										"}\n" + 
									"</style>");
		};
	
	module.exports = utils;
});
