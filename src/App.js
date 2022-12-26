import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Quiz from './Components/Quiz';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import CustomContextProvider from './Components/CustomContextProvider';
import ProtectedRouth from './Components/ProtectedRouth';
import AddQuiz from './Components/AddQuiz';

function App() {

  //window.addEventListener("beforeunload", (e)=>{
    //e.preventDefault()
    //localStorage.clear()
  //})
  return (
    <CustomContextProvider>
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRouth> <Home /> </ProtectedRouth>}/>
          <Route path='/quiz' element={<ProtectedRouth> <Quiz /> </ProtectedRouth>}/>
          <Route path='/add-quiz' element={<ProtectedRouth> <AddQuiz /> </ProtectedRouth>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='*' element={<Home />}/>
        </Routes>
      </Router>
    </div>
    </CustomContextProvider>
  );
}

export default App;
