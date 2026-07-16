const UrgeLog = require('../models/UrgeLog');

exports.logUrge = async (req, res) => {
  try {
    const { intensity, trigger, outcome } = req.body;
    const userId = req.user ? req.user.id : '11111111-1111-1111-1111-111111111111';

    if (intensity === undefined || !trigger || !outcome) {
      return res.status(400).json({ error: 'Missing required urge logging fields: intensity, trigger, outcome' });
    }

    const log = await UrgeLog.create({
      userId,
      intensity,
      trigger,
      outcome,
    });

    let assistance = null;
    if (outcome === 'relapsed') {
      assistance = {
        message: 'Do not be discouraged! Kugwa si kulephera, kulephera ndiko kusadzuka (Falling is not failing, failing is refusing to rise). We are here for you.',
        recommendation: 'We highly recommend looking through the Financial Recovery training programs or booking a free session with Counsellor James Banda at +265 888 123 456.',
      };
    } else {
      assistance = {
        message: 'Mwachita bwino kwambiri! You successfully resisted the urge! This is a massive victory for your wallet and future.',
        recommendation: 'Go check your Recovery Wallet to see how much money you have saved from this single decision.',
      };
    }

    return res.status(201).json({
      message: 'Urge logged successfully',
      log,
      assistance,
    });
  } catch (error) {
    console.error('Error logging urge:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUrgeExercises = async (req, res) => {
  try {
    const exercises = [
      {
        id: 'delay_timer',
        title: '15-Minute Delay Rule',
        bilingual_title: 'Malamulo ochedwetsa a mphindi 15',
        description: 'When an urge hits, tell yourself: "I will not bet for the next 15 minutes." Set a timer. Cravings usually peak and decline within this window.',
        chichewa_description: 'Mukamva chilakolako, dziuzeni kuti: "Sindisewera juga kwa mphindi 15 zotsatira." Dikirani, nthawi zambiri chilakolako chimachepa nthawi imeneyi ikamatha.',
      },
      {
        id: 'distraction_activities',
        title: 'Healthy Distractions',
        bilingual_title: 'Zochita zododometsa zilakolako',
        activities: [
          'Listen to local Malawian music podcasts or traditional stories.',
          'Walk around your village, town, or trade center without taking your mobile phone/money.',
          'Engage in active sports (e.g., play football/netball with friends).',
          'Do quick pushups or garden work.',
        ],
        chichewa_activities: [
          'Mverani nyimbo kapena nthano zosiyanasiyana zapafupi.',
          'Yendani pang’ono m’mudzi kapena pamsika popanda kutenga foni kapena ndalama.',
          'Sewerani mpira ndi anzanu kapena chitapo kanthu pamasewera.',
          'Gwirani ntchito ya m’munda kapena masewera olimbitsa thupi.',
        ]
      },
      {
        id: 'urge_surfing',
        title: 'Urge Surfing',
        bilingual_title: 'Kukwera pamwamba pa funde la chilakolako',
        description: 'Imagine your urge is a wave in Lake Malawi. Instead of fighting it or letting it crush you, visualize yourself surfing on top of it. Breathe through it and watch it break safely on the shore.',
        chichewa_description: 'Yerekezerani kuti chilakolako chanu chili ngati funde la m’nyanja ya Malawi. M’malo molimbana nalo, dzionezeni mukuyandama pamwamba pake mpaka litasungunukira pamphepete mwa nyanja.',
      }
    ];

    return res.status(200).json(exercises);
  } catch (error) {
    console.error('Error fetching urge exercises:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getMotivationalMessage = async (req, res) => {
  try {
    const messages = [
      {
        english: 'Every bet you do not place is a step closer to sending your children to school and building a solid home.',
        chichewa: 'Juga iliyonse yomwe simusewera ikukupatsani mwayi wotumiza ana anu kusukulu komanso kumanga nyumba yabwino.',
      },
      {
        english: 'The house always wins because of math, not luck. Keep your hard-earned money in your pockets.',
        chichewa: 'Makampani a juga amapindula chifukwa cha masamu, osati mwayi. Sungani ndalama zanu zomwe mwasowera thukuta.',
      },
      {
        english: 'Your family needs your presence and support more than they need a temporary ticket that brings debt.',
        chichewa: 'Banja lanu likusowa kupezeka kwanu ndi thandizo lanu kuposa thikiti ya kanthawi yomwe imabweretsa ngongole.',
      },
      {
        english: 'Wealth is built slowly through trade, farming, and skills. Betting is a false shortcut.',
        chichewa: 'Chuma chimamangika pang’onopang’ono kudzera muzamalonda, ulimi, ndi luso. Juga ndi njira yabodza yachidule.',
      },
      {
        english: 'Be strong today. True freedom is controlling your desires and choosing peace over anxiety.',
        chichewa: 'Khalani wamphamvu lero. Ufulu weniweni ndiko kulamulira zilakolako zanu ndikusankha mtendere m’malo mwa nkhawa.',
      }
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    const motivational = messages[randomIndex];

    return res.status(200).json(motivational);
  } catch (error) {
    console.error('Error fetching motivational message:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
