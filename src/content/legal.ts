/**
 * Privacy Policy and Terms, transcribed from Kim's documents
 * (Caleira_Privacy_Policy_Final.docx, Caleira_Terms_and_Conditions_Final.docx).
 *
 * TODO: The owner must have this text reviewed before relying on it. Both source documents
 * are marked "Publication subject to verification checklist"; that line is left off the page.
 * Edit wording here only to match a newer version of Kim's documents.
 */

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalDocument {
  eyebrow: string;
  title: string;
  /** Shown under the title. */
  effective: string;
  /** Page <title> and description. */
  seo: { title: string; description: string };
  sections: LegalSection[];
}

const business =
  "Caleira Skin & Body, Inc. (doing business as Caléira Skin & Body), 104 Seacrest Drive, Largo, FL 33771, (727) 292-1807, hello@caleiraskinbody.com, https://caleiraskinbody.com/";

const effective = "November 13, 2026";

export const privacyPolicy: LegalDocument = {
  eyebrow: "CALÉIRA Skin & Body",
  title: "Privacy Policy",
  effective: `Effective ${effective}`,
  seo: {
    title: "Privacy Policy | CALÉIRA Skin & Body",
    description:
      "How CALÉIRA Skin & Body collects, uses, stores, shares and protects personal information.",
  },
  sections: [
    {
      heading: "About Caléira",
      paragraphs: [
        `This Privacy Policy describes how ${business} collects, uses, stores, shares and protects personal information in connection with its website, booking services, in-person wellness and esthetics services, retail products, gift certificates, consultations and virtual programs. Effective ${effective}.`,
      ],
    },
    {
      heading: "Information collected",
      paragraphs: [
        "We collect information clients provide, including names, contact information, adult eligibility, appointment details, purchase and payment records, consultation answers, skincare preferences, allergies, medications and relevant health history voluntarily disclosed for service safety, intake and consent forms, treatment notes, and correspondence. Where specifically disclosed and consented to, we may collect treatment photographs, AI evaluation inputs and virtual consultation recordings. Payment processors may collect card details directly; we generally receive transaction confirmations rather than full card numbers.",
      ],
    },
    {
      heading: "How information is used",
      paragraphs: [
        "We use information to communicate about bookings, assess service suitability, deliver services and products, process transactions and refunds, document informed consent, manage gift certificates and prepaid packages, respond to requests, maintain required records, protect our operations and comply with applicable law. We use information for promotional messages only with the applicable separate permission.",
      ],
    },
    {
      heading: "Confidential treatment information",
      paragraphs: [
        "Client intake and treatment information is confidential and accessed only as needed for authorized business purposes. We request information relevant to treatment safety and ask clients to update material changes. Caléira provides nonmedical esthetics, massage and wellness services and does not provide medical diagnosis or treatment. Private-pay operations do not by themselves make Caléira a HIPAA-covered entity; other applicable privacy, confidentiality and security duties remain.",
      ],
    },
    {
      heading: "Photographs",
      paragraphs: [
        "Treatment photographs are requested only when essential to a particular disclosed service, with specific informed consent. For other services, photography is optional. Consent to treatment photographs does not authorize marketing use. If photographs are essential and consent is declined, we will explain whether an alternative service is available.",
      ],
    },
    {
      heading: "AI-assisted evaluations",
      paragraphs: [
        "Caliera Skin Intelligence is an optional ChatGPT-assisted evaluation workflow. It will be offered only with separate, informed opt-in that identifies the information submitted, provider, purpose, limitations and available alternatives. AI-generated suggestions are not diagnoses or guaranteed results. Client IDs are used where practical, but facial photographs may remain identifiable. Until the relevant service terms, privacy controls and processing arrangements have been assessed and implemented, real-client sensitive intake information and identifiable photographs will not be submitted to the personal ChatGPT Project.",
      ],
    },
    {
      heading: "Marketing permissions",
      paragraphs: [
        "We use identifiable client photos, before-and-after images, videos or testimonials for marketing only under a separate signed release. Clients can withdraw permission for future use by contacting us; already distributed materials may not always be retractable. Refusing marketing permission does not affect access to ordinary services.",
      ],
    },
    {
      heading: "Virtual consultations",
      paragraphs: [
        "Virtual sessions are not recorded unless participants separately consent in advance. When recording is proposed, we disclose its purpose, access, storage and retention. We will provide an unrecorded alternative when feasible. Florida law may require consent of all parties to recording.",
      ],
    },
    {
      heading: "Service providers and disclosures",
      paragraphs: [
        "We use Cal.com for scheduling, Stripe and other disclosed methods for payments, and a dedicated Caléira Google account/Google Drive for digital records. Some records may also be stored securely on paper. Vendors process information under their own applicable notices and agreements. We share information only as reasonably necessary for service delivery, payment, lawful requests, professional advice or business protection. We do not sell client treatment records.",
      ],
    },
    {
      heading: "Website cookies and tracking",
      paragraphs: [
        "Our website may use technologies necessary for operation and third-party integrations. Any optional analytics, advertising pixels, cookies and related consent mechanisms depend on the actual deployed website configuration. We will update this section and any required notices after completing a live website technology audit. Third-party sites and booking or payment pages have their own policies.",
      ],
    },
    {
      heading: "Security",
      paragraphs: [
        "We use a dedicated business Google account with 2-Step Verification enabled. We restrict sharing, use strong authentication and limit access to authorized individuals. Additional folder permissions, backups, paper-record controls, retention settings and incident procedures are being implemented. No system can be guaranteed completely secure. Sensitive client information will not be collected into a workflow until suitable protections are in place.",
      ],
    },
    {
      heading: "Retention",
      paragraphs: [
        "We retain records for applicable Florida professional, business, tax and consumer-protection requirements and legitimate service purposes. Specific periods depend on record type and applicable law. A written category-by-category retention and secure-disposal schedule is being finalized. We do not promise immediate deletion where retention is legally required.",
      ],
    },
    {
      heading: "Email and text communications",
      paragraphs: [
        "Transactional appointment, safety and purchase communications are distinct from promotional messages. Promotional email and SMS communications require appropriate separate consent and include legally required opt-out methods. Consent to marketing is not a condition of purchase. Carrier messaging and data charges may apply.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        "Contact hello@caleiraskinbody.com to request correction, available access, marketing opt-out, withdrawal of optional photo, AI or recording permissions, or information about records. We may verify identity before acting and may retain records when required by law. Applicable privacy rights and exceptions depend on the circumstances and jurisdiction.",
      ],
    },
    {
      heading: "Incidents and legal requests",
      paragraphs: [
        "We investigate suspected security incidents and provide notices where required under applicable law, including Florida Statutes §501.171 when its conditions are met. We may disclose information in response to lawful legal process or as necessary to protect safety and legal rights.",
      ],
    },
    {
      heading: "Adults only and policy updates",
      paragraphs: [
        "Services are for adults age 18 or older. We do not knowingly seek minors’ treatment information. We may update this Policy prospectively and post a new effective date. Privacy questions: hello@caleiraskinbody.com; (727) 292-1807; 104 Seacrest Drive, Largo, FL 33771.",
      ],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  eyebrow: "CALÉIRA Skin & Body",
  title: "Terms and Conditions",
  effective: `Effective ${effective}`,
  seo: {
    title: "Terms and Conditions | CALÉIRA Skin & Body",
    description:
      "The terms for bookings, services, products, gift certificates, website use and virtual offerings at CALÉIRA Skin & Body.",
  },
  sections: [
    {
      heading: "Agreement and business information",
      paragraphs: [
        `These Terms govern bookings, services, products, gift certificates, website use and virtual offerings provided by ${business}. Effective ${effective}. By booking or purchasing, you agree to the Terms made available at that time, subject to applicable law.`,
      ],
    },
    {
      heading: "Licenses and service scope",
      paragraphs: [
        "Florida Massage Therapist License MA58353; Florida Massage Establishment License MM48209; Facial Specialist Registration FB9802191. The studio operates in a room at a host salon identified as Sense of Skin, salon establishment license CE10026883; the scope of coverage for the independent room remains subject to regulatory verification. Services are offered only to the extent authorized by applicable licenses, facility approvals and professional scope-of-practice rules. No medical diagnosis or postoperative medical treatment is offered.",
      ],
    },
    {
      heading: "Eligibility and informed consent",
      paragraphs: [
        "Clients must be 18 or older. Clients must complete an intake and provide service-specific informed consent before treatment, with consent revisited as appropriate. Clients must provide accurate, current information relevant to safety, including allergies, medications, recent surgery, contraindications and material changes. Clients may ask questions and withdraw treatment consent.",
      ],
    },
    {
      heading: "Safety and treatment suitability",
      paragraphs: [
        "We may modify, postpone or decline treatment when consent is missing or safety concerns or contraindications exist, and may suggest assessment by a qualified healthcare professional. Clients who have had cosmetic surgery are considered only at least three months after surgery, subject to screening and appropriate clearance. This does not constitute postoperative care.",
      ],
    },
    {
      heading: "Appointment deposits and balances",
      paragraphs: [
        "A deposit of 25% of the booked service price is due at booking and is credited fully toward that service. The remaining 75% is due before treatment begins. Any applicable taxes, optional add-ons and other charges will be disclosed before purchase.",
      ],
    },
    {
      heading: "Cancellation, rescheduling and no-shows",
      paragraphs: [
        "Cancel or reschedule at least 24 hours before the appointment for a full refund of the deposit to the original payment method. Cancellations or rescheduling requests received less than 24 hours before the appointment, and no-shows, forfeit the 25% deposit. No additional standard cancellation or no-show penalty is charged. One emergency courtesy waiver per client may be granted at Caléira’s discretion. Any refund required by law will be honored.",
      ],
    },
    {
      heading: "Late arrivals",
      paragraphs: [
        "Arriving more than 10 minutes late may require a shortened service, adjustment or rescheduling depending on safety and the schedule. Late arrival is not automatically a no-show. Any deposit consequence will be communicated before application and will follow the disclosed cancellation policy and applicable law.",
      ],
    },
    {
      heading: "Completed services and concerns",
      paragraphs: [
        "Completed services are generally nonrefundable, but we review concerns individually and provide remedies where required by law. Contact hello@caleiraskinbody.com promptly with details. Depending on the circumstances, remedies may include guidance, a permitted correction, credit, partial refund or refund. This policy does not waive statutory rights.",
      ],
    },
    {
      heading: "Retail returns",
      paragraphs: [
        "Unopened, sealed retail products may be returned within 14 days of purchase with proof of purchase, subject to inspection and legally permitted hygiene exceptions disclosed at sale. Opened or used items are not eligible for change-of-mind returns. Defective, damaged, incorrect or misdescribed goods will be addressed consistent with applicable law.",
      ],
    },
    {
      heading: "Prepaid service packages",
      paragraphs: [
        "Before purchase, we disclose package inclusions, allocated values for each service, scheduling rules, and any relevant expiration or promotional conditions. If a package is canceled, unused services are refunded according to the written purchase allocation, after subtracting services delivered and any charges expressly disclosed and legally permissible. We do not retroactively impose undisclosed fees.",
      ],
    },
    {
      heading: "Gift certificates",
      paragraphs: [
        "We offer dollar-value and specific-service gift certificates. Purchased certificates will be handled in accordance with Florida law, including applicable restrictions on expiration dates and post-sale fees. If a named service becomes unavailable, we will provide a legally appropriate alternative or value-based resolution. Promotional certificates, if offered, will carry separately disclosed terms to the extent permitted by law.",
      ],
    },
    {
      heading: "90-day virtual skincare program",
      paragraphs: [
        "The 90-day premium virtual skincare program requires a separate enrollment agreement presented before payment. That agreement must specify the current price, installments, start/end dates, consultations, deliverables, included products, communication access, missed-session rules, service allocations and refund calculations. These general Terms do not replace that agreement. Enrollment will not be accepted until those program-specific terms are completed.",
      ],
    },
    {
      heading: "Photography, AI and recording",
      paragraphs: [
        "Treatment photos require service-specific consent where essential. Marketing photographs and testimonials require a separate signed release. Optional Caliera Skin Intelligence evaluations require separate informed opt-in and appropriate privacy disclosures; declining optional AI does not bar otherwise available services. Virtual calls are recorded only with separate advance consent of all participants as required by law.",
      ],
    },
    {
      heading: "Conduct and boundaries",
      paragraphs: [
        "We maintain zero tolerance for harassment, sexual misconduct, threats and unlawful discrimination. Massage services are strictly professional and nonsexual. Proper draping, privacy, hygiene and boundaries apply. A session may be stopped for safety or misconduct, with any resulting charges or refunds determined by the circumstances and applicable law.",
      ],
    },
    {
      heading: "Risks and results",
      paragraphs: [
        "Individual responses vary. Services may involve irritation, redness, sensitivity, bruising, allergic responses or other disclosed risks. We do not guarantee specific cosmetic, weight, lymphatic or therapeutic outcomes. Our services do not replace advice from a licensed medical clinician.",
      ],
    },
    {
      heading: "Payments and billing questions",
      paragraphs: [
        "We accept payment methods disclosed at checkout, which may include Stripe and Zelle. Contact us about billing errors so we can investigate. Nothing in these Terms limits valid chargeback rights or nonwaivable consumer protections.",
      ],
    },
    {
      heading: "Website and materials",
      paragraphs: [
        "Website content, educational resources, brand assets and program materials are provided for personal lawful use. Unauthorized commercial reproduction, impersonation, disruption or attempted unauthorized access is prohibited. External services and websites may have separate terms.",
      ],
    },
    {
      heading: "Liability and applicable law",
      paragraphs: [
        "To the extent allowed by applicable law, Caléira is not responsible for losses arising from inaccurate client disclosures, product misuse or circumstances outside its reasonable control. Nothing excludes liability for conduct or remedies that cannot lawfully be excluded. Florida law applies, subject to mandatory consumer protections and jurisdictional rules.",
      ],
    },
    {
      heading: "Changes and contact",
      paragraphs: [
        "We may update these Terms for future transactions. The terms provided at the time of purchase generally govern that purchase unless law requires otherwise. Questions: hello@caleiraskinbody.com, (727) 292-1807, 104 Seacrest Drive, Largo, FL 33771.",
      ],
    },
  ],
};
