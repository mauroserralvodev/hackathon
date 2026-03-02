// components/ui/BrandMark.tsx
export default function BrandMark() {
  return (
    <div
      className="h-10 w-10 border border-neutral-200"
      style={{
        borderRadius: 10,
        background:
          "linear-gradient(135deg, rgba(255,130,130,0.20), rgba(255,130,130,0.05))",
      }}
      aria-hidden="true"
    />
  );
}