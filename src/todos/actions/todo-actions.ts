'use server'


import { Todo } from "@/generated/prisma";
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const sleep = async(seconds:number =0) => {
    return new Promise(resolve =>{
        setTimeout(() => {
            resolve(true);
        }, seconds * 1000);
    })
}

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
    await sleep(3);
    
    const todo = await prisma.todo.findFirst({ where: { id } });
    if (!todo) {
        throw `TODO con id ${id} no fue encontrado`;
    }

    const updateTodo = await prisma.todo.update({
        where: { id },
        data: { complete }
    })

    // Sirve para revalidar una ruta en especifico
    //Similar al router.refresh() Pero mejor mas rapido
    revalidatePath('/dashboard/server-todos');

    return updateTodo
}

export const addTodo = async (description: string,userId:string) => {
    try {


        const todo = await prisma.todo.create({ data: { description, userId } });
        revalidatePath('/dashboard/server-todos');

        return todo;

    } catch (error) {
        return {
            message: 'Error creando Todo'
        }
    }

}


export const deleteCompleted = async (): Promise<boolean> => {
    try {
        await prisma.todo.deleteMany({ where: { complete: true } });
        revalidatePath('/dashboard/server-todos');
        return true;

    } catch (error) {
        return false;
    }

}