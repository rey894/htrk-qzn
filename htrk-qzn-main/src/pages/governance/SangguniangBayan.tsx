import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GovernanceTabs } from "@/components/GovernanceTabs";
import { GovernanceNavLinks } from "@/components/GovernanceNavLinks";
import { GovernanceHero } from "@/components/GovernanceHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Award } from "lucide-react";
import { SEOHelmet } from "@/components/seo/SEOHelmet";
import sbArnoldPastor from "@/assets/sb-arnold-pastor.png";
import sbFloridoPerpetua from "@/assets/sb-florido-perpetua.png";
import sbMyrnaRepalda from "@/assets/sb-myrna-repalda.png";
import sbGregorioTrania from "@/assets/sb-gregorio-trania.png";
import sbReynanteYoro from "@/assets/sb-reynante-yoro.png";
import sbClydeBaguio from "@/assets/sb-clyde-baguio.png";
import sbNiloBardon from "@/assets/sb-nilo-bardon.png";
import sbTheresaDavila from "@/assets/sb-theresa-davila.png";
import sbLezeDensing from "@/assets/sb-leze-densing.png";
import sbElmerLilawan from "@/assets/sb-elmer-lilawan.png";
import vmJosephDurotan from "@/assets/vm-joseph-durotan.png";
import sbTeresitaLeonardo from "@/assets/sb-teresita-leonardo.png";

const SangguniangBayan = () => {
  const electedCouncilors = [
    {
      name: "Clyde Joseph A. Baguio, CPA",
      position: "",
      committees: ["Rules", "Education, Skills Training and Livelihood", "Cooperatives and People's Organizations"],
      image: sbClydeBaguio,
      alt: "Clyde Joseph A. Baguio, CPA - Sangguniang Bayan of Quezon Bukidnon"
    },
    {
      name: "Arnold L. Pastor, MD",
      position: "",
      committees: ["Disaster Risk Reduction and Resilience", "Health and Public Welfare"],
      image: sbArnoldPastor,
      alt: "Arnold L. Pastor, MD - Sangguniang Bayan of Quezon Bukidnon"
    },
    {
      name: "Teresita B. Leonardo, DMD",
      position: "",
      committees: ["Social Services and Poverty Alleviation", "Tourism, History, Culture and Civic Affairs", "Ways and Means, and Social Reform"],
      image: sbTeresitaLeonardo,
      alt: "Teresita B. Leonardo, DMD - Sangguniang Bayan of Quezon Bukidnon"
    },
    {
      name: "Nilo P. Bardon",
      position: "",
      committees: ["Appropriation", "Engineering and Public Works", "Transportation and Traffic Regulation"],
      image: sbNiloBardon,
      alt: "Nilo P. Bardon - Sangguniang Bayan of Quezon Bukidnon"
    },
    {
      name: "Florido E. Perpetua",
      position: "",
      committees: ["Peace and Order, Police Matters, Social Justice, Human Rights and Reconciliation", "Agriculture and Fisheries", "Communication, Electrification and Water Services"],
      image: sbFloridoPerpetua,
      alt: "Florido E. Perpetua - Sangguniang Bayan of Quezon Bukidnon"
    },
    {
      name: "Reynante Nelson Y. Yoro, GE",
      position: "",
      committees: ["Housing, Urban Development, Land Zoning and Classification", "Games and Amusement"],
      image: sbReynanteYoro,
      alt: "Reynante Nelson Y. Yoro, GE - Sangguniang Bayan of Quezon Bukidnon"
    },
    {
      name: "Leze John Adam A. Densing, EE",
      position: "",
      committees: ["Environmental Protection and Natural Resources, and Solid Waste Management", "Trade, Industry, and Employment"],
      image: sbLezeDensing,
      alt: "Leze John Adam A. Densing, EE - Sangguniang Bayan of Quezon Bukidnon"
    },
    {
      name: "Myrna D. Repalda",
      position: "",
      committees: ["Good Governance, Civil Service and Human Resource Management", "Family, Women, Children, Senior Citizens, and Gender Equality"],
      image: sbMyrnaRepalda,
      alt: "Myrna D. Repalda - Sangguniang Bayan of Quezon Bukidnon"
    }
  ];

  const exOfficioMembers = [
    {
      name: "Gregorio O. Trania, Jr.",
      position: "Liga ng mga Barangay President",
      committee: "Barangay Affairs",
      image: sbGregorioTrania,
      alt: "Gregorio O. Trania Jr. - Liga ng mga Barangay President of Quezon Bukidnon"
    },
    {
      name: "Ma. Theresa Q. Davila",
      position: "Sangguniang Kabataan Federation President",
      committee: "Youth and Sports Development",
      image: sbTheresaDavila,
      alt: "Ma. Theresa Q. Davila - SK Federation President of Quezon Bukidnon"
    },
    {
      name: "Elmer L. Lilawan",
      position: "Indigenous People's Mandatory Representative",
      committee: "Indigenous Cultural Communities and Indigenous Peoples",
      image: sbElmerLilawan,
      alt: "Elmer L. Lilawan - Indigenous Peoples Mandatory Representative of Quezon Bukidnon"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="16th Sangguniang Bayan"
        description="Meet the members of the 16th Sangguniang Bayan of Quezon, Bukidnon. Learn about their committees and roles in local governance."
        keywords="Sangguniang Bayan Quezon Bukidnon, councilors, vice mayor, local government, committees"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/governance/sangguniang-bayan`}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        <GovernanceHero />
        <GovernanceTabs />

        {/* 16th Sangguniang Bayan - Formal Introduction */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">16th Sangguniang Bayan</h2>
            </div>
          </div>
        </section>

        {/* Presiding Officer */}
        <section className="pb-20 pt-4">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-8">Presiding Officer</h3>
            </div>
            <div className="w-full max-w-6xl mx-auto">
              
              <Card className="overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="min-h-[280px] sm:min-h-[320px] lg:min-h-[360px] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden p-4 lg:p-8">
                    <img 
                      src={vmJosephDurotan} 
                      alt="Vice Mayor Joseph T. Durotan Sr. - Vice Mayor of Quezon Bukidnon"
                      className="w-full h-full max-w-full max-h-full object-contain"
                      style={{ objectPosition: 'center' }}
                      loading="lazy"
                    />
                  </div>
                  
                  <CardContent className="p-8 lg:p-12">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-3xl font-bold text-primary mb-2">Joseph T. Durotan Sr.</h3>
                        <p className="text-lg font-semibold text-muted-foreground">Municipal Vice Mayor</p>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-semibold mb-3">Biography</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          Vice Mayor Joseph Durotan Sr. began his political career in 1994 as the Treasurer of Barangay Minsalirac. 
                          He later served as Barangay Captain from 1992 to 2002 and was elected as President of the Association of 
                          Barangay Councils (ABC). His leadership extended to the municipal level, where he served as a member of the 
                          Sangguniang Bayan for 11 years as municipal councilor. Building on his extensive experience, he was elected 
                          Vice Mayor and served for eight years. In the recent 2025 local elections, he was once again elected as 
                          Vice Mayor and will serve for the 2025-2028 term.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xl font-semibold mb-3">Education</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          Vice Mayor Durotan holds a degree in Aircraft Mechanical Engineering from the Cebu Aeronautical Technical 
                          School, earned in 1977, and a degree in Public Administration from Bukidnon State University, which he 
                          completed in 2014.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Council Members - Elected */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Council Members</h3>
              <p className="text-lg font-semibold text-muted-foreground">Elected</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {electedCouncilors.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.alt}
                        className="mx-auto mb-4 w-32 h-32 rounded-full object-cover object-center ring-4 ring-primary/20"
                        style={{ objectPosition: 'center top' }}
                        loading="lazy"
                      />
                    ) : (
                      <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full w-24 h-24 flex items-center justify-center">
                        <User className="h-12 w-12 text-primary/60" />
                      </div>
                    )}
                    <CardTitle className="text-xl text-primary">{member.name}</CardTitle>
                    {member.position && <p className="text-muted-foreground">{member.position}</p>}
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          Committees Chaired
                        </h4>
                        <div className="space-y-2">
                          {member.committees.map((committee, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs mr-1 mb-1">
                              {committee}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Council Members - Ex Officio */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Council Members</h3>
              <p className="text-lg font-semibold text-muted-foreground">Ex-Officio</p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
              {exOfficioMembers.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.alt}
                        className="mx-auto mb-4 w-28 h-28 rounded-full object-cover object-center ring-4 ring-primary/20"
                        style={{ objectPosition: 'center top' }}
                        loading="lazy"
                      />
                    ) : (
                      <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full w-20 h-20 flex items-center justify-center">
                        <User className="h-10 w-10 text-primary/60" />
                      </div>
                    )}
                    <CardTitle className="text-lg text-primary leading-tight">{member.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{member.position}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          Committees Chaired
                        </h4>
                        <div className="space-y-2">
                          <Badge variant="outline" className="text-xs mr-1 mb-1">
                            {member.committee}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <GovernanceNavLinks />
        <Footer />
      </div>
    </>
  );
};

export default SangguniangBayan;
