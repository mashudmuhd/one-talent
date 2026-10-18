async function verify() {
  try {
    const res = await fetch('http://127.0.0.1:5173/');
    console.log('HTTP Status:', res.status);
    const html = await res.text();
    const brandMatches = html.match(/<a[^>]*class="brand[^>]*>[\s\S]*?<\/a>/gi);
    console.log('Brand occurrences found:', brandMatches ? brandMatches.length : 0);
    if (brandMatches) {
      brandMatches.forEach((m, idx) => {
        console.log(`\n--- Match ${idx + 1} ---`);
        console.log(m);
      });
    }

    const faviconMatch = html.match(/<link[^>]*rel="icon"[^>]*>/gi);
    console.log('\nFavicon matches:', faviconMatch);

    const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*>/gi);
    console.log('OG image matches:', ogImageMatch);
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}
verify();
