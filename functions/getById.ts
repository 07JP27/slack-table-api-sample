import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";
import { TodoItems } from "../tables/todoitems.ts";

export const GetById = DefineFunction(
  "get_by_id",
  {
    title: "Get TODO item by ID",
    description: "Get TODO item by ID",
    input_parameters: {
      id: {
        type: Schema.types.string,
        description: "ID on the TODO item",
      },
      channel: {
        type: Schema.slack.types.channel_id,
        description: "Channel",
      },
    },
    output_parameters: {
      result: {
        type: Schema.types.string,
        description: "The TODO item",
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
          result: `There is no term in the glossary.`,
          channel: inputs.channel,
        },
      };
    }
    const resutlStr = `${item.id}+" "+${item.assign_to}+" "+${item.is_done}`;
    return {
      outputs: {
        result: resutlStr,
        channel: inputs.channel,
      },
    };
  },
);
