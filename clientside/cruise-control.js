let cruiseSpeed;
let cruiseEnabled = false;

mp.keys.bind(0x59, true, function() {   // Y Key
    if(mp.players.local.vehicle){
        if(isDriver() === true){
            toggleCruise();
        }
    }
});

function isDriver() {
    if(mp.players.local.vehicle) return mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle;
}

function toggleCruise(){
    if(!cruiseEnabled){
        if(mp.players.local.vehicle.getSpeed() > 0) {
            cruiseEnabled = true;
            cruiseSpeed = mp.players.local.vehicle.getSpeed();
        } else {
            mp.gui.chat.push(`You cannot enable cruise control if you aren't moving.`);
        }
    } else {
        cruiseEnabled = false;
    }
    mp.gui.chat.push(`Cruise Control: ${cruiseEnabled}`);
}

mp.events.add('render', () => {
    if(cruiseEnabled){
        mp.players.local.vehicle.setForwardSpeed(cruiseSpeed);
        if(mp.players.local.vehicle.hasCollidedWithAnything()) return toggleCruise();   // Collision Check
        if(mp.game.controls.isControlPressed(2, 76) || mp.game.controls.isControlPressed(2, 72)) return toggleCruise();     //  Brake Check
        if(mp.players.local.vehicle.isInAir()) return toggleCruise();   //  Car in air check
    }
});