/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};
var chartData2=[];
var riqi=[]

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function getriqi(){
  var riqi=[];
  if(pageState. nowGraTime=="day"){
    for( p in aqiSourceData[pageState.nowSelectCity]){
      riqi.push(p);
    }
  }
  else if(pageState. nowGraTime=="week"){
    for(var i=1;i<=chartData2.length; i++){
      riqi.push("2016年第"+i+"周");
    }
  }
  else if(pageState. nowGraTime=="month"){
    for(var i=1;i<=chartData2.length; i++){
      riqi.push("2016年第"+i+"月");
    }
  }
  return riqi;
}
console.log();

function renderChart() {
  var oWrap=document.getElementsByClassName('aqi-chart-wrap')[0];
    oWrap.innerHTML="";
    oWrap.style.width="100%";
    oWrap.style.height="500px";
  for(var i=0;i<chartData2.length;i++){
    var oBox=document.createElement("div");
    var oDay=document.createElement("div");
    oBox.style.height="100%";
    oBox.style.float="left";
    oDay.style.height=chartData2[i]+"px";
    oDay.style.marginTop=500-chartData2[i]+"px";
    
    if(pageState. nowGraTime=="day"){
      oDay.setAttribute("title","aqi:"+chartData2[i]+"    日期："+getriqi()[i]);
      oDay.style.width="10px";
    }
    else if(pageState. nowGraTime=="week"){
      oDay.setAttribute("title","aqi:"+chartData2[i]+"    日期："+getriqi()[i]);
      oDay.style.width="40px";
      oDay.style.marginRight="20px";
    }
      
    else if(pageState. nowGraTime=="month")
    {
      oDay.setAttribute("title","aqi:"+chartData2[i]+"    日期："+getriqi()[i]);
      oDay.style.width="80px";
      oDay.style.marginRight="40px";
    }
     
    
   
    if(chartData2[i]<=200)
      oDay.style.background="green";
    else if(200<chartData2[i]&&chartData2[i]<=400)
      oDay.style.background="yellow";
    else if(400<chartData2[i]&&chartData2[i]<=500)
      oDay.style.background="red";
  
    oBox.appendChild(oDay);
    oWrap.appendChild(oBox);
  }
 
  

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  
     
     
    pageState.nowGraTime=this.value;
    chartData2=chartData[pageState.nowSelectCity][pageState.nowGraTime];
    
    renderChart();
     
    
  // 设置对应数据
  
  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 

      pageState.nowSelectCity=this.value;
      chartData2=chartData[pageState.nowSelectCity][pageState.nowGraTime];
      renderChart();
 
  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var aRadio=document.getElementsByName("gra-time");
 
  for(var i=0; i<aRadio.length; i++){
    aRadio[i].addEventListener("click",graTimeChange,false);
     // aRadio[i].onclick=function(){
     //     graTimeChange();
     //  }
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var obj=document.getElementById('city-select');
  
  for(var p in aqiSourceData){
     obj.options.add(new Option(p,p));
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  obj.onchange=citySelectChange;
     
  
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  for(var key in aqiSourceData){
    chartData[key]={};
    chartData[key].day=[];
    chartData[key].week=[];
    chartData[key].month=[];
    var count=0,weekSum=0,monthSum=0;
    for(var i in aqiSourceData[key]){
        chartData[key].day.push(aqiSourceData[key][i]);
        count++;
        weekSum+=aqiSourceData[key][i];
        monthSum+=aqiSourceData[key][i];
        if(count%7===0){
            chartData[key].week.push(Math.round(weekSum/7));
            weekSum=0;
        }
        if(count===31||count===60||count===91){
            if(count===60){
                chartData[key].month.push(Math.round(monthSum/29))
            }
            else{
                chartData[key].month.push(Math.round(monthSum/31));
            }
            monthSum=0;
        }
    }
  }
  chartData2=chartData[pageState.nowSelectCity][pageState.nowGraTime];
}


/**
 * 初始化函数
 */
function init() {
  initAqiChartData();
  initGraTimeForm()
  initCitySelector();
  renderChart();

}

init();

console.log(aqiSourceData[pageState.nowSelectCity]);