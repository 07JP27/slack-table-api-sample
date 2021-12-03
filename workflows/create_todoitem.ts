import { DefineWorkflow, Schema } from "slack-cloud-sdk/mod.ts";
import { CreateItem } from "../functions/create.ts";

export const CreateTodoItem = DefineWorkflow("create_todo_item", {
  title: "Create TODO item",
  description: "Create a TODO item",
  input_parameters: {
    title: {
      type: Schema.types.string,
      description: "The title of the TODO item",
    },
    assignTo: {
      type: Schema.slack.types.user_id,
      description: "The user to assign the TODO item to",
    },
    channel: {
      type: Schema.slack.types.channel_id,
      description: "The channel to send the result message to",
    },
  },
});

const createStep = CreateTodoItem.addStep(CreateItem, {
  title: CreateTodoItem.inputs.title,
  assignTo: CreateTodoItem.inputs.assignTo,
  isDone: false,
  channel: CreateTodoItem.inputs.channel,
});

CreateTodoItem.addStep(Schema.slack.functions.SendMessage, {
  channel_id: createStep.outputs.channel,
  message: `Create item successfully with ID: *${createStep.outputs.id}*`,
});
