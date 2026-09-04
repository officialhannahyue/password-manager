import { Container } from "@/components/layout/container"
import EmptyState from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { getServiceIcon, serviceIcons } from "@/data/credential-icons"
import TableHeading from "@/features/dashboard/table-heading"
import TableRow from "@/features/dashboard/table-row"
import prisma from "@/lib/prisma"
import {
    IconPlus,
    IconSearch,
    IconStar,
} from "@tabler/icons-react"

export default async function FavoritesPage() {
    const favoriteCredentials = await prisma.credential.findMany({
        where: {
            isFavorite: true
        },
        orderBy: {
            updatedAt: "desc",
        },
    })
    return (
        <Container className="flex flex-col gap-4 mt-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-medium">All Items</h1>
                    <p className="text-xs text-muted-foreground">
                        You can manage your passwords here
                    </p>
                </div>

                <Button size="sm" variant="secondary">
                    <IconPlus />
                    Add Item
                </Button>
            </div>
            <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <InputGroup className="w-full max-w-lg">
                        <InputGroupAddon>
                            <IconSearch />
                        </InputGroupAddon>
                        <InputGroupInput placeholder="Search..." />
                    </InputGroup>
                </div>
                <div className="flex flex-col gap-2">
                    <TableHeading />
                    {favoriteCredentials.length > 0 ? (favoriteCredentials.map((item) => {
                        const Icon = getServiceIcon(item.name)
                        return (
                            <TableRow
                                key={item.id}
                                id={item.id}
                                title={item.name}
                                icon={Icon ? <Icon /> : null}
                                email={item.email}
                                updated={item.updatedAt}
                                isFavorite={item.isFavorite}
                            />
                        )
                    })) : (
                            <EmptyState
                                title="No favorites yet"
                                description="Your favorite credentials will appear here."
                                icon={<IconStar />}
                            />
                    )}
                </div>
            </div>
        </Container>
    )
}
