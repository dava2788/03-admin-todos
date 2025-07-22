'use client'
import { Todo } from "@/generated/prisma";
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';


interface Props {
    todo: Todo
    // Todo: Acciones q quiero llamar
    toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
    const todoDone = "@apply line-through bg-blue-50 rounded-lg shadow-sm p-5 border-dashed border border-blue-500 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0;";
    const todoPending = "@apply bg-red-50 rounded-lg shadow-sm p-5 border-dashed border border-red-500 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0";

    return (
        <div className={todo.complete ? todoDone : todoPending}>
            <div className="flex flex-col sm:flex-row justify-start items gap-4">
                <div
                    onClick={() => toggleTodo(todo.id, !todo.complete)}
                    className={`
                    flex p-2 rounded-md cursor-pointer 
                    hover:bg-opacity-60
                   ${todo.complete ? 'bg-blue-100' : 'bg-red-100'} 
                   `}
                >
                    {
                        todo.complete
                            ? <IoCheckboxOutline size={30} />
                            : <IoSquareOutline size={30} />
                    }

                </div>
                <div className="text-center sm:text-left">
                    {todo.description}
                </div>

            </div>
        </div>
    )
}
