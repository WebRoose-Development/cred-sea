import { json } from "@sveltejs/kit";
import prisma from "./script";

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
            active_applications: true,
            referred: true,
            referred_by: true,
            original_products: true,
            imported_products: true,
        }
    });

}

async function getUserById(id) {

    return await prisma.user.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            active_applications: true,
            referred: true,
            referred_by: true,
            original_products: true,
            imported_products: true,
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

async function createNewProduct({ product_name, product_link, logo, payout, imported_payout, employee_payout, product_owner_uid }) {

    return await prisma.product.create({
        data: {
            product_name,
            product_link,
            logo,
            payout,
            product_owner_uid,
            employee_payout,
            imported_payout,
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






export { createUser, getUserById, getUserByUid, createNewApplication, getActiveApplications, getAssignedApplications, createNewProduct, getProductById, importProductsToUser }