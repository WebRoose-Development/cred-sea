import { json } from '@sveltejs/kit';

import { createUser, getUserById, getUserByUid } from '../../../../../db.js';
import prisma from '../../../../../script.js';

export async function POST({ request }) {

    let { name, email, phone, corporate_name, corporate_logo } = await request.json();

    if (!email) {
        return new json({ error: "email is required" });
    }

    if (!name) {
        return new json({ error: "name is required" });
    }
    if (!corporate_name) {
        return new json({ error: "corporate_name is required" });
    }

    const user = await createUser({ name, email, phone, corporate_name, corporate_logo });

    return new json(user);
}


export async function GET({ url }) {

    const uid = url.searchParams.get("uid");
    const id = url.searchParams.get("id");
    if (uid) {
        const user = await getUserByUid({ uid });
        return new json(user);
    }

    if (id) {
        if (!Number(id)) {
            return new json({ error: "id is a number in query param" });
        }
        const user = await getUserById(id);
        return new json(user);
    }

    return new json({ error: "uid is required as query param" });


}