import React from "react";

const FruitItem = ({ fruit, isSelected, onToggleSelection }) => {
    const handleToggleSelection = () => {
        onToggleSelection(fruit.id);
    };

    return (
        <div
            className={`fruit-item ${isSelected ? "selected" : ""}`}
            onClick={handleToggleSelection}
        >
            <div>{fruit.name}</div>
            <div>Price: {fruit.price}</div>
        </div>
    );
};

export default FruitItem;
