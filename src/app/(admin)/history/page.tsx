import { Container } from "@/components/layout/container"
import EmptyState from "@/components/shared/empty-state";
import HistoryRow from "@/features/dashboard/history-row";
import prisma from "@/lib/prisma"
import { IconHistory } from "@tabler/icons-react";

export default async function HistoryPage() {
    const activities = await prisma.activity.findMany({
        include: {
            credential: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    })
    return (
        <Container className="flex flex-col gap-4 py-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-medium">History</h1>
                    <p className="text-xs text-muted-foreground">
                        You can manage your passwords here
                    </p>
                </div>
            </div>
            <div className="flex flex-col">
                {activities.length !== 0 ? activities.map((activity) => {
                    if (!activity.credential) return null

                    return (
                        <HistoryRow
                            key={activity.id}
                            name={activity.credential.name}
                            username={activity.credential.username}
                            type={activity.type}
                            createdAt={activity.createdAt}
                        />
                    )
                }) : <EmptyState
                    title="No activity yet"
                    description="Your recent password activity will appear here."
                    icon={<IconHistory />}
                />}
            </div>
        </Container>
    )
}
