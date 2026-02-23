import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send } from 'lucide-react';
import { contactSchema, sanitizeHtml, type ContactFormData } from '@/lib/validation';

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate form data
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
      // Sanitize the form data before submission
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
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our municipal offices for assistance, inquiries, or feedback
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-primary">Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    placeholder="Your full name"
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    placeholder="your.email@example.com"
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    required
                    placeholder="Brief description of your inquiry"
                    className={errors.subject ? "border-destructive" : ""}
                  />
                  {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                    placeholder="Please provide details about your inquiry or concern..."
                    rows={5}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                  size="lg"
                >
                  {loading ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}