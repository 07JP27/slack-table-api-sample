import { DefineTrigger, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { GetTodoItemById } from "../workflows/get_item_by_id.ts";

export const GetItemByIdShortcut = DefineTrigger("get_by_id_shortcut", {
  type: TriggerTypes.Shortcut,
  name: "Get TODO item by ID",
  description: "Get TODO item by ID",
})
  .runs(GetTodoItemById)
  .withInputs((ctx) => ({
    channel: ctx.data.channel_id,
  }));
