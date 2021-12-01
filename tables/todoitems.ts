import { DefineTable, Schema } from "slack-cloud-sdk/mod.ts";

export const TodoItems = DefineTable("todos", {
  primary_key: "id",
  columns: {
    id: {
      type: Schema.types.string,
    },
    title: {
      type: Schema.types.string,
    },
    assign_to: {
      type: Schema.slack.types.user_id,
    },
    is_done: {
      type: Schema.types.boolean,
    },
  },
});
