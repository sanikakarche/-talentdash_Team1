import { PrismaClient } from "@prisma/client";
export const db = global.prisma ??
    new PrismaClient({
        log: process.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
    });
if (process.env.NODE_ENV !== "production") {
    global.prisma = db;
}
//# sourceMappingURL=client.js.map