import Link from "next/link";

const Page: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50">
      <Link
        href="/users"
        className="text-lg hover:underline underline-offset-4"
      >
        Go to <code className="text-base">/users</code> →
      </Link>
    </div>
  );
};

export default Page;
