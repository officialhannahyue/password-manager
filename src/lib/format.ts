export function formatRelativeDate(date: Date) {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (minutes < 1) {
        return "just now";
    }

    if (minutes < 60) {
        return `${ minutes } ${ minutes === 1 ? "minute" : "min" } ago`;
    }

    if (hours < 24) {
        return `${ hours } ${ hours === 1 ? "hour" : "hr" } ago`;
    }

    if (days < 7) {
        return `${ days } ${ days === 1 ? "day" : "days" } ago`;
    }

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
}
export function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1)
}