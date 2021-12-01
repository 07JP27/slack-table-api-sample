import { DefineWorkflow, Schema } from "slack-cloud-sdk/mod.ts";
import { MarkDone } from "../functions/markDone.ts";

export const MarkItemDone = DefineWorkflow("mark_item_done", {
  title: "Mark TODO items as done",
  description: "Mark TODO items as done",
  input_parameters: {
    id: {
      type: Schema.types.string,
      description: "The TODO item",
    },
    channel: {
      type: Schema.slack.types.channel_id,
      description: "The channel to send the result message to",
    },
  },
});

const createStep = MarkItemDone.addStep(MarkDone, {
  id: MarkItemDone.inputs.id,
  channel: MarkItemDone.inputs.channel,
});

MarkItemDone.addStep(Schema.slack.functions.SendMessage, {
  channel_id: createStep.outputs.channel,
  message: `${createStep.outputs.result}`,
});
