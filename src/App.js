import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import CreateNewIssue from "./CreateNewIssue";
import Home from './Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="createissue" exact element={<CreateNewIssue />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
