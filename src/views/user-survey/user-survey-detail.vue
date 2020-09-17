<template>
  <div>
    <Card dis-hover>
      <div class="container">
        <div class="row" v-for="question in detailList" :key="question.id">
          <span>{{question.question}}</span>
          <br />
          <div class="col-12" v-for="answerItem in question.answers" :key="answerItem.id">
            <div class="col-12" v-if="question.questionTypeId === 1">
              <label>
                <input
                  type="radio"
                  :class="'answer'"
                  :id="'r_'+question.id+'_'+question.questionTypeId+'_'+answerItem.id"
                  :name="question.id"
                  :value="answerItem.content"
                  @click="fillRadiButton($event,question.id,question.questionTypeId,answerItem.id)"
                />
                &nbsp;{{answerItem.content}}
              </label>
              <br />
            </div>
            <div class="col-12" v-if="question.questionTypeId === 3">
              <label>
                <input
                  type="checkbox"
                  :class="'answer'"
                  :id="'c_'+question.id+'_'+question.questionTypeId+'_'+answerItem.id"
                  :value="answerItem.content"
                  @click="fillCheckbox($event,question.id,question.questionTypeId,answerItem.id)"
                  :name="question.id"
                />
                &nbsp;{{answerItem.content}}
              </label>
              <br />
            </div>
          </div>
          <div class="col-12" v-if="question.questionTypeId === 2">
            <input
              type="text"
              :class="'answer'"
              :id="'i_'+question.id+'_'+question.questionTypeId"
              @blur="fillInput($event,question.id,question.questionTypeId)"
              class="form-control"
            />
          </div>
        </div>
        <div class="row">
          <button
            class="btn btn-success"
            v-if="detailList.length>0"
            @click="complateSurvey"
          >Anketi Tamamla</button>
          <h2 v-if="detailList.length<=0">Ankete Bağlı Hiç Soru Yok</h2>
        </div>
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
  CreateSurveyResult,
  GetSurveyHeaderDto,
  GetUserQuestionDto,
  GetUserQuestionDtoListResultDto,
  SurveyResultServiceProxy,
  SurveyServiceProxy,
} from "../../store/services/serviceProxy";

@Component({})
export default class UserSurveyDetail extends AbpBase {
  detailList: GetUserQuestionDto[] = [];
  surveyResult: CreateSurveyResult[] = [];
  headerId: number;
  startDate: Date = new Date();

  private _SurveyHeaderService: SurveyServiceProxy = new SurveyServiceProxy();
  get _surveyService() {
    if (this._SurveyHeaderService == undefined)
      this._SurveyHeaderService = new SurveyServiceProxy();
    return this._SurveyHeaderService;
  }

  private _SurveyResultHeaderService: SurveyResultServiceProxy = new SurveyResultServiceProxy();
  get _surveyResultService() {
    if (this._SurveyResultHeaderService == undefined)
      this._SurveyResultHeaderService = new SurveyResultServiceProxy();
    return this._SurveyResultHeaderService;
  }

  public getSurveyDetailList() {
    var item = this.$route.query["headerId"];
    this.headerId = parseInt(item[0]);
    this._surveyService.getQuestions(this.headerId).then((res) => {
      this.detailList = res.items;
      console.log(this.detailList);
    });
  }

  mounted() {}

  created() {
    this.getSurveyDetailList();
  }

  fillRadiButton(item, questionId, questionTypeId, answerId) {
    if (this.surveyResult != undefined) {
      var oldQuestion = this.surveyResult.filter(
        (x) => x.questionId == questionId
      );
      if (oldQuestion.length > 0) {
        //daha önce bu soruya cevap verilmiş
        this.surveyResult = this.surveyResult.filter(
          (x) => x.questionId != questionId
        );
      }
      var surveyResultItem = new CreateSurveyResult();
      surveyResultItem.surveyId = this.headerId;
      surveyResultItem.questionId = questionId;
      surveyResultItem.answerId = answerId;
      surveyResultItem.questionTypeId = questionTypeId;
      surveyResultItem.answerResult = item.target.value;
      this.surveyResult.push(surveyResultItem);
    }
  }
  fillCheckbox(item, questionId, questionTypeId, answerId) {
    if (this.surveyResult != undefined) {
      var oldQuestion = this.surveyResult.filter(
        (x) => x.questionId == questionId && x.answerId == answerId
      );
      if (oldQuestion.length > 0) {
        //daha önce bu soruya cevap verilmiş
        this.surveyResult = this.surveyResult.filter(
          (x) => x.questionId != questionId && x.answerId == answerId
        );
      }
      if (item.target.checked) {
        var surveyResultItem = new CreateSurveyResult();
        surveyResultItem.surveyId = this.headerId;
        surveyResultItem.questionId = questionId;
        surveyResultItem.answerId = answerId;
        surveyResultItem.questionTypeId = questionTypeId;
        surveyResultItem.answerResult = item.target.value;
        this.surveyResult.push(surveyResultItem);
      }
    }
  }
  fillInput(item, questionId, questionTypeId) {
    if (this.surveyResult != undefined) {
      var oldQuestion = this.surveyResult.filter(
        (x) => x.questionId == questionId
      );
      if (oldQuestion.length > 0) {
        //daha önce bu soruya cevap verilmiş
        this.surveyResult = this.surveyResult.filter(
          (x) => x.questionId != questionId
        );
      }
      if (item.target.value != "") {
        var surveyResultItem = new CreateSurveyResult();
        surveyResultItem.surveyId = this.headerId;
        surveyResultItem.questionId = questionId;
        surveyResultItem.answerId = -1;
        surveyResultItem.questionTypeId = questionTypeId;
        surveyResultItem.answerResult = item.target.value;
        this.surveyResult.push(surveyResultItem);
      }
    }
  }
  complateSurvey() {
    var endDate = new Date();
    this.surveyResult.forEach((el) => {
      (el.startDate = this.startDate), (el.endDate = endDate);
    });
    if (this.surveyResult.length > 0) {
      this._surveyResultService
        .createSurveyResult(this.surveyResult)
        .then((res) => {
          this.$Message.info("Anket Başarı ile tamamlandı");
          this.$router.back();
        });
    } else {
      alert("Lütfen anketteki soruları yanıtlayınız.");
    }
  }
}
</script>

<style>
@import "../css/bosstrap.css";
</style>