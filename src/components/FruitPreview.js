import React, { useState, useEffect  } from "react";
import "./FruitPreview.css";

function FruitPreview({ fruit, onAddToCart, selectedFruits, setSelectedFruits }) {
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const selectedFruit = selectedFruits.find((selectedFruit) => selectedFruit.id === fruit.id);
        if (selectedFruit) {
            setQuantity(selectedFruit.quantity);
        } else {
            setQuantity(0);
        }
    }, [selectedFruits, fruit.id]);

    function onClick() {
        console.log(fruit.name);
    }
    function handleAddToSelection() {
        const updatedSelectedFruits = [...selectedFruits];
        const fruitIndex = updatedSelectedFruits.findIndex((selectedFruit) => selectedFruit.id === fruit.id);

        if (fruitIndex !== -1) {
            updatedSelectedFruits[fruitIndex].quantity -= 1;
        } else {
            updatedSelectedFruits.push({ ...fruit, quantity: -1 });
        }

        setSelectedFruits(updatedSelectedFruits);
        setQuantity(quantity - 1); // Mettre à jour la quantité dans l'état local
        onAddToCart(fruit.id);
    }



    function handleRemoveFromSelection() {
        const updatedSelectedFruits = selectedFruits.map((selectedFruit) => {
            if (selectedFruit.id === fruit.id) {
                return {
                    ...selectedFruit,
                    quantity: selectedFruit.quantity - 1,
                };
            }
            return selectedFruit;
        });

        const filteredSelectedFruits = updatedSelectedFruits.filter(
            (selectedFruit) => selectedFruit.quantity > 0
        );

        setSelectedFruits(filteredSelectedFruits);
        setQuantity(quantity - 1); // Mettre à jour la quantité dans l'état local
        onAddToCart(fruit.id);
    }



    const isFruitSelected = selectedFruits.some((selectedFruit) => selectedFruit.id === fruit.id);

    function getImage() {
        return "/images/" + fruit.name.toLowerCase() + ".png";
    }

    return (
        <div className={"FruitPreview " + fruit.name.toLowerCase()}>
            <a href={"/fruits/" + fruit.name.toLowerCase()} rel="">
                <img alt={fruit.name} src={getImage()} />
            </a>
            <button onClick={() => onClick()}>{fruit.name}</button>
            <div className="count-box">
                Nombre : <span className="count">{quantity}</span>
            </div>
            {isFruitSelected ? (
                <div className="remove-from-cart">
                    <button onClick={handleRemoveFromSelection => setQuantity(quantity - 1)}>-</button>
                    <div className="quantity-control">
                        {/*<button onClick={() => setQuantity(quantity - 1)}>-</button>*/}
                        {/*<span>{quantity}</span>*/}
                    </div>
                </div>
            ) : (
                <div className="add-to-cart">
                    <button onClick={handleRemoveFromSelection}>-</button>
                    <div className="quantity-control">
                        {/*<button onClick={() => setQuantity(quantity - 1)}>-</button>*/}
                        <span>{quantity}</span>
                    </div>
                    <button onClick={handleAddToSelection}>+</button>
                    <div className="quantity-control">
                        {/*<button onClick={() => setQuantity(quantity + 1)}>+</button>*/}
                        <span>{quantity}</span>
                    </div>
                </div>
            )}

        </div>
    );
}

export default FruitPreview;

