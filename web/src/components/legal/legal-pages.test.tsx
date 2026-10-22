import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { DataDeletionPage } from "./data-deletion-page";
import { PrivacyPage } from "./privacy-page";
import { TermsPage } from "./terms-page";

describe("LG-FR-01, LG-FR-02, LG-FR-04, LG-FR-16 the reading layout", () => {
  test.each([
    ["Privacy policy", PrivacyPage],
    ["Terms", TermsPage],
    ["Deleting your data", DataDeletionPage],
  ] as const)("%s: title, last updated, the line naming Allynt Labs (1.3), sections listed and linked, contact", (title, Page) => {
    render(<Page />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(title);
    expect(screen.getByText(/^Last updated /)).toBeInTheDocument();
    expect(screen.getByText("Sponing is run by Allynt Labs.")).toBeInTheDocument();
    expect(screen.getByRole("main")).not.toHaveTextContent(/hackathon/i);
    const toc = screen.getByRole("navigation", { name: "On this page" });
    const sections = screen.getAllByRole("heading", { level: 2 });
    expect(sections.length).toBeGreaterThan(1);
    for (const h of sections) {
      expect(within(toc).getByRole("link", { name: h.textContent! })).toHaveAttribute("href", `#${h.id}`);
    }
    expect(screen.getByRole("link", { name: "hi@sponing.com" })).toHaveAttribute("href", "mailto:hi@sponing.com");
  });
});

describe("LG-FR-05 to LG-FR-10 the privacy policy", () => {
  test("says what is collected, who handles it, and how long each thing is kept (1.1)", () => {
    render(<PrivacyPage />);
    const who = screen.getByRole("region", { name: "Who else handles it" });
    for (const name of ["PayPal", "Amazon Web Services", "Amazon Bedrock", "Google", "Meta", "Resend", "Vercel"]) expect(who).toHaveTextContent(name);
    const collect = screen.getByRole("region", { name: "What we collect, and why" });
    for (const thing of ["name and email from Google", "Read-only access to your YouTube channel", "drafts you upload", "brief you paste", "PayPal email", "The email you choose to give"]) {
      expect(collect).toHaveTextContent(thing);
    }
    expect(screen.getByRole("region", { name: "What we never do" })).toHaveTextContent("Let an AI move money.");
    const kept = within(screen.getByRole("region", { name: "How long we keep it" }))
      .getAllByRole("listitem")
      .map((li) => li.textContent);
    expect(kept).toEqual([
      "Drafts, and the speech, on-screen text and frames read from them: 30 days after the post ends (paid, its hold returned, or closed).",
      "A live Reel’s video, fetched to check it: only until it’s matched to your draft, a few minutes.",
      "The brief, checklist, notes, check results and their evidence, and the brand’s email: while your account exists.",
      "Access to YouTube and Instagram: until you disconnect, access ends, or you delete your account.",
      "Payment records (amounts, dates and PayPal references): for as long as Sponing runs, with no name or email once your account is deleted.",
      "Your account, after you delete it: deleted at once; its files within 24 hours.",
      "Sessions: 14 days after last use.",
      "Server logs: 30 days; they hold ids only.",
    ]);
    expect(screen.queryByText(/not yet confirmed/)).toBeNull();
    expect(screen.getByRole("region", { name: "Cookies" })).toHaveTextContent("no tracking or advertising cookies");
  });

  test("LG-FR-07 (1.4): Vercel hosts the website and counts visits to its pages without cookies", () => {
    render(<PrivacyPage />);
    expect(screen.getByText("Vercel: hosting this website, and counting visits to its pages without cookies.")).toBeVisible();
  });

  test("LG-FR-18 (1.5): says how the data is protected, after What we never do", () => {
    render(<PrivacyPage />);
    const headings = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(headings.indexOf("How we protect it")).toBe(headings.indexOf("What we never do") + 1);
    const items = within(screen.getByRole("region", { name: "How we protect it" }))
      .getAllByRole("listitem")
      .map((li) => li.textContent);
    expect(items).toEqual([
      "Everything between your browser, Sponing and the services it uses travels over HTTPS.",
      "Your Google and Instagram access is encrypted with AES-256, using a key kept apart from the database. It is never sent to your browser or written to logs.",
      "The database and stored files are encrypted at rest.",
      "Drafts are kept in private storage. Only the two sides of their deal can open them, through links that expire after 15 minutes.",
      "Your sign-in is kept in a cookie that scripts on the page can’t read.",
      "Server logs hold ids only: never tokens, passwords, video links or what was said in a video.",
      "Only the two people who run Sponing at Allynt Labs can reach its systems, and they sign in with multi-factor authentication.",
      "We don’t use your data, or anything from Google or Instagram, to train AI models.",
    ]);
    expect(screen.getByRole("region", { name: "What we never do" })).not.toHaveTextContent("tokens are encrypted");
  });

  test("LG-FR-19 (1.5): Google and YouTube, with Limited Use and each named page linked", () => {
    render(<PrivacyPage />);
    const headings = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(headings.indexOf("Google and YouTube")).toBe(headings.indexOf("How we protect it") + 1);
    const google = screen.getByRole("region", { name: "Google and YouTube" });
    expect(google).toHaveTextContent(
      "Sponing’s use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.",
    );
    expect(google).toHaveTextContent(
      "Sponing uses YouTube API Services to read your channel and the video you give it. By connecting YouTube you agree to YouTube’s Terms of Service, and Google’s Privacy Policy applies to what Google holds.",
    );
    expect(google).toHaveTextContent("You can remove Sponing’s access at any time in your Google account’s settings.");
    for (const [name, href] of [
      ["Google API Services User Data Policy", "https://developers.google.com/terms/api-services-user-data-policy"],
      ["YouTube’s Terms of Service", "https://www.youtube.com/t/terms"],
      ["Google’s Privacy Policy", "https://policies.google.com/privacy"],
      ["Google account’s settings", "https://myaccount.google.com/permissions"],
    ]) {
      expect(within(google).getByRole("link", { name })).toHaveAttribute("href", href);
    }
  });

  test("LG-FR-09 (1.3): says how to delete in its own words, not only by pointing to Deleting your data", () => {
    render(<PrivacyPage />);
    expect(screen.getByRole("region", { name: "Your choices" })).toHaveTextContent(
      "Delete your account in Settings, or email hi@sponing.com and it’s done within 30 days. Deleting your data says what is deleted and what is kept.",
    );
  });
});

describe("LG-FR-11, LG-FR-12 the terms", () => {
  test("not a marketplace, sandbox only, the money rules and the AI rule", () => {
    render(<TermsPage />);
    expect(screen.getByText(/It is not a marketplace/)).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "What Sponing is" })).toHaveTextContent("Sponing is run by Allynt Labs. It runs on PayPal’s sandbox: no real money moves.");
    const money = screen.getByRole("region", { name: "How the money works" });
    for (const rule of ["$20 to $10,000", "48 hours from a fully passing draft", "re-confirms the hold", "passes its live check", "gives the hold back to the brand", "day 28", "5% of the deliverable’s amount"]) {
      expect(money).toHaveTextContent(rule);
    }
    expect(screen.getByRole("region", { name: "The AI, and its limits" })).toHaveTextContent("The AI never moves money.");
  });
});

describe("LG-FR-13 (1.1) deleting your data", () => {
  test("Settings comes first, then email within 30 days; what is deleted and kept in Settings' words", () => {
    render(<DataDeletionPage />);
    const how = screen.getByRole("region", { name: "How to delete your account" });
    expect(how).toHaveTextContent("open Settings and choose Delete account");
    expect(how).toHaveTextContent("Or by email: Email hi@sponing.com from the Google email you signed in with");
    expect(how).toHaveTextContent("It is done within 30 days.");
    const what = screen.getByRole("region", { name: "What is deleted, and what is kept" });
    expect(what).toHaveTextContent("Your profile, your connected accounts, your drafts, and each deal’s brief, checklist and check results are deleted, and brands’ links to your deals stop working.");
    expect(what).toHaveTextContent("Sponing keeps the payment records it must (amounts, dates and PayPal references), with your name and emails removed.");
  });
});
