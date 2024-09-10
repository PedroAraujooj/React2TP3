// src/exercises/Exercise01.js
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import React from "react";
import {TextField} from "@mui/material";
import {inserirUsuariosTP3, listarUsuariosTP3} from "../infra/usuarioTP3.jsx";

const Exercise10 = () => {
    const [usuarios, setUsuarios] = useState([]);
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexNumerico = /^\d+$/;

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitted},
        reset,
        setValue,
    } = useForm();

    useEffect(() => {
        async function fetchData() {
            const novaLista = await listarUsuariosTP3();
            setUsuarios(novaLista);
            console.log("novaLista");
        }
        fetchData();
    }, []);

    async function handleClick(dados) {
        if (errors.nome || errors.telefone || errors.email ) {
            alert(`Erro em nome: ${errors.nome ? errors.nome.message : "Não há erros"}; \n Erro em telefone: ${errors.telefone ? errors.telefone.message : "Não há erros"} \n
            Erro em email: ${errors.email ? errors.email.message : "Não há erros"}`)
        } else {
            let id = await inserirUsuariosTP3(dados);
            if(id){
                alert(`SUCESSO \n Nome: ${dados.nome}; telefone: ${dados.telefone}; email: ${dados.email}`);
                let novaLista = await listarUsuariosTP3();
                setUsuarios(novaLista);
            }else{
                alert("ERRO");
            }

        }
    }

    return (
        <div>
            <h1>Exercise 10</h1>
            <p>Content for Exercise 10</p>
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
                        validate: {
                            matchPatter: (value) =>
                                regexEmail.test(value) || "O email não é válido."
                        },
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
                <button type={"button"} onClick={handleSubmit(handleClick)}>INSERIR</button>
            </form>
            <ul>
                {
                    usuarios.map((usuario) =>(
                        <li key={usuario.id}>{`Nome: ${usuario.nome}; telefone: ${usuario.telefone}; email: ${usuario.email}`}</li>
                    ))
                }
            </ul>

        </div>
    );
};

export default Exercise10;
