import { CONTACT_EMAIL } from "@/lib/legal/contact";
import { DELETION_BY_EMAIL, KEPT } from "@/lib/legal/periods";
import { LegalPage, type LegalSection } from "./legal-page";

const SECTIONS: LegalSection[] = [
  {
    id: "what-we-collect",
    heading: "What we collect, and why",
    blocks: [
      "From creators:",
      {
        list: [
          "Your name and email from Google, to sign you in.",
          "Read-only access to your YouTube channel and, if you connect it, your Instagram professional account, with the account’s name, to check your post once it is published.",
          "The drafts you upload, and what is said, written on screen and shown in them, to check each draft against its checklist.",
          "The brief you paste, to turn it into a checklist.",
          "Your PayPal email, to pay you.",
        ],
      },
      "From brands:",
      {
        list: [
          "The email you choose to give, to send you the two notices after a post is live.",
          "The PayPal references for your holds.",
        ],
      },
      "From both sides: the deal’s terms, checklist, notes and decisions, and the PayPal reference for every hold, capture and payout, so both of you can see what happened to the money.",
    ],
  },
  {
    id: "what-we-never-do",
    heading: "What we never do",
    blocks: [
      {
        list: [
          "See or store your Google, Instagram or PayPal password.",
          "Post, edit or delete anything on your YouTube or Instagram. Our access is read-only.",
          "Sell your data or show you ads.",
          "Let an AI move money. AI gives findings with evidence; our own code checks the evidence and decides.",
        ],
      },
    ],
  },
  {
    // LG-FR-18 (1.5): each line traces to the 2026-10-22 decision record.
    id: "how-we-protect-it",
    heading: "How we protect it",
    blocks: [
      {
        list: [
          "Everything between your browser, Sponing and the services it uses travels over HTTPS.",
          "Your Google and Instagram access is encrypted with AES-256, using a key kept apart from the database. It is never sent to your browser or written to logs.",
          "The database and stored files are encrypted at rest.",
          "Drafts are kept in private storage. Only the two sides of their deal can open them, through links that expire after 15 minutes.",
          "Your sign-in is kept in a cookie that scripts on the page can’t read.",
          "Server logs hold ids only: never tokens, passwords, video links or what was said in a video.",
          "Only the two people who run Sponing at Allynt Labs can reach its systems, and they sign in with multi-factor authentication.",
          "We don’t use your data, or anything from Google or Instagram, to train AI models.",
        ],
      },
    ],
  },
  {
    // LG-FR-19 (1.5): Google's Limited Use statement and YouTube's links.
    id: "google-and-youtube",
    heading: "Google and YouTube",
    blocks: [
      {
        parts: [
          "Sponing’s use and transfer of information received from Google APIs adheres to the ",
          { text: "Google API Services User Data Policy", href: "https://developers.google.com/terms/api-services-user-data-policy" },
          ", including the Limited Use requirements.",
        ],
      },
      {
        parts: [
          "Sponing uses YouTube API Services to read your channel and the video you give it. By connecting YouTube you agree to ",
          { text: "YouTube’s Terms of Service", href: "https://www.youtube.com/t/terms" },
          ", and ",
          { text: "Google’s Privacy Policy", href: "https://policies.google.com/privacy" },
          " applies to what Google holds.",
        ],
      },
      {
        parts: [
          "You can remove Sponing’s access at any time in your ",
          { text: "Google account’s settings", href: "https://myaccount.google.com/permissions" },
          ".",
        ],
      },
    ],
  },
  {
    id: "who-processes-it",
    heading: "Who else handles it",
    blocks: [
      {
        list: [
          "PayPal: holds, capture and payouts (the sandbox only; no real money moves).",
          "Amazon Web Services: hosting, the database, file storage and encryption, and Amazon Bedrock, which reads briefs and checks drafts.",
          "Google: signing in, and reading your YouTube channel.",
          "Meta: reading your Instagram account.",
          "Resend: the brand’s two emails.",
          "Vercel: hosting this website, and counting visits to its pages without cookies.",
        ],
      },
    ],
  },
  {
    id: "how-long",
    heading: "How long we keep it",
    blocks: [
      {
        list: [...KEPT],
      },
    ],
  },
  {
    id: "your-choices",
    heading: "Your choices",
    blocks: [
      {
        list: [
          "Stop Sponing reading YouTube or Instagram by removing Sponing in your Google account’s or Instagram’s own settings.",
          // LG-FR-09 (1.3): how to delete, in the page's own words.
          `Delete your account in Settings, or email ${CONTACT_EMAIL} and it’s done ${DELETION_BY_EMAIL}. Deleting your data says what is deleted and what is kept.`,
          "Ask what we hold about you, by email.",
        ],
      },
    ],
  },
  {
    id: "cookies",
    heading: "Cookies",
    blocks: [
      "One cookie keeps a signed-in creator signed in, and one keeps a brand in the deal it opened from its link. Scripts on the page can’t read them. We use no tracking or advertising cookies.",
    ],
  },
];

/**
 * `/privacy`: what Sponing collects and why, what it never does, who handles
 * it, how it is protected, Google and YouTube, how long it is kept, the
 * reader’s choices and cookies.
 *
 * @see docs/specs/legal-pages-frd.md LG-FR-05 to LG-FR-10, LG-FR-18, LG-FR-19
 */
export function PrivacyPage() {
  return <LegalPage title="Privacy policy" sections={SECTIONS} />;
}
