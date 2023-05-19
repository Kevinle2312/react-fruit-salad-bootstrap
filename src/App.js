import "./App.css";
import FruitsMaster from "./components/FruitsMaster";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useState } from "react";
import Panier from "./components/Panier";

function App() {
  const [displayFruits, setDisplayFruits] = useState(false);
  const [selectedFruits, setSelectedFruits] = useState([]);

  const handleToggleSelection = (fruitId) => {
      setSelectedFruits((prevSelectedFruits) => {
          if (prevSelectedFruits.includes(fruitId)) {
              return prevSelectedFruits.filter((id) => id !== fruitId);
          } else {
              return [...prevSelectedFruits, fruitId];
          }
      });
  };

  function onClick() {
    setDisplayFruits(!displayFruits);
  }

  return (
      <div className="App">
          <button onClick={onClick}>Afficher / Masquer</button>

          {displayFruits ? (
              <div>
                  <Router>
                      <div>
                          <nav>
                              <ul>
                                  <li>
                                      <Link to="/">Accueil</Link>
                                  </li>
                                  <li>
                                      <Link to="/panier">Panier</Link>
                                  </li>
                              </ul>
                          </nav>
                          <Switch>
                              <Route exact path="/">
                                  <FruitsMaster />
                              </Route>
                              <Route path="/panier">
                                  <Panier selectedFruits={selectedFruits}/>
                              </Route>
                          </Switch>
                      </div>
                  </Router>
              </div>
          ) : (
              <p>Aucun fruit</p>
          )}
      </div>
  );
}

export default App;
