import React, {useState, useEffect}from "react";
import '../App.css'

export default function Search(props){


    return(
        <div className="searchDiv">

             <labe>Pesquisa:</labe>

            <select className="selectorInput" value={props.opcao} onChange={ (event)=> props.setOpcao(event.target.value)}>

                         <option value="selecione">Selecione</option>
                         <option value="cliente.razao">Nome</option>
                         <option value="cliente.cnpj_cpf">Cpf</option>
                         <option value="cliente.cidade">Cidade</option>


            </select>
                            <label> <input className="searchInput" placeholder="..." value={props.nome}
                            onChange={(event)=> props.setNome(event.target.value)} /> </label>

        </div>

    )
}