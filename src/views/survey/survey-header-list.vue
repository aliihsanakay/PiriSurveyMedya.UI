<template>
  <div>
    <Card dis-hover>
      <Table
        :loading="isLoading"
        :columns="columns"
        :no-data-text="L('NoDatas')"
        border
        :data="headerList"
      ></Table>
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
  SurveyHeaderServiceProxy,
} from "../../store/services/serviceProxy";

export default class SurveyHeaderList extends AbpBase {
  /**
   *
   */

  private _surveyHeaderService: SurveyHeaderServiceProxy = new SurveyHeaderServiceProxy();
  headerList = new Array<GetSurveyHeaderDto>();
  isLoading: boolean = false;
  constructor() {
    super();

    this.getSurveyHeaderList();
  }
  ready() {}

  public getSurveyHeaderList() {
    this._surveyHeaderService.getSurveyHeader().then((res) => {
      this.headerList = res.items;
      console.log(this.headerList);
    });
  }
  create() {
    console.log("create çalıştı");
  }

  columns = [
    {
      title: "No",
      key: "id",
    },
    {
      title: "Adı",
      key: "name",
    },
    {
      title: "Açıklama",
      key: "content",
    },
    {
      title: "Baş Tarihi",
      key: "startDate",
      render: (h: any, params: any) => {
        return h("span", new Date(params.row.startDate).toLocaleDateString());
      },
    },
    {
      title: "Bit Tarihi",
      key: "endDate",
      render: (h: any, params: any) => {
        return h("span", new Date(params.row.endDate).toLocaleDateString());
      },
    },
  ];
}
</script>