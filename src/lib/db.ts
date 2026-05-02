import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString =
  process.env.DATABASE_URL ?? "postgres://dummy:dummy@localhost:5432/dummy";

const adapter = new PrismaPg({ connectionString });

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter }).$extends({
    result: {
      subject: {
        readableName: {
          needs: { shortcode: true, name: true },
          compute(subject) {
            return `${subject.shortcode} - ${subject.name}`;
          },
        },
      },

      project: {
        readableName: {
          needs: { readableId: true, name: true },
          compute(project) {
            return `${project.readableId} ${project.name}`;
          },
        },
      },
    },
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
