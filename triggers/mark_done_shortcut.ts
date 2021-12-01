import { DefineTrigger, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { MarkItemDone } from "../workflows/mark_item_done.ts";

export const MarkDoneShortcut = DefineTrigger("mark_don_shortcut", {
  type: TriggerTypes.Shortcut,
  name: "Mark TODO item as done",
  description: "Mark TODO item as done",
})
  .runs(MarkItemDone)
  .withInputs((ctx) => ({
    channel: ctx.data.channel_id,
  }));
