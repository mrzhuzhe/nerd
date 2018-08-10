<template>
    <div class="container">
      <form class="col-sm-8">
        <legend>PV UV查询</legend>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" >开始时间：</label>
          <div class="col-sm-4">
            <input class="form-control datetimepicker" type="text" value="">
          </div>
          <label class="col-sm-2 col-form-label" >结束时间：</label>
          <div class="col-sm-4">
            <input class="form-control datetimepicker" type="text" value="">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" >类型：</label>
          <div class="col-sm-4">
            <select class="form-control" >
              <option>PV</option>
              <option>UV</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <button type="button" class="btn btn-primary col-sm-2">搜索</button>
          </div>
        </div>
      </form>
      <div class="col-sm-8">
        <canvas width="960" height="500" id="myChart" ></canvas>
      </div>
    </div>

</template>

<script>

import {
  labels,
  data
} from './test';

export default {
    name: 'index',
    mixins: [],
    directives: {
    },
    data() {
        return {
          list: [],
          options: {},
          chartColors: {
              "blue": "rgb(54, 162, 235)",
              "green": "rgb(75, 192, 192)",
              "grey": "rgb(201, 203, 207)",
              "orange": "rgb(255, 159, 64)",
              "purple": "rgb(153, 102, 255)",
              "red": "rgb(255, 99, 132)",
              "yellow": "rgb(255, 205, 86)"
          }
        }
    },
    computed: {

    },

    methods: {
      initChart () {
        this.generateDataList();
        this.generateOpts();
        var ctx = document.getElementById('myChart').getContext('2d');
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: this.list,
            options: this.options
        });
      }
      , generateOpts () {
        this.options = {
    				responsive: true,
    				title: {
    					display: true,
    					text: 'Chart.js Line Chart'
    				},
    				tooltips: {
    					mode: 'index',
    					intersect: false,
    				},
    				hover: {
    					mode: 'nearest',
    					intersect: true
    				},
    				scales: {
    					xAxes: [{
    						display: true,
    						scaleLabel: {
    							display: true,
    							labelString: 'Month'
    						}
    					}],
    					yAxes: [{
    						display: true,
    						scaleLabel: {
    							display: true,
    							labelString: 'Value'
    						}
    					}]
    				}
    			}
      }
      , generateDataList () {
        var MONTHS = [];
        this.list = {
            labels: labels,
            datasets: [{
              label: 'dataset 01',
    					backgroundColor: this.chartColors.red,
    					borderColor: this.chartColors.red,
              fill: false,
              data: data
            }
            ,{
              label: 'dataset 01',
    					backgroundColor: this.chartColors.blue,
    					borderColor: this.chartColors.blue,
              fill: false,
              data: data
            }]
          }
      }
      , initDatePicker () {
        $(".datetimepicker").datetimepicker({
            autoclose: !0,
            componentIcon: ".mdi.mdi-calendar",
            navIcons: {
                rightIcon: "mdi mdi-chevron-right",
                leftIcon: "mdi mdi-chevron-left"
            }
        })
      }
    },

    mounted() {
      this.initChart();
      this.initDatePicker();
    },
    components: {
    }
};
</script>

<style lang="less">
.page {
  padding: 10px;
}
</style>
