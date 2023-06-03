//you can think of this as react Context
//whatever be difined in here you'll be able 
//utellise in your entire application

import { proxy } from "valtio";

const state = proxy({
    //flag: are we in homepage or not
    intro: true,
    //default color
    color: {
        value: '#25bb92',
    },
    // default background color
    bgColor: {
        value:'#1e1e1e'
    },
    //the front or back of the shirt is showing
    showFront: true,
    //Are we currently desplaying a logo on our shirt..?
    isLogoTexture: true,
    isFullTexture: false,
    //for the initial logo before we upload any logo
    logoDecal: './threejs.png',
    fullDecal: 'threejs.png',
    // new property to indicate if the text should be applied on front or back of shirt
    isFront: true,
    // new property to store the text entered by the user
    textValue:' ',
    // logo positions to set for decal
    position: {
        left: false,
        middle: true,
        right: false
    },
    // the state to track the logo position
    logoDecalPosition: 'FRONT_CENTER',
})

export default state;