import { json } from '@sveltejs/kit';
import { getAssignedApplications } from '../../../../../../db.js';

export async function POST({ request }) {

    let { uid } = await request.json();

    if (!uid) {
        return new json({ error: "uid is required" });
    }

    const applications = await getAssignedApplications(uid);

    return new json(applications);
}