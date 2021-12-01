import { DefineWorkflow, Schema } from "slack-cloud-sdk/mod.ts";
import { GetAllItems } from "../functions/getAllItems.ts";

export const GetAllTodoItems = DefineWorkflow("get_all_items", {
  title: "Get all TODO items",
  description: "Get all TODO items",
  input_parameters: {
    channel: {
      type: Schema.slack.types.channel_id,
      description: "The channel to send the result message to",
    },
  },
});

const createStep = GetAllTodoItems.addStep(GetAllItems, {
  channel: GetAllTodoItems.inputs.channel,
});

GetAllTodoItems.addStep(Schema.slack.functions.SendMessage, {
  channel_id: createStep.outputs.channel,
  message: `${createStep.outputs.result}`,
});
