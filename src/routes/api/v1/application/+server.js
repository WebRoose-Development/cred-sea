import { json } from '@sveltejs/kit';
import { createNewApplication, getApplicationById } from '../../../../../db.js';
import { expoOut } from 'svelte/easing';
//post = new create
//get = with some unique idnetifer (not request) -- use search params insted
//put = update in database
// delete in database

export async function GET({ url }) {
    const id = url.searchParams.get("id");

    if (!id) {
        return new json({ error: "id is required" });
    }
    if (id) {
        if (!Number(id)) {
            return new json({ error: "id is a number in query param" });
        }
        const application = await getApplicationById(id);
        return new json(application);
    }

    if (!application) {
        return new json({ error: "application not found" });
    }
}

export async function PUT({ request }) {
    let {
        applicationId,
        productId,
        customerId,
        advisorUserId,
        agentUserId,
        corporateCorporateId
    } = await request.json();

    if (!applicationId) {
        return new json({ error: "applicationId is required" });
    }

    // Optional: Check if any of the parameters are missing
    // Note: You might want to tailor this check based on your application's requirements

    // Perform the update operation
    const updatedApplication = await updateApplication(applicationId, {
        productId,
        customerId,
        advisorUserId,
        agentUserId,
        corporateCorporateId
    });

    if (!updatedApplication) {
        return new json({ error: "Failed to update application" });
    }

    return new json(updatedApplication);
}


// export async function PUT({ params, request }) {
//     const { id } = params;

//     if (!id) {
//         return new json({ error: "id is required" });
//     }

//     const { productId, 
// 	customerId, 
// 	advisorUserId, 
// 	agentUserId, corporateCorporateId } = await request.json();

//     const updatedApplication = await prisma.application.update({
//         where: { id: parseInt(id) },
//         data: {
//             productId,
//             customerId,
//             advisorUserId,
//             agentUserId,
//             corporateCorporateId,
//         },
//         include: {
//             product: true,
//             customer: true,
//             advisor: true,
//             agent: true,
//             corporate: true,
//         },
//     });

//     return new json(updatedApplication);
// }

// export async function DELETE({ params }) {
//     const { id } = params;

//     if (!id) {
//         return new json({ error: "id is required" });
//     }

//     try {
//         const deleted = await prisma.application.delete({
//             where: { id: parseInt(id) },
//             include: {
//                 product: true,
//                 customer: true,
//                 advisor: true,
//                 agent: true,
//                 corporate: true,
//             },
//         });

//         return new json(deleted);
//     } catch (error) {
//         return new json({ error: "Failed to delete application" });
//     }
// }

export async function DELETE({ request }) {
    let { applicationId } = await request.json();

    if (!applicationId) {
        return new json({ error: "applicationId is required" });
    }

    const deletedApplication = await deleteApplication(applicationId);

    if (!deletedApplication) {
        return new json({ error: "Application not found" });
    }

    return new json({ success: "Application deleted successfully" });
}

// export async function DELETE({ url }) {
//     const id = url.searchParams.get("id");

//     if (!id) {
//         return new json({ error: "id is required" });
//     }

//     if (!Number(id)) {
//         return new json({ error: "id must be a number in query param" });
//     }

//     const deletedApplication = await deleteApplication(id);

//     if (!deletedApplication) {
//         return new json({ error: "Application not found" });
//     }

//     return new json({ success: "Application deleted successfully" });
// }


export async function POST({ request }) {

    let { 
        productId,
        customerId,
        advisorUserId,
        agentUserId,
        corporateCorporateId,
        pan,
        aadhar,
        phone,
        pincode, product_name, product_link, logo, payout, imported_payout, employee_payout, product_owner_uid } = await request.json();

    if (!productId) {
        return new json({ error: "productId is required" });
    }

    if (!customerId) {
        return new json({ error: "customerId is required" });
    }
    if (!advisorUserId) {
        return new json({ error: "advisorUserId is required" });
    }
    if (!agentUserId) {
        return new json({ error: "agentUserId is required" });
    }
    if (!corporateCorporateId) {
        return new json({ error: "corporateCorporateId is required" });
    }
    if (!pan) {
        return new json({ error: "pan is required" });
    }
    if (!aadhar) {
        return new json({ error: "pan is required" });
    }
    if (!phone) {
        return new json({ error: "pan is required" });
    }
    if (!pan) {
        return new json({ error: "pan is required" });
    }

    const application = await createNewApplication({
        productId,
        customerId,
        advisorUserId,
        agentUserId,
        pan,
        aadhar,
        phone,
        pincode,
        corporateCorporateId, product_name, product_link, logo, payout, imported_payout, employee_payout, product_owner_uid
    });

    return new json(application);
}