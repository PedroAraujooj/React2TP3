// src/exercises/Exercise01.js
import {useState} from "react";
import React from "react";
import {TextField} from "@mui/material";

const Exercise03 = () => {
    const [usuario, setUsuario] = useState({
        nome: "",
        telefone: "",

    });
    const [erros, setErros] = useState({
        nome: "",
        telefone: "",

    });

    function handleClick(e) {
        if (erros.nome || erros.telefone) {
            alert(`Erro em nome: ${erros.nome?erros.nome:"Não há erros"}; \n Erro em telefone: ${erros.telefone?erros.telefone:"Não há erros"}`)
        } else {
            alert(`SUCESSO \n Nome: ${usuario.nome}; telefone: ${usuario.telefone}`);
        }
    }

    return (
        <div>
            <h1>Exercise 03</h1>
            <p>Content for Exercise 03</p>
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
                    value={usuario.nome}
                    onChange={(e) => {
                        setUsuario(usuario => ({...usuario, nome: e.target.value}));
                        !e.target.value? setErros(erros => ({...erros, nome: "Nome é obrigatorio"}))
                            : setErros(erros => ({...erros, nome: ""}));
                    }
                    }
                    error={!!erros.nome}
                    helperText={erros.nome ? erros.nome : ""}
                />
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
                value={usuario.telefone}
                onChange={(e) => {
                    setUsuario(usuario => ({...usuario, telefone: e.target.value}));
                    !(/^\d+$/).test(e.target.value)? setErros(erros => ({...erros, telefone: "Telefone deve ser numérico"}))
                    : setErros(erros => ({...erros, telefone: ""}));
                }
                }
                error={!!erros.nome}
                helperText={erros.telefone ? erros.telefone : ""}
            />
                <button type={"button"} onClick={handleClick}>Enviar</button>
            </form>
        </div>
    );
};

export default Exercise03;
