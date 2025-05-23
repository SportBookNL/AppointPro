import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AddClassForm } from "./AddClassForm";

async function getLocation(locationId: string) {
    const session = await auth();
    
    if (!session?.user) {
        redirect("/sign-in");
    }

    try {
        // First get the user's organization
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: {
                organization: true
            }
        });

        if (!user?.organization) {
            throw new Error("No organization found for user");
        }

        // Then get the location and verify it belongs to the organization
        const location = await prisma.location.findFirst({
            where: {
                id: locationId,
                organizationId: user.organization.id
            },
            include: {
                facilities: true
            }
        });

        return location;
    } catch (error) {
        console.error('Error fetching location:', error);
        return null;
    }
}

export default async function AddClassPage({ searchParams }: { searchParams: Promise<{ location: string }> }) {
    const resolvedParams = await searchParams;
    if (!resolvedParams.location) {
        redirect("/dashboard");
    }

    const location = await getLocation(resolvedParams.location);

    if (!location) {
        redirect("/dashboard");
    }

    return <AddClassForm locationId={location.id} facilities={location.facilities} />;
}
