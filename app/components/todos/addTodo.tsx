import { Form } from "@remix-run/react";

export default function () {
  return (
    <Form method="post" className="mb-4">
        <input
          type="text"
          name="title"
          className="border p-2 w-full"
          placeholder="Add a new todo"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2 w-full">
          Add Todo
        </button>
      </Form>
  );
}