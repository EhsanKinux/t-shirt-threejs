
import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';
import { useSnapshot } from 'valtio';
import state from './store';

//style
import './App.css';

function App() {
  const snap = useSnapshot(state)
  return (
    <div className="App">
      {!snap.intro && (
        <Canvas className="canvas" />
        )}
      <Home/>
      <Customizer />
    </div>
  );
}

export default App;
