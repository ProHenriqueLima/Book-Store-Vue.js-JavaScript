import {http} from "./config"

export default {
    listar:() =>{
        return http.get('Livro')
    },
    verificar:(id)=>{
        return http.get('Aluguel/Livro/'+id)
    },
    listar2:() =>{
        return http.get('Editora')
    },
    listar3:(id) =>{
        return http.get('Livro/'+id)
    },
    listar4:() =>{
        return http.get('Livro/LivroAluguel')
    },
    salvar:(Livro) =>{
        return http.post('Livro', Livro)
    },
    deletar:(Id) =>{
        return http.delete('Livro/'+Id)
    },
    atualizar:(Livro) =>{
        return http.put('Livro/'+Livro.id, Livro)
    }
}