import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const links = [
  { to: "/governance/mayor", label: "The Mayor" },
  { to: "/governance/sangguniang-bayan", label: "Sangguniang Bayan" },
  { to: "/governance/offices", label: "Municipal Offices" },
  { to: "/governance/development-agenda", label: "Our Goals" },
];

interface GovernanceNavLinksProps {
  /** Use compact styling when embedded in a card */
  compact?: boolean;
}

export function GovernanceNavLinks({ compact }: GovernanceNavLinksProps) {
  return (
    <section className={compact ? "pt-6 border-t border-border" : "py-12 border-t border-border"}>
      <div className={compact ? "px-0" : "container mx-auto px-4"}>
        <h4 className="text-lg font-semibold text-foreground text-center mb-6">
          Learn More About Our Governance
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-background border border-primary/30 text-foreground font-medium hover:bg-primary/5 hover:border-primary/50 transition-colors"
            >
              <ExternalLink className="h-4 w-4 flex-shrink-0" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
