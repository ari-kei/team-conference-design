import { cn } from "@/app/_lib/utils";
import Image from "next/image";

type SearchBarProps = {
  setSearchValue: (arg: string) => void;
  searchValue?: string;
  className?: string;
};

export default function SearchBar({
  setSearchValue,
  searchValue,
  className,
}: SearchBarProps) {
  return (
    <div className="flex bg-white rounded-r-lg rounded-l-lg">
      <input
        type="text"
        className={cn(
          "h-12",
          "rounded-l-lg",
          "py-1.5",
          "pl-3",
          "pr-20",
          className
        )}
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <button className="mr-3" type="button" tabIndex={0}>
        <Image
          className="dark:invert"
          src="/search.svg"
          alt="close"
          width={32}
          height={32}
          priority
        />
      </button>
      <button className="bg-white rounded-r-lg" type="button" tabIndex={0}>
        <Image
          className="dark:invert relative right-2"
          src="/close.svg"
          alt="close"
          width={32}
          height={32}
          priority
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setSearchValue("");
            }
          }}
          onClick={() => setSearchValue("")}
        />
      </button>
    </div>
  );
}
