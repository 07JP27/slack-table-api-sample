import { DefineTrigger, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { GetAllTodoItems } from "../workflows/get_all_items.ts";

export const GetAllItemsShortcut = DefineTrigger("get_all_items_shortcut", {
  type: TriggerTypes.Shortcut,
  name: "Get all TODO items",
  description: "Get all TODO items",
})
  .runs(GetAllTodoItems)
  .withInputs((ctx) => ({
    channel: ctx.data.channel_id,
  }));
