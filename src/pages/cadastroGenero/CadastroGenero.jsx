import { useEffect, useState } from "react";

import api from "../../Services/services";

//importar o sweet alert
import Swal from 'sweetalert2';

import Cadastro from "../../components/cadastro/Cadastro"
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header"
import Lista from "../../components/lista/Lista";

const CadastroGenero = () => {

    //nome do genero
    const [genero, setGenero] = useState("");
    const [listaGenero, setListaGenero] = useState([])

    function alertar(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }


    // useEffect(()=>{
    //     alertar("sucess", "Lista modificada);")
    // }, [])

    async function cadastrarGenero(evt) {
        evt.preventDefault();
        //Verificar se o input esta vindo vazio
        if (genero.trim() !== "") {
            // alert("O campo prescisa estar preenchido")
            try {
                //cadastrar um genero: post
                await api.post("genero", { nome: genero });
                alertar("success", "Cadastro realizado com sucesso! 🎉")
                setGenero()
                listarGenero()
            } catch (error) {
                alertar("error", "ERRO: Entre em contato com o suporte! 🤖")
                console.log(error);
            }
        } else {
            alertar("info", "Não é possivel cadastrar, campo não preenchido! 📋")

        }

        //try => tentar (O esperado)
        //catch => lança a exceção
    }


    async function deletarGenero(generoId) {

        //COMEÇO DO ALERTA
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: true
        });
        swalWithBootstrapButtons.fire({
            title: "Você tem certeza?",
            text: "Não será possivel reverter!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    //deletar um genero: delete
                    await api.delete(`genero/${generoId.idGenero}`);
                    alertar("success", "Gênero deletado com sucesso! 💣")
                    swalWithBootstrapButtons.fire({
                        title: "Deletado!",
                        text: "O gênero foi deletado.",
                        icon: "success"
                    });

                    setGenero()
                    listarGenero();

                } catch (error) {
                    alertar("error", "ERRO: Entre em contato com o suporte! 🤖")
                    console.log(error);
                }
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "O gênero não foi deletado",
                    icon: "error"
                });
            }
        });
        //FIM DO ALERTA

        //Verificar se o input esta vindo vazio
        // alert("O campo prescisa estar preenchido")


        // alertar("info", "ID não encontrado 🔍")
        //try => tentar (O esperado)
        //catch => lança a exceção
    }

    async function editarGenero(idGenero) {
        const { value: novoGenero } = await Swal.fire({
            title: "Modifique seu gênero",
            input: "text",
            inputLabel: "Novo gênero",
            inputValue: idGenero.nome,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }

        });
        if (novoGenero) {
            try {
                await api.put(`genero/${idGenero.idGenero}`,
                    { nome: novoGenero })
                Swal.fire(`O gênero modificado é ${novoGenero}`);

                setGenero()
                listarGenero();

            } catch (error) {
                console.log(error);

            }
        }
    }

    //síncrono => Acontece simultâneamente
    //assincrono => Esperar algo/resposta para ir para outro bloco de código
    async function listarGenero() {
        try {
            //await -> Aguarde ter uma resposta da solitação
            const resposta = await api.get("genero");
            // console.log(resposta.data);
            // console.log(resposta.data [3].idGenero);
            // console.log(resposta.data [3].nome);
            setListaGenero(resposta.data)

        } catch (error) {
            console.log(error);
        }
    }

    // teste
    //useEffect{<function> , <dependencia>}
    // useEffect(()=> {
    //     console.log(genero);
    // }, [genero]);
    // fim do teste

    //teste: Validar o que esta sendo passado como resposta em listar genero
    useEffect(() => {
        listarGenero();
    }, [])
    //fim do teste


    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Gênero"
                    visibilidade="none"
                    placeholder="gênero"
                    //Atribuindo a função
                    funcCadastro={cadastrarGenero}

                    //Atribuindo o valor ao input:
                    valorInput={genero}

                    setValorInput={setGenero}
                />
                <Lista
                    tituloLista="Lista de Generos"
                    visiGenero="none"
                    funcDeletar={deletarGenero}
                    funcEditar={editarGenero}

                    //atribuir para lista, o meu estado atual:
                    lista={listaGenero}
                />

            </main>
            <Footer />
        </>

    )
}

export default CadastroGenero;