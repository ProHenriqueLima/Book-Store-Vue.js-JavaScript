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

          <v-list-item class="mb-3 grey lighten-2" href="/Editora">
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
      <h1 class="white--text mt-1 font-weight-black">Tabela de Editoras</h1>
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
      Adicionar Uma Nova Editora
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
      <v-data-table class="grey lighten-2" :items-per-page="5" :headers="headers" :items="Editoras" :search="search">
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
      <v-card width="490" height="380" class="text-center rounded-card">
        <v-toolbar class="white">
          <span class="blue--text ml-2 mr-1"><b>Cadastrar </b></span>
          <span class="black--text">Cliente</span>
          <v-spacer></v-spacer>
          <v-btn size="40" class="white" @click="fecharmodel">
            <v-icon size="30" color="red">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-form
          @submit.prevent="salvar"
          ref="form"
          lazy-validation
          class="py-4"
        >
          <v-text-field
          prepend-icon="mdi-book-multiple"
            label="Nome da Editora"
            v-model="Editora.nameEditora"
            class="py-4 mx-2"
            :rules="nameRules"
            :counter="30"
          ></v-text-field>
          <v-text-field
          prepend-icon="mdi-city"

            label="Cidade"
            v-model="Editora.cidadeEditora"
            class="py-4 mx-2"
            :rules="cidadeRules"
            :counter="30"
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
      Editora Deletado Com Sucesso !

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar1 = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbar2">
      Editora Adicionado Com Sucesso !

      <template v-slot:action="{ attrs }">
        <v-btn color="green" text v-bind="attrs" @click="snackbar2 = false">
          Ok !
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbar3">
      Editora Atualizado Com Sucesso !

      <template v-slot:action="{ attrs }">
        <v-btn color="green" text v-bind="attrs" @click="snackbar3 = false">
          Ok !
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
<script>

import Editora from "../services/Editoras";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "Editora",
  components: {
 
  },
  data() {
    return {
      Editora: {
        id:"",
        nameEditora: "",
        cidadeEditora: "",
      },
      headers: [
        { text: "Cod.", value: "id" },
        { text: "Nome da Editora", value: "nameEditora" },
        { text: "Cidade da Editora", value: "cidadeEditora" },
        { text: "Actions", value: "actions" },
      ],
      drawer: false,
      group: null,
      search: "",
      ultimaEditora: [],
      Editoras: [],
      adicionar: false,
      alertcadastro: false,
      snackbar1: false,
      snackbar2: false,
      snackbar3: false,

      nameRules: [
        (v) => !!v || "O Nome da Editora é obrigatório",
        (v) =>
          v.length >= 3 ||
          "O Nome da Editora não pode ter menos que 3 characters",
        (v) =>
          v.length <= 30 ||
          "O Nome da Editora não pode ter mais que 30 characters",
      ],
      cidadeRules: [
        (v) => !!v || "A Cidade é obrigatória",
        (v) => v.length >= 3 || "A Cidade não pode ter menos que 3 characters",
        (v) => v.length <= 30 || "A Cidade não pode ter mais que 30 characters",
      ],
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      Editora.listar().then((resposta) => {
        this.Editoras = resposta.data;
        this.ultimaEditora = this.Editoras[this.Editoras.length - 1];
      });
    },
   
    fecharmodel() {
      this.adicionar = false;
    },
    ModalAdicionar() {
      this.limparCampos(),
      this.adicionar = true;
    },
    validate () {
        this.$refs.form.validate()
      },
    salvar() {
      if (this.Editora.id == null) {
        Editora.salvar(this.Editora).then((resposta) => {
          (this.Editora = resposta), this.listar(), (this.adicionar = false);
          Swal.fire({
              title: " Sucesso",
              text: "Editora , Adicionada com Sucesso !",
              icon: "success",
              confirmButtonText: "Ok",
            });
        });
      } else {
        Editora.atualizar(this.Editora).then((resposta) => {
          (this.Editora = resposta), this.listar(), (this.adicionar = false);
           Swal.fire({
              title: "Sucesso ",
              text: "Editora atualizada com sucesso",
              icon: "success",
              confirmButtonText: "Ok",
            });
        });
      }
    },
    limparCampos(){
        this.Editora = {nameEditora: "",
        cidadeEditora: ""};
    

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
          Editora.listar2(id).then((resposta) => {
            this.Editoras = resposta.data;
            this.numeroaluguel = this.Editoras.length
          if(this.Editoras == 0){
            Editora.deletar(id).then((resposta) => {
            (this.Editora = resposta), this.listar();
          });
          Swal.fire(
            "Deletado!",
            "A Editora foi deletado com sucesso.",
            "success"
          );
            }
          else{
            Swal.fire(
            "Não Deletado!",
            "A Editora Possui "+this.numeroaluguel+" livros.",
            "error"
          );
          
          }
          this.listar();
          });
        }
      });
    },
    editar(Editora) {
      (this.Editora = Editora), (this.adicionar = true);
    },
  },
};
</script>
<style>
.rounded-card {
  border-radius: 50px;
}
</style>
