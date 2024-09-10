import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import {deslogarUsuario, logarUsuario} from "../infra/usuario.jsx";


export default function Exercise15(props) {
    const [usuario, setUsuario] = useState({});
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitted},
        reset,
        setValue,
    } = useForm();

    async function handleClick(data) {
        console.log(data);
        const email = data.email;
        const senha = data.senha;
        let usuario = await logarUsuario(email, senha);
        if (usuario.id) {
            setUsuario(usuario);
            console.log(usuario);
            console.log(usuario);
        } else {
            alert(usuario.erro);
        }
    }

    async function handleClickLogout() {
        let retorno = await deslogarUsuario();
        setUsuario(retorno);
    }

    const telaLogin = (
        <div>
            <h1>Exercise 15</h1>
            <p>Content for Exercise 15</p>
            <p>( email: 'machado@acl.org.br', senha: 'capitu')</p>
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
                <form onSubmit={handleSubmit(handleClick)}>
                    <h2
                        style={{
                            textAlign: "left",
                            fontWeight: "bold",
                            fontSize: "200%",
                        }}
                    >
                        Login
                    </h2>
                    <br/>
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        {...register("email", {
                            required: "Email é obrigatório",
                            validate: {
                                minLength: (value) =>
                                    value.length >= 5 ||
                                    "Email tem que ter pelo menos 5 caracteres",
                                maxLength: (value) =>
                                    value.length <= 30 || "Email só pode ter até 30 caracteres",
                                matchPattern: (value) =>
                                    regexEmail.test(value) || "Email inválido",
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                    />
                    <br/>
                    <br/>
                    <TextField
                        id="senha"
                        label="senha"
                        type="password"
                        autoComplete="current-password"
                        {...register("senha", {
                            required: "Senha é obrigatório",
                        })}
                        error={!!errors.senha}
                        helperText={errors.senha ? errors.senha.message : ""}
                    />
                    <br/>
                    <br/>
                    <Button variant="contained" size="medium" type="submit">
                        Login
                    </Button>
                </form>
            </Container>
        </div>
    );

    const TelaLogado = (
        <div>
            <h1>Exercise 15</h1>
            <p>Content for Exercise 15</p>

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
                        Logado
                    </h2>
                    <Stack sx={{width: "100%"}} spacing={2}>
                        <Alert severity="success">
                            Logado com sucesso como {usuario.email}.
                        </Alert>
                    </Stack>
                    <br/>

                    <Button variant="contained" size="medium" onClick={handleClickLogout}>
                        LogOut
                    </Button>
                </form>
            </Container>
        </div>
    );
    return usuario.id ? TelaLogado : telaLogin;
    //return telaLogin;
}
