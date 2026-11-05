import Link from "next/link";

export function TopBar() {
  return (
    <div className="bg-[#0B1B3A] px-4 py-2 text-center text-[13.5px] text-[#DCE4F5]">
      <p>
        Fall 2027 cycle · AADSAS closes February 5, 2027.{" "}
        <Link
          href="/blog/is-it-too-late-to-apply-dental-school-2027"
          className="font-semibold text-white underline-offset-2 hover:underline"
        >
          Is it too late to apply?
        </Link>
      </p>
    </div>
  );
}
