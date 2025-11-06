// Libs
import { prisma } from "../prisma";
import { getUser } from "../auth";

export const deleteProduct = async (formData: FormData) => {
	const user = await getUser();
	const userId = user?.id;
	const id = String(formData.get('id'));

	await prisma.product.delete({
		where: { id, userId },
	});
};