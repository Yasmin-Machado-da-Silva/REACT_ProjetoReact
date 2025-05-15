import "./Lista.css";
import Editar from "../../assets/img/pen-to-square-solid.svg"
import Excluir from "../../assets/img/trash-can-regular.svg"

const Lista = (props) => {
    return (
        <section className="layout_grid listagem">
            <h1>{props.tituloLista}</h1>
            <hr />

            <div className="tabela">
                <table>
                    {/*cabeçalho da tabela: */}
                    <thead>
                        {/* tr = table row*/}
                        <tr className="table_cabecalho">
                            <th>Nome</th>
                            <th style={{ display: props.visiGenero }}>Gênero</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    {/*tbody => corpo da tabela*/}
                    <tbody>
                        {/* Verificar se a lista está vindo vazia */}
                        {props.lista && props.lista.length > 0 ? (
                            //Vamos mapear os item da lista
                            props.lista.map((item) => (

                                <tr className="item_lista" key={item.idGenero}>
                                    <td data-cell="Nome">
                                        {item.nome}
                                    </td>
                                    <td data-cell="Genero" style={{ display: props.visiGenero }}>Ação</td>
                                    <td data-cell="Editar" ><img src={Editar} alt="Caneta" /></td>
                                    <button onClick={() => (props.funcDeletar(item))}>

                                    <td data-cell="Excluir"><img src={Excluir} alt="Lixo" /></td>

                                    </button>

                                </tr>
                            ))
                        ) :
                            (
                                <p>Nenhum gênero foi encontrado</p>
                            )

                        }

                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Lista;