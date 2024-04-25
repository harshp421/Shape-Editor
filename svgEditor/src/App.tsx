import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { copySelectedShapes, pasteSelectedShape, redoShape, undoShape } from './actions/pages/pages.actions';
import Router from './router/index';

function App() {
  const dispatch = useDispatch();
   const mainstate=useSelector((state:any)=>state);
    console.log(mainstate,"mainstate");
  window.addEventListener("keydown", (e) =>{
     // Check if the key pressed is ctrl/cmd + c (copy)
  if ((e?.ctrlKey || e?.metaKey) && e.keyCode === 67) {
    dispatch(copySelectedShapes())
  }
  
   // Check if the key pressed is ctrl/cmd + v (paste)
   if ((e?.ctrlKey || e?.metaKey) && e.keyCode === 86) {
    dispatch(pasteSelectedShape())
    alert('paste');
  }
    // check if the key pressed is ctrl/cmd + z (undo)
  if ((e?.ctrlKey || e?.metaKey) && e.keyCode === 90) {
    dispatch(undoShape());
    alert('undo');
  }

  // check if the key pressed is ctrl/cmd + y (redo)
  if ((e?.ctrlKey || e?.metaKey) && e.keyCode === 89) {
    
     dispatch(redoShape());
     alert('redo');
  }
  }
  );

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
