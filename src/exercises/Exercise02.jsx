// src/exercises/Exercise01.js
import {useState} from "react";
import React from "react";

const Exercise02 = () => {
    const [usuario, setUsuario] = useState({
        nome: "",
        telefone: "",

    })

    function handleClick(e) {
        if(!usuario.nome || !usuario.telefone) {
            alert("NOME E TELEFONE SÃO OBRIGATORIOS")
        }
        else{
            alert(`SUCESSO \n Nome: ${usuario.nome}; telefone: ${usuario.telefone}`);
        }
    }

    return (
        <div>
            <h1>Exercise 02</h1>
            <p>Content for Exercise 02</p>
            <form>
                <input type="text" value={usuario.nome}
                       onChange={(e) => setUsuario(usuario => ({...usuario, nome: e.target.value}))}/>
                <br/>
                <input type="text" value={usuario.telefone}
                       onChange={(e) => setUsuario(usuario => ({...usuario, telefone: e.target.value}))}/>
                <br/>
                <button type={"button"} onClick={handleClick}>Enviar</button>
            </form>
        </div>
    );
};

export default Exercise02;
