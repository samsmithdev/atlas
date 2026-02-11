// prisma/seed.ts
// import { Pool } from 'pg'
// import { PrismaPg } from '@prisma/adapter-pg'
// import { PrismaClient } from "@prisma/client";

// const connectionString = process.env.DATABASE_URL

// const pool = new Pool({ connectionString })
// const adapter = new PrismaPg(pool)
// const prisma = new PrismaClient({ adapter })

// const subjectSeedData = {
//   sd: {
//     shortcode: "SD",
//     name: "Software Development",
//     description: "Coding and computer administration related projects.",
//   },
//   cl: {
//     shortcode: "CL",
//     name: "Cleaning",
//     description: "Cleaning tips and tricks",
//   },
// }

// const projectSeedData = {
//   sd:
//   {
//     readableId: "SD001",
//     name: "Atlas",
//     author: "Sam",
//     description: "Some Description",
//   }
//   ,
//   cl:
//   {
//     readableId: "CL0001",
//     name: "Schedule",
//     author: "Sam",
//     description: "Some Description",
//   }
// }

// async function main() {
//   // 1. Cleanup: clear old data so you don't get duplicates
//   // (Be careful with this in production!)
//   const { sd: subjectSeedSoftwareDev, cl: subjectSeedCleaning } = subjectSeedData;
//   const { sd: projectSeedSoftwareDev, cl: projectSeedCleaning } = projectSeedData;

//   await prisma.file.deleteMany();
//   await prisma.subject.deleteMany();
//   await prisma.project.deleteMany();

//   const sdSubject = await prisma.subject.create({
//     data: subjectSeedSoftwareDev
//   });

//   const clSubject = await prisma.subject.create({
//     data: subjectSeedCleaning
//   });

//   const sdProj = await prisma.project.create({
//     data: {
//       ...projectSeedSoftwareDev,
//       subjectId: sdSubject.id
//     }
//   });

//   const clProj = await prisma.project.create({
//     data: {
//       ...projectSeedCleaning,
//       subjectId: clSubject.id,
//     }
//   });

//   for (let i = 0; i < 50; i++) {
//     const sdFile = await prisma.file.create({
//       data: {
//         readableId: `SD${i}`,
//         name: `SD File ${i}`,
//         author: 'Sam',
//         description: `File ${i} description for ${i}`,
//         tags: [`file${i}`],
//         content: `File ${i} content for ${i} for this whole paragraph`,
//         projectId: sdProj.id,
//       }
//     });
//   }

//   for (let i = 0; i < 50; i++) {
//     const clFile = await prisma.file.create({
//       data: {
//         readableId: `CL${i}`,
//         name: `CL File ${i}`,
//         author: 'Sam',
//         description: `File ${i} description for ${i}`,
//         tags: [`file${i}`],
//         content: `File ${i} content for ${i} for this whole paragraph`,
//         projectId: clProj.id,
//       }
//     });
//   }
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })