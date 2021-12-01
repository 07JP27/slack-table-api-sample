import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";
import { TodoItems } from "../tables/todoitems.ts";

export const MarkDone = DefineFunction(
  "mark_done",
  {
    title: "Mark item as done",
    description: "Mark item as done",
    input_parameters: {
      id: {
        type: Schema.types.string,
        description: "ID on the TODO item to mark as done",
      },
      channel: {
        type: Schema.slack.types.channel_id,
        description: "Channel",
      },
    },
    output_parameters: {
      result: {
        type: Schema.types.string,
        description: "The result",
      },
      channel: {
        type: Schema.slack.types.channel_id,
        description: "Channel",
      },
    },
  },
  async ({ inputs, client }) => {
    const tables = TodoItems.api(client);
    const item = await tables.get(inputs.id);

    if (!item.ok) {
      return {
        outputs: {
          result: `Failed to list all indexes because of unknown error.`,
          channel: inputs.channel,
        },
      };
    }

    if (!item.row) {
      return {
        outputs: {
          result: `There is no data.`,
          channel: inputs.channel,
        },
      };
    }

    const result = await tables.put({
      id: inputs.id,
      title: item.row.title,
      assign_to: item.row.assign_to,
      is_done: true,
    });

    if (!result.ok) {
      return {
        outputs: {
          result: `Failed to list all indexes because of unknown error.`,
          channel: inputs.channel,
        },
      };
    }

    return {
      outputs: {
        result: "Mark successfully",
        channel: inputs.channel,
      },
    };
  },
);
