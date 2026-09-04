import { Container } from "@/components/layout/container"
import EmptyState from "@/components/shared/empty-state"
import { getServiceIcon } from "@/data/credential-icons"
import TableRow from "@/features/dashboard/table-row"
import TrashRow from "@/features/dashboard/trash-row"
import prisma from "@/lib/prisma"
import { IconTrashOff } from "@tabler/icons-react"

export default async function TrashPage() {
    const credentials = await prisma.credential.findMany({
    where: {
        isTrashed: true,
    },
    orderBy: {
        deletedAt: "desc",
    },
    })
    return (
        <Container className="flex flex-col gap-4 py-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-medium">Trash</h1>
                    <p className="text-xs text-muted-foreground">
                        You can manage your passwords here
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {credentials.length !== 0 ? credentials.map((item) => (
                    <TrashRow
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        email={item.email}
                    />
                )) : <EmptyState
                    title="Trash is empty"
                    description="Items you delete will appear here."
                    icon={<IconTrashOff />}
                />}
            </div>
        </Container>
    )
}
