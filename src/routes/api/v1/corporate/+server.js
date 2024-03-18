import { json } from '@sveltejs/kit';
import { createCorporate, getCorporateById } from './db.js';

export async function POST(request) {
    try {
        const { corporate_name, corporate_logo } = await request.json();

        if (!corporate_name) {
            return json({ error: "corporate_name is required" });
        }

        const corporate = await createCorporate({ corporate_name, corporate_logo });

        return json(corporate);
    } catch (error) {
        console.error("Error creating corporate:", error);
        return json({ error: "Failed to create corporate" });
    }
}

export async function GET({ params }) {
    const { corporateId } = params;

    if (corporateId) {
        const corporate = await getCorporateById(corporateId, true);
        return json(corporate);
    }

    return json({ error: "corporateId is required as a parameter" });
}
