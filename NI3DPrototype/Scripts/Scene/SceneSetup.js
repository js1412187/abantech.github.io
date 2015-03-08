﻿/// <reference path="../../Libs/THREEJS/three.js" />
var sceneArea = 200;
var sceneLights;
var clock = new THREE.Clock();
var updateControls;

var initScene = function () {
    window.scene = new THREE.Scene();
    window.renderer = new THREE.WebGLRenderer({
        alpha: 1,
        antialias: false
    });

    window.renderer.setClearColor(0x000000, 0);
    window.renderer.setSize(window.innerWidth, window.innerHeight);

    window.renderer.domElement.style.position = 'fixed';
    window.renderer.domElement.style.top = 0;
    window.renderer.domElement.style.left = 0;
    window.renderer.domElement.style.width = '100%';
    window.renderer.domElement.style.height = '100%';
	renderer.shadowMapEnabled = true;

    document.body.appendChild(window.renderer.domElement);

    window.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, sceneArea / 100, sceneArea * 4);
    window.camera.position.z = sceneArea;
    window.camera.lookAt(new THREE.Vector3(0, 0, 0));

    if (typeof (useNUIConrols) != 'undefined')
        if (useNUIConrols)
            addFirstPersonControls();

    if (!updateControls)
        addOrbitControls();

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }, false);

    scene.add(camera);
//   renderer.render(scene, camera);

};

var addOrbitControls = function () {
    controls = new THREE.OrbitControls(window.camera);
    controls.damping = 0.2;
    //   controls.addEventListener('change', renderer.render);
    updateControls = function () { controls.update(); }
}

var addFirstPersonControls = function () {
    controls = new THREE.FlyControls(window.camera);
    //    new THREE.FirstPersonControls(window.camera);

    //controls.lookSpeed = 0.015; // 0.0125;
    //controls.lookSpeedMin = 0.005;
    //controls.lookSpeedMax = 0.5;
    //controls.movementSpeed = 50;
    //controls.movementSpeedMin = 20;
    //controls.movementSpeedMax = 300;
    //controls.noFly = false;
    //controls.lookVertical = true;
    //controls.constrainVertical = true;
    //controls.verticalMin = 1.5;
    //controls.verticalMax = 2.0;

    updateControls = function () { controls.update(clock.getDelta()) }
}

var createRandomCones = function(coneCount) {
	
	var geometry = new THREE.CylinderGeometry(0, 10, 30, 24, 0);
	var material = new THREE.MeshLambertMaterial({ color: 0xffffff })
	//.MeshLambertMaterial({ color: 0xffffff, shading: THREE.FlatShading });

	for (var i = 0; i < coneCount; i++) {
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = (Math.random() - 0.5) * 300;
		mesh.position.y = (Math.random() ) * 200;
		mesh.position.z = (Math.random() - 0.5) * 300;
//			mesh.updateMatrix();
//			mesh.matrixAutoUpdate = false;
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		window.scene.add(mesh);
	}
};

var createGroundPlane = function() {

	var geometry = new THREE.BoxGeometry( 800, 5, 800 );
	var material = new THREE.MeshPhongMaterial( {
		color: 0x008080,
		ambient: 0x008080,
		specular: 0xee3344,
		shininess: 50,
		side: THREE.DoubleSide
	} );

	mesh = new THREE.Mesh( geometry, material );
	mesh.position.set( 0, -50.1, 0 );
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	window.scene.add( mesh );
			
			
	var boxHelper = new THREE.BoxHelper( mesh );
	boxHelper.material.color.setRGB( 1, 0, 1 );
	scene.add( boxHelper );
		
	var gridHelper = new THREE.GridHelper( 400, 10 );
	gridHelper.position.set( 0, -47.5, 0 );
	scene.add( gridHelper );
		
	var axisHelper = new THREE.AxisHelper( 50 );
	axisHelper.position.set( 0, -47.5, 0 );
	scene.add( axisHelper );		
}

var createSceneLighting = function() {

		light = new THREE.AmbientLight( 0x888888 );
		scene.add( light );

		light = new THREE.DirectionalLight( 0xffffff, 0.5 );
		light.position.set( -200, 200, 200 );

		var d = 200;
		light.shadowCameraLeft = -d;
		light.shadowCameraRight = d;
		light.shadowCameraTop = d;
		light.shadowCameraBottom = -d;

		light.shadowCameraNear = 200;
		light.shadowCameraFar = 500;

// can help stop appearance of gridlines in objects with opacity < 1
		light.shadowBias = -0.0002; // default 0 ~ distance fron corners?
		light.shadowDarkness = 0.3; // default 0.5
		light.shadowMapWidth = 2048;  // default 512
		light.shadowMapHeight = 2048;

		light.castShadow = true;
//		light.shadowCameraVisible = true;
		scene.add( light );

		light = new THREE.PointLight( 0xffffff, 0.5 );
		light.position = camera.position;
		camera.add( light );
		
}

	var createBackgroundGradient = function() {

	    var col1 = "#2e3138";
	    var col2 = "#2e3138";
	    var col3 = "#2e3138";
		var X = ( Math.random() * window.innerWidth ).toFixed(0);
		var Y = ( Math.random() * window.innerHeight ).toFixed(0);
		var center =  20 + ( Math.random() * 60 ).toFixed(0);

		var cssBackround = document.body.appendChild( document.createElement('style') );
		cssBackround.innerText = 'body { ' +
			'background: -webkit-radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); ' +
			'background: -moz-radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); ' +
			'background: radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); }' +
		'';
	
	}

initScene();
createSceneLighting();
//createRandomCones(20);
createGroundPlane();
createBackgroundGradient();
animate();

function animate( timestamp ) {
	renderer.render( scene, camera );
	updateControls();
	//controls.update();
//		stats.update();
	requestAnimationFrame( animate );

}
