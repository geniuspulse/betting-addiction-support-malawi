exports.getLibraryItems = async (req, res) => {
  try {
    const library = {
      mythsBusted: [
        {
          myth: "I am due for a win",
          chichewa_myth: "Nthawi yanga yakwana yoti ndipine",
          reality: "Every single bet is an independent random event. Past losses do not increase future chances. The software does not keep memory or pity you.",
          chichewa_reality: "Kubetcha kulikonse ndi mwayi wosiyana. Kutaya ndalama kale sikutanthauza kuti mupina m'tsogolo. Makina sasunga chisoni kapena kukumbukira zanu zakale."
        },
        {
          myth: "I can recover my losses if I place a bigger bet",
          chichewa_myth: "Ndikhoza kubwezera ndalama zomwe ndataya mwa kuika ndalama zambiri",
          reality: "This is a psychological trap called 'chasing losses'. It almost always leads to deeper debt and anxiety. Accept the loss, draw a line, and walk away.",
          chichewa_reality: "Uwu ndi msampha wamaganizo otchedwa 'kutsatira zotayika'. Nthawi zambiri zimakupangitsani kukhala ndi ngongole zazikulu komanso nkhawa. Landirani kuti mwataya, jambulani mzere watsopano, ndipo chokani pamenepo."
        },
        {
          myth: "Betting is a reliable source of easy money",
          chichewa_myth: "Juga ndi njira yosavuta yopezera ndalama",
          reality: "Betting is structured entertainment with built-in math working against you. The only consistent money made is by the betting companies themselves.",
          chichewa_reality: "Juga ndi zosangalatsa chabe zomwe zili ndi masamu ochitidwa mwadala kuti mutaye. Ndalama zokhazikika zimapita m'manja mwa makampani a jugayo okha."
        }
      ],
      successStories: [
        {
          name: "Chisomo Mwale",
          location: "Blantyre",
          formerDailyLoss: "MK15,000/day",
          savedAmount: "MK450,000",
          achievement: "Paid for 10 terms of primary school fees and started a vegetable market stall.",
          story: "I used to spend half my wages as a carpenter on football betting. My family was on the verge of breaking up. When I found BASM, I committed to the 15-minute delay rule and started tracking my saved money. In 30 days, I realized I had saved MK450,000. I bought a bag of maize, paid my child's fees, and put the rest as business capital for my wife's market stall.",
          chichewa_story: "Ndinkasunga theka la ndalama zanga za ukalipentala pa juga ya mpira. Banja langa lidatsala pang'ono kuthodola. Nditapeza BASM, ndidadzipereka kuchepetsa zilakolako ndipo ndidayamba kusunga ndalama. M'masiku 30, ndidazindikira kuti ndasunga MK450,000. Ndidagula thumba la chimanga, kulipira sukulu ya mwana wanga, ndipo ndidapereka ndalama zotsalira ngati likulu la mayi a panyumba."
        },
        {
          name: "Tadala Mvula",
          location: "Lilongwe",
          formerDailyLoss: "MK5,000/day",
          savedAmount: "MK150,000",
          achievement: "Completed Agribusiness Essentials training, built a poultry house with 50 layers.",
          story: "I thought mobile money betting was the only way to double my little allowance. Instead, I was always borrowing money. Using BASM's Recovery Wallet, I redirected my daily MK5,000 bets. While doing that, I enrolled in the Agribusiness training. Today, those savings built a secure chicken coop. My first batch of layers is now supplying eggs to our local trading center.",
          chichewa_story: "Ndinkaganiza kuti kubetcha pafoni ndiyo njira yokhayo yowonjezera ndalama zanga zazing'ono. Koma ndinkasowa nthawi zonse. Pogwiritsa ntchito chikwama cha BASM, ndidasiya kubetcha MK5,000 tsiku lililonse. Nthawi yomweyo ndidaphunzira maphunziro a Agribusiness. Lero ndili ndi nkhuku zomwe zikubala mazira pamsika wathu wapafupi."
        }
      ],
      howBettingCompaniesMakeMoney: {
        title: "The Math of the Odds (Momwe Makampani a Juga Amapezera Ndalama)",
        explanation: "Betting companies design 'payout margins'. For every MK1,000 they collect from Malawian youths, they only return about MK700 - MK800 in prizes, pocketing the remaining MK200 - MK300 as guaranteed profit. Over thousands of bets, the house math makes it statistically impossible for a regular bettor to win in the long run. Betting is a business engineered for your loss.",
        chichewa_explanation: "Makampani a juga amapanga misika m'njira yoti mwa MK1,000 iliyonse yomwe amatenga kwa achinyamata, amabweza MK700 kapena MK800 ngati mphotho, kwinaku akusunga MK200 kapena MK300 ngati phindu lawo. Pa mabetcha masauzande ambiri, masamu amapangitsa kuti zikhale zosatheka kuti wobetcha wamba apambane m'kupita kwanthawi. Juga ndi bizinesi yopangidwa kuti inu mutaye."
      }
    };

    return res.status(200).json(library);
  } catch (error) {
    console.error('Error fetching library items:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
