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
          <v-list-item class="mb-3 " href="/Cliente" >
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

          <v-list-item class="mb-3  grey lighten-2" href="/Livro">
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
      <h1 class="white--text mt-1 font-weight-black">Tabela de Livros</h1>
    </v-card>
    <v-card class="mx-12 mb-8">
      <v-card-title class="grey lighten-2" >
        <v-btn
    @click="ModalAdicionar"
    class="ml-12  mt-4 "
    width=auto
    height="30"
      depressed
      color="primary"
    >
      Adicionar Um Novo Livro
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
      <v-data-table class="grey lighten-2" :items-per-page="5" :headers="headers" :items="Livros" :search="search">
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
      <v-card width="590" height="550" class="text-center rounded-card">
        <v-toolbar class="white">
          <span class="blue--text ml-2 mr-1"><b>Cadastrar </b></span>
          <span class="black--text">Livro</span>
          <v-spacer></v-spacer>
          <v-btn size="40" class="white" @click="fecharmodel">
            <v-icon size="30" color="red">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-form @submit.prevent="salvar" ref="form" class="py-4">
          <v-text-field
          prepend-icon="mdi-book"
            label="Nome do Livro"
            v-model="Livro.nomeLivro"
            class="py-4 mx-2"
            :rules="nomeRules"
            :counter="30"
          ></v-text-field>

          <div class="mx-2">
            <v-menu
              ref="menu"
            
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Lançamento"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="lancamentoRules"
                ></v-text-field>
              </template>
              <v-date-picker
         
                v-model="date"
                :max="
                  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10)
                "
                @change="save"
              ></v-date-picker>
            </v-menu>
          </div>

          <v-text-field
            prepend-icon="mdi-pencil"
            label="Autor"
            v-model="Livro.autorLivro"
            class="py-2 mx-2"
            :rules="autorRules"
          ></v-text-field>

          <v-text-field
            prepend-icon="mdi-numeric"
            label="Quantidade"
            v-model="Livro.quantidade"
            class="py-2 mx-2"
            :rules="quantidadeRules"
          ></v-text-field>

          <v-select
          prepend-icon="mdi-book-multiple"
            v-model="Livro.editoraID"
            :items="Editoras"
            item-text="nameEditora"
            item-value="id"
            class="mx-2"
            :rules="editoraRules"
            label="Editora"
          ></v-select>

          
          <button @click="validate()" class="ml-3">
           <span class="mx-5 mt-2 text-center green--text">
              <b><h3>Salvar</h3></b></span
            >
            
          </button>
        </v-form>
      </v-card>
    </v-dialog>

    

    <v-dialog v-model="tabelaedit" width="unset" height="unset">
      <v-card
        width="200"
        height="500"
        v-model="tabelaedit"
        class="text-center rounded-card"
      >
        <v-simple-table class="py-4 mx-4">
          <template v-slot:default>
            <thead>
              <tr class="blue-grey darken-4">
                <th class="text-center white--text">
                  Id
                </th>
                <th class="text-center white--text">
                  Nome da Editora
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="Editora of Editoras"
                :key="Editora.Id"
                :items-per-page="5"
              >
                <td class="text-center">{{ Editora.id }}</td>
                <td class="text-center">{{ Editora.nameEditora }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar1">
      Livro Deletado Com Sucesso !

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar1 = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbar2">
      Livro Adicionado Com Sucesso !

      <template v-slot:action="{ attrs }">
        <v-btn color="green" text v-bind="attrs" @click="snackbar2 = false">
          Ok !
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbar3">
      Livro Atualizado Com Sucesso !

      <template v-slot:action="{ attrs }">
        <v-btn color="green" text v-bind="attrs" @click="snackbar3 = false">
          Ok !
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
<script>

import Livro from "../services/Livros";
import Editora from "../services/Editoras";
import Swal from "sweetalert2/dist/sweetalert2.js";
var moment = require("moment");
export default {
  name: "Livro",
  components: {

  },
  data() {
    return {
      Livro: {
        nomeLivro: "",
        lancamentoLivro: "",
        autorLivro: "",
        quantidade: "",
        editoraID: "",
      },
      search: "",
      headers: [
        { text: "Cod.",value: "id"},
        { text: "Nome do Livro", value: "nomeLivro" },
        { text: "Lançamento", value: "lancamentoLivro" },
        { text: "Autor", value: "autorLivro" },
        { text: "Quantidade", value: "quantidade" },
        { text: "Nome da Editora", value: "editora.nameEditora" },
        { text: "Actions", value: "actions" },
      ],
      drawer: false,
      group: null,
      activePicker: null,
      date: null,
      menu: false,
      numeroaluguel:"",
      ultimoLivro:[],
      Livros: [],
      Editoras: [],
      adicionar: false,
      alertcadastro: false,
      tabelaedit: false,
      tabeladata: false,
      snackbar1: false,
      snackbar2: false,
      snackbar3: false,
      nomeRules: [
        (v) => !!v || "O Nome do Livro é obrigatório",
        (v) =>
          v.length >= 3 ||
          "O Nome do Livro não pode ter menos que 3 characters",
        (v) =>
          v.length <= 30 ||
          "O Nome do Livro não pode ter mais que 30 characters",
      ],
      autorRules: [
        (v) => !!v || "O Nome do autor é obrigatório",
        (v) =>
          v.length >= 3 ||
          "O Nome do autor não pode ter menos que 3 characters",
        (v) =>
          v.length <= 30 ||
          "O Nome do autor não pode ter mais que 30 characters",
      ],
      lancamentoRules: [
        (v) => !!v || "O Lançamento é obrigatório",
      ],
      editoraRules: [
        (v) => !!v || "O Editora ID é obrigatório e tem que ser válido !",
        (v) => !isNaN(v) || " O Editora ID pode conter apenas números !",
      ],
      quantidadeRules: [
        (v) => !!v || "A quantidade é obrigatória e tem que ser válida !",
        (v) => !isNaN(v) || " A quantidade pode conter apenas números !",
        (v) =>
          v >= 0 ||
          "A quantidade tem que ser maior/ou igual a 0"
      ],
    };
  },
  mounted() {
  this.listar(), this.listarEditora();
  },
  methods: {
    modalCalendario() {
      this.tabeladata = true;
    },
    listar() {
      Livro.listar().then((resposta) => {
        this.Livros = resposta.data;
         this.ultimoLivro=this.Livros[this.Livros.length - 1];
      });
    },
    limparCampos(){
        this.date = null,
        this.Livro = {id:0,nomeLivro: "",
        lancamentoLivro: "",
        autorLivro: "",
        quantidade: "",
        editoraID: 0,};
    },
    listarEditora() {
      Editora.listar().then((resposta) => {
        this.Editoras = resposta.data;
      });
    },
    fecharmodel() {
      this.adicionar = false;
    },
    ModalEditoras() {
      this.tabelaedit = true;
    },
    ModalAdicionar() {
      
      
      this.adicionar = true;
    },
    validate() {
      this.$refs.form.validate();
    },
    salvar() {
      if (this.Livro.quantidade >= 0 ){
      var save ={
        nomeLivro : this.Livro.nomeLivro,
        lancamentoLivro : moment(this.date).format("YYYY/MM/DD"),
        autorLivro : this.Livro.autorLivro,
        quantidade : this.Livro.quantidade,
        editoraID : this.Livro.editoraID,
      }
      
      if (this.Livro.id == null || this.Livro.id == 0) {
        Livro.salvar(save).then((resposta) => {
          (this.Livro = resposta),
            this.listar(),
            (this.adicionar = false),
            Swal.fire({
              title: " Sucesso",
              text: "Livro , Adicionado com Sucesso !",
              icon: "success",
              confirmButtonText: "Ok",
            });
        });
      } else {
        
        Livro.atualizar(this.Livro).then((resposta) => {
          (this.Livro = resposta), this.listar(), (this.adicionar = false);
          Swal.fire({
              title: "Sucesso ",
              text: "Livro atualizado com sucesso",
              icon: "success",
              confirmButtonText: "Ok",
            });
        });
       }
      }
      else {
        Swal.fire({
              title: "Erro ",
              text: "O Livro precisa ter quantidade maior/ou igual a 0",
              icon: "erro",
              confirmButtonText: "Ok",
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
          Livro.verificar(id).then((resposta) => {
            this.Livros = resposta.data;
            this.numeroaluguel = this.Livros.length
          if(this.Livros == 0){
            Livro.deletar(id).then((resposta) => {
            ( console.log(resposta))
            
          });
          this.listar()
          Swal.fire({
              title: "Sucesso ",
              text: "Livro Deletado com sucesso.",
              icon: "success",
              confirmButtonText: "Ok",
            });
           
            }
          else{
            this.listar()
            Swal.fire({
              title: "Não Deletado ",
              text: "O Livro Possui "+this.numeroaluguel+" Alugueis.",
              icon: "error",
              confirmButtonText: "Ok",
            });
         
          }
          });
        }
      });
    },
    editar(Livro) {
      (this.Livro = Livro), this.date = this.Livro.lancamentoLivro;(this.adicionar = true);
    },
  }, 
};
</script>
<style>
.rounded-card {  
  border-radius: 50px;
}
</style>
