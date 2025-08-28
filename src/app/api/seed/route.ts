import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {

    await prisma.todo.deleteMany();//Delete from todo
    await prisma.user.deleteMany()

    const user = await prisma.user.create({
        data: {
            email: 'test1@google.com',
            password: bcrypt.hashSync('123456'),
            roles: ['admin', 'client', 'super-user'],
            todos: {
                create: [
                    { description: 'Piedra del Alma', complete: true },
                    { description: 'Piedra del Poder' },
                    { description: 'Piedra del Tiempo' },
                    { description: 'Piedra del Espacio' },
                    { description: 'Piedra del Realidad' }

                ]
            }
        }
    });


    console.log(user);

    return NextResponse.json({ message: 'Seed Execute' });
}