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

    query: {
      $allModels: {
        async findMany({ model, args, query }) {
          const softDeleteModels = ["Subject", "Project", "Folder", "File"];

          if (softDeleteModels.includes(model as string)) {
            // Cast args.where to any to bypass the union type restriction
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const whereClause = args.where as any;

            if (whereClause?.deletedAt === undefined) {
              args.where = { ...args.where, deletedAt: null };
            }
          }
          return query(args);
        },

        async findFirst({ model, args, query }) {
          const softDeleteModels = ["Subject", "Project", "Folder", "File"];

          if (softDeleteModels.includes(model as string)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const whereClause = args.where as any;

            if (whereClause?.deletedAt === undefined) {
              args.where = { ...args.where, deletedAt: null };
            }
          }
          return query(args);
        },

        async count({ model, args, query }) {
          const softDeleteModels = ["Subject", "Project", "Folder", "File"];

          if (softDeleteModels.includes(model as string)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const whereClause = args.where as any;

            if (whereClause?.deletedAt === undefined) {
              args.where = { ...args.where, deletedAt: null };
            }
          }
          return query(args);
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
