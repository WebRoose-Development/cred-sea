
import { json } from '@sveltejs/kit';
import { createNewCustomer, getCustomerById, updateCustomer } from '../../../../../db';


export async function GET({ url }) {
    const id = url.searchParams.get("id");

    if (!id) {
        return new json({ error: "id is required" });
    }

    if (id) {
        if (!Number(id)) {
            return new json({ error: "id is a number in query param" });
        }
        const customer = await getCustomerById(id);
        return new json(customer);
    }
}


export async function DELETE({ params }) {
    const { id } = params;

    if (!id) {
        return new json({ error: "id is required" });
    }

    try {
        await deleteCustomer(parseInt(id));

        return new json({ message: "customer deleted successfully" });
    } catch (error) {
        return new json({ error: "failed to delete customer" });
    }
}

export async function POST({ request }) {
    let {
        name,
        pan,
        aadhar,
        phone,
        pincode
    } = await request.json();

    if (!name) {
        return new json({ error: "name is required" });
    }

    if (!pan) {
        return new json({ error: "pan is required" });
    }

    if (!aadhar) {
        return new json({ error: "aadhar is required" });
    }

    if (!phone) {
        return new json({ error: "phone is required" });
    }
    if (!pincode) {
        return new json({ error: "pincode is required" });
    }

    const newCustomer = await createNewCustomer({
        name,
        pan,
        aadhar,
        phone,
        pincode
    });

    if (!newCustomer) {
        return new json({ error: "failed to create customer" });
    }

    return new json(newCustomer);
}

export async function PUT({ request }) {
    let {
        uid,
        name,
        pan,
        aadhar,
        phone,
        pincode
    } = await request.json();

    if (!uid) {
        return new json({ error: "customerId is required" });
    }
    const updatedCustomer = await updateCustomer(customerId, {
        name,
        pan,
        aadhar,
        phone,
        pincode
    });

    if (!updatedCustomer) {
        return new json({ error: "Failed to update customer" });
    }

    return new json(updatedCustomer);
}
