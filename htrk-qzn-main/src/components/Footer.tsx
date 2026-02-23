import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Facebook, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Shield,
  FileText,
  Users,
  Building
} from "lucide-react";
import { useContactInfo } from "@/hooks/useContactInfo";
import { formatPhoneForTel } from "@/lib/utils";

const footerSections = [
  {
    title: "Municipal Services",
    links: [
      { name: "Business Permits", href: "/services#business" },
      { name: "Civil Registration", href: "/services#civil" },
      { name: "Building Permits", href: "/services#building" },
      { name: "Social Assistance", href: "/services#social" },
      { name: "Forms & Downloads", href: "/services#forms" },
    ]
  },
  {
    title: "Transparency",
    links: [
      { name: "Full Disclosure", href: "/transparency/full-disclosure" },
      { name: "LGSF", href: "/transparency/lgsf" },
      { name: "Bayanihan Grant", href: "/transparency/bayanihan-grant" },
      { name: "Invitation to Bid", href: "/transparency/invitation-to-bid" },
      { name: "Notice of Award", href: "/transparency/notice-of-award" },
      { name: "Notice to Proceed", href: "/transparency/notice-to-proceed" },
      { name: "Contract Agreement", href: "/transparency/contract-agreement" },
      { name: "Sagip Saka", href: "/transparency/sagip-saka" }
    ]
  },
  {
    title: "Quick Links",
    links: [
      { name: "About", href: "/about" },
      { name: "Tourist Spots", href: "/tourism" },
      { name: "Investment Guide", href: "/investment" },
      { name: "News & Updates", href: "/news" },
      { name: "Governance", href: "/governance" },
      { name: "Sitemap", href: "/sitemap" }
    ]
  }
];

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/MunicipalityOfQuezonBukidnon",
    color: "hover:text-[hsl(95_38%_42%)]"
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://www.youtube.com/@municipalityofquezonbukidn9015",
    color: "hover:text-[hsl(42_75%_48%)]"
  }
];

export function Footer() {
  const { contactInfo } = useContactInfo();

  const offices = [
    {
      icon: Building,
      title: "Municipal Hall",
      address: contactInfo.address,
      phone: contactInfo.phone,
      email: contactInfo.email
    },
    {
      icon: Shield,
      title: "Municipal Police Station",
      address: "Police Station Compound, Quezon, Bukidnon",
      phone: contactInfo.policeNumber,
      email: contactInfo.policeEmail
    },
    {
      icon: FileText,
      title: "Health Center",
      address: "Municipal Health Office, Quezon, Bukidnon",
      phone: contactInfo.healthPhone,
      email: contactInfo.healthEmail
    },
    {
      icon: Shield,
      title: "MDRRMO",
      address: "Disaster Risk Reduction Office, Quezon, Bukidnon",
      phone: contactInfo.mdrrmoNumber,
      email: contactInfo.mdrrmoEmail
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[hsl(35_45%_18%)] via-[hsl(35_40%_22%)] to-[hsl(95_35%_25%)] text-white overflow-hidden">
      {/* Subtle pattern overlay for texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'url(/assets/quezon-municipal-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />
      
      {/* Main Footer Content */}
      <div className="relative container mx-auto px-6 py-8 sm:py-12">
        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {/* Municipal Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-white">Municipality of Quezon</h3>
            <p className="text-white/95 mb-4 leading-relaxed text-sm">
              Province of Bukidnon
            </p>
            <p className="text-sm text-white/90 mb-6 leading-relaxed">
              Committed to transparent governance, sustainable development, and 
              improving the quality of life for all Quezonians.
            </p>
            
            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-3 text-white text-base">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white/15 hover:bg-white/25 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <IconComponent className="h-4 w-4 text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4 text-white">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-white/90 hover:text-white transition-colors duration-300 text-sm leading-relaxed hover:underline underline-offset-2 flex items-center gap-2"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile: Accordion Layout */}
        <div className="lg:hidden">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="municipal-info" className="border-white/20">
              <AccordionTrigger className="text-white hover:no-underline">
                <div className="text-left">
                  <h3 className="text-lg font-bold text-white">Municipality of Quezon</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-white/95 mb-4 leading-relaxed text-sm">
                  Province of Bukidnon
                </p>
                <p className="text-sm text-white/90 mb-6 leading-relaxed">
                  Committed to transparent governance, sustainable development, and 
                  improving the quality of life for all Quezonians.
                </p>
                <div>
                  <h4 className="font-semibold mb-3 text-white text-sm">Follow Us</h4>
                  <div className="flex space-x-3">
                    {socialLinks.map((social) => {
                      const IconComponent = social.icon;
                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 bg-white/15 hover:bg-white/25 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
                          aria-label={`Follow us on ${social.name}`}
                        >
                          <IconComponent className="h-4 w-4 text-white" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            {footerSections.map((section, index) => (
              <AccordionItem key={index} value={`section-${index}`} className="border-white/20">
                <AccordionTrigger className="text-white hover:no-underline">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2.5">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-white/90 hover:text-white transition-colors duration-300 text-sm leading-relaxed hover:underline underline-offset-2 flex items-center gap-2"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="relative border-t border-white/25 bg-gradient-to-r from-[hsl(35_45%_15%)] to-[hsl(35_40%_18%)]">
        <div className="container mx-auto px-6 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm gap-3 sm:gap-4">
            <div className="text-white/90 text-center md:text-left">
              © {new Date().getFullYear()} Municipality of Quezon, Bukidnon. All rights reserved. | Powered by <a href="https://haturikonet.com" target="_blank" rel="noopener noreferrer" className="hover:text-white underline underline-offset-2 transition-colors font-medium">Haturiko Services Inc.</a>
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-white/90">
              <a href="/data-privacy" className="hover:text-white transition-colors underline-offset-2 hover:underline text-xs sm:text-sm">
                Privacy Policy
              </a>
              <a href="/comingsoon" className="hover:text-white transition-colors underline-offset-2 hover:underline text-xs sm:text-sm">
                Terms of Use
              </a>
              <a href="/accessibility" className="hover:text-white transition-colors underline-offset-2 hover:underline text-xs sm:text-sm">
                Accessibility
              </a>
              <a href="/sitemap" className="hover:text-white transition-colors underline-offset-2 hover:underline text-xs sm:text-sm">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}