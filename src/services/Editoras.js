import {http} from "./config"

export default {
    listar:() =>{
        return http.get('Editora')
    },
    listar2:(Id) =>{
        return http.get('Livro/Editora/'+Id)
    },
    salvar:(Editora) =>{
        return http.post('Editora', Editora)
    },
    deletar:(Id) =>{
        return http.delete('Editora/'+Id)
    },
    atualizar:(Editora) =>{
        return http.put('Editora/'+Editora.id, Editora)
    }
}