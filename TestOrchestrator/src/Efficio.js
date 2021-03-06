﻿var debug = true;

if (typeof THREE === 'undefined') {
    THREE = require('three');
}

// Efficio Internal Components
var bus = require('./Message Bus/MessageBus.js');
var hirp = require('./Human Input Recognition and Processing/HumanInputRecognitionAndProcessing.js');
var ami = require('./Asset Management And Inventory/AssetManager.js');
var constraintsEngine = require('./Constraints Engine/ConstraintsEngine.js');
var comm = require('./Command Issuance And Control/CommandIssuanceAndControl.js')
var internalScene = require('./InternalScene.js');
var sysNotificationListener = require('./Logging/SystemNotificationListener.js');
var mic = require('./Input/Mic/Microphone.js');
var physics = require('./Sequence Execution and Action Scheduling/CollisionDetectionAndGravitySimulation.js');

var leap;
var kinect;

module.exports = 
{
    Initialize: function () {
        bus.Initialize();
        hirp.Initialize();
        ami.Initialize();
        constraintsEngine.Initialize();
        comm.Initialize();
        internalScene.Initialize();
        sysNotificationListener.Initialize();

        leap = require('./Input/LeapMotion/LeapMotion.js'); //will make this read from config to allow whatever NUI device
        leap.Initialize();
        
        mic.Intitialize();

        physics.Initialize();
    },
    
    Start: function () {
        leap.Start();
        mic.Start();
        physics.Start();
    },

    Debug: debug,

    MessagingSystem: bus
}
