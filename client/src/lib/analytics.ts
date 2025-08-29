export function initAnalytics() {
  const provider = import.meta.env.VITE_ANALYTICS_PROVIDER as string | undefined;
  if (!provider || provider === "none") return;

  if (provider === "ga4") {
    const id = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
    if (!id) return;
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s1);
    const s2 = document.createElement("script");
    s2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);} 
      gtag('js', new Date());
      gtag('config', '${id}');
    `;
    document.head.appendChild(s2);
    return;
  }

  if (provider === "plausible") {
    const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;
    if (!domain) return;
    const s = document.createElement("script");
    s.setAttribute("defer", "");
    s.setAttribute("data-domain", domain);
    s.src = "https://plausible.io/js/script.js";
    document.head.appendChild(s);
  }
}

