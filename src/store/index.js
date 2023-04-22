//you can think of this as react Context
//whatever be difined in here you'll be able 
//utellise in your entire application

import { proxy } from "valtio";

const state = proxy({
    //flag: are we in homepage or not
    intro: true,
    //default color
    color: '#FEFEFE',
    //Are we currently desplaying a logo on our shirt..?
    isLogoTexture: true,
    isFullTexture: false,
    //for the initial logo before we upload any logo
    logoDecal: './threejs.png',
    fullDecal: 'threejs.png',
})

export default state;