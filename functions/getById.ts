import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";
import { TodoItems } from "../tables/todoitems.ts";

export const GetById = DefineFunction(
  "get_by_id",
  {
    title: "Get all TODO items",
    description: "Get all TODO items",
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
    const result = await tables.get(inputs.id);
    const resutlStr = result.toString();

    return await {
      outputs: { result: resutlStr, channel: inputs.channel },
    };
  },
);