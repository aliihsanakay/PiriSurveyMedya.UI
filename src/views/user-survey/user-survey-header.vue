<template>
  <div>
    <Card dis-hover>
        <div class="row">
 <card style="width:350px" v-for="item in headerList " :key="item.id">
        <p slot="title">
          <icon type="ios-film-outline"></icon>
          {{item.name}}
        </p>
        <p>
        
          {{item.content}}
        </p>
     
        <ul class="p-4">
          <li>
            <span>Başlama Tarihi:{{item.startDate | formatDate}}</span>
          </li>
           <li>
            <span>Bitiş Tarihi:{{item.endDate | formatDate}}</span>
          </li>
        </ul>
        <router-link class="btn btn-primary" :to="{ path: '/surveyDetail', query: { headerId: item.id }}">Başla</router-link>

        <!-- <button class="btn btn-success btn-block">Başla</button> -->
      </card>
      <h2 v-if="headerList.length<=0">Cevaplayabileceğiniz hiç anket kalmadı :(</h2>
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
  SurveyServiceProxy,
} from "../../store/services/serviceProxy";

@Component({})
export default class UserSurveyList extends AbpBase {
  headerList: GetSurveyHeaderDto[] = [];
  private _SurveyHeaderService: SurveyServiceProxy = new SurveyServiceProxy();
  get _surveyService() {
    if (this._SurveyHeaderService == undefined)
      this._SurveyHeaderService = new SurveyServiceProxy();
    return this._SurveyHeaderService;
  }

  public getSurveyHeaderList() {
    this._surveyService.getCurrentUserSurveyList().then((res) => {
      this.headerList = res.items;
      console.log(this.headerList);
    });
  }

  mounted() {}

  created() {
    this.getSurveyHeaderList();
  }
}
</script>

<style>
@import "../css/bosstrap.css";
</style>