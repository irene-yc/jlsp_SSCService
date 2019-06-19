<template>
    <div id="mySimpleProgress">
        <el-col :sm="24" :md="17" :offset="1" style="position:relative">
        <!-- -----------------------------已完成----------------------------- -->
        <div v-if="status===1&& finishedDate>planEndDate">
            <div class="base_line" style="background-color:#ff676c;"></div>
            <div class="cover_line" :style="{width:percent,backgroundColor:'#00befb'}">
            </div>
            <div class="time_detail_border">
                <div class="Tags" style="background-color:#00befb">
                </div>
                <div class="time_text">计划开始时间</div>
                <div  class="time_time">{{planStartDate}}</div>
            </div>
            <div :style="{left:percent}" class="time_detail_border center_circle">
                <div class="time_text">计划完成时间</div>
                <div  class="time_time">{{planEndDate}}</div>
                <div class="Tags" style="background-color:#00befb">
                </div>
            </div>
            <div style="width:105px;left:100%;" class="time_detail_border">
                <div class="Tags" style="background-color:#ff676c">
                </div>
                <div class="time_text">实际完成时间</div>
                <div  class="time_time">{{finishedDate}}</div>
            </div>
        </div>
        <div v-if="status===1&& finishedDate<planEndDate && finishedDate>planStartDate">
            <div class="base_line" style="background-color:#50ca96;"></div>
        <div class="cover_line" :style="{width:percent,backgroundColor:'#00befb'}">
        </div>
        <div class="time_detail_border">
            <div class="Tags" style="background-color:#00befb">
            </div>
            <div class="time_text">计划开始时间</div>
            <div  class="time_time">{{planStartDate}}</div>
        </div>
        <div :style="{left:percent}" class="time_detail_border center_circle">
            <div class="time_text">实际完成时间</div>
            <div  class="time_time">{{finishedDate}}</div>
            <div class="Tags" style="background-color:#50ca96">
            </div>
        </div>
        <div style="width:105px;left:100%;" class="time_detail_border">
            <div class="Tags" style="background-color:#00befb">
            </div>
            <div class="time_text">计划完成时间</div>
            <div  class="time_time">{{planEndDate}}</div>
        </div>
        </div>
        <div v-if="status===1&& finishedDate==planEndDate">
            <div class="base_line" style="background-color:#00befb;">
        </div>
        <div class="time_detail_border">
            <div class="Tags" style="background-color:#00befb">
            </div>
            <div class="time_text">计划开始时间</div>
            <div  class="time_time">{{planStartDate}}</div>
        </div>
        <div style="width:105px;left:100%;" class="time_detail_border center_circle">
            <div class="time_text">计划/实际完成时间</div>
            <div  class="time_time">{{finishedDate}}</div>
            <div class="Tags" style="background-color:#00befb">
            </div>
        </div>
        </div>

        <div v-if="status===1&& finishedDate<planStartDate">
            
        <div class="base_line" style="background-color:#50ca96;"></div>
        <div class="cover_line" :style="{width:percent,backgroundColor:'#50ca96'}">
        </div>
        <div  class="time_detail_border ">
            <div class="Tags" style="background-color:#50ca96">
            </div>
            <div class="time_text">实际完成时间</div>
            <div  class="time_time">{{finishedDate}}</div>
            
        </div>
        <div :style="{left:percent}" class="time_detail_border center_circle">
            <div class="time_text">计划开始时间</div>
            <div  class="time_time">{{planStartDate}}</div>
            <div class="Tags" style="background-color:#00befb">
            </div>
        </div>

        <div style="width:105px;left:100%;" class="time_detail_border">
            <div class="Tags" style="background-color:#00befb">
            </div>
            <div class="time_text">计划完成时间</div>
            <div  class="time_time">{{planEndDate}}</div>
        </div>
        </div>

        <!-- ------------------------------进行中------------------------------ -->
        <div v-if="status===0 && planStartDate<nowDate && nowDate<planEndDate">
            <div class="base_line" style="background-color:#AEB5C4;"></div>
            <div class="cover_line" :style="{width:percent,backgroundColor:'#00befb'}">
            </div>
        <div class="time_detail_border">
           <div class="Tags" style="background-color:#00befb">
            </div>
            <div class="time_text">计划开始时间</div>
            <div  class="time_time">{{planStartDate}}</div>
        </div>
        <div :style="{left:percent}" class="time_detail_border center_circle">
            
            <div class="time_text">当前时间</div>
            <div  class="time_time">{{nowDate | splice}}</div>
             <div class="nowTag">
            </div>
        </div>
        <div style="width:105px;left:100%;" class="time_detail_border">
            <div class="Tags" style="background-color:#AEB5C4">
            </div>
            <div class="time_text">计划完成时间</div>
            <div  class="time_time">{{planEndDate}}</div>
        </div>
        </div>
        <div v-if="status===0 && (planStartDate==nowDate || planStartDate>nowDate)">
            <div class="base_line" style="background-color:#AEB5C4;"></div>
            <div class="cover_line" :style="{width:percent,backgroundColor:'#00befb'}">
            </div>
        <div class="time_detail_border">
             <div class="nowTag">
            </div>
            <div class="time_text">当前时间</div>
            <div  class="time_time">{{nowDate | splice}}</div>
        </div>
        <div :style="{left:percent}"  class="time_detail_border center_circle">
            <div class="time_text">计划开始时间</div>
            <div  class="time_time">{{planStartDate}}</div>
            <div class="Tags" style="background-color:#00befb">
            </div>
        </div>
        <div style="width:105px;left:100%;" class="time_detail_border">
            <div class="Tags" style="background-color:#AEB5C4">
            </div>
            <div class="time_text">计划完成时间</div>
            <div  class="time_time">{{planEndDate}}</div>
        </div>
        </div>
        <div v-if="status===0&&nowDate>planEndDate">
            <div class="base_line" style="background-color:#AEB5C4"></div>
            <div class="cover_line" :style="{width:percent,backgroundColor:'#AEB5C4'}">
            </div>
        <div class="time_detail_border ">
            <div class="Tags" style="background-color:#00befb">
            </div>
            <div class="time_text">计划开始时间</div>
            <div  class="time_time">{{planStartDate}}</div>
            
        </div>
        <div :style="{left:percent}" class="time_detail_border center_circle">
            
            <div class="time_text">计划完成时间</div>
            <div  class="time_time">{{planEndDate}}</div>
            <div class="Tags" style="background-color:#AEB5C4">
            </div>
        </div>
        <div class="time_detail_border" style="width:105px;left:100%;">
             <div class="nowTag">
            </div>
            <div class="time_text">当前时间</div>
            <div  class="time_time">{{nowDate | splice}}</div>
        </div>
        </div>

        </el-col>
        <el-col :sm="24" :md="3" :offset="2" style="display:flex;flex-direction:column" v-if="nowDate||finishedDate||myprop.currentDate">
            <el-button style="margin-bottom:10px">计划{{countDuration(planEndDate,planStartDate)||'--'}}天</el-button>
            <el-button style="color:#E6AB55;margin-left:0px" v-if="status===0 && nowDate">进行中</el-button>
            <el-button style="color:#FC6A6A;margin-left:0px" v-else-if="status===1&& finishedDate>planEndDate">超时完成{{countDuration(finishedDate,planEndDate)}}天</el-button>
            <el-button style="color:#5BCA93;margin-left:0px" v-else-if="status===1&& finishedDate<planEndDate">提前完成{{countDuration(planEndDate,finishedDate)}}天</el-button>
            <el-button style="color:#00BCFF;margin-left:0px" v-else-if="status===1&& finishedDate==planEndDate">按计划完成</el-button>
        </el-col>
    </div>
</template>

<script>
export default {
    name:'mySimpleProgress',
    props:{
        myprop:{
            required:true
        },
        status:{
            required:true //完成状态
        },
        planStartDate:{
            required:true
        },
        planEndDate:{
            required:true
        },
        nowDate:{
            required:true
        },
        finishedDate:{
            required:true
        }
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
    watch: {
        myprop: {
        handler() {
            this.init(this.planStartDate,this.planEndDate,this.nowDate,this.finishedDate)
        },
        deep: true//监听对象
    }
    },
    methods:{
        countDuration(a,b){
            return parseInt((new Date(a)-new Date(b))/ 1000 / 60 / 60 /24)
        },
        init(planStartDate,planEndDate,nowDate,finishedDate){
            // console.log(planStartDate,planEndDate,nowDate,finishedDate,'hahah')
            if(this.status === 1){
                if(finishedDate===planEndDate){
                    this.duration = this.countDuration(finishedDate,planStartDate)
                }else if(finishedDate>planEndDate){
                    this.duration = this.countDuration(finishedDate,planStartDate)
                    this.preDuration = this.countDuration(planEndDate,planStartDate)
                    this.percent = `${(this.preDuration/this.duration).toFixed(2)*100}%`
                }else if(finishedDate<planEndDate &&finishedDate>planStartDate){
                    this.duration = this.countDuration(planEndDate,planStartDate)
                    this.preDuration = this.countDuration(finishedDate,planStartDate)
                    this.percent = `${(this.preDuration/this.duration).toFixed(2)*100}%`
                }else if(finishedDate<planStartDate){
                    this.duration = this.countDuration(planEndDate,finishedDate)
                    this.preDuration = this.countDuration(planStartDate,finishedDate)
                    this.percent = `${(this.preDuration/this.duration).toFixed(2)*100}%`
                }   
            }else if(this.status === 0){
                if(planStartDate==nowDate || planStartDate>nowDate){
                    //提前开始
                    this.duration = this.countDuration(planEndDate,nowDate)
                    this.preDuration = this.countDuration(planStartDate,nowDate)
                    this.percent = `${(this.preDuration/this.duration).toFixed(2)*100}%`
                }else if(planStartDate<nowDate && nowDate<planEndDate){
                    //正常清除
                    this.duration = this.countDuration(planEndDate,planStartDate)
                    this.preDuration = this.countDuration(nowDate,planStartDate)
                    this.percent = `${(this.preDuration/this.duration).toFixed(2)*100}%`
                }else if(nowDate>planEndDate){
                    //计划之后开始了
                    this.duration = this.countDuration(nowDate,planStartDate)
                    this.preDuration = this.countDuration(planEndDate,planStartDate)
                    this.percent = `${(this.preDuration/this.duration).toFixed(2)*100}%`
                }

            }
            

        }
    },
    mounted(){
        this.init(this.planStartDate,this.planEndDate,this.nowDate,this.finishedDate)
        // console.log(this.myprop,'--->details')
    },
    filters:{
        splice(index){
            return index.substr(0,10)
        }
    }
}
</script>

<style lang="less">
#mySimpleProgress{
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
        width: 105px;
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


