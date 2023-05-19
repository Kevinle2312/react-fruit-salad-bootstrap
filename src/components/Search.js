import React from "react";
import { useForm } from "react-hook-form";

const Search = ({ onSearch }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        onSearch(data.keyword);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                name="keyword"
                placeholder="Rechercher..."
                {...register("keyword", { required: true })}
            />
            {errors.keyword && <span>Ce champ est obligatoire</span>}
            <button type="submit">Rechercher</button>
        </form>
    );
};

export default Search;
