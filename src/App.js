import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/layout/Index";
import Navbar from "./components/layout/Navbar";
import Lyrics from "./components/tracks/Lyrics";
import { Provider } from "./context";
import "./App.css";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Index />} />
              <Route exact path="/lyrics/track/:id" element={<Lyrics />} />
            </Routes>
          </div>
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
