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
    'menu.js','panorama.js'],
    autoCompile: false,
    ready: function(filesArr) {
		PointerEventsPolyfill.initialize({});
        console.log("done, loaded files: ", filesArr);
        ImportJS.compile();
        var vine = ImportJS.unpack('vine.climber');
        new vine({branchChance:60,
				  vineWidth:6,
				  startX:1320,
				  startY:790,
				  height:700,
				  width:900,
				  time:4000,
				  startCorner:'BL',
				  initialDirection:'R'});
    },
    error: function(filesArr) {
        console.log("error on files: ", filesArr);
    }
});


