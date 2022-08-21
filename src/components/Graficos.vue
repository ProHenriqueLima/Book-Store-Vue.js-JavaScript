<template>
    <v-row justify="center" >
        <apexchart v-if="!loading" width="450" ref="chart" :options="options" :series="series"></apexchart>
       
        
    </v-row>
    
</template>

<script>
import Aluguel from '../services/Alugueis';
export default {
    name: 'graficoPie',
    data() {
        return {
            loading: true,
            alugueis: [],
            series: [0, 0, 0],
            options: {
                chart: {
                    type: 'pie'
                },
                labels: ['Sem atraso', 'Atrasado', 'Pendente'],

            
               
                noData: {
                    text: 'Carregando...'
                },
                animations: {
                    enabled: true
                },
                
                responsive: [
                    {
                        breakpoint: 720,
                        options: {
                            chart: {
                                width: 300
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                ]
            }
        };
    },
    methods: {
        initialize() {
            Aluguel.listar().then(res => {
                this.alugueis = res.data;

                this.alugueis.forEach(a => {
                    if (a.entrega != '' && a.entrega < a.previsao) {
                        this.series[0]++;
                    }
                });
                this.alugueis.forEach(a => {
                    if (a.entrega > a.previsao) {
                        this.series[1]++;
                    }
                });
                this.alugueis.forEach(a => {
                    if (a.entrega == '') {
                        this.series[2]++;
                    }
                });
                this.loading = false;
            });
        }
    },
    created() {
        this.initialize();
    }
};
</script>

<style></style>
