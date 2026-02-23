import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Phone, X, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useContactInfo } from "@/hooks/useContactInfo";
import { formatPhoneForTel } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { contactSchema, sanitizeHtml, type ContactFormData } from "@/lib/validation";

const HOME_CONTACT_ICON_DELAY_MS = 5000;

export function FloatingEmergencyHotlines() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isWidgetVisible, setIsWidgetVisible] = useState(location.pathname !== "/");
  const { contactInfo } = useContactInfo();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const validationResult = contactSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      validationResult.error.issues.forEach((error) => {
        const path = error.path[0] as keyof ContactFormData;
        fieldErrors[path] = error.message;
      });
      setErrors(fieldErrors);
      toast({
        title: "Please check your input",
        description: "There are errors in the form that need to be corrected.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const sanitizedData = {
        name: sanitizeHtml(validationResult.data.name),
        email: validationResult.data.email,
        subject: sanitizeHtml(validationResult.data.subject),
        message: sanitizeHtml(validationResult.data.message),
        phone: null,
        department: null
      };

      const { error } = await supabase
        .from('contact_messages')
        .insert([sanitizedData]);

      if (error) throw error;

      toast({
        title: 'Message Sent Successfully',
        description: 'We\'ve received your message and will respond within 2-3 business days.',
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setShowForm(false);
    } catch (error) {
      toast({
        title: 'Error Sending Message',
        description: 'Please try again or contact us directly.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Show the floating contact widget only after a short delay on the homepage.
  useEffect(() => {
    if (location.pathname !== "/") {
      setIsWidgetVisible(true);
      return;
    }

    setIsWidgetVisible(false);
    setIsOpen(false);
    setShowForm(false);

    const timer = window.setTimeout(() => {
      setIsWidgetVisible(true);
    }, HOME_CONTACT_ICON_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className={`fixed z-50 transition-opacity duration-300 ${
        isWidgetVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      } bottom-3 right-3 sm:bottom-5 sm:right-5 md:bottom-8 md:right-8`}
      aria-hidden={!isWidgetVisible}
    >
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-[hsl(95_38%_28%)] hover:bg-[hsl(95_38%_24%)] text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.34)] transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-[hsl(95_38%_42%)]/40 focus:ring-offset-2 border-2 border-white/95"
          aria-label="Contact Us - Open contact and emergency hotlines"
        >
          <div className="flex flex-col items-center justify-center gap-0.5">
            <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.5} />
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wide leading-tight text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_45%)]">
              Contact
            </span>
          </div>
        </Button>
      ) : (
        <Card className="w-[min(92vw,26rem)] sm:w-[26rem] shadow-[0_18px_48px_rgba(0,0,0,0.22)] border-2 border-[hsl(95_32%_34%)] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 overflow-hidden">
          <CardHeader className="bg-[hsl(95_38%_28%)] text-white rounded-t-lg pb-3 sm:pb-4 border-b border-black/10">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg md:text-xl font-bold flex items-center gap-2 tracking-wide leading-tight !text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">
                <MessageCircle className="h-5 w-5 shrink-0 text-white" />
                CONTACT US
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-white hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/70"
                onClick={() => {
                  setIsOpen(false);
                  setShowForm(false);
                }}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs sm:text-sm text-white/90 mt-1 leading-relaxed">
              Quick access to emergency hotlines and contact support.
            </p>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 max-h-[72vh] sm:max-h-[32rem] overflow-y-auto bg-[hsl(45_38%_98%)]">
            {!showForm ? (
              <>
                <div className="mb-4">
                  <h3 className="font-semibold text-base sm:text-lg text-[hsl(95_28%_18%)] mb-1">
                    Emergency Hotlines
                  </h3>
                  <p className="text-xs sm:text-sm text-[hsl(95_18%_32%)] mb-3 leading-relaxed">
                    Tap a hotline below to call immediately.
                  </p>
                  <div className="space-y-2">
                    {hotlines.map((hotline, index) => (
                      <a
                        key={index}
                        href={hotline.tel}
                        className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white hover:bg-[hsl(95_25%_95%)] transition-colors group border border-[hsl(95_24%_78%)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[hsl(95_38%_42%)] focus:ring-offset-1"
                        aria-label={`Call ${hotline.name}: ${hotline.number}`}
                      >
                        <div className="p-2.5 bg-[hsl(95_25%_96%)] rounded-lg group-hover:bg-[hsl(95_25%_92%)] transition-colors shadow-sm border border-[hsl(95_20%_86%)]">
                          <Phone className="h-4 w-4 text-[hsl(95_38%_28%)]" strokeWidth={2.2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] sm:text-xs font-bold text-[hsl(95_18%_20%)] uppercase tracking-wide">
                            {hotline.name}
                          </div>
                          <div className="font-extrabold text-base sm:text-lg leading-tight text-[hsl(95_38%_20%)]">
                            {hotline.number}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    if (location.pathname === "/") {
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    } else {
                      navigate({ pathname: "/", hash: "contact" });
                    }
                  }}
                  className="w-full h-11 sm:h-12 bg-[hsl(95_38%_28%)] hover:bg-[hsl(95_38%_24%)] text-white font-semibold mt-4 shadow-md focus:ring-2 focus:ring-[hsl(95_38%_35%)] focus:ring-offset-2"
                  size="lg"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send a Message
                </Button>
              </>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="popup-name" className="text-sm font-semibold text-[hsl(95_18%_20%)]">Full Name *</Label>
                  <Input
                    id="popup-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    placeholder="Your full name"
                    className={`bg-white text-base placeholder:text-muted-foreground/90 ${errors.name ? "border-destructive" : "border-[hsl(95_18%_75%)]"}`}
                  />
                  {errors.name && <p className="text-xs sm:text-sm font-medium text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="popup-email" className="text-sm font-semibold text-[hsl(95_18%_20%)]">Email Address *</Label>
                  <Input
                    id="popup-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    placeholder="your.email@example.com"
                    className={`bg-white text-base placeholder:text-muted-foreground/90 ${errors.email ? "border-destructive" : "border-[hsl(95_18%_75%)]"}`}
                  />
                  {errors.email && <p className="text-xs sm:text-sm font-medium text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="popup-subject" className="text-sm font-semibold text-[hsl(95_18%_20%)]">Subject *</Label>
                  <Input
                    id="popup-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    required
                    placeholder="Brief description"
                    className={`bg-white text-base placeholder:text-muted-foreground/90 ${errors.subject ? "border-destructive" : "border-[hsl(95_18%_75%)]"}`}
                  />
                  {errors.subject && <p className="text-xs sm:text-sm font-medium text-destructive">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="popup-message" className="text-sm font-semibold text-[hsl(95_18%_20%)]">Message *</Label>
                  <Textarea
                    id="popup-message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                    placeholder="Your message..."
                    rows={4}
                    className={`bg-white text-base placeholder:text-muted-foreground/90 ${errors.message ? "border-destructive" : "border-[hsl(95_18%_75%)]"}`}
                  />
                  {errors.message && <p className="text-xs sm:text-sm font-medium text-destructive">{errors.message}</p>}
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="flex-1 h-11 text-sm sm:text-base border-[hsl(95_18%_70%)] bg-white"
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 h-11 text-sm sm:text-base bg-[hsl(95_38%_28%)] hover:bg-[hsl(95_38%_24%)] text-white" 
                    disabled={loading}
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
