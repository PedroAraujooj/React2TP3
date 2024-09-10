// src/exercises/Exercise01.js
import {useState} from "react";
import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";

const Exercise16 = () => {
    const regexCep = /^\d{5}-?\d{3}$/;
    const [cep, setCep] = React.useState({});

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitted},
        reset,
        setValue,
    } = useForm();

    async function handleClick(dados){
        let retorno = {};
        const  url = `https://viacep.com.br/ws/${dados.cep}/json/`;
        await fetch(url)
            .then((resposta) => resposta.json())
            .then((endereco) => {
                retorno = endereco;
                console.log(retorno);
            })
            .catch((erro) => {
                retorno.erro = erro;
                console.log(erro)
            });
        setCep(retorno);
    }


    return (
        <div>
            <h1>Exercise 16</h1>
            <p>Content for Exercise 16</p>
            <Container
                maxWidth="sm"
                sx={{
                    width: "25vw",
                    minWidth: "320px",
                    padding: "20px",
                    boxShadow: "7px 7px 21px",
                    borderRadius: "7px",
                }}
            >
                <form>
                    <h2
                        style={{
                            textAlign: "left",
                            fontWeight: "bold",
                            fontSize: "200%",
                        }}
                    >
                        Buscar CEP
                    </h2>
                    <br/>
                    <TextField
                        id="cep"
                        label="CEP"
                        variant="outlined"
                        {...register("cep", {
                            required: "CEP é obrigatório",
                            validate: {
                                matchPattern: (value) =>
                                    regexCep.test(value) || "CEP inválido",
                            },
                        })}
                        error={!!errors.cep}
                        helperText={errors.cep ? errors.cep.message : ""}
                    />
                    <br/>
                    <br/>
                    <Button variant="contained" size="medium" type="button" onClick={handleSubmit(handleClick)}>
                        Buscar
                    </Button>
                    {console.log(cep)}
                    <p>Bairro: {cep.bairro}</p>
                    <p>Logradouro: {cep.logradouro}</p>
                    <p>CEP: {cep.cep}</p>
                    <p>Complemento: {cep.complemento}</p>
                    <p>Estado: {cep.estado}</p>
                    <p>DDD: {cep.ddd}</p>
                </form>
            </Container>
        </div>
    );
};

export default Exercise16;
