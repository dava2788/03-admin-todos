'use client'
import { Todo } from "@/generated/prisma";
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import { startTransition, useOptimistic} from 'react';



interface Props {
    todo: Todo
    // Todo: Acciones q quiero llamar
    toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
    const todoDone = "@apply line-through bg-blue-50 rounded-lg shadow-sm p-5 border-dashed border border-blue-500 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0;";
    const todoPending = "@apply bg-red-50 rounded-lg shadow-sm p-5 border-dashed border border-red-500 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0";

    const [todoOptimistic, toogleTodoOptimistic] = useOptimistic(
        todo,
        (state, newCompletevalue:boolean) => ({...state, complete:newCompletevalue})
    );

    const onToggleTodo = async ()=>{
        try {
            startTransition(() => toogleTodoOptimistic(!todoOptimistic.complete))
            
            await toggleTodo(todoOptimistic.id, !todoOptimistic.complete)
            
        } catch (error) {
            startTransition(() => toogleTodoOptimistic(!todoOptimistic.complete))
        }
    }

    return (
        <div className={todoOptimistic.complete ? todoDone : todoPending}>
            <div className="flex flex-col sm:flex-row justify-start items gap-4">
                <div
                    // onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.complete)}
                    //Con UseOptimistic
                    onClick={onToggleTodo}
                    className={`
                    flex p-2 rounded-md cursor-pointer 
                    hover:bg-opacity-60
                   ${todoOptimistic.complete ? 'bg-blue-100' : 'bg-red-100'} 
                   `}
                >
                    {
                        todoOptimistic.complete
                            ? <IoCheckboxOutline size={30} />
                            : <IoSquareOutline size={30} />
                    }

                </div>
                <div className="text-center sm:text-left">
                    {todoOptimistic.description}
                </div>

            </div>
        </div>
    )
}
