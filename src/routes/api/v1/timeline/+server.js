import { json } from '@sveltejs/kit';
import prisma from '../../../../../script';
import { createNewTimeline, getTimelineById, updateTimeline } from '../../../../../db';


export async function GET({ url }) {
  const id = url.searchParams.get("id");

  if (!id) {
    return new json({ error: "id is required" });
  }

  if (id) {
    if (!Number(id)) {
        return new json({ error: "id is a number in query param" });
    }
    const timeline = await getTimelineById(id);
  return new json(timeline);
}

  if (!timeline) {
    return new json({ error: "Timeline not found" });
  }
}

export async function POST({ request }) {

  let {applicationId,
    notes,
    loan_id,
    amount,
    productId,
    customerId,
    advisorUserId,
    agentUserId,
    corporateCorporateId } = await request.json();

  if (!applicationId) {
      return new json({ error: "applicationId is required" });
  }

  if (!notes) {
      return new json({ error: "notes is required" });
  }
  if (!loan_id) {
    return new json({ error: "loan_id is required" });
}
if (!amount) {
  return new json({ error: "amount is required" });
}

  const timeline = await createNewTimeline({ 
    applicationId,
    notes,
    loan_id,
    amount,
    productId,
    customerId,
    advisorUserId,
    agentUserId,
    corporateCorporateId
   });
//    if (!timeline) {
//     return new json({ error: "failed to create timeline" });
// }
  return new json(timeline);
}

export async function PUT({ request }) {
  let { applicationId, notes, loan_id, amount } = await request.json();

  if (!applicationId) {
    return new json({ error: "applicationId is required" });
  }

  if (!notes) {
    return new json({ error: "notes is required" });
  }

  if (!loan_id) {
    return new json({ error: "loan_id is required" });
  }

  if (!amount) {
    return new json({ error: "amount is required" });
  }

  const timeline = await updateTimeline({
    applicationId,
    notes,
    loan_id,
    amount
  });

  if (!timeline) {
    return new json({ error: "failed to update timeline" });
  }

  return new json(timeline);
}
