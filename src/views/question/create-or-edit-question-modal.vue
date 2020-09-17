<template>
  <div>
    <Modal
      :title="'Anket Sorusu Ekle/Düzenle'"
      :value="value"
      @on-ok="save"
      @on-visible-change="visibleChange"
    >
      <Form ref="surveyQuestionForm" label-position="top" :model="questionItem">
        <FormItem :label="'Soru'" prop="question">
          <Input v-model="questionItem.question" :maxlength="1000" :minlength="2"></Input>
        </FormItem>

        <FormItem :label="'Soru Tipi'" prop="questionTypeId">
          <Select
            v-model="questionItem.questionTypeId"
            style="width:200px"
            :placeholder="'Soru Tipi'"
          >
            <Option :value="1" :key="1">Tekli Seçim (Radio Button)</Option>
            <Option :value="2" :key="2">Açık Uçlu</Option>
            <Option :value="3" :key="3">Çoklu Seçim (Checkbox)</Option>
          </Select>
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
  CreateSurveyQuestionInput,
  SurveyHeaderServiceProxy,
  SurveyQuestionServiceProxy,
} from "@/store/services/serviceProxy";
@Component
export default class CreateOrEditQuestionModal extends AbpBase {
  @Prop({ type: Boolean, default: false }) value: boolean;
  @Prop({ type: Number, default: false }) headerId: number;
  questionItem: CreateSurveyQuestionInput = new CreateSurveyQuestionInput();

  private _SurveyQuestionService: SurveyQuestionServiceProxy = new SurveyQuestionServiceProxy();
  get _surveyQuestionService() {
    if (this._SurveyQuestionService == undefined)
      this._SurveyQuestionService = new SurveyQuestionServiceProxy();
    return this._SurveyQuestionService;
  }

  save() {
    (this.$refs.surveyQuestionForm as any).validate(async (valid: boolean) => {
      if (valid) {
        this.questionItem.headerId = this.headerId;
        this._surveyQuestionService
          .createOrUpdateSurveyQuestion(this.questionItem)
          .then((res) => {
            (this.$refs.surveyQuestionForm as any).resetFields();
            this.$emit("save-success");
            this.$emit("input", false);
          });
      }
    });
  }
  cancel() {
    (this.$refs.surveyQuestionForm as any).resetFields();
    this.$emit("input", false);
  }
  visibleChange(value: boolean) {
    if (!value) {
      this.$emit("input", value);
    }
  }
}
</script>

