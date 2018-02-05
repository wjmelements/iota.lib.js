#!/usr/bin/js

var IOTA = require('lib/iota');

var iota = new IOTA({
    'host': 'http://localhost',
    'port': 14700
});


var minWeightMagnitude  = 14;
var depth = 3;

var seed = "Hello William, thanks a lot for providing your concerns to us. As you can imagine a project like IOTA got 10000000 gears in motion at once, so it's not always easy to check every concern or redflag raised within the hour. We are going to go through this now and report back to you once we conclude."
function again() {
    // create account
    iota.api.getNewAddress(seed, {"checksum": true}, function(error, newAddress) {
        console.log(newAddress);
        newAddress = iota.utils.noChecksum(newAddress);
        console.log(newAddress);
        iota.api.sendTransfer(seed, depth, minWeightMagnitude, [{"address": newAddress, "value": 0, "message": "", "tag": ""}], function(error, transfers) {
            if (error) {
                console.error(error);
            }
            console.log(transfers);
            again();
        });
    });
}

again();
