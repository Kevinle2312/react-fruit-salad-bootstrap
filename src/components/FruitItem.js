// import React from "react";
//
// const FruitItem = ({ fruit, isSelected, onToggleSelection }) => {
//     const handleToggleSelection = (fruitId) => {
//         setSelectedFruits((prevSelectedFruits) => {
//             if (prevSelectedFruits.includes(fruitId)) {
//                 return prevSelectedFruits.filter((id) => id !== fruitId);
//             } else {
//                 return [...prevSelectedFruits, fruitId];
//             }
//         });
//     };
//
//     return (
//         <div
//             className={`fruit-item ${isSelected ? "selected" : ""}`}
//             onClick={handleToggleSelection}
//         >
//             <div>{fruit.name}</div>
//             <div>Price: {fruit.price}</div>
//         </div>
//     );
// };
//
// export default FruitItem;
