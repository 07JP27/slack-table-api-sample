import { Project } from "slack-cloud-sdk/mod.ts";
import { CreateItem } from "./functions/create.ts";
import { CreateTodoItem } from "./workflows/create_todoitem.ts";
import { CreateItemShortcut } from "./triggers/create_item_shortcut.ts";
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
  functions: [CreateItem],
  workflows: [CreateTodoItem],
  triggers: [CreateItemShortcut],
  tables: [TodoItems],
  outgoingDomains: [],
});
