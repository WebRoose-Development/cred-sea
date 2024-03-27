import { json } from '@sveltejs/kit';

import { createUser, deleteUserById, getUserById, getUserByUid, updateUser } from '../../../../../db.js';
import prisma from '../../../../../script.js';

export async function POST({ request }) {

    let { name, email, phone, corporate_name, corporate_logo, uid } = await request.json();

    if (!email) {
        return new json({ error: "email is required" });
    }

    if (!name) {
        return new json({ error: "name is required" });
    }
    if (!corporate_name) {
        return new json({ error: "corporate_name is required" });
    }

    const user = await createUser({ name, email, phone, corporate_name, corporate_logo, uid });

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

export async function DELETE({ request }) {
    const { uid } = await request.json();

    if (!uid) {
        return new json({ error: "uid is required for deletion" });
    }

    try {
        // Assuming you have a function named deleteUserById to delete user by uid
        const deletedUser = await deleteUserById(uid);

        if (!deletedUser) {
            return new json({ error: "User not found" });
        }

        return new json({ success: "User deleted successfully" });
    } catch (error) {
        // Handle any errors
        console.error("Error deleting user:", error);
        return new json({ error: "An error occurred while deleting user" });
    }
}

// export async function PUT({ request }) {
//     const { id,name, email, phone, corporate_name, corporate_logo,uid } = await request.json();

//     if (!uid) {
//         return new json({ error: "User ID is required" });
//     }

//     // Check if the user exists
//     const existingUser = await getUserById(uid);
//     if (!existingUser) {
//         return new json({ error: "User not found" });
//     }

//     // Update the user data
//     const updatedUser = await updateUser(id, { name, email, phone, corporate_name, corporate_logo ,uid });

//     return new json(updatedUser);
// }


export async function PUT({ request }) {

    let { name, email, phone, corporate_name, corporate_logo, uid } = await request.json();

    if (!email) {
        return new json({ error: "email is required" });
    }

    if (!name) {
        return new json({ error: "name is required" });
    }
    if (!corporate_name) {
        return new json({ error: "corporate_name is required" });
    }

    const user = await updateUser({ name, email, phone, corporate_name, corporate_logo, uid });

    return new json(user);
}