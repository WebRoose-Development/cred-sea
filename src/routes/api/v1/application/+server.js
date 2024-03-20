import { json } from '@sveltejs/kit';
import { createNewApplication } from '../../../../../db.js';
import { expoOut } from 'svelte/easing';
//post = new create
//get = with some unique idnetifer (not request) -- use search params insted
//put = update in database
// delete in database

export function GET(params) {
    
}

export function PUT(params) {
    
}

export function DELETE(params) {
    
}

export async function POST({ request }) {

    let {productId,
        customerId,
        advisorUserId,
        agentUserId,
        corporateCorporateId } = await request.json();

    if (!productId) {
        return new json({ error: "productId is required" });
    }

    if (!customerId) {
        return new json({ error: "customerId is required" });
    }

    const application = await createNewApplication({ productId,
        customerId,
        advisorUserId,
        agentUserId,
        corporateCorporateId  });

    return new json(application);
}