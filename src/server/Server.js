import { useEffect } from 'react'
import { data } from '../data/data';
import { useSnapshot } from 'valtio';
import state from '../store';

const Server = ({canvasRef}) => {
    
    const snap = useSnapshot(state);

    useEffect(() => {
        // loop through each decal in the data array
        data.forEach(({name, url}) => {
            // creat a new image element with the url
            const img = new Image();
            img.src = url;

            // wait for the image to load before setting it as the decal
            img.onload = () => {
                // set the current decal state to the loaded image
                state.logoDecal = img;

                // take a screenshot of the shirt with the current decal
                if (canvasRef.current) {
                    const dataURL = canvasRef.current.toDataURL("image/png");
                    const tempAnchor = document.createElement("a");
                    tempAnchor.href = dataURL;
                    tempAnchor.setAttribute("download", `${name}.png`);
                    tempAnchor.click();
                  }
            }
        });
    }, [canvasRef, snap]);
  return null;
}

export default Server