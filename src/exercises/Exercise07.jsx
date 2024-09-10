// src/exercises/Exercise01.js
import {useState} from "react";
import {useForm} from "react-hook-form";
import React from "react";
import {TextField} from "@mui/material";

const Exercise07 = () => {
    /*const [usuario, setUsuario] = useState({
        nome: "",
        telefone: "",

    });
    const [erros, setErros] = useState({
        nome: "",
        telefone: "",

    });*/

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitted},
        reset,
        setValue,
    } = useForm();

    function handleClick(dados) {
        /*if (erros.nome || erros.telefone) {
            alert(`Erro em nome: ${erros.nome ? erros.nome : "Não há erros"}; \n Erro em telefone: ${erros.telefone ? erros.telefone : "Não há erros"}`)
        } else {
            alert(`SUCESSO \n Nome: ${usuario.nome}; telefone: ${usuario.telefone}`);
        }*/
        if (errors.nome || errors.telefone || errors.email ) {
            alert(`Erro em nome: ${errors.nome ? errors.nome.message : "Não há erros"}; \n Erro em telefone: ${errors.telefone ? errors.telefone.message : "Não há erros"} \n
            Erro em email: ${errors.email ? errors.email.message : "Não há erros"}`)
        } else {
            alert(`SUCESSO \n Nome: ${dados.nome}; telefone: ${dados.telefone}; email: ${dados.email}`);
        }
    }

    return (
        <div>
            <h1>Exercise 07</h1>
            <p>Content for Exercise 07</p>
            <form>
                <TextField
                    sx={{
                        marginBottom: "7px",
                    }}
                    id="nome"
                    label="nome"
                    type="text"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register("nome", {
                        required: "Nome é obrigatório",
                    })}
                    error={!!errors.nome}
                    helperText={errors.nome ? errors.nome.message : ""}
                />
                <br/>
                <TextField
                    sx={{
                        marginBottom: "7px",
                    }}
                    id="email"
                    label="email"
                    type="text"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register("email", {
                        required: "Email é obrigatório",
                    })}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                />
                <br/>
                <TextField
                    sx={{
                        marginBottom: "7px",
                    }}
                    id="telefone"
                    label="telefone"
                    type="text"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register("telefone", {
                        required: "O número de telefone é obrigatório",
                        validate: {
                            matchPatter: (value) =>
                                (/^\d+$/).test(value) || "O número de telefone deve ser numérico"
                        },
                    })}
                    error={!!errors.telefone}
                    helperText={errors.telefone ? errors.telefone.message : ""}
                />
                <br/>
                <button type={"button"} onClick={handleSubmit(handleClick)}>Enviar</button>
            </form>
        </div>
    );
};

export default Exercise07;
