import { Todo } from '@/generated/prisma';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server'
import * as yup from 'yup';

interface Segments {
    params: Promise<{ id: string }>
}

const getTodo = async (id: string): Promise<Todo | null> => {

    const todo = await prisma.todo.findFirst({ where: { id } });
    return todo;
}

export async function GET(request: Request, { params }: Segments) {
    const { id: TodoId } = await params;
    const todo = await getTodo(TodoId);

    if (!todo) {
        return NextResponse.json({ message: `Todo con el id = ${TodoId} No exisit` }, { status: 404 })
    }


    return NextResponse.json(todo)
}


const PuttSchema = yup.object({
    description: yup.string().optional(),
    complete: yup.boolean().optional()
})

export async function PUT(request: Request, { params }: Segments) {
    const { id: TodoId } = await params;
    const todo = await getTodo(TodoId);

    if (!todo) {
        return NextResponse.json({ message: `Todo con el id = ${TodoId} No exisit` }, { status: 404 })
    }

    try {
        const { complete, description, ...rest } = await PuttSchema.validate(await request.json());

        const updateTodo = await prisma.todo.update({
            where: { id: TodoId },
            data: { complete, description }
        })

        return NextResponse.json(updateTodo)

    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }


}