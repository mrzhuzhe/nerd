<template>
    <div class="container">
      <form class="col-sm-8">
        <legend>PV UV查询</legend>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" >开始时间：</label>
          <div class="col-sm-4">
            <input class="form-control datetimepicker" type="text" id="start" :value="start" >
          </div>
          <label class="col-sm-2 col-form-label" >结束时间：</label>
          <div class="col-sm-4">
            <input class="form-control datetimepicker" type="text" id="end" :value="end">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label"  >站点id：</label>
          <div class="col-sm-4">
            <select class="form-control" v-model="site_id" >
              <option v-for="i in siteList" :value="i.v" >{{i.t}}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <button type="button" class="btn btn-primary col-sm-2" @click="getListData()" >搜索</button>
          </div>
        </div>
      </form>
      <div class="col-sm-10">
        <canvas width="960" height="500" id="myChart" ></canvas>
      </div>
    </div>

</template>

<script>

const axios = require('axios');
const siteList = [{
  t: 'test01',
  v: 'http://starofus.com/performans.html'
}];

export default {
    name: 'index',
    mixins: [],
    directives: {
    },
    data() {
        return {
          start: this.now(-15*60),
          end: this.now(),
          siteList,
          site_id: siteList[0].v,
          interval: 30,
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
      now (d) {
        d = d || 0;
        var _n = new Date();
            _n = new Date(_n.getTime() + d * 1000);
        var _month = _n.getMonth() + 1;
        return _n.getFullYear() + '-' + ( _month <=9 ? '0' + _month : _month ) + '-' + _n.getDate() + ' ' + _n.getHours() + ':' + _n.getMinutes()
      },
      getListData () {
        var _start = document.querySelector('#start').value.replace(/[\-\ \:]/g, '') + '00',
            _end = document.querySelector('#end').value.replace(/[\-\ \:]/g, '') + '00';
        var _url = 'http://t.imaisu.com/api/event_data?start=' + _start + '&end=' + _end + '&interval=' + this.interval + '&id=' + this.site_id;
        axios.get(_url)
          .then( response => {
            // handle success
            var _data = response.data.list;
            this.list = this.generateDataList(_data);
            this.options = this.generateOpts(_data);
            console.log(this.list, this.options)
            this.initChart();
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }
      , initChart () {
        console.log(this.list, this.options)
        var ctx = document.getElementById('myChart').getContext('2d');
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: this.list,
            options: this.options
        });
      }
      , generateOpts (data) {
        return {
    				responsive: true,
    				title: {
    					display: true,
    					text: '访客趋势'
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
    							labelString: '访问人数'
    						}
    					}],
    					yAxes: [{
    						display: true,
    						scaleLabel: {
    							display: true,
    							labelString: '时间'
    						}
    					}]
    				}
    			}
      }
      , generateDataList (data) {
        var labels = [], pvData = [], uvData = [];
        data.forEach((e, i) => {
          labels.push(e.time);
          pvData.push(e.pv);
          uvData.push(e.uv);
            })
        return {
            labels,
            datasets: [{
              label: 'PV',
    					backgroundColor: this.chartColors.red,
    					borderColor: this.chartColors.red,
              fill: false,
              data: pvData
            }
            ,{
              label: 'UV',
    					backgroundColor: this.chartColors.blue,
    					borderColor: this.chartColors.blue,
              fill: false,
              data: uvData
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
      this.getListData();
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
