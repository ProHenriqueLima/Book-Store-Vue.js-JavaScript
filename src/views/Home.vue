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
          <v-list-item class="mb-3" href="/Cliente">
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

          <v-list-item href="/Alugueis">
            <v-list-item-icon>
              <v-icon class="blue--text">mdi-cash</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="black--text">Alugueis</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <hr>
    

 
    
      
     
        <v-card
          :loading="loading"
          class=" mt-5 mx-auto grey lighten-2  text-center"
         
          href="Alugueis"
        >
      <v-row>
        <v-card
          :loading="loading"
          class=" mt-5 ml-6 mr-4 blue darken-2 text-center"
          width="300"
          height="60"
          href="Alugueis"
        >
          <div>
            <v-card-title size="20" class="ml-3 white--text text-center  "
              ><v-icon class="white--text mr-2" >mdi-briefcase</v-icon> Alugueis   <b><v-spacer></v-spacer><v-icon size="30" class=" white--text ml-5 mr-2">mdi-arrow-right-bold</v-icon>{{ this.Alugueis.length }}</b>
            </v-card-title>
          </div>
       
        </v-card>
        <v-card
          :loading="loading"
          class=" my-5 ml-4 mr-4 blue darken-3 text-center"
          width="300"
          height="60"
          href="/Cliente"
        >
          <div>
            <v-card-title class="ml-3 white--text text-center"
              > <v-icon class="white--text mr-2">mdi-account</v-icon> Clientes  <b><v-icon size="30" class=" white--text ml-5 mr-2">mdi-arrow-right-bold</v-icon>{{ this.Clientes.length }}</b>
            </v-card-title>
          </div>
              
        </v-card>
        <v-card
          :loading="loading"
          class=" my-5 ml-4 mr-6 blue darken-4  text-center"
          width="300"
          height="60"
          href="/Livro"
        >
          <div>
            <v-card-title class="ml-3 white--text text-center"
              > <v-icon class="white--text mr-2">mdi-book-open-page-variant</v-icon> Livros  <b><v-icon size="30" class=" white--text ml-5 mr-2">mdi-arrow-right-bold</v-icon>{{ this.Livros.length }}</b>
            </v-card-title>
          </div>
          
        </v-card>
      </v-row>
      </v-card>
     <v-row class="mx-auto">
    <v-card class=" mt-6 grey lighten-2" width="500"
          height="350">
          <v-card-title class="ml-3  text-center">
             <v-icon class="indigo--text" size=30>mdi-chart-line</v-icon><b class="ml-2">Resumo de Alugueis</b>
          </v-card-title>
     <graficos /> 
    </v-card>
    <v-card class=" mt-6 ml-5 grey lighten-2" width="500"
          height="350">
          <v-card-title class="mx-auto text-center">
              <v-icon class="indigo--text" size=30>mdi-cash</v-icon><b class="ml-2">Ultimo Aluguel</b>
          </v-card-title>
          <v-card-text class="ml-5">
            <h3>° Livro : {{this.ultimoAluguel.livro.nomeLivro}}</h3>
            </v-card-text>
          <v-card-text class="ml-5">
            <h3>° Cliente : {{this.ultimoAluguel.cliente.nomeCliente}}</h3>
            </v-card-text>
            <v-card-text class="ml-5">
            <h3>° Data de Aluguel : {{this.ultimoAluguel.data_Aluguel}} </h3>
            </v-card-text>
            <v-card-text class="ml-5">
            <div  v-if="this.ultimoAluguel.entrega != '' && this.ultimoAluguel.entrega < this.ultimoAluguel.previsao">
             <h3 class="green--text">° Status : Entregue No Prazo !</h3>
          </div>
          <div  v-if="this.ultimoAluguel.entrega > this.ultimoAluguel.previsao">
             <h3 class="red--text">° Status : Entregue com Atraso !</h3>
          </div>
          <div  v-if="this.ultimoAluguel.entrega == ''">
             <h3 class="yellow--text">° Status : Não devolvido</h3>
          </div>
            </v-card-text>
      </v-card>
    </v-row>
  </v-app>
</template>

<script>

import Alugueis from "../services/Alugueis.js";
import Clientes from "../services/Clientes.js";
import Livros from "../services/Livros";
 import Graficos from "../components/Graficos"
export default {
  name: "Home",
  components: {
     Graficos
  },
  data() {
    return {
       drawer: false,
      group: null,
      Alugueis: [],
      Livros: [],
      Clientes:[],
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      Alugueis.listar().then((resposta) => {
        (this.Alugueis = resposta.data), console.log(this.Alugueis);
        this.ultimoAluguel=this.Alugueis[this.Alugueis.length - 1];
      });
      Livros.listar().then((resposta) => {
        this.Livros = resposta.data;
      });
      Clientes.listar().then((resposta) => {
        this.Clientes = resposta.data;
      });
    },
  },
};
</script>
