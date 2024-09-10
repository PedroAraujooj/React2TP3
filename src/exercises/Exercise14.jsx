// src/exercises/Exercise01.js
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import React from "react";
import {Button, TextField} from "@mui/material";
import {
    alterarUsuarioTP3,
    excluirUsuarioTP3,
    inserirUsuariosTP3,
    listarUsuariosTP3,
    obterUsuarioTP3
} from "../infra/usuarioTP3.jsx";
import ListaUsuariosTP3 from "../components/listaUsuariosTP3.jsx";

const Exercise14 = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [idEmEdicao, setIdEmEdicao] = useState("");
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
            if (idEmEdicao && !isSubmitted) {
                const user = await obterUsuarioTP3(idEmEdicao);
            } else {
                reset();
            }
        }
        fetchData();
    }, [idEmEdicao]);

    async function handleClick(dados) {
        if (errors.nome || errors.telefone || errors.email ) {
            alert(`Erro em nome: ${errors.nome ? errors.nome.message : "Não há erros"}; \n Erro em telefone: ${errors.telefone ? errors.telefone.message : "Não há erros"} \n
            Erro em email: ${errors.email ? errors.email.message : "Não há erros"}`)
        } else {
            if (idEmEdicao) {
                await alterarUsuarioTP3(dados, idEmEdicao);
                const user = await obterUsuarioTP3(idEmEdicao);
                alert(`SUCESSO \n Nome: ${user.nome}; telefone: ${user.telefone}; email: ${user.email}`);
                setIdEmEdicao("");
            } else {
                let id = await inserirUsuariosTP3(dados);
                if(id){
                    alert(`SUCESSO \n Nome: ${dados.nome}; telefone: ${dados.telefone}; email: ${dados.email}`);
                    let novaLista = await listarUsuariosTP3();
                    setUsuarios(novaLista);
                }else{
                    alert("ERRO");
                }
                setIdEmEdicao(id);
            }


        }
    }

    async function handleExcluir() {
        console.log(idEmEdicao);
        await excluirUsuarioTP3(idEmEdicao);
        setIdEmEdicao("");
    }

    return (
        <div>
            <h1>Exercise 14</h1>
            <p>Content for Exercise 14</p>
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
                <Button variant={"contained"} type={"button"} onClick={handleSubmit(handleClick)}>{idEmEdicao? "ALTERAR":"INSERIR"}</Button>
                <Button variant={"contained"} color={"error"} type={"button"} onClick={handleExcluir}>EXCLUIR</Button>
            </form>
            <ListaUsuariosTP3 usuarios={usuarios} setIdEmEdicao={setIdEmEdicao}/>

        </div>
    );
};

export default Exercise14;
