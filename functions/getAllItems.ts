import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";
import { TodoItems } from "../tables/todoitems.ts";

export const GetAllItems = DefineFunction(
  "get_all",
  {
    title: "Get all TODO items",
    description: "Get all TODO items",
    input_parameters: {
      channel: {
        type: Schema.slack.types.channel_id,
        description: "Channel",
      },
    },
    output_parameters: {
      result: {
        type: Schema.types.string,
        description: "The TODO items",
      },
      channel: {
        type: Schema.slack.types.channel_id,
        description: "Channel",
      },
    },
  },
  async ({ inputs, client }) => {
    const tables = TodoItems.api(client);
    const items = await tables.query();

    if (!items.ok) {
      return {
        outputs: {
          result: `Failed to list all indexes because of unknown error.`,
          channel: inputs.channel,
        },
      };
    }

    if (items.rows.length === 0) {
      return {
        outputs: {
          result: `There is no term in the glossary.`,
          channel: inputs.channel,
        },
      };
    }

    let returnString: string;
    const returnText = items.rows.map((t, i) => {
      returnString = "";
      returnString += `\`${t.id}\` -- ${t.title} -- ${t.is_done}`;
      return returnString;
    })
      .reduce((pre, cur) => pre + "\n" + cur);

    return {
      outputs: {
        result: returnText,
        channel: inputs.channel,
      },
    };
  },
);
