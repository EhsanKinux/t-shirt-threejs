//you can think of this as react Context
//whatever be difined in here you'll be able 
//utellise in your entire application

import { proxy } from "valtio";

const state = proxy({
    //flag: are we in homepage or not
    intro: true,
    //default color
    color: {
        value: '#FF7495',
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
    textValue:' '
})

export default state;