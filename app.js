import { useEffect, useState }from 'react';
import Pagination from './Components/Pagination';
import Selector from "./Components/Selector";
import Search from "./Components/Search";
import './App.css';




function App() {

    const [ itens, setItens ] = useState([])
    const [ itensPerPage, setItensPerPage] = useState(8)
    const [ currentPage, setCurrentPage] = useState(1)
    const [ pages, setpages] = useState(1)
    const [pesquisar, setPesquisar] = useState('')
    const [ nome, setNome] = useState('')
    const [opcao, setOpcao] = useState(0)




    const fetchData = async () => {
        const result = await fetch('http://localhost:8000/cliente?page='+currentPage+'&rp='
            + itensPerPage+ '&query='+nome+ '&qtype='+opcao)
            .then(response => response.json())
            .then(data => data)
        setItens(result.registros)
        setpages(result.total)
    }


    useEffect(()=>{
        fetchData()
    },[currentPage, itensPerPage])


// executa a funcao fetchData depois de 1 segundos
    var  timer;
    useEffect(() => {
        timer = setTimeout(()=> setPesquisar(fetchData()) , 1000);

        return () => clearTimeout(timer);
                  }, [ nome, opcao]);

    return (
        <div className="App" >

            <h1>Relatório Univox</h1>


            <Selector  itensPerPage={itensPerPage} setItensPerPage={setItensPerPage} />


            <Search nome={nome} setNome={setNome}  opcao={opcao} setOpcao={setOpcao}  />



            {/*condição itens? nao deixa executar o map cado resultado for undefined*/}                
            {itens?.map(item => {
                return <div className="item" key={item.id}>

                    <span>NOME: {item.razao}</span>
                    <span>ID: {item.id}</span>
                    <span>ATIVO: {item.ativo}</span>
                    <span>CPF: {item.cnpj_cpf}</span>

                </div>
            })}
               {/*condiçao caso pesquisa do cliente n tenha no backend retornar aviso!*/}
                {itens === undefined ? <p className="condicao">Nenhum resultado encontrado, tente novamente!</p> : ''}
            <Pagination
                pages={pages}
                itensPerPage={itensPerPage}
                setpages={setpages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}

            />

        </div>
    );
}

export default App;
