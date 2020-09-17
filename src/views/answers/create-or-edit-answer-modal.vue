<template>
  <div>
    <Modal
      :title="'Soru Şıkları Ekle/Düzenle'"
      :value="value"
      @on-ok="save"
      @on-visible-change="visibleChange"
    >
      <Form ref="surveyAnswerForm" label-position="top" :model="answerItem">
        <FormItem :label="'Cevap Şıkkı'" prop="content">
          <Input v-model="answerItem.content" :maxlength="1000" :minlength="2"></Input>
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
  CreateSurveyAnswerInput,
  CreateSurveyHeaderInput,
  CreateSurveyQuestionInput,
  SurveyAnswerServiceProxy,
  SurveyHeaderServiceProxy,
  SurveyQuestionServiceProxy,
} from "@/store/services/serviceProxy";
@Component
export default class CreateOrEditAnswerModal extends AbpBase {
  @Prop({ type: Boolean, default: false }) value: boolean;
  @Prop({ type: Number, default: false }) questionId: number;
  answerItem: CreateSurveyAnswerInput = new CreateSurveyAnswerInput();

  private _SurveyAnswerService: SurveyAnswerServiceProxy = new SurveyAnswerServiceProxy();
  get _surveyAnswerService() {
    if (this._SurveyAnswerService == undefined)
      this._SurveyAnswerService = new SurveyAnswerServiceProxy();
    return this._SurveyAnswerService;
  }

  save() {
    (this.$refs.surveyAnswerForm as any).validate(async (valid: boolean) => {
      if (valid) {
        this.answerItem.questionId = this.questionId;
        this._surveyAnswerService
          .createOrUpdateSurveyAnswer(this.answerItem)
          .then((res) => {
            (this.$refs.surveyAnswerForm as any).resetFields();
            this.$emit("save-success");
            this.$emit("input", false);
          });
      }
    });
  }
  cancel() {
    (this.$refs.surveyAnswerForm as any).resetFields();
    this.$emit("input", false);
  }
  visibleChange(value: boolean) {
    if (!value) {
      this.$emit("input", value);
    }
  }
}
</script>

