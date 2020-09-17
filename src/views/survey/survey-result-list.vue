<template>
  <div>
    <Card dis-hover>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Soru</th>
            <th class="wpx-100"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in resultList">
            <tr :key="index">
              <td scope="row">{{item.questionId}}</td>
              <td>{{item.question}}</td>
              <td class="wpx-100">
                <button @click="toggleDetail(item.questionId)" class="btn btn-sm btn-primary">Detay</button>
              </td>
            </tr>
            <tr :key="index+'d'" v-if="openedDetail.includes(item.questionId)" class="-hide">
              <td colspan="3">
                <table class="table table-sm">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Cevap</th>
                      <th class="wpx-100"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(detail, detailIndex) in item.answers">
                      <tr :key="detailIndex">
                        <td>{{detail.answerId}}</td>
                        <td>{{detail.answer}}</td>
                        <td class="wpx-100">
                          <button
                            @click="toggleSecondDetail(detail.answerId)"
                            class="btn btn-sm btn-warning"
                          >Detay</button>
                        </td>
                      </tr>
                      <tr
                        :key="detailIndex+'dd'"
                        colspan="3"
                        v-if="openedSecondDetail.includes(detail.answerId)"
                        class="-hide"
                      >
                        <td colspan="3">
                          <table class="table table-sm">
                            <thead class="thead-light">
                              <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Mail</th>
                                <th scope="col">Adı Soyadı</th>
                                <th scope="col">Verilen Cevap</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(dDetail, dDetailIndex) in detail.answerResults"
                                :key="dDetailIndex"
                              >
                                <td>{{dDetail.userId}}</td>
                                <td>{{dDetail.userMail}}</td>
                                <td>{{dDetail.userFullName}}</td>
                                <td>{{dDetail.answerResult}}</td>
                              </tr>
                              <tr v-if="detail.answerResults.length<=0">
                                <td colspan="4">
                                  <div class="text-center">Hiç Cevap Verilmemiş</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </td>
            </tr>
          </template>
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
  GetSurveyHeaderDto,
  GetSurveyResultDto,
  SurveyHeaderServiceProxy,
  SurveyResultServiceProxy,
} from "../../store/services/serviceProxy";
import CreateOrEditSurveyHeaderModal from "./create-or-edit-survey-header-modal.vue";

@Component({
  components: { CreateOrEditSurveyHeaderModal },
})
export default class SurveyResultList extends AbpBase {
  resultList: GetSurveyResultDto[] = [];
  headerId: number;
  openedDetail: any[] = [];
  openedSecondDetail: any[] = [];
  private _SurveyResultService: SurveyResultServiceProxy = new SurveyResultServiceProxy();
  get _surveyResultService() {
    if (this._SurveyResultService == undefined)
      this._SurveyResultService = new SurveyResultServiceProxy();
    return this._SurveyResultService;
  }

  public getSurveyResultList() {
    var item = this.$route.query["headerId"];
    this.headerId = parseInt(item[0]);
    this._surveyResultService.getSurveyResult(this.headerId).then((res) => {
      this.resultList = res.items;
    });
  }

  toggleDetail(id) {
    const index = this.openedDetail.indexOf(id);
    if (index > -1) {
      this.openedDetail.splice(index, 1);
    } else {
      this.openedDetail.push(id);
    }
  }

  toggleSecondDetail(id) {
    const index = this.openedSecondDetail.indexOf(id);
    if (index > -1) {
      this.openedSecondDetail.splice(index, 1);
    } else {
      this.openedSecondDetail.push(id);
    }
  }

  created() {
    this.getSurveyResultList();
  }
}
</script>

<style>
@import "../css/bosstrap.css";

.wpx-100 {
  width: 100px;
}
</style>