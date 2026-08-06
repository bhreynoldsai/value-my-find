// Stand-in for the real valuation backend. Replace scanItem() with a real
// call to your vision/valuation API once available.
export function scanItem(photoUri) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now(),
        name: 'Studio pottery vase, c. 1970',
        photoUri,
        rangeLow: 85,
        rangeHigh: 140,
        maxPay: 35,
        call: 'BUY',
        confidence: 'High — 6 comps',
        platform: 'eBay',
        sellTime: '2–3 weeks',
        margin: '~74% at asking',
        comps: [
          { price: 132, source: 'eBay', when: '6d ago' },
          { price: 98, source: 'Etsy', when: '2w ago' },
          { price: 110, source: 'eBay', when: '3w ago' },
        ],
      });
    }, 1800);
  });
}
