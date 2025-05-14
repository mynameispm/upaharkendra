
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const Loader = ({ size = "medium", className }: LoaderProps) => {
  const sizeClasses = {
    small: "h-5 w-5 border-2",
    medium: "h-8 w-8 border-3",
    large: "h-12 w-12 border-4",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={cn(
          "animate-spin rounded-full border-solid border-brand-primary border-t-transparent",
          sizeClasses[size],
          className
        )}
      />
    </div>
  );
};

export default Loader;
