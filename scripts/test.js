/*var k;
var j;

var job = function()
{
Object.defineProperty(this, "test", 
                        { set: function(params) {this.name = params;}});
  this.test = function(params) { this.name = params; };
}
bob = new job();
j = new Date();

for (var i=0; i < 10000000; i ++)
{
	bob.test = 'time';
}
k = new Date();
console.log(k - j); 
*/
circularQueue = ImportJS.unpack('utils.circularQueue');
var bob = new circularQueue();
bob.push("james");
bob.push("world flood");
