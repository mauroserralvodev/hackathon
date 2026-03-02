"use client";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

type TeamMember = {
  id: string;
  name: string;
  phone: string;
  role: string;
};

const TEAM_MEMBERS_ENDPOINT = process.env.NEXT_PUBLIC_TEAM_MEMBERS_API_URL;

const FALLBACK_MEMBERS: TeamMember[] = [
  { id: "demo-1", name: "Avery Park", phone: "+34 600 111 222", role: "Ops Lead" },
  { id: "demo-2", name: "Noa Fernández", phone: "+34 600 333 444", role: "Comms" },
  { id: "demo-3", name: "Iria Muñoz", phone: "+34 600 555 666", role: "Logistics" },
];

function normalizeMembers(payload: unknown): TeamMember[] {
  const guessArray = (value: unknown): unknown[] => {
    if (Array.isArray(value)) return value;
    if (value && typeof value === "object") {
      const obj = value as Record<string, unknown>;
      if (Array.isArray(obj.members)) return obj.members;
      if (Array.isArray(obj.data)) return obj.data;
      if (Array.isArray(obj.results)) return obj.results;
    }
    return [];
  };

  const entries = guessArray(payload);

  return entries
    .map((entry, index) => {
      if (!entry || typeof entry !== "object") return null;
      const obj = entry as Record<string, unknown>;

      const firstName = (obj.first_name as string) || "";
      const secondName = (obj.second_name as string) || "";
      const combinedName = `${firstName} ${secondName}`.trim();

      const name = (obj.name as string) || combinedName || "Unnamed";
      const phone =
        (obj.phone_number as string) ||
        (obj.phone as string) ||
        (obj.contact_number as string) ||
        "—";
      const role =
        (obj.role as string) ||
        (obj.role_name as string) ||
        (obj.role_title as string) ||
        "—";
      const id = String(
        obj.id ?? obj.user_id ?? obj.member_id ?? obj.phone_number ?? index
      );

      return { id, name, phone, role } satisfies TeamMember;
    })
    .filter((entry): entry is TeamMember => Boolean(entry));
}

export default function TeamConfigPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const nameTemplate = (member: TeamMember) => (
    <p className="font-medium text-neutral-900">{member.name}</p>
  );

  const phoneTemplate = (member: TeamMember) => (
    <span className="text-neutral-600">{member.phone}</span>
  );

  const roleTemplate = (member: TeamMember) => (
    <span className="inline-flex rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
      {member.role}
    </span>
  );

  useEffect(() => {
    let active = true;

    async function loadMembers() {
      setLoading(true);
      setError(null);

      try {
        if (!TEAM_MEMBERS_ENDPOINT) {
          setMembers(FALLBACK_MEMBERS);
          setUsingFallback(true);
          setError("Set NEXT_PUBLIC_TEAM_MEMBERS_API_URL to load real data.");
          return;
        }

        const res = await fetch(TEAM_MEMBERS_ENDPOINT, { cache: "no-store" });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const payload = await res.json();
        const normalized = normalizeMembers(payload);

        if (!active) return;

        if (normalized.length === 0) {
          setMembers(FALLBACK_MEMBERS);
          setUsingFallback(true);
          setError("API returned no members. Showing sample roster.");
        } else {
          setMembers(normalized);
          setUsingFallback(false);
        }
      } catch (err) {
        console.error("Failed to load team members", err);
        if (!active) return;
        setMembers(FALLBACK_MEMBERS);
        setUsingFallback(true);
        
      } finally {
        if (active) setLoading(false);
      }
    }

    loadMembers();
    return () => {
      active = false;
    };
  }, [refreshIndex]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-black/10 bg-white p-6 text-neutral-800">
        <p className="text-lg tracking-tight">Team configuration</p>
        <p className="mt-2 text-sm text-neutral-600">
          Track who is on-site, their contact number, and responsibilities. This
          table will hydrate with your backend once the endpoint is ready.
        </p>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 px-6 py-4">
          <div>
            <p className="text-base font-medium text-neutral-900">Team members</p>
            <p className="text-xs text-neutral-500">
              {loading
                ? "Loading data from the roster service..."
                : usingFallback
                  ? "Showing sample entries until the API is wired."
                  : `Showing ${members.length} people.`}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setRefreshIndex((value) => value + 1)}
            disabled={loading}
            className="rounded-xl border border-black/10 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="pb-5">
          <DataTable
            value={members}
            loading={loading}
            emptyMessage="No team members to display yet."
            className="text-sm text-neutral-800"
            responsiveLayout="scroll"
            stripedRows
          >
            <Column
              field="name"
              header="Name"
              body={nameTemplate}
              headerClassName="text-xs uppercase tracking-wide text-neutral-500"
            />
            <Column
              field="phone"
              header="Phone number"
              body={phoneTemplate}
              headerClassName="text-xs uppercase tracking-wide text-neutral-500"
            />
            <Column
              field="role"
              header="Role"
              body={roleTemplate}
              headerClassName="text-xs uppercase tracking-wide text-neutral-500"
            />
          </DataTable>
        </div>

        {error && (
          <div className="border-t border-black/10 px-6 py-4 text-xs text-neutral-600">
            {error}
          </div>
        )}
      </section>
    </div>
  );
}