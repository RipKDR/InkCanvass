export type SocialLink = {
  label: string;
  url: string;
};

export type StudioInfo = {
  name: string;
  email: string;
  phone: string; // E.164 or local
  address: string;
  googleMapsUrl: string;
  bookingUrl: string;
  hours: Array<{ day: string; time: string }>;
  socials: SocialLink[];
  artists: Array<{
    name: string;
    socials: SocialLink[];
  }>;
};

export const studio: StudioInfo = {
  name: "Berserk Tattoos",
  // Provided address and contact details (normalized)
  address: "33 Southern Road, Heidelberg Heights, Victoria 3081",
  phone: "+61 478 128 212",
  email: "berserk.tattoos.au@gmail.com",
  bookingUrl: "https://book.heygoldie.com/Berserk-Tattoos",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=33+Southern+Road%2C+Heidelberg+Heights%2C+Victoria+3081",
  hours: [
    { day: "Monday", time: "12–7 pm" },
    { day: "Tuesday", time: "12–5 pm" },
    { day: "Wednesday", time: "12–7 pm" },
    { day: "Thursday", time: "12–7 pm" },
    { day: "Friday", time: "12–7 pm" },
    { day: "Saturday", time: "12–7 pm" },
    { day: "Sunday", time: "12–7 pm" },
  ],
  socials: [
    { label: "Instagram", url: "https://www.instagram.com/berserk_tattoos/" },
    { label: "Facebook", url: "https://www.facebook.com/BerserkTattoo/" },
    { label: "Email", url: "mailto:berserk.tattoos.au@gmail.com" },
    { label: "Phone", url: "tel:+61478128212" },
  ],
  artists: [
    {
      name: "Amelia Kelso",
      socials: [
        { label: "Instagram", url: "https://www.instagram.com/amzkelso/" },
        { label: "Threads", url: "https://www.threads.net/@amzkelso" },
        { label: "Booking", url: "https://book.heygoldie.com/Berserk-Tattoos" },
      ],
    },
    {
      name: "Ben White Raven",
      socials: [
        { label: "Instagram", url: "https://www.instagram.com/ben_whiteraven" },
        { label: "Threads", url: "https://www.threads.net/@ben_whiteraven" },
      ],
    },
    {
      name: "Monique Moore",
      socials: [
        { label: "Instagram", url: "https://www.instagram.com/moniquemoore666/" },
        { label: "TikTok", url: "https://www.tiktok.com/@monique.moore666" },
        { label: "Threads", url: "https://www.threads.net/@moniquemoore666" },
        { label: "Facebook", url: "https://www.facebook.com/people/Monique-Moore/100010669506067/" },
      ],
    },
  ],
};

