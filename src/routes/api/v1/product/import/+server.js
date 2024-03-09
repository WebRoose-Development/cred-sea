import { json } from '@sveltejs/kit';
import { importProductsToUser } from '../../../../../../db.js';

export async function POST({ request }) {

    const { product_owner_uid, product_importer_uid } = await request.json();

    if (!product_owner_uid) {
        return new json({ error: "product_owner_uid is required" });
    }

    if (!product_importer_uid) {
        return new json({ error: "product_importer_uid is required" });
    }

    const updatedUser = await importProductsToUser({ product_owner_uid, product_importer_uid });

    return new json(updatedUser);

}