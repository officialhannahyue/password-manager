import { getCurrentUser } from "@/actions/auth"
import AddCredentialDialog from "@/components/credentials/add-credential-dialog"
import SearchInput from "@/components/credentials/search-input"
import { Container } from "@/components/layout/container"
import EmptyState from "@/components/shared/empty-state"
import RefreshButton from "@/components/ui/refresh-button"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { getServiceIcon } from "@/data/credential-icons"
import TableHeading from "@/features/dashboard/table-heading"
import TableRow from "@/features/dashboard/table-row"
import prisma from "@/lib/prisma"
import {
    IconStar,
} from "@tabler/icons-react"

export default async function DashboardPage({ searchParams }: {
    searchParams: Promise<{
        search?: string
    }>
}) {
    const { search } = await searchParams;
    const user = await getCurrentUser()
    const credentials = await prisma.credential.findMany({
        where: {
            userId: user?.id,
            isTrashed: false,
            ...(search ?
                {
                    OR: [
                        {
                            name: {
                                contains: search,
                                mode: "insensitive"
                            }
                        },
                        {
                            email: {
                                contains: search,
                                mode: "insensitive"
                            }
                        }
                    ]
                } : {}
            )
        },
        orderBy: {
            updatedAt: "desc",
        },
    })
    const favoriteCredentials = credentials.filter(
        (item) => item.isFavorite
    )

    return (
        <Container className="flex flex-col gap-8 py-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-medium">All Items</h1>
                    <p className="text-xs text-muted-foreground">
                        You can manage your passwords here
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <RefreshButton/>
                    <AddCredentialDialog/>
                </div>
            </div>
            <div className="w-full">
                <Tabs defaultValue="all" className="w-full">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <SearchInput/>
                        <TabsList className="md:w-fit w-full">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="favorites">Favorites</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="all">
                        <div className="flex flex-col gap-2">
                            <TableHeading />
                            {credentials.length > 0 ? (credentials.map((item) => {
                                const Icon = getServiceIcon(item.name)
                                return (
                                <TableRow
                                        key={item.id}
                                        id={item.id}
                                    icon={Icon ? <Icon/> : null}
                                    title={item.name}
                                    email={item.email}
                                    updated={item.updatedAt}
                                    isFavorite={item.isFavorite}
                                />
                                )
                            })) : (
                                    <EmptyState
                                        title="No credentials"
                                        description="Add your first password to get started."
                                        action={<AddCredentialDialog/>}
                                    />
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="favorites">
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
                    </TabsContent>
                </Tabs>
            </div>
        </Container>
    )
}