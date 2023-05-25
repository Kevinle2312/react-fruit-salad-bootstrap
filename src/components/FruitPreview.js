import React, { useState, useEffect  } from "react";
import "./FruitPreview.css";

function FruitPreview({fruit, onAddToCart, selectedFruits, setSelectedFruits }) {
    let [quantity, setQuantity] = useState(0);
    quantity = selectedFruits.find((selectedFruit) => selectedFruit.id === fruit.id)?.quantity || 0;


    const fruitId = fruit.id; // Récupérer l'identifiant unique du fruit

    useEffect(() => {
        const selectedFruit = selectedFruits.find((selectedFruit) => selectedFruit.id === fruitId);
        if (selectedFruit) {
            setQuantity(selectedFruit.quantity);
        } else {
            setQuantity(0);
        }
    }, [selectedFruits, fruitId]);

    function onClick() {
        console.log(fruit.name);
    }
    function handleAddToSelection() {
        const updatedSelectedFruits = [...selectedFruits];
        const fruitIndex = updatedSelectedFruits.findIndex(
            (selectedFruit) => selectedFruit.id === fruitId
        );

        if (fruitIndex !== -1) {
            updatedSelectedFruits[fruitIndex].quantity =
                (updatedSelectedFruits[fruitIndex].quantity || 0) + 1;
        } else {
            updatedSelectedFruits.push({ ...fruit, quantity: 1 });
        }

        setSelectedFruits(updatedSelectedFruits);
        setQuantity(quantity + 1); // Mettre à jour la quantité dans l'état local
        onAddToCart(fruitId);
    }


    function handleRemoveFromSelection() {
        const updatedSelectedFruits = selectedFruits.map((selectedFruit) => {
            if (selectedFruit.id === fruitId) {
                const updatedQuantity = selectedFruit.quantity > 0 ? selectedFruit.quantity - 1 : 0;
                return {
                    ...selectedFruit,
                    quantity: updatedQuantity,
                };
            }
            return selectedFruit;
        });

        setSelectedFruits(updatedSelectedFruits);
        const updatedQuantity = updatedSelectedFruits.find((selectedFruit) => selectedFruit.id === fruitId)?.quantity || 0;
        setQuantity(updatedQuantity);
        onAddToCart(fruitId);
    }













    const isFruitSelected = selectedFruits.some((selectedFruit) => selectedFruit.id === fruitId);

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
                <div className="add-to-cart">
                    {/*<button onClick={handleRemoveFromSelection}>-</button>*/}
                    <div className="quantity-control">
                        <button onClick={handleRemoveFromSelection}>-</button>
                        <span>{quantity}</span>
                        <button onClick={handleAddToSelection}>+</button>
                    </div>
                </div>
            ) : (
                <div className="add-to-cart">
                    <button onClick={() => { handleAddToSelection(); onAddToCart(fruitId); }}>
                        Add To Cart
                    </button>

                </div>
            )}

        </div>
    );
}

export default FruitPreview;

