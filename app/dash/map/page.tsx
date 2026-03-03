import LiveMapSection from "@/components/map/LiveMapSection";

export default function MapPage() {
  return (
    <main className="bg-white rounded-2xl border border-black/10 p-6 space-y-6">
      <div>
        <p className="text-lg tracking-tight text-neutral-900 mb-4">
          Venue Map
        </p>
        <LiveMapSection />
      </div>

      {/* Emergency Section */}
      

        <button
          type="button"
          className="h-11 w-full rounded-xl text-sm text-white transition active:scale-[0.99]"
          style={{ backgroundColor: "#FF8282" }}
        >
          Trigger Emergency Protocol
        </button>
    </main>
  );
}