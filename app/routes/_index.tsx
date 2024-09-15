import { Form, useLoaderData, redirect } from "@remix-run/react";
import { prisma } from '../../prisma/db.server';
import type { LoaderFunction, ActionFunction, MetaFunction } from "@remix-run/node";
import AddTodoClient from "~/components/todos/addTodo";

export const meta: MetaFunction = () => {
  return [
    { title: "Todos - Manage Your Tasks" },
    { name: "description", content: "A simple todo app to manage your daily tasks." },
    { property: "og:title", content: "Todos App" },
    { property: "og:description", content: "Keep track of your todos easily with this app." },
  ];
};

export const loader: LoaderFunction = async () => {
  const todos = await prisma.todo.findMany({
    orderBy: [
      {id: 'desc'}
    ]
  });
  return { todos };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");

  if (typeof title === "string" && title.trim() !== "") {
    await prisma.todo.create({ data: { title } });
  }

  return redirect('/');
};

export default function Index() {
  const { todos } = useLoaderData<{ todos: Array<{ id: number; title: string; completed: boolean }> }>();

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>
      <AddTodoClient />
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center p-2 border">
            <span className={todo.completed ? "line-through" : ""}>{todo.title}</span>
            <div className="flex space-x-2">
              <Form method="post" action={`/todos/${todo.id}/complete`}>
                <button className="bg-green-500 text-white p-2">Complete</button>
              </Form>
              <Form method="post" action={`/todos/${todo.id}/delete`}>
                <button className="bg-red-500 text-white p-2">Delete</button>
              </Form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}