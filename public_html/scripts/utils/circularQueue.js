ImportJS.pack('utils.circularQueue', function(module) 
{
	var collection = this.import('utils.collection');
	var index = 0;
	var reverse = false;
	
	function circularQueue ()
	{
		collection.call(this);
		collection.injectClassMethods(this._collection, circularQueue.prototype);
		console.log(this);
		Object.defineProperty(this._collection, 
							  "next", 
							  { get: function() {
													index = reverse ?  index - 1 : index + 1;
													index = (index == this.length) ?  0 : index;
													return this[index];
												} 
							  });
		Object.defineProperty(this._collection, 
							  "reverse", 
							  { get: function() {
													return reverse;
												} ,
								set: function(val) {
														reverse = val;
												   }
							  });
		Object.defineProperty(this._collection, 
								  "current", 
								  { get: function() {
														return this[index];
													} 
								  });
		Object.defineProperty(this._collection, 
							  "index", 
							  { get: function() {
													return index;
												},
								set: function(val) {
														index = val;
												   }
							  });
		return(this._collection);
	};
	
	circularQueue.prototype = Object.create(collection.prototype);
	circularQueue.constructor = circularQueue;

	module.exports = circularQueue;
});
