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

    function alerta(icone, mensagem) {
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

    async function cadastrarGenero(e) {
        e.preventDefault();
        //Verificar se o input esta vindo vazio
        if (genero.trim() != "") {
            // alert("O campo prescisa estar preenchido")
            try {
                //cadastrar um genero: post
                await api.post("/genero", { nome: genero });
                alerta("sucess", "Cadastro realizado com sucesso!!")
                setGenero()
            } catch (error) {
                alerta("error", "ERRO: Entre em contato com o suporte!")
                console.log(error);
            }
        } else {
            alerta("info", "Não é possivel cadastrar, campo não preenchido")

        }

        //try => tentar (O esperado)
        //catch => lança a exceção
    }

    // teste
    //useEffect{<function> , <dependencia>}
    // useEffect(()=> {
    //     console.log(genero);
    // }, [genero]);
    // fim do teste

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
                />

            </main>
            <Footer />
        </>

    )
}

export default CadastroGenero;