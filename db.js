import prisma from "./script";

async function createUser(name, email, phone) {

    return await prisma.user.create({
        data: {
            name: name,
            email,
            phone
        }
    });

}
async function getUserByUid({ uid, }) {

    return await prisma.user.findFirst({
        where: {
            uid
        },
        include: {
            assigned_applications: true,
            active_applications: true,
            referred: true,
            referred_by: true,
        }
    });

}

async function getUserById(id) {

    return await prisma.user.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            assigned_applications: true,
            active_applications: true,
            referred: true,
            referred_by: true,
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






export { createUser, getUserById, getUserByUid, createNewApplication, getActiveApplications, getAssignedApplications }