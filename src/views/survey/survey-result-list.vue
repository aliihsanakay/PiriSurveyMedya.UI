<template>
  <div>
    <Card dis-hover>
     
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Soru</th>
            <th scope="col">Soru Tipi</th>           
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in resultList" :key="item.id">
            <th scope="row">{{item.id}}</th>
            <td>{{item.name}}</td>
            <td>{{item.content}}</td>
            <td>{{item.startDate | formatDate}}</td>
            <td>{{item.endDate | formatDate}}</td>
            <td>
              <!-- <button class="btn btn-primary btn-sm">Düzenle</button> Kodlanacak-->
              <button class="btn btn-danger btn-sm" @click="deleteSurveyHeader(item.id)">Sil</button>
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

  created() {
    this.getSurveyResultList();
  }
}
</script>

<style>
@import "../css/bosstrap.css";
</style>