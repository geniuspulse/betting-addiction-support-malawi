const EmergencyTrigger = require('../models/EmergencyTrigger');

exports.getEmergencyContacts = async (req, res) => {
  try {
    const contacts = [
      {
        name: 'St. John of God Mental Health Services',
        location: 'Mzuzu & Lilongwe',
        phone: '+265 1 311 155',
        description: 'Professional psychiatric, clinical mental health, and rehabilitation counseling services in Malawi.',
        bilingual_note: 'Akatswiri azachipatala okhudza misala ndi chithandizo chovutika maganizo.',
      },
      {
        name: 'Youth Net and Counselling (YONECO)',
        location: 'Zomba (National)',
        tollFreePhone: '116 (Child Helpline) or 5600 (Youth Helpline)',
        phone: '+265 1 525 600',
        description: 'Toll-free national crisis help lines available for counseling and social support.',
        bilingual_note: 'Foni yaulere yolandirirapo thandizo kapena ufulu wanu mwachangu.',
      },
      {
        name: 'Lilongwe Central Hospital Psychiatric Unit',
        location: 'Lilongwe',
        phone: '+265 1 751 111',
        description: 'Government psychiatric ward providing emergency intervention and medication support.',
      },
      {
        name: 'Zomba Mental Hospital',
        location: 'Zomba',
        phone: '+265 1 524 233',
        description: 'The primary national psychiatric hospital in Malawi offering comprehensive residential and outpatient rehabilitation.',
      },
      {
        name: 'BASM Peer Support Specialist (Counsellor James Banda)',
        location: 'Blantyre / Online',
        phone: '+265 888 123 456',
        description: 'Direct support line for gambling and betting addiction advice.',
        bilingual_note: 'Mlangizi wamkulu wothandizira anthu osokonezeka ndi juga.',
      },
    ];

    return res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching crisis contacts:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getEmergencyExercises = async (req, res) => {
  try {
    const exercises = [
      {
        name: '4-7-8 Breathing Technique',
        chichewa_name: 'Mayendedwe amapupulidwe a 4-7-8',
        instructions: [
          'Inhale quietly through your nose for 4 seconds.',
          'Hold your breath for 7 seconds.',
          'Exhale completely through your mouth, making a whoosh sound, for 8 seconds.',
          'Repeat this cycle 4 times to calm your autonomic nervous system and reduce betting cravings.'
        ],
        chichewa_instructions: [
          'Kokani mpweya pang’onopang’ono mumphuno kwa masekondi 4.',
          'Gwirani mpweyawo kwa masekondi 7.',
          'Thirani mpweya wonse pakamwa kwa masekondi 8.',
          'Bwerezani kasanu ndi kamodzi kuti mtima wanu ukhale pansi.'
        ]
      },
      {
        name: '5-4-3-2-1 Sensory Grounding Method',
        chichewa_name: 'Njira yozindikira zinthu 5-4-3-2-1',
        instructions: [
          'Look around and acknowledge 5 things you can see (e.g., a chair, a tree).',
          'Acknowledge 4 things you can touch around you (e.g., your clothes, table surface).',
          'Acknowledge 3 things you can hear (e.g., traffic, birds, wind).',
          'Acknowledge 2 things you can smell.',
          'Acknowledge 1 thing you can taste.',
          'This forces your brain to detach from internal gambling thoughts and refocus on reality.'
        ],
        chichewa_instructions: [
          'Yang’anani zinthu 5 zomwe mutha kuziona pafupi nanu.',
          'Gwirani zinthu 4 zomwe mutha kuzimva.',
          'Mverani phokoso la zinthu 3 zomwe zikuchitika pafupi nanu.',
          'Nunkhizani zinthu 2 zomwe zili pafupi.',
          'Laizani chinthu chimodzi pakamwa panu.',
          'Izi zimathandiza ubongo wanu kuiwala za juga nthawi yomweyo.'
        ]
      },
      {
        name: 'Cold Water Reset',
        chichewa_name: 'Kutsitsimutsa thupi ndi Madzi Ozizira',
        instructions: [
          'Splash ice-cold water onto your face, or hold an ice cube in your hands.',
          'Focus completely on the freezing sensation.',
          'The mammalian dive reflex will slow down your heart rate and break obsessive betting loops immediately.'
        ],
        chichewa_instructions: [
          'Sambani kumaso kwanu ndi madzi ozizira kwambiri kapena gwirani madzi oundana mmanja mwanu.',
          'Mverani kuzizira kwakeko mwachidwi chanu chonse.',
          'Izi zimathandiza kuchepetsa kuthamanga kwa magazi komanso kuiwalitsa zilakolako za juga.'
        ]
      }
    ];

    return res.status(200).json(exercises);
  } catch (error) {
    console.error('Error fetching crisis exercises:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.triggerEmergency = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : '11111111-1111-1111-1111-111111111111';

    const trigger = await EmergencyTrigger.create({
      userId,
      triggeredAt: new Date(),
    });

    return res.status(201).json({
      message: 'SOS mode activated! Chonde gwerani pansi, muli otetezeka pano.',
      trigger,
      escalation: {
        warning: 'URGENT: Do not make any payment or bet. Take a deep breath.',
        action: 'Please call National Helpline (116) or text counselor James Banda (+265 888 123 456) immediately.',
        exerciseRecommendation: 'We suggest starting the 5-4-3-2-1 Grounding exercise or splashing cold water on your face.'
      }
    });
  } catch (error) {
    console.error('Error triggering emergency:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
