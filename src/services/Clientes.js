import {http} from "./config"

export default {
    listar:() =>{
        return http.get('Cliente')
    },
    listar2:(email) =>{
        return http.get('Cliente/email/'+email)
    },
    salvar:(Cliente) =>{
        return http.post('Cliente', Cliente)
    },
    verificar:(id)=>{
        return http.get('Aluguel/Cliente/'+id)
    },
    
    deletar:(Id) =>{
        return http.delete('Cliente/'+Id)
    },
    atualizar:(Cliente) =>{
        return http.put('Cliente/'+Cliente.id, Cliente)
        
        
    }
}