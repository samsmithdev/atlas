// prisma/seed.ts
import prisma from "@/lib/db";

const subjectSeedData = {
  sd: {
    shortcode: "SD",
    name: "Software Development",
    description: "Coding and computer administration related projects.",
  },
  cl: {
    shortcode: "CL",
    name: "Cleaning",
    description: "Cleaning tips and tricks",
  },
};

const projectSeedData = {
  sd: {
    readableId: "SD001",
    name: "Atlas",
    description: "Some Description",
  },
  cl: {
    readableId: "CL0001",
    name: "Schedule",
    description: "Some Description",
  },
};

async function main() {
  // 1. Cleanup: clear old data so you don't get duplicates
  // (Be careful with this in production!)
  const { sd: subjectSeedSoftwareDev, cl: subjectSeedCleaning } =
    subjectSeedData;
  const { sd: projectSeedSoftwareDev, cl: projectSeedCleaning } =
    projectSeedData;

  await prisma.file.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.project.deleteMany();
  const user = await prisma.user.findFirst({
    where: {
      email: "samsmithdev1014@gmail.com",
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    return;
  }

  const sdSubject = await prisma.subject.create({
    data: { ...subjectSeedSoftwareDev, userId: user.id },
  });

  const clSubject = await prisma.subject.create({
    data: { ...subjectSeedCleaning, userId: user.id },
  });

  const sdProj = await prisma.project.create({
    data: {
      ...projectSeedSoftwareDev,
      subjectId: sdSubject.id,
      userId: user.id,
    },
  });

  const sdRootFolder = await prisma.folder.create({
    data: {
      name: "Root",
      isRoot: true,
      projectId: sdProj.id,
      userId: user.id,
    },
  });

  const clProj = await prisma.project.create({
    data: {
      ...projectSeedCleaning,
      subjectId: clSubject.id,
      userId: user.id,
    },
  });

  const clRootFolder = await prisma.folder.create({
    data: {
      name: "Root",
      isRoot: true,
      projectId: clProj.id,
      userId: user.id,
    },
  });

  for (let i = 0; i < 50; i++) {
    const sdFile = await prisma.file.create({
      data: {
        readableId: `SD${i}`,
        name: `SD File ${i}`,
        userId: user.id,
        description: `File ${i} description for ${i}`,
        tags: [`file${i}`],
        content: `File ${i} content for ${i} for this whole paragraph`,
        projectId: sdProj.id,
        folderId: sdRootFolder.id,
      },
    });
  }

  for (let i = 0; i < 50; i++) {
    const clFile = await prisma.file.create({
      data: {
        readableId: `CL${i}`,
        name: `CL File ${i}`,
        userId: user.id,
        description: `File ${i} description for ${i}`,
        tags: [`file${i}`],
        content: `File ${i} content for ${i} for this whole paragraph`,
        projectId: clProj.id,
        folderId: clRootFolder.id,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
