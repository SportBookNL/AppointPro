"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    sidebar?: React.ReactNode
    children: React.ReactNode
}

export function DashboardLayout({
    sidebar,
    children,
    className,
    ...props
}: DashboardLayoutProps) {
    return (
        <div className={cn("min-h-screen bg-background", className)} {...props}>
            <div className="flex flex-col md:flex-row">
                {sidebar && (
                    <aside className="w-full border-b bg-card md:border-r md:w-64 md:min-h-[calc(100vh-4rem)]">
                        {sidebar}
                    </aside>
                )}
                <main className="flex-1 p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

interface DashboardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    heading: string
    description?: string
    action?: React.ReactNode
}

export function DashboardHeader({
    heading,
    description,
    action,
    className,
    ...props
}: DashboardHeaderProps) {
    return (
        <div className={cn("pb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2", className)} {...props}>
            <div>
                <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
                {description && (
                    <p className="text-muted-foreground">{description}</p>
                )}
            </div>
            {action && (
                <div className="ml-auto">{action}</div>
            )}
        </div>
    )
}

interface DashboardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export function DashboardContent({
    children,
    className,
    ...props
}: DashboardContentProps) {
    return (
        <div className={cn("space-y-6", className)} {...props}>
            {children}
        </div>
    )
}

interface DashboardGridProps extends React.HTMLAttributes<HTMLDivElement> {
    columns?: number
}

export function DashboardGrid({
    children,
    columns = 3,
    className,
    ...props
}: DashboardGridProps) {
    const gridCols = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    }

    return (
        <div
            className={cn(
                "grid gap-4 md:gap-6",
                gridCols[columns as keyof typeof gridCols] || gridCols[3],
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
} 