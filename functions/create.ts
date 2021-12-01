import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";
import { TodoItems } from "../tables/todoitems.ts";

export const CreateItem = DefineFunction(
  "create",
  {
    title: "Ceate a new TODO item",
    description: "Add a new TODO item to table",
    input_parameters: {
      title: {
        type: Schema.types.string,
        description: "The title of the TODO item",
      },
      assignTo: {
        type: Schema.slack.types.user_id,
        description: "The user to assign the TODO item to",
      },
      isDone: {
        type: Schema.types.boolean,
        description: "Whether the TODO item is done",
      },
      channel: {
        type: Schema.slack.types.channel_id,
        description: "Channel",
      },
    },
    output_parameters: {
      id: {
        type: Schema.types.string,
        description: "The ID of the TODO item",
      },
      channel: {
        type: Schema.slack.types.channel_id,
        description: "Channel",
      },
    },
  },
  async ({ inputs, client }) => {
    const tables = TodoItems.api(client);
    const id = Guid.newGuid();
    await tables.put({
      id: id,
      title: inputs.title,
      assign_to: inputs.assignTo,
      is_done: inputs.isDone,
    });

    return await {
      outputs: { id, channel: inputs.channel },
    };
  },
);

class Guid {
  static newGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = Math.random() * 16 | 0,
          v = c == "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      },
    );
  }
}
