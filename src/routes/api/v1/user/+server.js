import { json } from '@sveltejs/kit';
import { createUser, getUserById, getUserByUid } from '../../../../../db.js';

export async function POST(request) {
    try {
        const { name, email, phone, corporate_name, corporate_logo } = await request.json();

        if (!email) {
            return json({ error: "email is required" });
        }

        if (!name) {
            return json({ error: "name is required" });
        }

        if (!corporate_name) {
            return json({ error: "corporate_name is required" });
        }

        const user = await createUser({ name, email, phone, corporate_name, corporate_logo });

        return json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        return json({ error: "Failed to create user" });
    }
}

export async function GET({ params }) {
    const { uid, id } = params;

    if (uid) {
        const user = await getUserByUid({ uid });
        return json(user);
    }

    if (id) {
        if (isNaN(id)) {
            return json({ error: "id should be a number in query param" });
        }

        const user = await getUserById(parseInt(id));
        return json(user);
    }

    return json({ error: "uid or id is required as query param" });
}
