import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({log:["query"]})


async function main() {
    // await prisma.user.deleteMany()

    // creating single user
    const user = await prisma.user.create({
        data:{
            name:"nelson",
            email:"nelson@test.com",
            userPreference:{
                create:{
                    emailUpdates:true
                }
            }
        },
        include:{
            userPreference:true
        }
    })


    // creating multiple users
    const user = await prisma.user.createMany({
        data:[{
            name:"James",
            email:"James@test.com",
            
        },
        {
            name:"Ann",
            email:"Ann@test.com",
          
        },
    ]})
    
    // finding unique
    const user = await prisma.user.findUnique({
        where:{
            email:"James@test.com"
        }
    })

    // finding first value 
    const user = await prisma.user.findFirst({
        where:{
            email:"Ann@test.com"
        }
    })

    // finding first value 
    const user = await prisma.user.findMany({
        where:{
            email:"Ann@test.com"
        }
    })
    

    // updating  value 
    const user = await prisma.user.update({
        where:{
            email:"Ann@test.com"
        },
        data:{
            email:"Ann2@test.com"
        }
    })


   console.log(user)
}


main().catch((e)=>{
    console.log(e.message)
}).finally(
    async ()=>{
        await prisma.$disconnect()
    }
)