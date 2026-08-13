export type HomePathway = {
  title: string;
  description: string;
  href: string;
  visible: boolean;
};

export type HomePageSettings = {
  announcement: string;
  eyebrow: string;
  title: string;
  intro: string;
  heroImageUrl: string;
  heroImageAlt: string;
  helpTitle: string;
  helpIntro: string;
  pathways: [HomePathway, HomePathway, HomePathway, HomePathway];
};

export const defaultHomePage: HomePageSettings = {
  announcement: "Civilian humanitarian action for people affected by the coup",
  eyebrow: "Dignity • Solidarity • Care",
  title: "Stand with people. Rebuild with care.",
  intro:
    "PDF is a community relief platform for civilians in and from Myanmar. We publish verified stories, transparent giving, events and practical pathways — edited from the Admin Panel.",
  heroImageUrl: "/pdf-hero-civilian.png",
  heroImageAlt: "Civilians packing relief supplies together in a community hall.",
  helpTitle: "How can you take part?",
  helpIntro: "Choose a path. Every public page is updated by authorised administrators.",
  pathways: [
    {
      title: "Follow verified updates",
      description: "Read approved news and stories published by the editorial team.",
      href: "/stories",
      visible: true,
    },
    {
      title: "Support relief work",
      description: "See published appeal figures and how giving is accounted for.",
      href: "/giving",
      visible: true,
    },
    {
      title: "Join an event",
      description: "Community gatherings, briefings and solidarity events from the calendar.",
      href: "/events",
      visible: true,
    },
    {
      title: "Volunteer or partner",
      description: "Ask privately how you can help with care, translation, logistics or advocacy.",
      href: "/get-involved",
      visible: true,
    },
  ],
};
