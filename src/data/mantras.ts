import { MantraItem } from '../types';

export const MANTRAS_DATA: MantraItem[] = [
  {
    id: 'soaham',
    name: 'सोऽहं महामंत्र (Soaham Breath Mantra)',
    sanskrit: '॥ सोऽहं ॥',
    transliteration: 'So-Aham (Inhale "So", Exhale "Ham")',
    meaning: '"तो ईश्वर मीच आहे" — प्रत्येक श्वासाचा नैसर्गिक अजपा जप. श्वास घेताना "सो" (ब्रह्मांड) आणि सोडताना "हं" (अहंकार विसर्जन).',
    significance: 'ईशोपनिषद आणि योगशास्त्रातील सर्वोच्च महामंत्र जो मानवाला त्याच्या दिव्य स्वरूपाची जाणीव करून देतो.',
    recommendedRepetitions: 108,
    benefits: [
      'ताणतणाव आणि चिंता त्वरित नष्ट करते',
      'श्वासोच्छ्वास संथ आणि खोल होतो',
      'आत्मसाक्षात्काराची अनुभूती देते',
      'उच्च रक्तदाब नियंत्रित करण्यास मदत करते'
    ],
    frequencyHz: 136.1 // Cosmic Om / Earth Year frequency
  },
  {
    id: 'mahamrityunjaya',
    name: 'महामृत्युंजय मंत्र (Maha Mrityunjaya)',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात् ॥',
    transliteration: 'Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam | Urvarukamiva Bandhanan Mrityor Mukshiya Maamritat ||',
    meaning: 'आम्ही त्रिनेत्रधारी भगवान शिवांची उपासना करतो, जे सुगंधित आहेत आणि विश्वाचे पोषण करतात. जसे पिकलेली काकडी वेलीपासून सहज गळून पडते, तसेच आम्हाला मृत्यू आणि अज्ञानाच्या बंधनातून मोक्ष आणि अमरत्वाकडे घेऊन चला.',
    significance: 'ऋग्वेद आणि यजुर्वेदातील अत्यंत प्रभावशाली संजीवनी महामंत्र.',
    recommendedRepetitions: 108,
    benefits: [
      'अकाल मृत्यूचे भय आणि भीती नष्ट होते',
      'शारीरिक व्याधी आणि नकारात्मक ऊर्जा दूर होते',
      'मानसिक स्थैर्य आणि आरोग्य वृद्धिंगत होते'
    ],
    frequencyHz: 432
  },
  {
    id: 'gayatri',
    name: 'गायत्री महामंत्र (Gayatri Mantra)',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
    transliteration: 'Om Bhur Bhuvah Swah Tat Savitur Varenyam Bhargo Devasya Dheemahi Dhiyo Yo Nah Prachodayat ||',
    meaning: 'भूलोक, अंतरिक्ष आणि स्वर्गलोकात व्याप्त असणाऱ्या त्या प्रकाशमान सूर्यदेवतेच्या तेजाचे आम्ही ध्यान करतो. ते परमात्मा आमची बुद्धी सन्मार्गाकडे प्रेरित करोत.',
    significance: 'सर्व वेदांचे सार असणारा बुद्धी आणि तेज जागृत करणारा मंत्र.',
    recommendedRepetitions: 24,
    benefits: [
      'स्मरणशक्ती, बुद्धी आणि एकाग्रता तीक्ष्ण होते',
      'मनातील नकारात्मक विचार आणि आळस दूर होतो',
      'चेहऱ्यावर सात्त्विक तेज निर्माण होते'
    ],
    frequencyHz: 528
  },
  {
    id: 'om-namah-shivaya',
    name: 'पंचाक्षरी शिव मंत्र (Om Namah Shivaya)',
    sanskrit: '॥ ॐ नमः शिवाय ॥',
    transliteration: 'Om Namah Shivaya',
    meaning: 'मी त्या परमसत्य, मंगलकारी भगवान शिवांना शरण जातो. (न-पृथ्वी, म-जल, शि-अग्नि, वा-वायू, य-आकाश — पंचतत्त्वांचे संतुलन).',
    significance: 'मानवी शरीरातील पाचही तत्त्वांना संतुलित करणारा सार्वकालिक शांती मंत्र.',
    recommendedRepetitions: 108,
    benefits: [
      'सर्व चक्रांचे संतुलन होते',
      'क्रोध आणि चंचल मनावर नियंत्रण मिळते',
      'आत्मविश्वास आणि आंतरिक शांती लाभते'
    ],
    frequencyHz: 432
  },
  {
    id: 'shanti-mantra',
    name: 'शांती मंत्र (Universal Peace Mantra)',
    sanskrit: 'ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद् दुःखभाग्भवेत् । ॐ शान्तिः शान्तिः शान्तिः ॥',
    transliteration: 'Om Sarve Bhavantu Sukhinah Sarve Santu Niramayah | Sarve Bhadrani Pashyantu Ma Kashchid Duhkha-Bhag-Bhavet | Om Shantih Shantih Shantih ||',
    meaning: 'सर्व जीव सुखी होवोत, सर्व निरोगी होवोत, सर्वांचे कल्याण होवो, आणि कोणाच्याही वाट्याला दुःख येऊ नये. विश्वात सर्वत्र शांती नांदो.',
    significance: 'उपनिषदांचा विश्वकल्याणाचा आणि बंधुभावाचा संदेश.',
    recommendedRepetitions: 11,
    benefits: [
      'विश्वबंधुत्वाची भावना निर्माण होते',
      'वातावरणातील क्लेश आणि तणाव शांत होतो',
      'हृदयातील करुणा आणि प्रेमाचा विस्तार होतो'
    ],
    frequencyHz: 432
  }
];
