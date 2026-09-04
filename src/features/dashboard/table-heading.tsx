export default function TableHeading() {
    return (
        <div className="sm:grid border hidden border-border/30 grid-cols-[1.25fr_2fr_1.25fr_1fr_1fr] sm:gap-0 gap-4 overflow-hidden items-center rounded-lg bg-secondary px-4 py-4">
            <p className="text-sm font-normal text-card-foreground/90">
                Services
            </p>
            <p className="hidden sm:block text-sm font-normal text-card-foreground/90">
                Username/Email
            </p>
            <p className="hidden sm:block text-sm font-normal text-card-foreground/90">
                Password
            </p>
            <p className="hidden sm:block text-sm font-normal text-card-foreground/90">
                Updated
            </p>
        </div>
    );
}