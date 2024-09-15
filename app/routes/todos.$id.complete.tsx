import { prisma } from "../../prisma/db.server";
import { redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ params }) => {
  const id = Number(params.id);
  await prisma.todo.update({
    where: { id },
    data: { completed: true },
  });
  return redirect("/");
};
