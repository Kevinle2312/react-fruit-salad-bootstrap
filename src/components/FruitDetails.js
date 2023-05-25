import { useEffect, useState } from "react";
import Fruit from "../models/Fruit";
import { useParams } from "react-router-dom";
import "./FruitDetails.css";

import axios from "axios";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: "https://fruits.shrp.dev",
  timeout: 1000,
  headers: {},
});

function FruitDetails() {
  const { fruitName } = useParams();
  //récupère la valeur du nom du fruit en minuscules dans l'URI ex: fruits/:fruitName -> fruits/cerise
  useAuth();

  const [fruit, setFruit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchAPI() {
      try {
        const nameWithFirstLetterUppercase =
          fruitName.charAt(0).toUpperCase() + fruitName.slice(1);
        //fruitName = pomme -> nameWithFirstLetterUppercase = Pomme

        setLoading(true);

        const response = await axiosInstance.get(
          `/items/fruits?fields=*.*&filter[name][_eq]=${nameWithFirstLetterUppercase}`
        );
        const jsonData = response.data.data[0];

        const aFruit = new Fruit(
          jsonData.name,
          jsonData.color,
          jsonData.image,
          jsonData.id,
          jsonData.price,
          jsonData.stock,
          jsonData.origin.name,
          jsonData.season
        );

        setFruit(aFruit);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }

    fetchAPI();
  }, [fruitName]);

  function getImage() {
    return "/images/" + fruit.name.toLowerCase() + ".png";
  }

  return (
    <>
      {loading === true && <p>Chargement...</p>}
      {error === true && <p>Une erreur s'est produite :(</p>}
      {fruit !== null && (
        <>
          <h1>{fruit.name}</h1>
          <img width="100px" alt={fruit.name} src={getImage()} />
          <p>Origine : {fruit.origin}</p>
          <p>Saison : {fruit.season}</p>
          <p>Prix : {fruit.price} €</p>
          <p>Stock : {fruit.stock}</p>
        </>
      )}
      <a href="/">Retour</a>
    </>
  );
}

export default FruitDetails;
