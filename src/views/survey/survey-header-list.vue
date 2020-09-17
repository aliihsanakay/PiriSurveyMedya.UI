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
            <th scope="col">Adı</th>
            <th scope="col">Açıklama</th>
            <th scope="col">Başlangıç Tarihi</th>
            <th scope="col">Bitiş Tarihi</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in headerList" :key="item.id">
            <th scope="row">{{item.id}}</th>
            <td>{{item.name}}</td>
            <td>{{item.content}}</td>
            <td>{{item.startDate | formatDate}}</td>
            <td>{{item.endDate | formatDate}}</td>
            <td>
              <!-- <button class="btn btn-primary btn-sm">Düzenle</button> Kodlanacak-->
                 <router-link :to="{ path: '/setting/questionList?headerId='+item.id , }">Sorular</router-link>
                 <router-link :to="{ path: '/setting/surveyResultList?headerId='+item.id , }">Cevaplar</router-link>
              <button class="btn btn-danger btn-sm" @click="deleteSurveyHeader(item.id)">Sil</button>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
    <create-or-edit-survey-header-modal
      v-model="createModalShow"
      @save-success="getSurveyHeaderList"
    ></create-or-edit-survey-header-modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import PageRequest from "@/store/entities/page-request";
import {
  GetSurveyHeaderDto,
  SurveyHeaderServiceProxy,
} from "../../store/services/serviceProxy";
import CreateOrEditSurveyHeaderModal from "./create-or-edit-survey-header-modal.vue";

@Component({
  components: { CreateOrEditSurveyHeaderModal },
})
export default class SurveyHeaderList extends AbpBase {
  headerList: GetSurveyHeaderDto[] = [];
  isLoading: boolean = false;
  createModalShow: boolean = false;
  private _SurveyHeaderService: SurveyHeaderServiceProxy = new SurveyHeaderServiceProxy();
  get _surveyHeaderService() {
    if (this._SurveyHeaderService == undefined)
      this._SurveyHeaderService = new SurveyHeaderServiceProxy();
    return this._SurveyHeaderService;
  }

  public getSurveyHeaderList() {
    this._surveyHeaderService.getSurveyHeader().then((res) => {
      this.headerList = res.items;
      console.log(this.headerList);
    });
  }

  create() {
    this.createModalShow = true;
  }
  
  deleteSurveyHeader(id: number) {
    this._surveyHeaderService.deleteSurveyHeader(id).then((res) => {
         this.$Message.success("İşlem Tamamlandı");
      this.getSurveyHeaderList();
    });
  }
  mounted() {
    console.log("mounted çalıştı");
    // this.getSurveyHeaderList();
  }

  created() {
    console.log("created çalıştı");
    this.getSurveyHeaderList();
  }
}
</script>

<style>
@import "../css/bosstrap.css";
</style>