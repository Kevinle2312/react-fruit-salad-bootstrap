import "./Signin.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import jwt_decode from "jwt-decode";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import User from "../models/User";

import axios from "axios";

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  else
    delete axios.defaults.headers.common["Authorization"];
}

const axiosInstance = axios.create({
  baseURL: "https://fruits.shrp.dev",
  timeout: 3000,
  headers: {},
});

function Signin() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useNavigate();




  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);

  async function onSubmitSignInForm(data) {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`/auth/login`, {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        const aUser = new User(null, null, data.email);

        aUser.accessToken = response.data.data.access_token;
        aUser.refreshToken = response.data.data.refresh_token;
        aUser.expires = response.data.data.expires;

        localStorage.setItem("token", aUser.accessToken);
        localStorage.setItem("token_refresh", aUser.refreshToken);

        setAuthToken(aUser.accessToken);

        const decodedPayload = jwt_decode(aUser.accessToken);

        aUser.id = decodedPayload.id;

        setLoading(true);
        const response2 = await axiosInstance.get(`/users/${aUser.id}`, {
          headers: { Authorization: `Bearer ${aUser.accessToken}` },
        });
        setLoading(false);

        if (response2.status === 200) {
          aUser.first_name = response2.data.data.first_name;
          aUser.last_name = response2.data.data.last_name;
          aUser.email = response2.data.data.email;
          aUser.status = response2.data.data.status;

          setError(false);
          setUser(aUser);
        } else {
          setError(true);
        }

        window.location.href = '/'

        reset();

      }


    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      if (error.response && error.response.status === 401) {
        // If the response status is 401 (Unauthorized), refresh the access token
        const newAccessToken = await refreshAccessToken();

        // If a new access token is obtained, retry the user data request
        if (newAccessToken) {
          const aUser = new User(null, null, data.email);


          // Update the user's access token with the new one
          aUser.accessToken = newAccessToken;

          // Retry the user data request with the new access token
          const response2 = await axiosInstance.get(`/users/${aUser.id}`, {
            headers: { Authorization: `Bearer ${aUser.accessToken}` },
          });

          // ...

          if (response2.status === 200) {
            aUser.first_name = response2.data.data.first_name;
            aUser.last_name = response2.data.data.last_name;
            aUser.email = response2.data.data.email;
            aUser.status = response2.data.data.status;

            setError(false);
            setUser(aUser);
          } else {
            // Handle other response statuses
            if (response2.status === 401) {
              // Unauthorized
              console.log('User data request unauthorized');
              // Redirect to login or show error message
              setError(true);
            } else if (response2.status === 404) {
              // User not found
              console.log('User not found');
              // Show error message or handle as needed
              setError(true);
            } else {
              // Other error statuses
              console.log('Error fetching user data');
              // Show error message or handle as needed
              setError(true);
            }
          }
        } else {
          // Handle the case when the refresh token is invalid or expired
          // Redirect to the login page or show an error message
          console.log('Unable to refresh the access token');
          setError(true);
        }
      } else {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
  }

  async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("token_refresh"); // Get the refresh token from localStorage

    try {
      const response = await axios.post(
          "https://fruits.shrp.dev/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
      );

      const newAccessToken = response.data.data.access_token;

      // Update the access token in localStorage
      localStorage.setItem("token", newAccessToken);

      // Set the new access token as the default Authorization header for axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

      // Return the new access token if needed
      return newAccessToken;
    } catch (error) {
      // Handle the error, e.g., redirect to the login page
      console.log(error);
    }
  }


  function onSignOut() {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("token_refresh");
    setAuthToken(null);
    history.push("/connexion");
    return redirect("/connexion");
  }

  return (
    <div className="Signup">
      {loading === false && error === false && user !== null && (
        <p>
          <b>
            {user.first_name} {user.last_name}
          </b>
          &nbsp; ({user.email}) est connecté
          <button onClick={() => onSignOut()}>Se déconnecter</button>
        </p>
      )}
      {loading === true && <p>Chargement...</p>}
      {error === true && <p>Une erreur s'est produite</p>}
      {user === null && (
        <form onSubmit={handleSubmit(onSubmitSignInForm)}>
          <input
            placeholder="Adresse mail"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Ce champ est obligatoire</span>}

          <input
            type="password"
            placeholder="Mot de passe"
            {...register("password", { required: true })}
          />
          {errors.password && <span>Ce champ est obligatoire</span>}

          <button type="submit">Connexion</button>
        </form>
      )}
    </div>
  );
}

export default Signin;
