import React from "react";
import "./App.css";
import AirQuality from "./pages/air-quality.page";
import NavigationBar from "./components/navbar";
import "@blueprintjs/core/lib/css/blueprint.css";
import "normalize.css/normalize.css";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <AirQuality />
    </div>
  );
}

export default App;
