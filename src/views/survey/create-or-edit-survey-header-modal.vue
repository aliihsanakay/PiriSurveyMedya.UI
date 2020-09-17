<template>
  <div>
    <Modal
      :title="'Anket Başlığı Ekle/Düzenle'"
      :value="value"
      @on-ok="save"
      @on-visible-change="visibleChange"
    >
      <Form ref="surveyHeaderForm" label-position="top" :model="surveyHeader">
        <FormItem :label="'Anket Başlığı'" prop="name">
          <Input v-model="surveyHeader.name" :maxlength="100" :minlength="2"></Input>
        </FormItem>
        <FormItem :label="'Anket Açıklaması'" prop="content">
          <Input v-model="surveyHeader.content" :maxlength="500" :minlength="2"></Input>
        </FormItem>
        <FormItem :label="'Başlangıç Tarihi'" prop="startDate">
          <DatePicker
            type="date"
            v-model="surveyHeader.startDate"
            placeholder="Başlangıç Tarihi Seçiniz"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem :label="'Bitiş Tarihi'" prop="endDate">
          <DatePicker
            type="date"
            v-model="surveyHeader.endDate"
            placeholder="Bitiş Tarihi Seçiniz"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel">{{L('Cancel')}}</Button>
        <Button @click="save" type="primary">{{L('OK')}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "../../lib/util";
import AbpBase from "../../lib/abpbase";
import {
  CreateSurveyHeaderInput,
  SurveyHeaderServiceProxy,
} from "@/store/services/serviceProxy";
@Component
export default class CreateOrEditSurveyHeaderModal extends AbpBase {
  @Prop({ type: Boolean, default: false }) value: boolean;
  surveyHeader: CreateSurveyHeaderInput = new CreateSurveyHeaderInput();
  private _SurveyHeaderService: SurveyHeaderServiceProxy = new SurveyHeaderServiceProxy();
  get _surveyHeaderService() {
    if (this._SurveyHeaderService == undefined)
      this._SurveyHeaderService = new SurveyHeaderServiceProxy();
    return this._SurveyHeaderService;
  }

  save() {
    (this.$refs.surveyHeaderForm as any).validate(async (valid: boolean) => {
      if (valid) {
        
        this._surveyHeaderService
          .createOrEditSurveyHeader(this.surveyHeader)
          .then((res) => {
            (this.$refs.surveyHeaderForm as any).resetFields();
            this.$emit("save-success");
            this.$emit("input", false);
          });
      }
    });
  }
  cancel() {
    (this.$refs.surveyHeaderForm as any).resetFields();
    this.$emit("input", false);
  }
  visibleChange(value: boolean) {
    if (!value) {
      this.$emit("input", value);
    }
  }
}
</script>

