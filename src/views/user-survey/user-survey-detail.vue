<template>
  <div>
    <Card dis-hover>
      <div class="row" v-for="question in detailList" :key="question.id">
        <span>{{question.question}}</span>
     <br>  
        <div class="col-12" v-for="answerItem in question.answers" :key="answerItem.id">

          <div class="col-12" v-if="question.questionTypeId === 1">
            <label>
              <input type="radio" :class="'answer'" :id="'r_'+question.id+'_'+question.questionTypeId+'_'+answerItem.id" :name="question.id"  />
              &nbsp;{{answerItem.content}}
            </label>
          <br>  
          </div>
           <div class="col-12" v-if="question.questionTypeId === 3">
            <label>
              <input type="checkbox" :class="'answer'" :id="'c_'+question.id+'_'+question.questionTypeId+'_'+answerItem.id" :name="question.id"  />
              &nbsp;{{answerItem.content}}
            </label>
          <br>  
          </div>
          
          
        </div>
        <div class="col-12" v-if="question.questionTypeId === 2">           
              <input type="text" :class="'answer'" :id="'i_'+question.id+'_'+question.questionTypeId" class="form-control" /> 
          </div>
      </div>
      <div class="row">
          <button class="btn btn-success">Anketi Tamamla</button>
      </div>
    </Card>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import PageRequest from "@/store/entities/page-request";
import {
  GetSurveyHeaderDto,
  GetUserQuestionDto,
  GetUserQuestionDtoListResultDto,
  SurveyServiceProxy,
} from "../../store/services/serviceProxy";

@Component({})
export default class UserSurveyDetail extends AbpBase {
  detailList: GetUserQuestionDto[] = [];
  private _SurveyHeaderService: SurveyServiceProxy = new SurveyServiceProxy();
  get _surveyService() {
    if (this._SurveyHeaderService == undefined)
      this._SurveyHeaderService = new SurveyServiceProxy();
    return this._SurveyHeaderService;
  }

  public getSurveyDetailList() {
    debugger;
    var item = this.$route.query["headerId"];
    var headerId = parseInt(item[0]);
    this._surveyService.getQuestions(headerId).then((res) => {
      this.detailList = res.items;
      console.log(this.detailList);
    });
  }

  mounted() {}

  created() {
    this.getSurveyDetailList();
  }
}
</script>

<style>
@import "../css/bosstrap.css";
</style>