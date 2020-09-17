<template>
  <div>
    <Card dis-hover>
      <div class="row">
        <button class="btn btn-primary" @click="create">Ekle</button>
      </div>
      <div class="row">
        <div class="col-6">Soru : {{questionItem.question}}</div>
        <div class="col-6">Soru Tipi : {{questionItem.questionTypeId}}</div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Cevap</th>

            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in surveyAnswerList" :key="item.id">
            <th scope="row">{{item.id}}</th>
            <td>{{item.content}}</td>
            <td>
              <!-- <button class="btn btn-primary btn-sm">Düzenle</button> Kodlanacak-->
              <button class="btn btn-danger btn-sm" @click="deleteSurveyAnswer(item.id)">Sil</button>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
    <create-or-edit-answer-modal
      :questionId="questionId"
      v-model="createModalShow"
      @save-success="getSurveyAnswerList"
    ></create-or-edit-answer-modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import PageRequest from "@/store/entities/page-request";
import {
  GetQuestionDto,
  GetSurveyAnswerDto,
  GetSurveyHeaderDto,
  SurveyAnswerServiceProxy,
  SurveyHeaderServiceProxy,
  SurveyQuestionServiceProxy,
} from "../../store/services/serviceProxy";
import CreateOrEditAnswerModal from "./create-or-edit-answer-modal.vue";

@Component({
  components: { CreateOrEditAnswerModal },
})
export default class AnswerList extends AbpBase {
  surveyAnswerList: GetSurveyAnswerDto[] = [];
  isLoading: boolean = false;
  questionId: number;
  questionList: GetQuestionDto[] = [];
  createModalShow: boolean = false;
  questionItem: GetQuestionDto = new GetQuestionDto();
  private _SurveyAnswerService: SurveyAnswerServiceProxy = new SurveyAnswerServiceProxy();
  get _surveyAnswerService() {
    if (this._SurveyAnswerService == undefined)
      this._SurveyAnswerService = new SurveyAnswerServiceProxy();
    return this._SurveyAnswerService;
  }

  private _SurveyQuestionService: SurveyQuestionServiceProxy = new SurveyQuestionServiceProxy();
  get _surveyQuestionService() {
    if (this._SurveyQuestionService == undefined)
      this._SurveyQuestionService = new SurveyQuestionServiceProxy();
    return this._SurveyQuestionService;
  }

  public getQuestionItem() {
    this._surveyQuestionService.getQuestionById(this.questionId).then((res) => {
      debugger;
      this.questionItem = res;
    });
  }

  public getSurveyAnswerList() {
    var item = this.$route.query["questionId"];
    this.questionId = parseInt(item[0]);
    this._surveyAnswerService
      .getListSurveyAnswer(this.questionId)
      .then((res) => {
        this.surveyAnswerList = res.items;
        this.getQuestionItem();
      });
  }
  deleteSurveyAnswer(id) {
    this._surveyAnswerService.deleteSurveyAnswer(id).then((res) => {
      this.$Message.info("Kayıt Başarı ile Slindi");
      this.getSurveyAnswerList();
    });
  }
  create() {
    this.createModalShow = true;
  }

  mounted() {}

  created() {
    this.getSurveyAnswerList();
  }
}
</script>

<style>
@import "../css/bosstrap.css";
</style>