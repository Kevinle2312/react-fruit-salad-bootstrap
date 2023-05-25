import React from "react";
import FruitsMaster from "./components/FruitsMaster";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { useState } from "react";
import Panier from "./components/Panier";
import {setAuthToken} from "./components/Signin";

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

    /check jwt token
    const token = localStorage.getItem("token");
    if (token) {
        setAuthToken(token);
    }

    function onClick() {
        setDisplayFruits(!displayFruits);
    }

    return (
        <div className="App">
            <button onClick={onClick}>Afficher / Masquer</button>

            {displayFruits ? (
                <div>
                    <FruitsMaster />
                </div>
            ) : (
                <p>Aucun fruit</p>
            )}
        </div>
    );
}

export default App;
