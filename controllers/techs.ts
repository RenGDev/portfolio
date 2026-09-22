import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/requireAuth";

type ManagerContext = { params?: Promise<{ id?: string }> }; 
type IdContext = { params: Promise<{ id: string }> }; 


export async function GET(request: Request, context: ManagerContext){
    const { searchParams } = new URL(request.url);

    const pagina_atual = Number(searchParams.get('page')) || 1
    const total_per_page = Number(searchParams.get('limit')) || 3
    const how_much_skip = (pagina_atual - 1) * total_per_page;

    if(context?.params){
        const { id } = (await context.params) ?? {};

        if(id){
            const tech = await prisma.techs.findUnique({
                where: { id: Number(id) } 
            })

            return tech
                ? Response.json(tech)
                : Response.json({ error: "Tech not found" }, { status: 404 })
        }
    }

    const techs = await prisma.techs.findMany({
        select: { id: true, name: true, description: true, created_at: true, updated_at: true },
        skip: how_much_skip,
        take: total_per_page,
        orderBy: { id: 'asc' },
    })

    const total = await prisma.techs.count();
    const total_pages = Math.ceil(total / total_per_page);

    return Response.json({
        data: techs,
        pagination: {
            page: pagina_atual,
            total_per_page: total_per_page,
            total,
            total_pages: total_pages
        }
    })
}

export async function POST(request: Request){
    const auth = await requireAuth(request)
        
    if(!auth.authorized){
        return Response.json({message: "Not Authorized"}, { status: 401 })
    }

    const body = await request.json();

    if (Array.isArray(body)) {
      const result = await prisma.techs.createMany({
        data: body,
        skipDuplicates: true,
      });
      return Response.json({ message: "Techs created", data: result }, { status: 201 });
    }

    const tech = await prisma.techs.create({ data: body })

    return Response.json({ message: "Tech created", data: tech }, { status: 201 })
}

export async function PUT(request: Request, { params }: IdContext){
    const auth = await requireAuth(request)
        
    if(!auth.authorized){
        return Response.json({message: "Not Authorized"}, { status: 401 })
    }

    const { id } = await params
    const body = await request.json();
    const tech = await prisma.techs.update({ where: { id: Number(id) }, data: body })
    return Response.json({ message: "Tech updated", data: tech }, { status: 201 })
}

export async function DELETE(request: Request, { params }: IdContext){
    const auth = await requireAuth(request)
        
    if(!auth.authorized){
        return Response.json({message: "Not Authorized"}, { status: 401 })
    }

    const { id } = await params
    await prisma.techs.delete({ where: { id: Number(id) } })
    return Response.json({ message: "Tech Deleted" })
}