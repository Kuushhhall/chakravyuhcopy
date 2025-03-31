
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  gradient?: boolean;
}

export function PageHeader({
  title,
  description,
  children,
  className,
  gradient = false,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-10", className)}>
      <h1 
        className={cn(
          "text-3xl md:text-4xl font-bold tracking-tight mb-3",
          gradient && "gradient-text"
        )}
      >
        {title}
      </h1>
      {description && (
        <p className="text-lg text-muted-foreground max-w-3xl">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

interface PageSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function PageSection({
  title,
  description,
  children,
  className,
}: PageSectionProps) {
  return (
    <section className={cn("py-8", className)}>
      {(title || description) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
          {description && (
            <p className="text-muted-foreground max-w-3xl">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
