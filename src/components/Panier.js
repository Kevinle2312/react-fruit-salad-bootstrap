import React from "react";
import FruitItem from "./FruitItem";

const Panier = ({ selectedFruits, fruits }) => {
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        selectedFruits.forEach((fruitId) => {
            const selectedFruit = fruits.find((fruit) => fruit.id === fruitId);
            if (selectedFruit) {
                totalPrice += selectedFruit.price;
            }
        });
        return totalPrice;
    };

    return (
        <div className="panier">
            <h2>Contenu du panier</h2>
            {selectedFruits && selectedFruits.length === 0 ? (
                <p>Aucun fruit sélectionné.</p>
            ) : (
                <ul>
                    {selectedFruits.map((fruitId) => {
                        const selectedFruit = fruits.find((fruit) => fruit.id === fruitId);
                        return (
                            <li key={fruitId}>
                                {selectedFruit.name} - {selectedFruit.price}
                            </li>
                        );
                    })}
                </ul>
            )}
            <p>Total : {calculateTotalPrice()}</p>
        </div>
    );
};

export default Panier;
