"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { seedPosts } from "../lib/content";
import {
  defaultHomePage,
  type HomePageSettings,
} from "../lib/home";
import { LogoMark } from "./LogoMark";
import {
  PublicHeader,
  type PublicLanguage,
} from "./PublicHeader";
import { MailSubscribe } from "./MailSubscribe";

const copy = {
  en: {
    eyebrow: "Civilian record · Myanmar",
    title: "Stand with people. Rebuild with care.",
    intro:
      "PDF is a community relief platform for civilians in and from Myanmar. Verified stories, transparent giving, events and practical pathways.",
    helpTitle: "How can you take part?",
    routes: [
      "Follow verified updates",
      "Support relief work",
      "Join an event",
      "Volunteer or partner",
    ],
  },
  my: {
    eyebrow: "အရပ်သား မှတ်တမ်း · မြန်မာ",
    title: "လူထုနှင့်အတူ ရပ်တည်သည်။ ဂရုစိုက်မှုဖြင့် ပြန်လည်တည်ဆောက်သည်။",
    intro:
      "PDF သည် မြန်မာပြည်သူများအတွက် အရပ်သား လူသားချင်းစာနာမှု ပလက်ဖောင်းဖြစ်သည်။",
    helpTitle: "မည်သို့ ပါဝင်နိုင်သနည်း။",
    routes: [
      "အတည်ပြုထားသော သတင်းများ",
      "ကူညီထောက်ပံ့ရန်",
      "ပွဲတက်ရန်",
      "စေတနာ့ဝန်ထမ်း",
    ],
  },
  kar: {
    eyebrow: "Civilian record · Myanmar",
    title: "Stand with people. Rebuild with care.",
    intro:
      "PDF publishes verified community relief updates for civilians affected by the coup.",
    helpTitle: "How can you take part?",
    routes: [
      "Follow verified updates",
      "Support relief work",
      "Join an event",
      "Volunteer or partner",
    ],
  },
} satisfies Record<
  PublicLanguage,
  {
    eyebrow: string;
    title: string;
    intro: string;
    helpTitle: string;
    routes: [string, string, string, string];
  }
>;

export function PublicSite() {
  const [language, setLanguage] = useState<PublicLanguage>("en");
  const [home, setHome] = useState<HomePageSettings>(defaultHomePage);
  const [posts, setPosts] = useState(seedPosts);
  const pageCopy = copy[language];

  useEffect(() => {
    function loadHome() {
      fetch("/api/home", { cache: "no-store", credentials: "same-origin" })
        .then((response) => (response.ok ? response.json() : Promise.reject()))
        .then((payload) => {
          if (payload.home) setHome(payload.home);
        })
        .catch(() => undefined);
    }
    loadHome();
    window.addEventListener("focus", loadHome);
    return () => window.removeEventListener("focus", loadHome);
  }, []);

  useEffect(() => {
    function loadPosts() {
      fetch("/api/posts", { cache: "no-store", credentials: "same-origin" })
        .then((response) => (response.ok ? response.json() : Promise.reject()))
        .then((payload) => {
          if (Array.isArray(payload.posts) && payload.posts.length) setPosts(payload.posts);
        })
        .catch(() => undefined);
    }
    loadPosts();
    window.addEventListener("focus", loadPosts);
    return () => window.removeEventListener("focus", loadPosts);
  }, []);

  const localizedHome = language === "en"
    ? home
    : {
        ...home,
        eyebrow: pageCopy.eyebrow,
        title: pageCopy.title,
        intro: pageCopy.intro,
        helpTitle: pageCopy.helpTitle,
        pathways: home.pathways.map((pathway, index) => ({
          ...pathway,
          title: pageCopy.routes[index],
        })) as HomePageSettings["pathways"],
      };

  const featuredPosts = posts.slice(0, 3);
  const storyImages = [
    "/story-prayer.png",
    "/story-cultural.png",
    "/story-learning.png",
  ];
  const lead = featuredPosts[0];
  const rest = featuredPosts.slice(1);

  return (
    <main className="pdf-shell">
      <p className="pdf-ticker">
        <span>{home.announcement}</span>
        <a href="#folio">Latest stories</a>
      </p>

      <PublicHeader
        activeHref="/"
        language={language}
        onLanguageChange={setLanguage}
      />

      <section className="pdf-stage">
        <div className="pdf-stage-copy">
          <p className="pdf-kicker">{localizedHome.eyebrow}</p>
          <h1>{localizedHome.title}</h1>
          <p className="pdf-dek">{localizedHome.intro}</p>
          <div className="pdf-actions">
            <a className="pdf-cta" href="#index">
              Choose a path
            </a>
            <Link className="pdf-ghost" href="/get-involved">
              Get involved
            </Link>
          </div>
          <p className="pdf-note">
            Independent civilian humanitarian organisation. Not a government or armed group.
          </p>
        </div>
        <figure className="pdf-stage-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={localizedHome.heroImageUrl}
            alt={localizedHome.heroImageAlt}
            key={localizedHome.heroImageUrl}
          />
          <figcaption>Photograph published from the Admin Panel</figcaption>
        </figure>
      </section>

      <section className="pdf-ledger" aria-label="Site facts">
        <div><b>04+</b><span>Years of civilian solidarity</span></div>
        <div><b>08</b><span>Pages editors can update</span></div>
        <div><b>07</b><span>n8n workflows connected</span></div>
        <div><b>03</b><span>Languages on this site</span></div>
      </section>

      <section className="pdf-folio" id="folio">
        <header>
          <p className="pdf-kicker">Dispatch</p>
          <h2>Stories from the community</h2>
        </header>
        <div className="pdf-folio-grid">
          {lead && (
            <article className="pdf-lead">
              <div className="pdf-lead-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lead.mediaUrl || storyImages[0]} alt={lead.mediaAlt || "PDF community activity"} />
              </div>
              <div>
                <span>{lead.category}</span>
                <time>{lead.date}</time>
                <h3>{lead.title}</h3>
                <p>{lead.excerpt}</p>
                <Link href="/stories">Continue in News &amp; stories</Link>
              </div>
            </article>
          )}
          <div className="pdf-stack">
            {rest.map((post, index) => (
              <article key={post.slug}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.mediaUrl || storyImages[index + 1]} alt={post.mediaAlt || post.title} />
                <div>
                  <time>{post.date}</time>
                  <h3>{post.title}</h3>
                  <Link href="/stories">Read</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pdf-banner" aria-label="Mission">
        <p>People first. No rumour. Care that can be shown.</p>
      </section>

      <section className="pdf-index" id="index">
        <header>
          <p className="pdf-kicker">Index</p>
          <h2>{localizedHome.helpTitle}</h2>
          <p>{localizedHome.helpIntro}</p>
        </header>
        <ol>
          {localizedHome.pathways.map((pathway, index) => {
            if (!pathway.visible) return null;
            const external = pathway.href.startsWith("https://");
            return (
              <li key={index}>
                <a href={pathway.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
                  <em>{String(index + 1).padStart(2, "0")}</em>
                  <strong>{pathway.title}</strong>
                  <span>{pathway.description}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="pdf-triad" id="work">
        <header>
          <p className="pdf-kicker">Mandate</p>
          <h2>Relief. Record. Connection.</h2>
        </header>
        <div>
          <article>
            <h3>Civilian relief</h3>
            <p>Practical help shaped with trusted community partners.</p>
            <Link href="/our-work">Our work</Link>
          </article>
          <article>
            <h3>Public record</h3>
            <p>Stories and figures appear only after administrator review.</p>
            <Link href="/stories">News &amp; stories</Link>
          </article>
          <article>
            <h3>Gathering</h3>
            <p>Events and galleries keep people connected across distance.</p>
            <Link href="/events">Events</Link>
          </article>
        </div>
      </section>

      <section className="pdf-band">
        <div>
          <p className="pdf-kicker">Take part</p>
          <h2>Bring time, language and local knowledge.</h2>
        </div>
        <Link className="pdf-cta" href="/get-involved">
          Get involved
        </Link>
      </section>

      <MailSubscribe source="home" />

      <footer className="pdf-colophon">
        <div className="pdf-colophon-brand">
          <LogoMark />
          <div>
            <strong>PDF Myanmar Relief</strong>
            <span>Civilian humanitarian community</span>
          </div>
        </div>
        <nav>
          <Link href="/about">About</Link>
          <Link href="/our-work">Our work</Link>
          <Link href="/giving">Giving</Link>
          <Link href="/stories">News</Link>
          <Link href="/events">Events</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/approach">Approach</Link>
          <Link href="/get-involved">Contact</Link>
        </nav>
        <p>Independent civilian organisation · Admin-published · Accountable</p>
      </footer>
    </main>
  );
}
