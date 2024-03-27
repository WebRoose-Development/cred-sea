import { json } from '@sveltejs/kit';
import { createNewProduct, getProductById } from '../../../../../db.js';

export async function POST({ request }) {

    const { 
        product_name,
        product_link,
        payout,
        corporateUserId } = await request.json();

    if (!product_name) {
        return new json({ error: "product_name is required" });

    }

    if (!product_link) {
        return new json({ error: "product_link is required" });
    }

    if (!payout) {
        return new json({ error: "payout is required" });
    }
 

    const product = await createNewProduct({
        product_name,
        product_link,
        payout,
        corporateUserId
    });

    return new json(product);

}

export async function GET({ url }) {

    const id = url.searchParams.get("id");


    if (id) {
        if (!Number(id)) {
            return new json({ error: "id is a number in query param" });
        }
        const user = await getProductById(id);
        return new json(user);
    }

    return new json({ error: "id required in query param" });

}