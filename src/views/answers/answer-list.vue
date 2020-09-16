<template>
  <div>
    <Card dis-hover>
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

@Component({
  components: {},
})
export default class AnswerList extends AbpBase {
  surveyAnswerList: GetSurveyAnswerDto[] = [];
  isLoading: boolean = false;
  questionId: number;
  private _SurveyAnswerService: SurveyAnswerServiceProxy = new SurveyAnswerServiceProxy();
  get _surveyAnswerService() {
    if (this._SurveyAnswerService == undefined)
      this._SurveyAnswerService = new SurveyAnswerServiceProxy();
    return this._SurveyAnswerService;
  }

  public getSurveyAnswerList() {
      debugger;
    var item = this.$route.query["questionId"];
    this.questionId = parseInt(item[0]);
    this._surveyAnswerService.getListSurveyAnswer(this.questionId).then((res) => {
      this.surveyAnswerList = res.items;
    });
  }
deleteSurveyAnswer(id)
{
    this._surveyAnswerService.deleteSurveyAnswer(id).then((res)=>{
        this.$Message.info("Kayıt Başarı ile Slindi");
        this.getSurveyAnswerList();
    })
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