<template>
  <v-app class="white">
       <v-card
    color=""
    flat
 
    tile
  >
    <v-toolbar dense height=60%  class=" white">
      <v-app-bar-nav-icon @click="drawer = true"  class="black--text"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class=" blue--text"><h3><b>Wda</b></h3></v-toolbar-title>
      <v-toolbar-title class="black--text"><b>Livraria</b></v-toolbar-title>
      <v-spacer></v-spacer>


      


      
      
    </v-toolbar>
  </v-card>
    
    <v-navigation-drawer
      v-model="drawer"
      class="white"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="blue--text text--accent-4"
        >
          <row >
          <h1 class="black--text mt-1 ml-2 mb-4 font-weight-black"><b class="blue--text font-weight-black mr-1">Wda</b>Livraria</h1>
          </row>
          <v-list-item class="mb-3" href="/">
            <v-list-item-icon>
              <v-icon class="blue--text">mdi-chart-line</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="black--text">DashBoard</v-list-item-title>
          </v-list-item>
            

            <hr class="blue--text">
          <v-list-item class="mb-3 grey lighten-2" href="/Cliente" >
            <v-list-item-icon>
              <v-icon class="blue--text">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="black--text">Cliente</v-list-item-title>
          </v-list-item>
            <hr class="blue--text">

          <v-list-item class="mb-3" href="/Editora">
            <v-list-item-icon>
              <v-icon class="blue--text">mdi-book-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="black--text" >Editora</v-list-item-title>
          </v-list-item>
            <hr class="blue--text">

          <v-list-item class="mb-3" href="/Livro">
            <v-list-item-icon>
              <v-icon class="blue--text">mdi-book</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="black--text" >Livros</v-list-item-title>
          </v-list-item>
            <hr class="blue--text">

          <v-list-item href="/Alugueis" >
            <v-list-item-icon>
              <v-icon class="blue--text">mdi-cash</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="black--text">Alugueis</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <hr>
    
    <v-card class=" mt-6 blue darken-3 text-center mx-12" height="50">
      <h1 class="white--text mt-1 font-weight-black">Tabela de Clientes</h1>
    </v-card>
    <v-card class="mx-12 mb-8">
      <v-card-title class="grey lighten-2" >
        <v-btn
    @click="ModalAdicionar()"
    class="ml-12  mt-4 "
    width=auto
    height="30"
      depressed
      color="primary"
    >
      Adicionar Um Novo Cliente
    </v-btn>
        
        <v-text-field
          class="grey lighten-2 ml-12"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table class="grey lighten-2" :items-per-page="5" :headers="headers" :items="Clientes" :search="search">
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2 green--text" @click="editar(item)">
            mdi-pencil
          </v-icon>
          <v-icon small class="red--text" @click="excluir(item.id)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="adicionar" width="unset" height="unset">
      <v-card width="490" height="520" class="text-center rounded-card">
        <v-toolbar class="white">
          <span class="blue--text ml-2 mr-1"><b>Cadastrar </b></span>
          <span class="black--text">Cliente</span>
          <v-spacer></v-spacer>
          <v-btn size="40" class="white" @click="fecharmodel">
            <v-icon size="30" color="red">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>


        <v-form @submit.prevent="salvar" ref="form"
          lazy-validation
          class="py-4">
          <v-text-field
          prepend-icon="mdi-account-circle"
            label="Nome do Cliente"
            v-model="Cliente.nomeCliente"
            class="py-4 mx-2"
            :rules="nameRules"
            :counter="30"
          ></v-text-field>
          <v-text-field
          prepend-icon="mdi-city"
            label="Cidade"
            v-model="Cliente.cidadeCliente"
            class="py-4 mx-2"
            :rules="cidadeRules"
            :counter="30"
          ></v-text-field>
          <v-text-field
          prepend-icon="mdi-home"
            label="Endereço"
            v-model="Cliente.enderecoCliente"
            class="py-4 mx-2"
            :rules="enderecoRules"
            :counter="30"
          ></v-text-field>
          <v-text-field
          prepend-icon="mdi-account"
            label="Email"
            v-model="Cliente.emailCliente"
            class="py-4 mx-2"
            :rules="emailRules"
          ></v-text-field>
          
          <button @click="validate()" class="ml-3">
           <span class="mx-5 mt-2 text-center green--text">
              <b><h3>Salvar</h3></b></span
            >
            
          </button>
        </v-form>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar1">
      Cliente Deletado Com Sucesso !

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar1 = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbar2">
      Cliente Adicionado Com Sucesso !

      <template v-slot:action="{ attrs }">
        <v-btn color="green" text v-bind="attrs" @click="snackbar2 = false">
          Ok !
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbar3">
      Cliente Atualizado Com Sucesso !

      <template v-slot:action="{ attrs }">
        <v-btn color="green" text v-bind="attrs" @click="snackbar3 = false">
          Ok !
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarErro">
      Confira Todos os Campos !

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
<script>

import Swal from "sweetalert2/dist/sweetalert2.js";

import Cliente from "../services/Clientes";
export default {
  name: "Cliente",
  components: {

  },
  data() {
    return {
      Cliente: {
    
        nameEditora: "",
        cidadeEditora: "",
        enderecoCliente: "",
        emailCliente: "",
      },
      search: "",
      Clientes: [],
      headers: [
        { text: "Cod.", value: "id" },
        { text: "Nome do Cliente", value: "nomeCliente" },
        { text: "Cidade", value: "cidadeCliente" },
        { text: "Endereço", value: "enderecoCliente" },
        { text: "Email", value: "emailCliente" },
        { text: "Actions", value: "actions" },
      ],
      drawer: false,
      group: null,
      ultimoCliente:[],
      adicionar: false,
      alertcadastro: false,
      snackbar1: false,
      snackbar2: false,
      snackbar3: false,
      snackbarErro: false,
      nameRules: [
        (v) => !!v || "O Nome do Cliente é obrigatório",
        (v) =>
          (v && v.length >= 3) ||
          "O Nome do Cliente não pode ter menos que 3 characters",
        (v) =>
          (v && v.length <= 30) ||
          "O Nome do Cliente não pode ter mais que 30 characters",
      ],
      cidadeRules: [
        (v) => !!v || "A Cidade é obrigatória",
        (v) =>
          (v && v.length >= 3) ||
          "A Cidade não pode ter menos que 3 characters",
        (v) =>
          (v && v.length <= 30) ||
          "A Cidade não pode ter mais que 30 characters",
      ],
      enderecoRules: [
        (v) => !!v || "O Endereço é obrigatória",
        (v) =>
          (v && v.length >= 3) ||
          "O Endereço não pode ter menos que 3 characters",
        (v) =>
          (v && v.length <= 30) ||
          "O Endereço não pode ter mais que 30 characters",
      ],
      emailRules: [
        (v) => !!v || "O Email é obrigatório",
        (v) =>
          (v && v.length >= 3) || "O Email não pode ter menos que 3 characters",
        (v) => /.+@.+\..+/.test(v) || "E-mail precisa ser válido !",
      ],
    };
  },
  mounted() {
   this.listar();
  },
  methods: {

    validate () {
        this.$refs.form.validate()
      },

    listar() {
      Cliente.listar().then((resposta) => {
        this.Clientes = resposta.data;
      this.ultimoCliente=this.Clientes[this.Clientes.length - 1];
      });
    },
    fecharmodel() {
      this.adicionar = false;
    },
    ModalAdicionar() {
      this.limparCampos(),
      this.adicionar = true;
    },
    limparCampos(){
        this.Cliente = {id:0, nameEditora: "",
        cidadeEditora: "",
        enderecoCliente: "",
        emailCliente: "",};
        this.listar()
    

    },
    salvar() {
      if (this.Cliente.id == null || this.Cliente.id == 0) {
        Cliente.listar2(this.Cliente.emailCliente).then((resposta) => {
          this.Clientes = resposta.data;
          if(this.Clientes == 0){
            Cliente.salvar(this.Cliente).then((resposta) => {
              (this.Cliente = resposta),
                this.listar(),
                (this.adicionar = false),
                Swal.fire({
                  title: " Sucesso",
                  text: "Cliente , Adicionado com Sucesso !",
                  icon: "success",
                  confirmButtonText: "Ok",
                });
            })
          } else {

              Swal.fire({
                  title: " Ação não concluida",
                  text: "Email , Já está sendo ultilizado  !",
                  icon: "erro",
                  confirmButtonText: "Ok",
                });
                this.listar()

          }
          
        })
      } else {
        Cliente.atualizar(this.Cliente).then((resposta) => {
          (this.Cliente = resposta),
            this.listar(),
            (this.adicionar = false),
            Swal.fire({
              title: "Sucesso ",
              text: "Cliente atualizado com sucesso",
              icon: "success",
              confirmButtonText: "Ok",
            });
        });
        
      }
      
    },
    excluir(id) {
     Swal.fire({
        title: "Você quer mesmo deletar ?",
        text: "Você não irá poder reverter isso !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, Delete!",
      }).then((result) => {
        if (result.isConfirmed) {
          Cliente.verificar(id).then((resposta) => {
            this.Clientes = resposta.data;
            this.numeroaluguel = this.Clientes.length
          if(this.Clientes == 0){
            Cliente.deletar(id).then((resposta) => {
            (this.Cliente = resposta)
            this.listar()
          });
          Swal.fire({
              title: "Sucesso ",
              text: "Cliente Deletado com sucesso.",
              icon: "success",
              confirmButtonText: "Ok",
            });
            }
          else{
            this.listar()
            Swal.fire({
              title: "Não Deletado ",
              text: "O Cliente Possui "+this.numeroaluguel+" Alugueis.",
              icon: "error",
              confirmButtonText: "Ok",
            }) ;

          }
          });
        }
      });
    },
    editar(Cliente) {
      (this.Cliente = Cliente), (this.adicionar = true);
    },
  },
};
</script>
<style>
.rounded-card {
  border-radius: 50px;
}
</style>
