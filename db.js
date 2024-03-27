import { json } from "@sveltejs/kit";
import prisma from "./script";

async function createUser({ name, email, phone, corporate_name, corporate_logo, uid }) {

    return await prisma.user.create({
        data: {
            name,
            email,
            phone,
            corporate: {
                // create and add corporate
                create: {
                    corporate_name,
                    corporate_logo
                }
            },
            uid
        },
        include: {
            // return corporate along with response
            corporate: true
        }
    });
}

async function updateUser({ name, email, phone, corporate_name, corporate_logo, uid }) {
    return await prisma.user.update({
        data: {
            name,
            email,
            phone,
            corporate: {
                // create and add corporate
                create: {
                    corporate_name,
                    corporate_logo
                }
            },
            uid
        },
        include: {
            // return corporate along with response
            corporate: true
        }
    });
}
async function getUserByUid({ uid }) {

    return await prisma.user.findUnique({
        where: {
            uid: uid
        },
        include: {
            corporate: true,
            advisor: true,
            agent: true,
            sm: true
        }
    });

}

async function getUserById(id) {

    return await prisma.user.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            corporate: true,
            advisor: true,
            agent: true,
            sm: true
        }
    });
}

// async function updateUser(id, newData) {
//     try {
//         const updatedUser = await prisma.user.update({
//             where: { id: Number(id) },
//             data: newData,
//             include: {
//                 corporate: true,
//                 advisor: true,
//                 agent: true,
//                 sm: true
//             }
//         });

//         return updatedUser;
//     } catch (error) {
//         // Handle any errors that occur during the database operation
//         console.error("Error updating user:", error);
//         throw error; // Rethrow the error to be handled by the caller
//     }
// }

async function getTimelineById(id) {
    const timeline = await prisma.timeline.findUnique({
        where: { id: parseInt(id) },
        include: {
            application: true, // Include the related application
        },

    });
    return timeline;
}
// async function getTimelineById(id) {
//     const timeline = await prisma.timeline.findUnique({
//         where: { id: parseInt(id) },
//         select: {
//             id: true,
//             created_at: true,
//             notes: true,
//             loan_id: true,
//             amount: true,
//             stage: true
//             // Omitting 'application' here
//         },
//     });
//     return timeline;
// }



async function getCustomerById(id) {
    const customer = await prisma.timeline.findUnique({
        where: { id: Number(id) },
        include: {
            application: true,
        },
    });
    return customer;
}
async function getApplicationById(id) {
    const application = await prisma.application.findUnique({
        where: { id: parseInt(id) },
        include: {
            product: true,
            customer: true,
            advisor: true,
            agent: true,
            corporate: true,
        },
    });
    return application;
}

async function createNewApplication({
    productId,
    customerId,
    advisorUserId,
    agentUserId,
    corporateCorporateId,
    pan,
    aadhar,
    phone,
    pincode }) {

    return await prisma.application.create({
        data: {

            productId,
            customer: {
                create:
                {
                    pan,
                    aadhar,
                    phone,
                    pincode
                }
            },
            advisorUserId,
            agentUserId,
            corporateCorporateId
            // advisor: { connect: { userId: advisorUserId } }, // Connect to advisor
            // agent: { connect: { userId: agentUserId } },
            // corporate: { connect: { corporateId: corporateCorporateId } } 
        },
        // include: {
        //     product: true,
        //     customer: true,
        //     advisor: true,
        //     agent: true,
        //     corporate: true,
        // }
    });
}
// async function createNewApplication({
//     productId,
//     customerId,
//     advisorUserId,
//     agentUserId,
//     corporateCorporateId,
//     pan,
//     aadhar,
//     phone,
//     pincode,
//     product_name, // Added product_name parameter
//     product_link,
//     product_owner // Assuming this field is still needed
// }) {
//     return await prisma.application.create({
//         data: {
//             product: { // Creating a new product associated with the application
//                 create: {
//                     product_name,
//                     product_link,
//                     product_owner,
//                     corporate: { connect: { corporateId: corporateCorporateId } } // Connecting the product to a corporate
//                 }
//             },
//             customer: { // Creating a new customer associated with the application
//                 create: {
//                     name: "Unknown", // Assuming name is required but not provided, setting a default value
//                     pan,
//                     aadhar,
//                     phone,
//                     email: "unknown@example.com", // Assuming email is required but not provided, setting a default value
//                     pincode
//                 }
//             },
//             productId,
//             customerId,
//             advisorUserId,
//             agentUserId,
//             corporateCorporateId
//         },
//         include: {
//             productId: true,
//             customerId: true,
//             advisorUserId: true,
//             agentUserId : true,
//             corporateCorporateId: true,
//             timelines: true // Including timelines if needed
//         }
//     });
// }


// async function createNewTimeline({
//     applicationId,
//     notes,
//     loan_id,
//     amount,
//     productId,
//     customerId,
//     advisorUserId,
//     agentUserId,
//     corporateCorporateId }) {

//     return await prisma.timeline.create({
//         data: {
//             applicationId,
//             application: {
//                 connect:
//                 {
//                     id: applicationId
//                 }
//             },
//             product: {
//                 connect: { id: productId } // Connect to an existing product by its ID
//             },
//             customer: {
//                 create: {
//                     pan,
//                     aadhar,
//                     phone,
//                     pincode
//                 }
//             },
//             notes,
//             loan_id,
//             amount
//         },
//         include: { // we need to check to whom it is linked in schema
//             application: true,
//         }
//     });
// }
async function createNewTimeline({ applicationId, notes, loan_id, amount, stage }) {
    return await prisma.timeline.create({
        data: {
            application: { connect: { id: applicationId } },
            notes,
            loan_id,
            amount,
            stage
        },
        include: {
            application: true
        }
    });
}

async function updateTimeline({
    applicationId,
    notes,
    loan_id,
    amount,
    productId,
    customerId,
    advisorUserId,
    agentUserId,
    corporateCorporateId }) {

    return await prisma.timeline.update({
        data: {
            application: {
                create:
                {

                    productId,
                    customerId,
                    advisorUserId,
                    agentUserId,
                    corporateCorporateId
                }
            },
            notes,
            loan_id,
            amount
        },
        include: { // we need to check to whom it is linked in schema
            application: false,
        }
    });
}


// async function createNewCustomer({
//     name,
//     pan,
//     aadhar,
//     phone,
//     pincode }) {

//     return await prisma.timeline.create({
//         data: {
//             name,
//             pan,
//             aadhar,
//             phone,
//             pincode

//         },
//         include: { // we need to check to whom it is linked in schema
//             application: false,
//         }
//     });
// }
async function createNewCustomer({ name, pan, aadhar, phone, email, pincode }) {
    return await prisma.customer.create({
        data: {
            name,
            pan,
            aadhar,
            phone,
            email,
            pincode
        }
    });
}
async function updateCustomer(customerId, { name, pan, aadhar, phone, pincode }) {
    return await prisma.customer.update({
        where: { id: customerId },
        data: {
            name,
            pan,
            aadhar,
            phone,
            pincode
        }
    });
}



async function createNewProduct({ product_name, product_link, payout,corporateUserId }) {

    return await prisma.product.create({
        data: {
            product_name,
            product_link,
            payout,
            corporateUserId
        },
    });
}
async function importProductsToUser({ product_owner_uid, product_importer_uid }) {


    const productOwner = await getUserByUid({ uid: product_owner_uid });
    const productImporter = await getUserByUid({ uid: product_importer_uid });

    if (productOwner && productImporter) {

        const userUpdate = await prisma.user.update({
            where: {
                uid: product_importer_uid
            },
            data: {
                imported_products: { set: productOwner.original_products },
            },
            include: {
                referred_by: true,
                original_products: true,
                imported_products: true,
            }
        });

        return userUpdate;
    } else if (productOwner == null) {
        return `could not find the ${product_owner_uid} user`;
    } else if (productImporter == null) {
        return `could not find the ${product_importer_uid} user`;
    } else {
        return `could not find the user`;
    }

}

async function getProductById(id) {

    return await prisma.product.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            imported_by_users: true,
            product_owner: true,
            applications: true,
        }
    });
}

async function getAssignedApplications(uid) {

    return await prisma.application.findMany({
        where: {
            corporate_uid: uid
        },
        include: {
            deal_with: true
        }
    });
}

async function getActiveApplications(uid) {

    return await prisma.application.findMany({
        where: {
            deal_with_uid: uid
        },
        include: {
            corporate: true
        }
    });
}

//remove

async function deleteUserById(uid) {
    try {
        // Find the user by uid and delete it
        const deletedUser = await prisma.user.delete({
            where: {
                uid: uid
            }
        });
        return deletedUser;
    } catch (error) {
        // Handle any errors
        console.error("Error deleting user:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}






export { createUser, getUserById, getUserByUid, createNewApplication, getActiveApplications, getAssignedApplications, createNewProduct, getProductById, importProductsToUser, getTimelineById, getCustomerById, getApplicationById, createNewCustomer, createNewTimeline, deleteUserById, updateUser, updateTimeline,updateCustomer }