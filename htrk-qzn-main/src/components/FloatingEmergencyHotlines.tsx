import { useState } from "react";
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

export function FloatingEmergencyHotlines() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
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

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-[hsl(95_38%_35%)] hover:bg-[hsl(95_38%_30%)] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-[hsl(95_38%_42%)]/40 focus:ring-offset-2 border-2 border-white/90"
          aria-label="Contact Us - Open contact and emergency hotlines"
        >
          <div className="flex flex-col items-center justify-center gap-0.5">
            <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.5} />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider leading-tight text-white drop-shadow-sm">Contact</span>
          </div>
        </Button>
      ) : (
        <Card className="w-80 sm:w-96 shadow-2xl border-2 border-[hsl(95_38%_40%)] bg-white">
          <CardHeader className="bg-[hsl(95_38%_35%)] text-white rounded-t-lg pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                CONTACT US
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => {
                  setIsOpen(false);
                  setShowForm(false);
                }}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 max-h-[80vh] overflow-y-auto">
            {!showForm ? (
              <>
                <div className="mb-4">
                  <h3 className="font-semibold text-base text-foreground mb-3">
                    Emergency Hotlines
                  </h3>
                  <div className="space-y-2">
                    {hotlines.map((hotline, index) => (
                      <a
                        key={index}
                        href={hotline.tel}
                        className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(95_25%_96%)] hover:bg-[hsl(95_25%_90%)] transition-colors group border border-[hsl(95_38%_50%)] focus:outline-none focus:ring-2 focus:ring-[hsl(95_38%_42%)] focus:ring-offset-1"
                        aria-label={`Call ${hotline.name}: ${hotline.number}`}
                      >
                        <div className="p-2 bg-white rounded-lg group-hover:bg-[hsl(95_25%_92%)] transition-colors shadow-sm">
                          <Phone className="h-4 w-4 text-[hsl(95_38%_35%)]" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-foreground uppercase tracking-wide">
                            {hotline.name}
                          </div>
                          <div className="font-bold text-base text-[hsl(95_38%_25%)]">
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
                  className="w-full bg-[hsl(95_38%_35%)] hover:bg-[hsl(95_38%_28%)] text-white font-semibold mt-4 focus:ring-2 focus:ring-offset-2"
                  size="lg"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send a Message
                </Button>
              </>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="popup-name">Full Name *</Label>
                  <Input
                    id="popup-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    placeholder="Your full name"
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="popup-email">Email Address *</Label>
                  <Input
                    id="popup-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    placeholder="your.email@example.com"
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="popup-subject">Subject *</Label>
                  <Input
                    id="popup-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    required
                    placeholder="Brief description"
                    className={errors.subject ? "border-destructive" : ""}
                  />
                  {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="popup-message">Message *</Label>
                  <Textarea
                    id="popup-message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                    placeholder="Your message..."
                    rows={4}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-[hsl(95_38%_42%)] hover:bg-[hsl(95_35%_45%)] text-white" 
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
