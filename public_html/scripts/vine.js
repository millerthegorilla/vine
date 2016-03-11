ImportJS.preload({ 
    baseUrl: 'scripts',
    packages: ['vine/climber.js'],
    libs: [
    'libs/oops.min.js',
    'libs/sketch.js',
    'libs/jquery/jquery-1.9.0.min.js',
    'libs/jquery/jquery-ui.min.js',
    'libs/jquery/jquery.address-1.6.min.js',
    'utils/pointer_events_polyfill.js',
    'menu.js','panorama.js','flower.js'],
    autoCompile: false,
    ready: function(filesArr) {
		PointerEventsPolyfill.initialize({});
        console.log("done, loaded files: ", filesArr);
        ImportJS.compile();
        var vine = ImportJS.unpack('vine.seed');
        new vine({branchChance:60,
				  vineWidth:6,
				  top:10,
				  left:10,
				  height:700,
				  width:900,
				  time:4000,
				  startCorner:'BL',
				  direction:'CW',
				  girth:6,
				  numRotsPerSide:3,
				  rotDepth:9,
				  bark:true,
				  color:'#655412',
				  flower:flower,
				  autoStart:true,
				  autoPause:false});
    },
    error: function(filesArr) {
        console.log("error on files: ", filesArr);
    }
});


