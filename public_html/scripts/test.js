var circularQueue = ImportJS.unpack('utils.circularQueue');
var bob = new circularQueue();
bob.add("hello");
bob.add("james");
bob.add(1);
bob.add(2);

console.log(bob[1]);
