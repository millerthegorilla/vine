ImportJS.preload({ 
    baseUrl: 'scripts',
    packages: ['vine/seed.js'],
    libs: [
    'libs/sketch.js',
    'libs/jquery/jquery-1.9.0.min.js',
    'libs/jquery/jquery-ui.min.js',
    'libs/jquery/jquery.address-1.6.min.js',
    'utils/pointer_events_polyfill.js',
    'menu.js','panorama.js'],
    autoCompile: false,
    ready: function(filesArr) {
		PointerEventsPolyfill.initialize({});
        console.log("done, loaded files: ", filesArr);
        ImportJS.compile();
        var vine = ImportJS.unpack('vine.seed');
        new vine({branchChance:60, //percentage chance of branches being drawn
				  stemLength:50, //milliseconds before branches maybe drawn
				  top:10, // top,left,height,width of vine
				  left:10,
				  height:700,
				  width:900,
				  time:4000, //time for vine to complete
				  startCorner:'BR', //start corner - 'BL' || 'TL' || 'TR' || 'BR'
				  direction:'CW', // direction of travel - 'CW' for clockwise - anything else anti-clockwise
				  girth:6, //width of vine
				  numOfSides:2, //number of sides - 4 draws a square.
				  numCurvesPerSide:3, //number of curves per side, 0 draws a straight line
				  curveDepth:25, //depth of curve from center line
				  bark:true, //vine outline
				  color:'#655412', //vine colour
				  //flower:flower, //object name for flower that is drawn at end of branch - null for no flowers
				  autoStart:true, //whether to auto-start - can be started/stopped later on
				  autoPause:true, //whether to pause animation on browser blur
				  container:null}); //container element for sketch.js - https://github.com/soulwire/sketch.js
    },
    error: function(filesArr) {
        console.log("error on files: ", filesArr);
    }
});


