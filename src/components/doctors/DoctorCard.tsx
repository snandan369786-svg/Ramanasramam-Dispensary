import type { Doctor } from "@/content/site";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";

function DetailList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-line py-3.5 text-sm">
      <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-sage">
        {label}
      </dt>
      <dd className={items.length ? "text-ink" : "italic text-muted/80"}>
        {items.length ? (
          <ul className="space-y-2 leading-snug">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          "To be added"
        )}
      </dd>
    </div>
  );
}

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="flex h-full flex-col border border-line bg-paper p-8 sm:p-10">
      {/* Identity */}
      <div className="flex flex-1 flex-col">
        <h4 className="font-serif text-[2rem] font-medium leading-none text-forest-deep">
          {doctor.name}
        </h4>
        <div className="mt-3 min-h-7">
          {doctor.designation ? (
            <p className="eyebrow text-gold">{doctor.designation}</p>
          ) : (
            <PlaceholderTag>Designation — to be updated</PlaceholderTag>
          )}
        </div>

        <dl className="mt-7 border-b border-line">
          <DetailList label="Qualifications" items={doctor.qualifications} />
          {/* General physicians have no specialisation, so the row is omitted */}
          {doctor.specialisations.length > 0 && (
            <DetailList label="Specialisations" items={doctor.specialisations} />
          )}
        </dl>
      </div>
    </article>
  );
}
