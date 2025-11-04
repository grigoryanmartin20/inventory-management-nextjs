import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const demoUserId: string = 'f914cf67-cc5a-4358-93fa-860b6f7937d9';
	
	await prisma.product.createMany({
		data: Array.from({ length: 25 }, (_, index) => ({
			userId: demoUserId,
			name: `Product ${index + 1}`,
			price: (Math.random() * 90 + 10).toFixed(2),
			quantity: Math.floor(Math.random() * 20),
			lowStockAt: 5,
			createdAt: new Date(Date.now() - 1000 * 60 *60 *24 * (index * 5)),
		})),
	});

	console.log(`${await prisma.product.count()} products seeded`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
}).finally(async () => {
	await prisma.$disconnect();
});