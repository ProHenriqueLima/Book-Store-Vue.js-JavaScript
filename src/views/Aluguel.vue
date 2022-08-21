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

          <v-list-item href="/Alugueis" class="grey lighten-2">
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
      <h1 class="white--text mt-1 font-weight-black">Tabela de Alugueis</h1>
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
      Adicionar Um Novo Aluguel
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
      <v-data-table
        :items-per-page="5"
        class="grey lighten-2"
        :headers="headers"
        :items="Alugueis"
        :search="search"
      >
        <template v-slot:[`item.actions`]="{ item }">
          
          <div v-if="item.entrega == ''">
            <v-icon
              title="Entregar"
              size="20"
              class="red--text"
              @click="editar(item)"
              >mdi-book-arrow-up</v-icon
            >
          </div>
          <div v-else>
            <v-icon
              title="Entregue"
              size="20"
              class="green--text"
              

              >mdi-book</v-icon
            >
          </div>
        </template>
      </v-data-table>
    </v-card>

    
    <v-dialog v-model="adicionar" width="unset" height="unset">
      <v-card width="490" height="400" class="text-center rounded-card">
        <v-toolbar class="white">
          <span class="blue--text ml-2 mr-1"><b>Cadastrar </b></span>
          <span class="black--text">Aluguel</span>
          <v-spacer></v-spacer>
          <v-btn size="40" class="white" @click="fecharmodel">
            <v-icon size="30" color="red">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-form
          @submit.prevent="salvar()"
          ref="form"
          lazy-validation
          class="py-4"
        >
          <v-select
            prepend-icon="mdi-book"
            class="mx-2"
            v-model="Aluguel.livroId"
            :items="LivrosAluguel"
            item-text="nomeLivro"
            item-value="id"
            :rules="livroRules"
            label="Livro"
            
          ></v-select>
      
          <v-select
            class="mx-2"
            prepend-icon="mdi-account"
            v-model="Aluguel.clienteId"
            :items="Clientes"
            item-text="nomeCliente"
            item-value="id"
            :rules="clienteRules"
            label="Cliente"
          ></v-select>

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
                  :rules="dataRules"
                  v-model="date"
                  label="Previsão de entrega"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                :min="
                  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10)
                "
                @change="save"
              ></v-date-picker>
            </v-menu>
          </div>

          <button @click="validate()" class=" ">
            <span class="mx-5 my-2 text-center green--text">
              <b><h3>Salvar</h3></b></span
            >
          </button>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="tabelaliv" width="unset" height="unset">
      <v-card
        width="200"
        height="500"
        v-model="tabelaliv"
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
                  Nome do Livro
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="Livro of Livros" :key="Livro.Id" :items-per-page="5">
                <td class="text-center">{{ Livro.id }}</td>
                <td class="text-center">{{ Livro.nomeLivro }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-dialog>
    <v-dialog v-model="tabelacli" width="unset" height="unset">
      <v-card
        width="200"
        height="500"
        v-model="tabelaliv"
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
                  Nome do Cliente
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="Cliente of Clientes"
                :key="Cliente.id"
                :items-per-page="5"
              >
                <td class="text-center">{{ Cliente.id }}</td>
                <td class="text-center">{{ Cliente.nomeCliente }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar1">
      Aluguel Deletado Com Sucesso !

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar1 = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbar2">
      Aluguel Adicionado Com Sucesso !

      <template v-slot:action="{ attrs }">
        <v-btn color="green" text v-bind="attrs" @click="snackbar2 = false">
          Ok !
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbar3">
      Aluguel Entregue Com Sucesso !

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
import Cliente from "../services/Clientes";
import Alugueis from "../services/Alugueis";
import Swal from "sweetalert2/dist/sweetalert2.js";
var moment = require("moment");

export default {
  name: "Aluguel",
  components: {},
  data() {
    return {
      Aluguel: {
        livroId: "",
        clienteId: "",
        data_Aluguel: "",
        entrega: "",
        status: "",
      },
      search: "",
      headers: [
        { text: "Cod.", value: "id" },
        { text: "Nome do livro", value: "livro.nomeLivro" },
        { text: "Nome do cliente", value: "cliente.nomeCliente" },
        { text: "Data de Aluguel", value: "data_Aluguel" },
        { text: "Previsão de Entrega", value: "previsao" },
        { text: "Entrega do Livro", value: "entrega" },
        { text: "Status", value: "status" },
        { text: "", value: "actions" },
      ],

      drawer: false,
      group: null,
      ultimoAluguel: [],
      activePicker: null,
      date: null,
      menu: false,
      Alugueis: [],
      Livros: [],
      LivrosAluguel: [],
      Clientes: [],
      adicionar: false,
      alertcadastro: false,
      tabelaliv: false,
      tabelacli: false,
      snackbar1: false,
      snackbar2: false,
      snackbar3: false,
      dataRules: [(v) => !!v || "A Previsão é obrigatório !"],
      clienteRules: [(v) => !!v || "O Cliente é obrigatório !"],
      livroRules: [(v) => !!v || "O Livro  é obrigatório !"],
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  mounted() {
    this.listar(), this.listarLivrosDispo() ,this.listarLivros(), this.listarClientes();
  },
  methods: {
    listar() {
      Alugueis.listar().then((resposta) => {
        this.Alugueis = resposta.data;
        this.ultimoAluguel = this.Alugueis[this.Alugueis.length - 1];
      });
    },
    listarLivrosDispo() {
      Livro.listar4().then((resposta) => {
        this.LivrosAluguel = resposta.data;
        console.log(this.LivrosAluguel);
      });
    },

    validate() {
      this.$refs.form.validate();
    },

    listarLivros() {
      Livro.listar().then((resposta) => {
        this.Livros = resposta.data;
      });
    },
    listarClientes() {
      Cliente.listar().then((resposta) => {
        this.Clientes = resposta.data;
      });
    },
    fecharmodel() {
      this.adicionar = false;
    },
    ModalLivros() {
      this.tabelaliv = true;
    },
    ModalClientes() {
      this.tabelacli = true;
    },
    ModalAdicionar() {
      this.adicionar = true;
    },
    salvar() {
      var data = new Date();
      var dia = String(data.getDate()).padStart(2, "0");
      var mes = String(data.getMonth() + 1).padStart(2, "0");
      var ano = data.getFullYear();
      var dataAtual = ano + "/" + mes + "/" + dia;

      var dt = moment(dataAtual).format("YYYY/MM/DD");
      var save = {
        livroId: this.Aluguel.livroId,
        clienteId: this.Aluguel.clienteId,
        data_Aluguel: dt,
        previsao: moment(this.date).format("YYYY/MM/DD"),
        entrega: "",
      };
      console.log(dt);
      console.log(save);

      Alugueis.salvar(save)
        .then((resposta) => {
          (this.Aluguel = resposta),
            this.listar(),
            console.log(this.Aluguel),
            (this.adicionar = false),
            Swal.fire({
              title: "Aluguel Feito com Sucesso ",
              icon: "success",
              confirmButtonText: "Ok",
            });
        })
        
      Livro.listar3(this.Aluguel.livroId).then((resposta2) => {
        this.Livros = resposta2.data;
        var save2 = {
          id: this.Livros.id,
          nomeLivro: this.Livros.nomeLivro,
          lancamentoLivro: this.Livros.lancamentoLivro,
          autorLivro: this.Livros.autorLivro,
          quantidade: this.Livros.quantidade - 1,
          editoraID: this.Livros.editoraID,
        };
        console.log(save2);
        Livro.atualizar(save2).then((resposta3) => {
          console.log(resposta3);
        });
      });
    },
    editar(Aluguel) {
      this.Aluguel = Aluguel;
      var data = new Date();
      var dia = String(data.getDate()).padStart(2, "0");
      var mes = String(data.getMonth() + 1).padStart(2, "0");
      var ano = data.getFullYear();
      var dataAtual = ano + "/" + mes + "/" + dia;

      var dt = moment(dataAtual).format("YYYY/MM/DD");
      var save = {
        id: this.Aluguel.id,
        livroId: this.Aluguel.livroId,
        clienteId: this.Aluguel.clienteId,
        data_Aluguel: this.Aluguel.data_Aluguel,
        previsao: this.Aluguel.previsao,
        entrega: dt,
      };
        if(save.entrega != '' && save.entrega < save.previsao){
            save = {
              id: this.Aluguel.id,
              livroId: this.Aluguel.livroId,
              clienteId: this.Aluguel.clienteId,
              data_Aluguel: this.Aluguel.data_Aluguel,
              previsao: this.Aluguel.previsao,
              entrega: dt,
              status: "Entregue no Prazo"
            };
        }
        if (save.entrega > save.previsao){
            save = {
              id: this.Aluguel.id,
              livroId: this.Aluguel.livroId,
              clienteId: this.Aluguel.clienteId,
              data_Aluguel: this.Aluguel.data_Aluguel,
              previsao: this.Aluguel.previsao,
              entrega: dt,
              status: "Entregue com atraso"
            };
        }
      console.log(save);
      Alugueis.devolver(save).then((resposta) => {
        (this.Aluguel = resposta), this.listar(), (this.snackbar3 = true);
      });
        Livro.listar3(save.livroId).then((resposta2) => {
        this.Livros = resposta2.data;
        var save2 = {
          id: this.Livros.id,
          nomeLivro: this.Livros.nomeLivro,
          lancamentoLivro: this.Livros.lancamentoLivro,
          autorLivro: this.Livros.autorLivro,
          quantidade: this.Livros.quantidade + 1,
          editoraID: this.Livros.editoraID,
        };
        console.log(save2);
        Livro.atualizar(save2).then((resposta3) => {
          console.log(resposta3);
        });
      }); 
      
    },

    save(date) {
      this.$refs.menu.save(date);
    },
    excluir(id) {
      Alugueis.deletar(id).then((resposta) => {
        (this.Aluguel = resposta), this.listar();
      });
    },
  },
};
</script>
<style>
.rounded-card {
  border-radius: 50px;
}

::-webkit-scrollbar {
  width: 0px;
}
</style>
