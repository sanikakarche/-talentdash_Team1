import { db } from "./client";
export async function recomputeSalaryAggregates() {
    const salaryEntries = await db.salaryEntry.findMany();
    const grouped = new Map();
    for (const entry of salaryEntries) {
        const key = `${entry.role}-${entry.region}-${entry.location}`;
        if (!grouped.has(key)) {
            grouped.set(key, []);
        }
        grouped.get(key)?.push(entry.totalComp);
    }
    for (const [key, values] of grouped.entries()) {
        const [role, region, location] = key.split("-");
        const sorted = [...values].sort((a, b) => a - b);
        const median = sorted[Math.floor(sorted.length / 2)];
        const p25 = sorted[Math.floor(sorted.length * 0.25)];
        const p75 = sorted[Math.floor(sorted.length * 0.75)];
        await db.salaryAggregate.upsert({
            where: {
                role_level_location_region: {
                    role,
                    level: "JUNIOR",
                    location,
                    region,
                },
            },
            update: {
                medianTotal: median,
                medianBase: median,
                p25Total: p25,
                p75Total: p75,
                sampleCount: values.length,
            },
            create: {
                role,
                level: "JUNIOR",
                location,
                region,
                currency: "USD",
                medianTotal: median,
                medianBase: median,
                p25Total: p25,
                p75Total: p75,
                sampleCount: values.length,
            },
        });
        await db.salaryHeatmap.upsert({
            where: {
                role_location_region: {
                    role,
                    location,
                    region,
                },
            },
            update: {
                medianTotal: median,
            },
            create: {
                role,
                location,
                region,
                medianTotal: median,
                currency: "USD",
            },
        });
    }
}
//# sourceMappingURL=aggregates.js.map