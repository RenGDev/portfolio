import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"
import { createToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function LOGIN(request: Request){
    const { username, password } = await request.json()

    const user = await prisma.user.findUnique({ where: { username } })

    if (!user) {
        return Response.json({ message: 'Username not exists' }, { status: 401 });
    }

    const correctPassword = bcrypt.compareSync(password, user.password)

    if (!correctPassword){
        return Response.json({ message: "Password is Wrong"})
    }

    const token = await createToken({
        id: user.id,
        username: user.username,
        is_admin: user.is_admin
    })

    const cookieStore = await cookies();
    cookieStore.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 2,
    })

    return Response.json({ message: 'Login Successful' });
}

export async function LOGOUT(request: Request){
    const cookieStore = await cookies()
    cookieStore.delete('token')
    return Response.json({ message: 'Logout Successful'})
}