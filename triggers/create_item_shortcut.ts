import { DefineTrigger, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { CreateTodoItem } from "../workflows/create_todoitem.ts";

export const CreateItemShortcut = DefineTrigger("create_item_shortcut", {
  type: TriggerTypes.Shortcut,
  name: "Create a TODO item",
  description: "Create a TODO item",
})
  .runs(CreateTodoItem)
  .withInputs((ctx) => ({
    channel: ctx.data.channel_id,
  }));
