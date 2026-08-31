export default function SectionHeading({
  tag,
  title,
  align = "left",
}: {
  tag: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`mb-12 md:mb-16 ${align === "center" ? "text-center flex flex-col items-center" : ""}`}>
      <div
        className={`font-mono text-xs uppercase tracking-[0.2em] text-muted mb-4 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {tag}
      </div>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink">
        {title}
      </h2>
    </div>
  );
}
