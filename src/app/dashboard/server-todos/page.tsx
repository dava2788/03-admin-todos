//En NEXT 15 por defecto ya next no fuerza el cache.
//Ahora por defecto no lo cachea.
//Mas bien ahora hay q definir cual quiere q sea cacheada
// export const dynamic = 'auto'
// export const revalidate = 0
//export const dynamic = 'force-static'


import { getUserSessionServer } from "@/auth/actions/auth-actions";
import { NewTodo } from "@/components";
import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";
import { redirect } from "next/navigation";


export const metadata = {
  title: 'Lista de Todos',
  description: 'Lista de los Todos',
};

export default async function ServerTodosPage() {
  const user = await getUserSessionServer();
  if (!user) redirect('/api/auth/signin');

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: 'asc' }
  });

  console.log('Construido');

  return (
    <>
    <span className="text-3xl mb-10">Server Action</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}