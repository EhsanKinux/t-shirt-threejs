import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';

//style
import './App.css';

function App() {
  return (
    <div className="App">
      <Home/>
      <Canvas/>
      <Customizer/>
    </div>
  );
}

export default App;
