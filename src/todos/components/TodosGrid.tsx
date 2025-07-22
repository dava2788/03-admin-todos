'use client'

import { Todo } from '@/generated/prisma'
import { TodoItem } from './TodoItem';
import * as TodosApi from '@/todos/helpers/todos';
import { useRouter } from 'next/navigation';

interface Props {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {

  //agregar el use Router de NEXT/navigation
  const router = useRouter();


  const toggleTodo = async (id: string, complete: boolean) => {
    const updateTodo = await TodosApi.updateTodo(id, complete);
    console.log({ updateTodo });
    // esto nos va actulizar la route y los componentes relacionados
    router.refresh();

  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
      {
        todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        ))
      }
    </div>
  )
}
