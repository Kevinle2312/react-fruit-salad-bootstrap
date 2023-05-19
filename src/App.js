import "./App.css";
import FruitsMaster from "./components/FruitsMaster";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
                    <BrowserRouter>
                        <Routes>
                                <Route path="/" element={<FruitsMaster selectedFruits={selectedFruits} onToggleSelection={handleToggleSelection} />} />
                                <Route path="/panier" element={<Panier selectedFruits={selectedFruits} />} />
                            </Routes>
                    </BrowserRouter>
                </div>
            ) : (
                <p>Aucun fruit</p>
            )}
        </div>
    );
}

export default App;
