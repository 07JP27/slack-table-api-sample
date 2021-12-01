import { DefineWorkflow, Schema } from "slack-cloud-sdk/mod.ts";
import { GetById } from "../functions/getById.ts";

export const GetTodoItemById = DefineWorkflow("get_item_by_id", {
  title: "Get TODO items by ID",
  description: "Get TODO items by ID",
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

const createStep = GetTodoItemById.addStep(GetById, {
  id: GetTodoItemById.inputs.channel,
  channel: GetTodoItemById.inputs.channel,
});

GetTodoItemById.addStep(Schema.slack.functions.SendMessage, {
  channel_id: createStep.outputs.channel,
  message: `${createStep.outputs.result}`,
});
