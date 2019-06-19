<template>
    <div id="myProgress">
        <el-col :sm="24" :md="17" :offset="1" style="position:relative">
        <!-- ------------------------------已完成------------------------------ -->
        <div v-if="status==='已完成'&& myprop.finishTime>myprop.workEnd">
            <div class="base_line" style="background-color:#ff676c;"></div>
            <div class="cover_line" :style="{width:percent,backgroundColor:'#00befb'}">
            </div>
            <div class="time_detail_border">
                <div class="Tags" style="background-color:#00befb">
                </div>
                <div class="time_text">计划开始时间</div>
                <div  class="time_time">{{myprop.workStart | splice}}</div>
            </div>
            <div :style="{left:percent}" class="time_detail_border center_circle">
                <div class="time_text">计划完成时间</div>
                <div  class="time_time">{{myprop.workEnd | splice}}</div>
                <div class="Tags" style="background-color:#00befb">
                </div>
            </div>
            <div style="width:75px;left:100%;" class="time_detail_border">
                <div class="Tags" style="background-color:#ff676c">
                </div>
                <div class="time_text">实际完成时间</div>
                <div  class="time_time">{{myprop.finishTime | splice}}</div>
            </div>
        </div>
        <div v-if="status==='已完成'&& myprop.finishTime<myprop.workEnd">
            <div class="base_line" style="background-color:#50ca96;"></div>
        <div class="cover_line" :style="{width:percent,backgroundColor:'#00befb'}">
        </div>
        <div class="time_detail_border">
            <div class="Tags" style="background-color:#00befb">
            </div>
            <div class="time_text">计划开始时间</div>
            <div  class="time_time">{{myprop.workStart | splice}}</div>
        </div>
        <div :style="{left:percent}" class="time_detail_border center_circle">
            <div class="time_text">实际完成时间</div>
            <div  class="time_time">{{myprop.finishTime | splice}}</div>
            <div class="Tags" style="background-color:#50ca96">
            </div>
        </div>
        <div style="width:75px;left:100%;" class="time_detail_border">
            <div class="Tags" style="background-color:#00befb">
            </div>
            <div class="time_text">计划完成时间</div>
            <div  class="time_time">{{myprop.workEnd | splice}}</div>
        </div>
        </div>
        <div v-if="status==='已完成'&& myprop.finishTime==myprop.workEnd">
            <div class="base_line" style="background-color:#00befb;">
        </div>
        <div class="time_detail_border">
            <div class="Tags" style="background-color:#00befb">
            </div>
            <div class="time_text">计划开始时间</div>
            <div  class="time_time">{{myprop.workStart | splice}}</div>
        </div>
        <div style="width:75px;left:100%;" class="time_detail_border center_circle">
            <div class="time_text">计划/实际完成时间</div>
            <div  class="time_time">{{myprop.finishTime | splice}}</div>
            <div class="Tags" style="background-color:#00befb">
            </div>
        </div>
        </div>

        <div v-if="status==='已完成'&& myprop.finishTime<myprop.workStart">
            
        <div class="base_line" style="background-color:#50ca96;"></div>
        <div class="cover_line" :style="{width:percent,backgroundColor:'#50ca96'}">
        </div>
        <div  class="time_detail_border ">
            <div class="Tags" style="background-color:#50ca96">
            </div>
            <div class="time_text">实际完成时间</div>
            <div  class="time_time">{{myprop.finishTime | splice}}</div>
        </div>
        <div :style="{left:percent}" class="time_detail_border center_circle">
            <div class="time_text">计划开始时间</div>
            <div  class="time_time">{{myprop.workStart | splice}}</div>
            <div class="Tags" style="background-color:#00befb">
            </div>
        </div>

        <div style="width:105px;left:100%;" class="time_detail_border">
            <div class="Tags" style="background-color:#00befb">
            </div>
            <div class="time_text">计划完成时间</div>
            <div  class="time_time">{{myprop.workEnd | splice}}</div>
        </div>
        </div>

        <!-- ------------------------------未开始------------------------------ -->
        <div v-if="status==='未开始' && myprop.thisDate < myprop.workStart">
        <div class="base_line" style="background-color:#AEB5C4;"></div>            
        <div class="cover_line" :style="{width:percent,background:'linear-gradient(to right, #AEB5C4 50%, #fff 0)',backgroundSize:'20px 100%'}">
        </div>
        <div class="time_detail_border">
            <div class="nowTag">
            </div>
            <div class="time_text">当前时间</div>
            <div  class="time_time">{{myprop.thisDate | splice}}</div>
        </div>
        <div :style="{left:percent}" class="time_detail_border center_circle" >
            <div class="time_text">计划开始时间</div>
            <div  class="time_time">{{myprop.workStart | splice}}</div>
            <div class="Tags" style="background-color:#AEB5C4"></div>
        </div>
        <div style="width:75px;left:100%;" class="time_detail_border">
            <div class="Tags" style="background-color:#AEB5C4">
            </div>
            <div class="time_text">计划完成时间</div>
            <div class="time_time">{{myprop.workEnd | splice}}</div>
        </div>
        </div>

        <div v-if="status==='未开始'  && myprop.thisDate > myprop.workStart && myprop.thisDate<myprop.workEnd">
        <div class="base_line" style="background-color:#AEB5C4;"></div> 
        <div  class="time_detail_border " >
            <div class="Tags" style="background-color:#AEB5C4"></div>           
            <div class="time_text">计划开始时间</div>
            <div  class="time_time">{{myprop.workStart | splice}}</div>
        </div>

        <div :style="{left:percent}" class="time_detail_border center_circle">
            
            <div class="time_text">当前时间</div>
            <div  class="time_time">{{myprop.thisDate | splice}}</div>
            <div class="nowTag">
            </div>
        </div>
        
        <div style="width:75px;left:100%;" class="time_detail_border">
            <div class="Tags" style="background-color:#AEB5C4">
            </div>
            <div class="time_text">计划完成时间</div>
            <div  class="time_time">{{myprop.workEnd | splice}}</div>
        </div>
        </div>
        <div v-if="status==='未开始'&& myprop.thisDate>myprop.workEnd">
        <div class="base_line" style="background:linear-gradient(to right, #AEB5C4 50%, #fff 0);background-size:20px 100%"></div>            
        <div class="cover_line" :style="{width:percent,backgroundColor:'#AEB5C4'}">
        </div>
        <div  class="time_detail_border" >
            <div class="Tags" style="background-color:#AEB5C4"></div>
            <div class="time_text">计划开始时间</div>
            <div  class="time_time">{{myprop.workStart | splice}}</div>
        </div>
        <div :style="{left:percent}" class="time_detail_border center_circle">
            <div class="time_text">计划完成时间</div>
            <div  class="time_time">{{myprop.workEnd | splice}}</div>
            <div class="Tags" style="background-color:#AEB5C4">
            </div>
        </div>
        <div style="width:75px;left:100%;" class="time_detail_border">
            <div class="nowTag">
            </div>
            <div class="time_text">当前时间</div>
            <div  class="time_time">{{myprop.thisDate | splice}}</div>
        </div>
        </div>
        <!-- ------------------------------进行中------------------------------ -->
        <div v-if="status==='进行中' && myprop.workStart<myprop.thisDate && myprop.thisDate<myprop.workEnd">
            <div class="base_line" style="background-color:#AEB5C4;"></div>
            <div class="cover_line" :style="{width:percent,backgroundColor:'#00befb'}">
            </div>
        <div class="time_detail_border">
           <div class="Tags" style="background-color:#00befb">
            </div>
            <div class="time_text">计划开始时间</div>
            <div  class="time_time">{{myprop.workStart | splice}}</div>
        </div>
        <div :style="{left:percent}" class="time_detail_border center_circle">
            
            <div class="time_text">当前时间</div>
            <div  class="time_time">{{myprop.thisDate | splice}}</div>
             <div class="nowTag">
            </div>
        </div>
        <div style="width:75px;left:100%;" class="time_detail_border">
            <div class="Tags" style="background-color:#AEB5C4">
            </div>
            <div class="time_text">计划完成时间</div>
            <div  class="time_time">{{myprop.workEnd | splice}}</div>
        </div>
        </div>
        <div v-if="status==='进行中' && (myprop.workStart==myprop.thisDate || myprop.workStart>myprop.thisDate)">
            <div class="base_line" style="background-color:#AEB5C4;"></div>
            <div class="cover_line" :style="{width:percent,backgroundColor:'#00befb'}">
            </div>
        <div class="time_detail_border">
             <div class="nowTag">
            </div>
            <div class="time_text">当前时间</div>
            <div  class="time_time">{{myprop.thisDate | splice}}</div>
        </div>
        <div :style="{left:percent}"  class="time_detail_border center_circle">
            <div class="time_text">计划开始时间</div>
            <div  class="time_time">{{myprop.workStart | splice}}</div>
            <div class="Tags" style="background-color:#00befb">
            </div>
        </div>
        <div style="width:75px;left:100%;" class="time_detail_border">
            <div class="Tags" style="background-color:#AEB5C4">
            </div>
            <div class="time_text">计划完成时间</div>
            <div  class="time_time">{{myprop.workEnd | splice}}</div>
        </div>
        </div>
        <div v-if="status==='进行中'&&myprop.thisDate>myprop.workEnd">
            <div class="base_line" style="background-color:#AEB5C4"></div>
            <div class="cover_line" :style="{width:percent,backgroundColor:'#AEB5C4'}">
            </div>
        <div class="time_detail_border ">
            <div class="Tags" style="background-color:#00befb">
            </div>
            <div class="time_text">计划开始时间</div>
            <div  class="time_time">{{myprop.workStart | splice}}</div>
            
        </div>
        <div :style="{left:percent}" class="time_detail_border center_circle">
            
            <div class="time_text">计划完成时间</div>
            <div  class="time_time">{{myprop.workEnd | splice}}</div>
            <div class="Tags" style="background-color:#AEB5C4">
            </div>
        </div>
        <div class="time_detail_border" style="width:75px;left:100%;">
             <div class="nowTag">
            </div>
            <div class="time_text">当前时间</div>
            <div  class="time_time">{{myprop.thisDate | splice}}</div>
        </div>
        </div>

        </el-col>
        <el-col :sm="24" :md="2" :offset="2" style="display:flex;flex-direction:column;">
            <el-button >计划{{myprop.days||'--'}}天</el-button>
            <el-button style="color:#FC6A6A" v-if="status==='已完成'&& myprop.finishTime>myprop.workEnd">超时完成{{countDuration(myprop.finishTime,myprop.workEnd)}}天</el-button>
            <el-button style="color:#5BCA93" v-if="status==='已完成'&& myprop.finishTime<myprop.workEnd">提前完成{{countDuration(myprop.workEnd,myprop.finishTime)}}天</el-button>
            <el-button style="color:#00BCFF" v-if="status==='已完成'&& myprop.finishTime==myprop.workEnd">按计划完成</el-button>
            <el-button style="color:#AEB5C4" v-if="status==='未开始'">未开始</el-button>
            <el-button style="color:#E6AB55" v-if="status==='进行中'">进行中</el-button>
        </el-col>
    </div>
</template>

<script>
export default {
    name:'Progress',
    props:{
        myprop:{
            required:true
        },
        status:{
            required:true //完成状态
        },
    },  
    data(){
        return{
            duration:0,
            preDuration:'',
            percent:'',
            lineColor:'',
            coverLineColor:'',
        }
    },
    methods:{
        countDuration(a,b){
            return parseInt((new Date(a)-new Date(b))/ 1000 / 60 / 60 /24)
        },
        init(index){
            if(this.status === '已完成'){
                if(index.finishTime===index.workEnd){
                    this.duration = this.countDuration(index.finishTime,index.workStart)
                }else if(index.finishTime>index.workEnd){
                    this.duration = this.countDuration(index.finishTime,index.workStart)
                    this.preDuration = this.countDuration(index.workEnd,index.workStart)
                    this.percent = `${(this.preDuration/this.duration).toFixed(2)*100}%`
                }else if(index.finishTime<index.workEnd&&index.finishTime>index.workStart){
                    this.duration = this.countDuration(index.workEnd,index.workStart)
                    this.preDuration = this.countDuration(index.finishTime,index.workStart)
                    this.percent = `${(this.preDuration/this.duration).toFixed(2)*100}%`
                }else if(index.finishTime<index.workStart){
                    this.duration = this.countDuration(index.workEnd,index.finishTime)
                    this.preDuration = this.countDuration(index.workStart,index.finishTime)
                    this.percent = `${(this.preDuration/this.duration).toFixed(2)*100}%`
                }
            }else if(this.status === '未开始'){
                if(index.workStart==index.thisDate || index.workStart>index.thisDate){
                    this.duration = this.countDuration(index.workEnd,index.thisDate)
                    this.preDuration = this.countDuration(index.workStart,index.thisDate)
                    this.percent = `${(this.preDuration/this.duration).toFixed(2)*100}%`
                }else if(index.workStart<index.thisDate && index.thisDate<index.workEnd){
                    this.duration = this.countDuration(index.workEnd,index.workStart)
                    this.preDuration = this.countDuration(index.thisDate,index.workStart)
                    this.percent = `${(this.preDuration/this.duration).toFixed(2)*100}%`
                }else if(index.thisDate>index.workEnd){
                    this.duration = this.countDuration(index.thisDate,index.workStart)
                    this.preDuration = this.countDuration(index.workEnd,index.workStart)
                    this.percent = `${(this.preDuration/this.duration).toFixed(2)*100}%`
                }
            }else if(this.status === '进行中'){
                if(index.workStart==index.thisDate || index.workStart>index.thisDate){
                    //提前开始
                    this.duration = this.countDuration(index.workEnd,index.thisDate)
                    this.preDuration = this.countDuration(index.workStart,index.thisDate)
                    this.percent = `${(this.preDuration/this.duration).toFixed(2)*100}%`
                }else if(index.workStart<index.thisDate && index.thisDate<index.workEnd){
                    //正常清除
                    this.duration = this.countDuration(index.workEnd,index.workStart)
                    this.preDuration = this.countDuration(index.thisDate,index.workStart)
                    this.percent = `${(this.preDuration/this.duration).toFixed(2)*100}%`
                }else if(index.thisDate>index.workEnd){
                    //计划之后开始了
                    this.duration = this.countDuration(index.thisDate,index.workStart)
                    this.preDuration = this.countDuration(index.workEnd,index.workStart)
                    this.percent = `${(this.preDuration/this.duration).toFixed(2)*100}%`
                }

            }
            

        }
    },
    mounted(){
        this.init(this.myprop)
    },
    filters:{
        splice(index){
            return index.substr(0,10)
        }
    }
}
</script>

<style lang="less">
#myProgress{
    .base_line{
        width:100%;
        position:relative;
        display:block;
        overflow:hidden;
        height:6px;
        border-radius:5px;
        margin-top:20px;
    }
    .cover_line{
        position:relative;
        display:block;
        overflow:hidden;
        height:6px;
        border-radius:5px;
        margin-top:-6px
    }
    .time_detail_border{
        position:absolute;
        top:12px;
        display:flex;
        flex-direction:column;
        align-items:center;
        transform:translate(-50%,0);
        width: 75px;
    }
    .time_text{
        font-size:12px;
        margin-top:10px;
    }
    .time_time{
        font-size:12px;
        margin-top:5px;
    }
    .Tags{
        width:20px;
        height:20px;
        border-radius:20px;
    }
    .nowTag{
        transform:rotate(45deg);
        width:16px;
        height:16px;
        background-color:#6B95DA;
        margin-top:3px
    }
    .center_circle{
        margin-top:-48px
    }
}
</style>


