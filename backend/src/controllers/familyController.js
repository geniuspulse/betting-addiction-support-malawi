exports.getFamilyResources = async (req, res) => {
  try {
    const resources = {
      howToTalk: {
        title: "How to Talk to Someone with a Betting Addiction",
        bilingual_title: "Momwe Mungalankhulire ndi Munthu Amene Wasokonezeka ndi Juga",
        guidelines: [
          {
            do: "Express your concern with love and facts (e.g., 'I notice we are struggling to buy maize or pay school fees because of football bets.')",
            dont: "Do not lecture, yell, or humiliate them. Addiction is a mental health battle, and shame drives them back to betting to chase losses.",
          },
          {
            do: "Support their recovery, not their gambling (e.g., offer to pay the landlord directly instead of handing them cash).",
            dont: "Do not bail them out of debts or cover up their lies (Katapila / lenders). This enables the cycle to continue.",
          }
        ],
        bilingual_guidelines: [
          {
            do: "Fotokozani nkhawa zanu mwachikondi komanso mwa umboni (mwachitsanzo: 'Ndikuona kuti tikuvutika kugula chimanga kapena kulipira sukulu chifukwa cha juga.')",
            dont: "Musawakalipire kapena kuwachititsa manyazi. Kusokonezeka ndi juga ndi nkhondo yakumutu, ndipo manyazi amawapangitsa kubwereranso kuti akabwezere.",
          },
          {
            do: "Thandizani pa machiritso awo, osati pakubetcha kwawo (mwachitsanzo, lipirani mwachindunji kwa eni nyumba kapena kusukulu m'malo mowapatsa ndalama m'manja).",
            dont: "Musawayimire kapena kuwalipirira ngongole zawo za Katapila. Izi zimawapatsa mwayi wopitiliza kubetcha.",
          }
        ]
      },
      warningSigns: {
        title: "Warning Signs of Hidden Betting Addiction",
        bilingual_title: "Zizindikiro zosonyeza kuti munthu akubetcha mwachinsinsi",
        signs: [
          "Constantly borrowing small amounts of money (Katapila) without clear explanations.",
          "Extreme secrecy regarding smartphone screens, mobile money accounts (Airtel Money, TNM Mpamba), and transaction SMS alerts.",
          "Mood swings: extreme excitement when local or international football matches finish, followed by deep silence, withdrawal, or anger.",
          "Unexplained disappearance of household valuables, or sudden lack of cash for essential food (maize, relish).",
          "Neglecting occupational, farming, or family duties to follow odds or match analyses."
        ],
        chichewa_signs: [
          "Kubwereka ndalama pafupipafupi (Katapila) popanda chifukwa chomveka.",
          "Kubisa kwambiri foni, ma akaunti a ndalama (Airtel Money, TNM Mpamba), komanso kufufuta mauthenga a ndalama mwachangu.",
          "Kusintha kwa mayendedwe: kukondwa kwambiri masewera am'maiko ena akatha, ndikutsatidwa ndi kukhala zii, kudzipatula, kapena mkwiyo.",
          "Kusowa kwa katundu wam'nyumba m'njira yodabwitsa, kapena kusowa kwa ndalama zogulira chakudya.",
          "Kusalabadira ntchito za tsiku ndi tsiku, ulimi, kapena banja chifukwa chotanganidwa ndi zotsatira za juga."
        ]
      },
      dosAndDontsSummary: [
        { status: "Do", text: "Commend their honesty when they confess a relapse.", chichewa_text: "Yamikani kuona mtima kwawo akakuuzani kuti abwerera ku juga." },
        { status: "Do", text: "Help them install gambling blockers on their phone and computers.", chichewa_text: "Athandizeni kuika mapulogalamu otsekera masamba a juga pafoni kapena pakompyuta." },
        { status: "Do", text: "Encourage them to enroll in BASM's free Agribusiness and Trade classes.", chichewa_text: "Alimbikitseni kulembetsa nawo maphunziro azaulimi ndi zamalonda pa BASM." },
        { status: "Dont", text: "Never financial-bail them out unless paying critical providers directly.", chichewa_text: "Musawapatse ndalama zolipirira ngongole, lipirani nokha kusukulu kapena kuchipatala." },
        { status: "Dont", text: "Never ignore the problem hoping it will disappear by itself.", chichewa_text: "Musanyalanyaze vutoli mukuganiza kuti lidzatha lokha." }
      ],
      localSupportGroups: [
        {
          name: "Lilongwe Recovery Family Circle",
          meetingTime: "Every Saturday at 2:00 PM",
          location: "Area 18 Community Hall, Lilongwe",
          contact: "+265 888 777 666 (Grace Phiri)",
          description: "A safe space for families affected by addiction to share hope and boundaries."
        },
        {
          name: "Blantyre Peer Support Network",
          meetingTime: "Every Sunday at 3:00 PM",
          location: "Limbe Community Center, Blantyre",
          contact: "+265 999 555 444 (Chisomo Mwale)",
          description: "Support group combining recovery steps and local cooperative micro-finance circles."
        }
      ]
    };

    return res.status(200).json(resources);
  } catch (error) {
    console.error('Error fetching family resources:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
