import { Project } from "slack-cloud-sdk/mod.ts";

import { CreateItem } from "./functions/create.ts";
import { GetById } from "./functions/getById.ts";
import { GetAllItems } from "./functions/getAllItems.ts";
import { MarkDone } from "./functions/markDone.ts";

import { CreateTodoItem } from "./workflows/create_todoitem.ts";
import { GetTodoItemById } from "./workflows/get_item_by_id.ts";
import { GetAllTodoItems } from "./workflows/get_all_items.ts";
import { MarkItemDone } from "./workflows/mark_item_done.ts";

import { CreateItemShortcut } from "./triggers/create_item_shortcut.ts";
import { GetItemByIdShortcut } from "./triggers/get_by_id_shortcut.ts";
import { GetAllItemsShortcut } from "./triggers/get_all_items_shortcut.ts";
import { MarkDoneShortcut } from "./triggers/mark_done_shortcut.ts";

import { TodoItems } from "./tables/todoitems.ts";

Project({
  name: "my-new-todo-project",
  description:
    "A demo showing how to use Slack workflows, functions, and triggers though the TODO app",
  icon: "assets/icon.png",
  runtime: "deno1.x",
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "tables:read",
    "tables:write",
  ],
  functions: [CreateItem, GetById, GetAllItems, MarkDone],
  workflows: [CreateTodoItem, GetTodoItemById, GetAllTodoItems, MarkItemDone],
  triggers: [
    CreateItemShortcut,
    GetItemByIdShortcut,
    GetAllItemsShortcut,
    MarkDoneShortcut,
  ],
  tables: [TodoItems],
  outgoingDomains: [],
});
