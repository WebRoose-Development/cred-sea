import { json } from "@sveltejs/kit";
import prisma from "./script";
import { flip } from "svelte/animate";

async function createUser({ name, email, phone, corporate_name, corporate_logo }) {

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
            }
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
            SM: true
        }
    });
}

async function createNewApplication({ corporate_uid, deal_with_uid }) {

    return await prisma.application.create({
        data: {
            corporate_uid: corporate_uid,
            deal_with_uid: deal_with_uid
        }
    });
}

async function createNewProduct({ product_name, product_link, logo, payout, corporateUserId }) {

    return await prisma.product.create({
        data: {
            product_name, 
            product_link, 
            logo, payout, 
            corporateUserId,
            is_live: true
        },
        include: {
            product_owner: true,
        }
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

async function createCorporate({user, corporateId, corporate_name, corporate_logo }) {
    return await prisma.corporate.create({
        data: {
            // userid,
            corporate_name,
            corporate_logo
        }
    });
}

async function getCorporateById(corporateId, includeRelatedEntities = false) {
    let corporateDetails = await prisma.corporate.findUnique({
        where: {
            corporateId
        },
        include: includeRelatedEntities ? {
            user: true,
            advisors: true,
            agents: true,
            sms: true,
            products: true
        }: {}
    });
    return corporateDetails;
};

//  corporate objects
const Corporate = {
    user: ({ corporateId }) => prisma.user.findUnique({where: { corporateId }}),
    corporateId: true,
    corporate_name: true,
    corporate_logo: true,
    created_at: true,
    updated_at: true,
    advisors: true,
    agents: true,
    sms: true,
    products: true

};






export { createUser, getUserById, getUserByUid, createNewApplication, getActiveApplications, getAssignedApplications, createNewProduct, getProductById, importProductsToUser, createCorporate, getCorporateById, Corporate }