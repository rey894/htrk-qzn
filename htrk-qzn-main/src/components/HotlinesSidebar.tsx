import { Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContactInfo } from "@/hooks/useContactInfo";
import { formatPhoneForTel } from "@/lib/utils";

export function HotlinesSidebar() {
  const { contactInfo } = useContactInfo();

  const hotlines = [
    {
      name: "Police",
      number: contactInfo.policeNumber,
      tel: `tel:${formatPhoneForTel(contactInfo.policeNumber)}`,
      color: "text-[hsl(35_45%_28%)]"
    },
    {
      name: "Fire",
      number: contactInfo.fireNumber,
      tel: `tel:${formatPhoneForTel(contactInfo.fireNumber)}`,
      color: "text-[hsl(35_45%_28%)]"
    },
    {
      name: "MDRRMO",
      number: contactInfo.mdrrmoNumber,
      tel: `tel:${formatPhoneForTel(contactInfo.mdrrmoNumber)}`,
      color: "text-[hsl(35_45%_28%)]"
    }
  ];

  return (
    <aside className="w-full md:w-64 lg:w-72 mb-8 md:mb-0">
      <Card className="sticky top-24 shadow-lg border-2 border-[hsl(95_38%_60%)]">
        <CardHeader className="bg-gradient-to-r from-[hsl(95_38%_42%)] to-[hsl(95_35%_45%)] text-white rounded-t-lg pb-3">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Emergency Hotlines
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {hotlines.map((hotline, index) => (
              <a
                key={index}
                href={hotline.tel}
                className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(95_25%_92%)] hover:bg-[hsl(95_25%_88%)] transition-colors group border border-[hsl(95_38%_60%)]"
              >
                <div className="p-2 bg-[hsl(95_25%_88%)] rounded-lg group-hover:bg-[hsl(95_25%_85%)] transition-colors">
                  <Phone className={`h-4 w-4 ${hotline.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {hotline.name}
                  </div>
                  <div className={`font-bold text-base ${hotline.color}`}>
                    {hotline.number}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
