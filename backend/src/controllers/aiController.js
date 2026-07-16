exports.getDailyMessage = async (req, res) => {
  try {
    const streak = Number(req.query.streak || 0);

    let messageObj = {
      streakRange: '',
      title: 'Zikomo! Welcome to your Daily Companion.',
      message: 'Take it one single moment at a time. Today, make a deliberate choice to save your hard-earned Kwacha.',
      chichewa: 'Chitani zinthu pang’onopang’ono. Lero, sankhani mosamala kusunga Kwacha yanu yomwe mukuyisowerera thukuta.'
    };

    if (streak === 0) {
      messageObj = {
        streakRange: '0 days',
        title: 'Tsiku Latsopano (A Brand New Day)',
        message: 'A journey of a thousand miles begins with a single step. Do not look back at yesterday; focus on your health today.',
        chichewa: 'Ulendo wa makilomita chikwi umayamba ndi phazi limodzi. Musayang’ane zakale; samalirani moyo wanu lero.'
      };
    } else if (streak >= 1 && streak < 7) {
      messageObj = {
        streakRange: '1-6 days',
        title: 'Kuyamba mwaluso (Strong Foundations)',
        message: 'You have started building momentum! Your mind is starting to clear, and your wallet is starting to breathe.',
        chichewa: 'Mwayamba kupeza mphamvu zatsopano! Maganizo anu akuyamba kukhala pansi, ndipo chikwama chanu chikuyamba kupeza mpweya.'
      };
    } else if (streak >= 7 && streak < 30) {
      messageObj = {
        streakRange: '7-29 days',
        title: 'Wopambana weniweni (A Real Champion)',
        message: 'More than a week free! You have resisted multiple temptations. Think of the school fees or maize bag you have saved!',
        chichewa: 'Kupitilira sabata imodzi muli mfulu! Mwalimbana ndi ziyeso zambiri. Ganizirani za sukulu kapena chimanga chomwe mwasunga!'
      };
    } else if (streak >= 30) {
      messageObj = {
        streakRange: '30+ days',
        title: 'Mphumphu ndi Ufulu (Full Recovery & Freedom)',
        message: 'Over a month! You are an inspiration to the community. You are showing that recovery is possible in Malawi.',
        chichewa: 'Kupitilira mwezi umodzi! Muli chitsanzo chabwino m’mudzi mwanu. Mukuwonetsa kuti kusiya juga n’kotheka m’dziko la Malawi.'
      };
    }

    return res.status(200).json(messageObj);
  } catch (error) {
    console.error('Error in daily message stub:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.chatStub = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    const lower = message.toLowerCase();
    let reply = "Muli bwino! Thank you for sharing. Remember that your urges are temporary, but the damage from gambling can be permanent. Stay strong, and use our exercises under Urge Support if you are struggling.";
    let chichewaReply = "Muli bwino! Zikomo chifukwa chogawana nafe. Kumbukirani kuti zilakolako zimatha, koma kuonongeka kwa zinthu chifukwa cha juga kumakhala kwa nthawi yaitali. Khalani amphamvu, ndipo gwiritsani ntchito njira zathu zothandizira m’gawo la Urge Support.";

    if (lower.includes('relapse') || lower.includes('lost') || lower.includes('bet') || lower.includes('taya')) {
      reply = "It is okay to trip, but do not lie down. We advise visiting our Recovery Wallet, clearing your head with cold water, and talking to counsellor James Banda (+265 888 123 456) immediately.";
      chichewaReply = "Ndi bwino kukhumudwa, koma musataye mtima. Tikukulimbikitsani kupita ku Recovery Wallet yathu, kutsuka kumaso ndi madzi ozizira, ndipo lankhulani ndi mlangizi James Banda mwachangu.";
    }

    return res.status(200).json({
      reply,
      chichewaReply,
      realAiIntegrationScheduled: 'Q3 2026',
    });
  } catch (error) {
    console.error('Error in AI chat stub:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getWeeklySummary = async (req, res) => {
  try {
    const summary = {
      week: 'Current Week',
      totalCheckins: 5,
      bettedDays: 0,
      urgeStrengthAverage: 3.2,
      savedMoneyMwk: 'MK25,000',
      aiInsights: 'Your urges have steadily decreased by 20% since Monday. Engaging in the Agribusiness training program is successfully filling your leisure hours. Keep it up!',
      aiInsightsChichewa: 'Zilakolako zanu zachepa ndi 20% kuyambira Lolemba. Kutenga nawo mbali m’maphunziro a Agribusiness kukuthandizani kwambiri kudzaza nthawi yanu yaulere. Pitirizani chomwecho!'
    };

    return res.status(200).json(summary);
  } catch (error) {
    console.error('Error in weekly summary stub:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
