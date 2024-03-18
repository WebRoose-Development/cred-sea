import { json } from '@sveltejs/kit';
import { createUser, getUserById, getUserByUid } from '../../../../../db.js';

export async function POST({ request }) {
    const { name, email, phone, corporate_name, corporate_logo } = await request.json();

    if (!name) {
        return new json({ error: "name is required" });
    }

    if (!email) {
        return new json({ error: "email is required" });
    }

    if (!phone) {
        return new json({ error: "phone is required" });
    }

    if (!corporate_name) {
        return new json({ error: "corporate_name is required" });
    }

    const user = await createUser({
        name,
        email,
        phone,
        corporate: {
            create: {
                corporate_name,
                corporate_logo
            }
        }
    });

    return new json(user);
}

export async function GET({ url }) {
    const id = url.searchParams.get("id");

    if (id) {
        if (!Number(id)) {
            return new json({ error: "id is a number in query param" });
        }
        const user = await getUserById(id);
        return new json(user);
    }

    const uid = url.searchParams.get("uid");

    if (uid) {
        const user = await getUserByUid({ uid });
        return new json(user);
    }

    return new json({ error: "id or uid required in query param" });
}
