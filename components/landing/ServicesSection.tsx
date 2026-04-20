import { SectionHeader } from "@/components/ui/SectionHeader";
import { servicePackages } from "@/lib/data/services";
import { ServiceCard } from "./ServiceCard";

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="What We Offer"
          title="Our Services"
          description="When you choose to work with us, our experts will ensure that your expectations are met and your direction is clear. We develop a customized plan for each client and offer our support, feedback and guidance along the way to yield the best results."
        />
        <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-2">
          {servicePackages.map((pkg) => (
            <ServiceCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
