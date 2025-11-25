import { createContext, useContext, useState, type ReactNode } from 'react';

export type Language = 'en' | 'ur' | 'ps' | 'pa' | 'sd';

interface Translations {
    appTitle: string;
    heading: string;
    subheading: string;
    placeholder: string;
    submitButton: string;
    loadingButton: string;
    disclaimer: string;
    emergency: string;
    emergencyDesc: string;
    opd: string;
    opdDesc: string;
    homeCare: string;
    homeCareDesc: string;
    checkAnother: string;
}

const translations: Record<Language, Translations> = {
    en: {
        appTitle: 'Symptom Check',
        heading: 'How are you feeling today?',
        subheading: 'Please describe your health concerns below.',
        placeholder: 'e.g., fever, headache, and a sore throat for 3 days',
        submitButton: 'Check Symptoms',
        loadingButton: 'Analyzing...',
        disclaimer: 'This is general guidance, not a medical diagnosis.',
        emergency: 'Emergency',
        emergencyDesc: 'These symptoms may need urgent medical attention.',
        opd: 'OPD',
        opdDesc: 'These symptoms are not urgent. You can visit a doctor or hospital at your convenience, perhaps in the morning.',
        homeCare: 'Home Care',
        homeCareDesc: 'These symptoms can likely be managed at home with rest and care.',
        checkAnother: 'Check another symptom',
    },
    ur: {
        appTitle: 'علامات چیکر',
        heading: 'آج آپ کیسا محسوس کر رہے ہیں؟',
        subheading: 'براہ کرم ذیل میں اپنی صحت کے خدشات بیان کریں۔',
        placeholder: 'مثال کے طور پر، 3 دن سے بخار، سر درد، اور گلے میں خراش',
        submitButton: 'علامات جمع کروائیں',
        loadingButton: 'تجزیہ ہو رہا ہے...',
        disclaimer: 'یہ عمومی رہنمائی ہے، طبی تشخیص نہیں۔',
        emergency: 'ایمرجنسی',
        emergencyDesc: 'ان علامات کو فوری طبی توجہ کی ضرورت ہو سکتی ہے۔',
        opd: 'او پی ڈی',
        opdDesc: 'یہ علامات فوری نوعیت کی نہیں ہیں۔ آپ اپنی سہولت کے مطابق، شاید صبح کے وقت، ڈاکٹر یا ہسپتال جا سکتے ہیں۔',
        homeCare: 'گھریلو نگہداشت',
        homeCareDesc: 'ان علامات کو آرام اور دیکھ بھال سے گھر پر سنبھالا جا سکتا ہے۔',
        checkAnother: 'دوسری علامات چیک کریں',
    },
    ps: {
        appTitle: 'نښې چیکر',
        heading: 'نن تاسو څنګه احساس کوئ؟',
        subheading: 'مهرباني وکړئ لاندې خپلې روغتیايي اندیښنې بیان کړئ.',
        placeholder: 'د بیلګې په توګه، 3 ورځې تبه، سر درد، او ستوني درد',
        submitButton: 'نښې وسپارئ',
        loadingButton: 'تحلیل کیږي...',
        disclaimer: 'دا عمومي لارښوونه ده، طبي تشخیص نه ده.',
        emergency: 'بیړنی',
        emergencyDesc: 'دا نښې ممکن فوري طبي پاملرنې ته اړتیا ولري.',
        opd: 'او پي ډي',
        opdDesc: 'دا نښې فوري نه دي. تاسو کولی شئ په خپله اسانتیا سره، شاید سهار، ډاکټر یا روغتون ته لاړ شئ.',
        homeCare: 'کورنۍ پاملرنه',
        homeCareDesc: 'دا نښې احتمالاً په کور کې د آرام او پاملرنې سره اداره کیدی شي.',
        checkAnother: 'بلې نښې وګورئ',
    },
    pa: {
        appTitle: 'ਲੱਛਣ ਚੈਕਰ',
        heading: 'ਅੱਜ ਤੁਸੀਂ ਕਿਵੇਂ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ?',
        subheading: 'ਕਿਰਪਾ ਕਰਕੇ ਹੇਠਾਂ ਆਪਣੀਆਂ ਸਿਹਤ ਚਿੰਤਾਵਾਂ ਦੱਸੋ।',
        placeholder: 'ਉਦਾਹਰਨ ਲਈ, 3 ਦਿਨਾਂ ਤੋਂ ਬੁਖਾਰ, ਸਿਰ ਦਰਦ, ਅਤੇ ਗਲੇ ਵਿੱਚ ਖਰਾਸ਼',
        submitButton: 'ਲੱਛਣ ਜਮ੍ਹਾਂ ਕਰੋ',
        loadingButton: 'ਵਿਸ਼ਲੇਸ਼ਣ ਹੋ ਰਿਹਾ ਹੈ...',
        disclaimer: 'ਇਹ ਆਮ ਮਾਰਗਦਰਸ਼ਨ ਹੈ, ਡਾਕਟਰੀ ਤਸ਼ਖੀਸ਼ ਨਹੀਂ।',
        emergency: 'ਐਮਰਜੈਂਸੀ',
        emergencyDesc: 'ਇਹਨਾਂ ਲੱਛਣਾਂ ਨੂੰ ਤੁਰੰਤ ਡਾਕਟਰੀ ਧਿਆਨ ਦੀ ਲੋੜ ਹੋ ਸਕਦੀ ਹੈ।',
        opd: 'ਓ ਪੀ ਡੀ',
        opdDesc: 'ਇਹ ਲੱਛਣ ਤੁਰੰਤ ਨਹੀਂ ਹਨ। ਤੁਸੀਂ ਆਪਣੀ ਸਹੂਲਤ ਅਨੁਸਾਰ, ਸ਼ਾਇਦ ਸਵੇਰੇ, ਡਾਕਟਰ ਜਾਂ ਹਸਪਤਾਲ ਜਾ ਸਕਦੇ ਹੋ।',
        homeCare: 'ਘਰੇਲੂ ਦੇਖਭਾਲ',
        homeCareDesc: 'ਇਹਨਾਂ ਲੱਛਣਾਂ ਨੂੰ ਸੰਭਾਵਤ ਤੌਰ ਤੇ ਆਰਾਮ ਅਤੇ ਦੇਖਭਾਲ ਨਾਲ ਘਰ ਵਿੱਚ ਸੰਭਾਲਿਆ ਜਾ ਸਕਦਾ ਹੈ।',
        checkAnother: 'ਹੋਰ ਲੱਛਣ ਚੈੱਕ ਕਰੋ',
    },
    sd: {
        appTitle: 'علامت چيڪر',
        heading: 'اڄ توهان ڪيئن محسوس ڪري رهيا آهيو؟',
        subheading: 'مهرباني ڪري هيٺ پنهنجي صحت جي پريشانين بيان ڪريو.',
        placeholder: 'مثال طور، 3 ڏينهن کان بخار، مٿي ۾ درد، ۽ ڳلي ۾ خراش',
        submitButton: 'علامتون جمع ڪرايو',
        loadingButton: 'تجزيو ٿي رهيو آهي...',
        disclaimer: 'هي عام رهنمائي آهي، طبي تشخيص نه آهي.',
        emergency: 'ايمرجنسي',
        emergencyDesc: 'انهن علامتن کي فوري طبي توجه جي ضرورت هجي سگهي ٿي.',
        opd: 'او پي ڊي',
        opdDesc: 'اهي علامتون فوري نه آهن. توهان پنهنجي سهولت مطابق، شايد صبح جو، ڊاڪٽر يا اسپتال وڃي سگهو ٿا.',
        homeCare: 'گهريلو سنڀال',
        homeCareDesc: 'انهن علامتن کي ممڪن طور تي آرام ۽ سنڀال سان گهر ۾ سنڀاليو وڃي سگهي ٿو.',
        checkAnother: 'ٻيون علامتون چيڪ ڪريو',
    },
};

const languageNames: Record<Language, string> = {
    en: 'English',
    ur: 'اردو',
    ps: 'پښتو',
    pa: 'ਪੰਜਾਬੀ',
    sd: 'سنڌي',
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
    languageNames: Record<Language, string>;
    isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const isRTL = language !== 'en' && language !== 'pa';

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t: translations[language],
                languageNames,
                isRTL,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

