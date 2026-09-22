import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/requireAuth";

type ManagerContext = { params?: Promise<{ id?: string }> }; 
type IdContext = { params: Promise<{ id: string }> }; 

export async function GET_MANAGER(request: Request, context: ManagerContext){
    const auth = await requireAuth(request)
        
    if(!auth.authorized){
        return Response.json({message: "Not Authorized"}, { status: 401 })
    }

    const { searchParams } = new URL(request.url);

    const pagina_atual = Number(searchParams.get('page')) || 1
    const total_per_page = Number(searchParams.get('limit')) || 3
    const how_much_skip = (pagina_atual - 1) * total_per_page;

    if(context?.params){
        const { id } = (await context.params) ?? {};

        if(id){
            const projects = await prisma.project.findUnique({
                where: { id: Number(id) } 
            })

            return projects
                ? Response.json(projects)
                : Response.json({ error: "User not found" }, { status: 404 })
        }
    }

    const projects = await prisma.project.findMany({
        select: { id: true, name: true, created_at: true, updated_at: true, link: true },
        skip: how_much_skip,
        take: total_per_page,
        orderBy: {
          id: 'asc',
        },
    })

    const total = await prisma.project.count();
    const total_pages = Math.ceil(total / total_per_page);

    return Response.json({
        data: projects,
        pagination: {
            page: pagina_atual,
            total_per_page: total_per_page,
            total,
            total_pages: total_pages
        }
    })
}

export async function GET(request: Request){
     
    const projects = await prisma.project.findMany({
        select: { name: true, description: true, created_at: true, updated_at: true, link: true, image_url: true },
        orderBy: {
          created_at: 'desc',
        },
        take: 4
    })

    return Response.json(projects)
}

export async function POST(request: Request){
    const auth = await requireAuth(request)
    
    if(!auth.authorized){
        return Response.json({message: "Not Authorized"}, { status: 401 })
    }

    const body = await request.json();

    if (Array.isArray(body)) {
      const result = await prisma.project.createMany({
        data: body,
        skipDuplicates: true,
      });
      return Response.json(result, { status: 201 });
    }

    const project = await prisma.project.create({ data: {...body, user_id: auth.payload.id} } )

    return Response.json({ message: "Project created", data: project }, { status: 201 })
}

export async function PUT(request: Request, { params }: IdContext){
    const auth = await requireAuth(request)
    
    if(!auth.authorized){
        return Response.json({message: "Not Authorized"}, { status: 401 })
    }

    const { id } = await params
    const body = await request.json();
    const project = await prisma.project.update({ where: { id: Number( id ) }, data: body })
    return Response.json({ message: "Project updated", data: project }, { status: 201 })
}

export async function DELETE(request: Request, { params }: IdContext){
    const auth = await requireAuth(request)
    
    if(!auth.authorized){
        return Response.json({message: "Not Authorized"}, { status: 401 })
    }

    const { id } = await params
    await prisma.project.delete({ where: { id: Number(id) } })
    return Response.json({ message: "Project Deleted" })
}
 