import { getUserSessionServer } from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    const take = Number(searchParams.get('take') ?? '10');
    const skip = Number(searchParams.get('skip') ?? '0');

    if (isNaN(take)) {
        return NextResponse.json({ message: 'query string  named "Take" is not a Number' }, { status: 400 });
    }

    if (isNaN(skip)) {
        return NextResponse.json({ message: 'query string  named "skip" is not a Number' }, { status: 400 });
    }
    // el + al frente de la variable convierte a numero
    const todos = await prisma.todo.findMany({ take, skip });

    return NextResponse.json(todos);

}

const PostSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false), // TODO mostrar algo interesante
})

export async function POST(request: Request) {
    const user = await getUserSessionServer();

    if (!user) return NextResponse.json('NO Autorizado', { status: 401 });

    try {
        const { complete, description } = await PostSchema.validate(await request.json());

        const todo = await prisma.todo.create({ data: { complete, description, userId: user.id as string } });

        return NextResponse.json(todo)

    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    const user = await getUserSessionServer();

    if (!user) return NextResponse.json('NO Autorizado', { status: 401 });
    try {

        await prisma.todo.deleteMany({ where: { complete: true,userId:user.id } });

        return NextResponse.json('Exito')

    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}
