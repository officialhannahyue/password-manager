"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "../ui/button";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="lg"
                className="rounded-full size-9"
                aria-label="Toggle theme"
            />
        );
    }

    const handleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Button
            variant="ghost"
            size="lg"
            className="rounded-full size-9"
            onClick={handleTheme}
            aria-label="Toggle theme"
        >
            {theme === "light" ? <IconMoon strokeWidth={2}/> : <IconSun strokeWidth={2}/>}
        </Button>
    );
}