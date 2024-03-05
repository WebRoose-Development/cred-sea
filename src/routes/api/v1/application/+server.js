import { json } from '@sveltejs/kit';
import { createNewApplication } from '../../../../../db.js';

export async function POST({ request }) {

    let { deal_with_uid, corporate_uid } = await request.json();

    if (!deal_with_uid) {
        return new json({ error: "deal_with_uid is required" });
    }

    if (!corporate_uid) {
        return new json({ error: "corporate_uid is required" });
    }

    const application = await createNewApplication({ corporate_uid, deal_with_uid });

    return new json(application);
}