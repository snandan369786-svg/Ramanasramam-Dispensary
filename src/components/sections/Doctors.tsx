import { departments, doctors } from "@/content/site";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Doctors() {
  return (
    <section
      id="doctors"
      aria-labelledby="doctors-title"
      className="grain py-24 sm:py-32 lg:py-40"
    >
      <div className="container-page">
        <SectionHeading
          id="doctors-title"
          align="center"
          eyebrow="Our Doctors"
          title={
            <>
              Care, given <em className="text-forest-soft">in person.</em>
            </>
          }
          intro="Meet the doctors who care for patients at the dispensary."
        />

        <div className="mt-16 space-y-16 lg:mt-24 lg:space-y-20">
          {departments.map((dept) => {
            const members = doctors.filter((d) => d.department === dept.id);
            if (!members.length) return null;
            return (
              <section key={dept.id} aria-labelledby={`doctors-${dept.id}`}>
                <Reveal className="border-b border-line pb-4">
                  <h3
                    id={`doctors-${dept.id}`}
                    className="font-serif text-[1.8rem] leading-tight text-forest-deep sm:text-[2.1rem]"
                  >
                    {dept.title}
                  </h3>
                </Reveal>
                <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                  {members.map((doctor, i) => (
                    <Reveal key={doctor.name} delay={(i % 3) * 110}>
                      <DoctorCard doctor={doctor} />
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
