<template>
  <div>
    <Card dis-hover>
      <div class="row">
        <button class="btn btn-primary" @click="create">Ekle</button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Soru Tipi</th>
            <th scope="col">Soru</th>

            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in questionList" :key="item.id">
            <th scope="row">{{item.id}}</th>
            <td>{{item.questionTypeId==1?'Tekli Seçim':item.questionTypeId==2?'Serbest Giriş (Açık uçlu)':item.questionTypeId==3?'Çoklu Seçim':''}}</td>
            <td>{{item.question}}</td>
            <td>
              <router-link class="btn btn-sm btn-primary mr-2"
                v-if="item.questionTypeId!=2"
                :to="{ path: '/setting/answerList?questionId='+item.id  }"
              >Cevap Şıkları</router-link>
              <!-- <button class="btn btn-primary btn-sm">Düzenle</button> Kodlanacak-->
              <button class="btn btn-danger btn-sm" @click="deleteSurveyQesution(item.id)">Sil</button>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
    <create-or-edit-question-modal
      :headerId="headerId"
      v-model="createModalShow"
      @save-success="getSurveyQuestionList"
    ></create-or-edit-question-modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import PageRequest from "@/store/entities/page-request";
import {
  GetQuestionDto,
  GetSurveyHeaderDto,
  SurveyHeaderServiceProxy,
  SurveyQuestionServiceProxy,
} from "../../store/services/serviceProxy";
import CreateOrEditQuestionModal from "./create-or-edit-question-modal.vue";

@Component({
  components: { CreateOrEditQuestionModal },
})
export default class QuestionList extends AbpBase {
  questionList: GetQuestionDto[] = [];
  isLoading: boolean = false;
  headerId: number;
  createModalShow: boolean = false;

  private _SurveyQuestionService: SurveyQuestionServiceProxy = new SurveyQuestionServiceProxy();
  get _surveyQuestionService() {
    if (this._SurveyQuestionService == undefined)
      this._SurveyQuestionService = new SurveyQuestionServiceProxy();
    return this._SurveyQuestionService;
  }

  public getSurveyQuestionList() {
   
    var item = this.$route.query["headerId"];
    this.headerId = parseInt(item[0]);
    this._surveyQuestionService.getListQuestion(this.headerId).then((res) => {
      this.questionList = res.items;
    });
  }

  deleteSurveyQesution(id) {
    this._surveyQuestionService.deleteSurveyQuestion(id).then((res) => {
      this.$Message.info("Kayıt Başarı ile Silindi");
      this.getSurveyQuestionList();
    });
  }
  create() {
    this.createModalShow = true;
  }
  mounted() {}

  created() {
    this.getSurveyQuestionList();
  }
}
</script>

<style>
@import "../css/bosstrap.css";
</style>