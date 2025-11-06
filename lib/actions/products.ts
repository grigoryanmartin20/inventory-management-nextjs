'use server';

import { redirect } from "next/navigation";
// Packages
import { z } from "zod";
// Libs
import { prisma } from "../prisma";
import { getUser } from "../auth";

const ProductSchema = z.object({
	name: z.string().min(1, "Name is required"),
	price: z.coerce.number().min(0, "Price must be greater than 0"),
	quantity: z.coerce.number().int().min(0, "Quantity must be greater than 0"),
	sku: z.string().optional(),
	lowStockAt: z.coerce.number().int().min(0).optional().default(0),
});

export const deleteProduct = async (formData: FormData) => {
	const user = await getUser();
	const userId = user?.id;
	const id = String(formData.get('id'));

	await prisma.product.delete({
		where: { id, userId },
	});
};

export const addProduct = async (formData: FormData) => {
	const user = await getUser();
	const userId = user?.id;
	const skuValue = formData.get('sku');
	const lowStockAtValue = formData.get('lowStockAt');
	
	const parsedData = ProductSchema.safeParse({
		name: String(formData.get('name')),
		price: Number(formData.get('price')),
		quantity: Number(formData.get('quantity')),
		sku: skuValue && String(skuValue).trim() !== '' ? String(skuValue).trim() : undefined,
		lowStockAt: lowStockAtValue && String(lowStockAtValue).trim() !== '' ? Number(lowStockAtValue) : undefined,
	});

	if (!parsedData.success) {
		const errorMessages = parsedData.error.issues.map((e) => e.message).join(', ');
		
		throw new Error(errorMessages);
	}

	try {
		await prisma.product.create({
			data: {
				...parsedData.data,
				userId,
				sku: parsedData.data.sku || null,
				lowStockAt: parsedData.data.lowStockAt ?? null,
			},
		});
	} catch {
		throw new Error("Failed to add product");
	}

	redirect("/inventory");
};