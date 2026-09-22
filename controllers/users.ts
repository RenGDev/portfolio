import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { requireAuth } from "@/lib/requireAuth";

type Context = { params: Promise<{ id: string }> };

export async function GET_MANAGER(request: Request, context: Context){
    const auth = await requireAuth(request)
    
    if(!auth.authorized){
        return Response.json({message: "Not Authorized"}, { status: 401 })
    }

    const { searchParams } = new URL(request.url);

    const pagina_atual = Number(searchParams.get('page')) || 1
    const total_per_page = Number(searchParams.get('limit')) || 3
    const how_much_skip = (pagina_atual - 1) * total_per_page;

    if(context?.params){
        const { id } = await context.params
        const users = await prisma.user.findUnique({
            where: { id: Number(id) } 
        })

        return users
            ? Response.json(users)
            : Response.json({ error: "User not found" }, { status: 404 })
    }

    const users = await prisma.user.findMany({
        select: { id: true, username: true, email: true, git_hub_link: true, linkedin_link: true },
        skip: how_much_skip,
        take: total_per_page,
        orderBy: {
          id: 'asc',
        },
    })

    const total = await prisma.user.count();
    const total_pages = Math.ceil(total / total_per_page);

    return Response.json({
        data: users,
        pagination: {
            page: pagina_atual,
            total_per_page: total_per_page,
            total,
            total_pages: total_pages
        }
    })
}

export async function GET(request: Request){
     
    const users = await prisma.user.findUnique({
        select: { first_name: true, last_name: true, is_admin: true, email: true, git_hub_link: true, linkedin_link: true, about_me: true },
        where: { username: 'admin', is_admin: true }
    })

    return Response.json(users)
}

export async function POST(request: Request){
    const auth = await requireAuth(request)
    
    if(!auth.authorized){
        return Response.json({message: "Not Authorized"}, { status: 401 })
    }

    const totalUsers = await prisma.user.count();

    if (totalUsers >= 1) {
      return Response.json(
        { message: "An user alredy exists" },
        { status: 403 }
      );
    }

    const body = await request.json();

    if (!body.password) {
      return Response.json({ message: "Password is Missing" }, { status: 400 });
    }

    const saltRounds = 12
    const salt = bcrypt.genSaltSync( saltRounds ) 
    const hash = bcrypt.hashSync(body.password, salt)

    const user = await prisma.user.create({ data: {...body, password: hash} })

    const { password, ...userWithoutPassword } = user;

    return Response.json({ message: "User created", data: userWithoutPassword }, { status: 201 })
}

export async function PUT(request: Request, { params }: Context){
    const auth = await requireAuth(request)
    
    if(!auth.authorized){
        return Response.json({message: "Not Authorized"}, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    const data = { ...body }

    if (body.password) {
        const saltRounds = 12
        const salt = bcrypt.genSaltSync(saltRounds)
        data.password = bcrypt.hashSync(body.password, salt)
    } else {
        delete data.password
    }

    const user = await prisma.user.update({ where: { id: Number(id) }, data })

    const { password, ...userWithoutPassword } = user

    return Response.json({ message: "User updated", data: userWithoutPassword }, { status: 201 })
}

export async function DELETE(request: Request, { params }: Context){
    const auth = await requireAuth(request)
    
    if(!auth.authorized){
        return Response.json({message: "Not Authorized"}, { status: 401 })
    }
    
    const { id } = await params
    await prisma.user.delete({ where: { id: Number(id) } })
    return Response.json({ message: "User Deleted" })
}
