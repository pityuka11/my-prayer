const fs = require('fs');
const path = require('path');

// Read the English file
const enContent = JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));

// Translation mappings for each language
const translations = {
  hu: {
    "site": {
      "title": "Imádkozzunk!",
      "description": "Imaközösségi weboldal"
    },
    "navigation": {
      "home": "Főoldal",
      "prayerRequests": "Imakérések",
      "biblicalMessages": "Bibliai üzenetek",
      "community": "Közösség"
    },
    "hero": {
      "quote": "Imádkozzunk együtt és egyesítsük szívünket a hitben.\nHívj meg embereket a világ minden tájáról, hogy csatlakozzanak imádkozásodhoz.",
      "source": ""
    },
    "prayerRequests": {
      "title": "Imakérések",
      "pageDescription": "Oszd meg imakéréseidet támogató közösségünkkel. Küldd el imaszükségleteidet és csatlakozz másokhoz imádkozásban. Találj vigaszt, támogatást és lelki útmutatást imaközösségünkön keresztül.",
      "submitRequest": "Imakérés beküldése",
      "yourRequest": "Az Ön imakérése",
      "requestPlaceholder": "Ossza meg imakérését...",
      "cancel": "Mégse",
      "submitButton": "Imakérés küldése",
      "submitting": "Küldés...",
      "communityRequests": "Közösségi imakérések",
      "prayedFor": "Köszönjük az imádkozást! 🙏",
      "prayForThis": "Imádkozz érte",
      "category": "Kategória",
      "selectCategory": "Válasszon kategóriát...",
      "prayerGoals": "Imacélok (opcionális)",
      "communityPrayers": "Közösségi imák",
      "noPrayersYet": "Még nem osztottak meg imákat.",
      "beFirst": "Legyen Ön az első, aki megoszt egy imakérést!",
      "prayerCount": "Imádság",
      "of": "a",
      "displayName": "Megjelenített név (opcionális)",
      "displayNamePlaceholder": "pl. Egy imakaton",
      "pause": "Szünet",
      "play": "Lejátszás",
      "howItWorks": "Hogyan működik",
      "step1": "Küldje el kérését",
      "step1Desc": "Ossza meg imaszükségleteit közösségünkkel",
      "step2": "A közösség imádkozik",
      "step2Desc": "Közösségünk imádkozni fog az Ön szükségleteiért",
      "step3": "Támogatás keresése",
      "step3Desc": "Tapasztalja meg a vigaszt és lelki támogatást",
      "joinCommunity": "Csatlakozzon imaközösségünkhöz",
      "communityDesc": "Legyen részese egy támogató közösségnek, ahol a hit, remény és ima egyesül. Ossza meg útját és támogassa másokat az övékben.",
      "feature1": "Névtelen és biztonságos",
      "feature2": "24/7 támogatás",
      "feature3": "Globális közösség",
      "items": [
        {
          "text": "Az egészségemért",
          "button": "Imakérés"
        },
        {
          "text": "Munkakeresésért",
          "button": "Imakérés"
        },
        {
          "text": "A családomért",
          "button": "Imakérés"
        },
        {
          "text": "Békéért",
          "button": "Imakérés"
        },
        {
          "text": "Bölcsességért",
          "button": "Imakérés"
        },
        {
          "text": "Útmutatásért",
          "button": "Imakérés"
        }
      ]
    },
    "biblicalMessages": {
      "title": "Bibliai üzenetek",
      "quote": "Mert úgy szerette Isten a világot, hogy egyszülött Fiát adta, hogy aki hisz őbenne, el ne vesszen, hanem örök élete legyen.",
      "source": "János 3:16",
      "quote2": "Bízzál az Úrban teljes szíveddel, és ne támaszkodj a magad értelmeire. Minden útaidban gondold meg őt, és ő egyenesítgeti ösvényeidet.",
      "source2": "Példabeszédek 3:5-6",
      "quote3": "És tudjuk, hogy mindenben együttműködik Isten azok javára, akik szeretik őt, azok javára, akik az ő rendelése szerint elhívatottak.",
      "source3": "Rómaiak 8:28",
      "quote4": "Mindeneket megtehetek a bennem erősítő Krisztus által.",
      "source4": "Filippiek 4:13",
      "quote5": "Minden gondotokat vessétek rá, mert ő gondotok viselője.",
      "source5": "1. Péter 5:7",
      "inspirationTitle": "Napi inspiráció",
      "inspirationText": "Hadd vezessék ezek az időtlen szavak napi járásodat Istennel. Minden vers hordozza az erejét, hogy átalakítsa a nézetedet és megerősítse a hitedet.",
      "reflection1": "Ezek a szavak emlékeztetnek minket Isten szeretetére és arra hívnak, hogy napi szinten bízzunk benne.",
      "reflection2": "Ez a vers arra bátorít minket, hogy Isten bölcsességére támaszkodjunk a saját megértésünk helyett.",
      "reflection3": "Egy erős emlékeztető, hogy Isten mindent együttműködik a javunkra.",
      "reflection4": "Krisztus által megvan az erőnk, hogy legyőzzük bármilyen kihívást.",
      "reflection5": "Megtalálhatjuk a békét azáltal, hogy Istennek adjuk át aggodalmainkat, aki mélyen törődik velünk."
    },
    "community": {
      "title": "Közösség",
      "pageDescription": "Csatlakozzon támogató imaközösségünkhöz, ahol a hit, remény és ima egyesül. Kapcsolódjon másokhoz, növekedjen a hitben és találjon lelki közösséget.",
      "prayerCircles": "Imakörök",
      "events": "Események",
      "discussions": "Beszélgetések",
      "circlesDescription": "Csatlakozzon kis csoportokhoz, amelyek online találkoznak hetente imádkozni.",
      "eventsDescription": "Lássa a közelgő összejöveteleket, visszavonulásokat és virtuális imaestéket.",
      "discussionsDescription": "Vegyen részt értelmes beszélgetésekben a hitről, imáról és lelki fejlődésről.",
      "joinCircle": "Csatlakozás egy körhöz",
      "viewEvents": "Események megtekintése",
      "joinDiscussion": "Csatlakozás beszélgetéshez",
      "communityStats": "Közösségünk",
      "activeMembers": "Aktív tagok",
      "languages": "Nyelvek",
      "newsletterTitle": "Maradjon kapcsolatban",
      "newsletterDescription": "Kapjon frissítéseket közösségi eseményekről, imakörökről és lelki forrásokról.",
      "newsletterPlaceholder": "Adja meg email címét",
      "newsletterButton": "Feliratkozás",
      "communityGuidelines": "Közösségi irányelvek",
      "guideline1": "Tisztelje az összes tagot háttér vagy hit szerint",
      "guideline2": "Tartsa a beszélgetéseket a hitre, imára és lelki fejlődésre fókuszáltan",
      "guideline3": "Tartsa meg a megosztott imakérések bizalmas jellegét",
      "guideline4": "Bátorítsa és támogassa egymást a hitben",
      "guideline5": "Ossza meg a közösségnek hasznos forrásokat és betekintéseket",
      "guideline6": "Jelentse bármilyen nem megfelelő viselkedést a moderátoroknak",
      "donateTitle": "Támogassa munkánkat",
      "newsletter": {
        "placeholder": "Iratkozzon fel hírlevelünkre",
        "button": "Feliratkozás"
      }
    },
    "discussions": {
      "title": "Közösségi beszélgetések",
      "pageDescription": "Vegyen részt értelmes beszélgetésekben a hitről, imáról és lelki fejlődésről. Kapcsolódjon másokhoz, akik osztják az Ön útját.",
      "communityChat": "Közösségi chat",
      "welcomeMessage": "Üdvözöljük",
      "activeGroup": "Aktív csoport",
      "noGroup": "Nincs csoport",
      "discussionGroups": "Beszélgetőcsoportok",
      "noMessages": "Még nincsenek üzenetek. Legyen Ön az első, aki köszön!",
      "typeMessage": "Gépelje be üzenetét...",
      "sending": "Küldés...",
      "send": "Küldés",
      "sendMessageError": "Az üzenet küldése sikertelen.",
      "enterName": "Adja meg nevét",
      "yourName": "Az Ön neve",
      "joinChat": "Csatlakozás chathoz"
    },
    "faq": {
      "title": "Gyakran ismételt kérdések",
      "description": "Találjon válaszokat gyakori kérdésekre imaközösségünkről és arról, hogyan élheti ki lelki útját velünk.",
      "faq1Question": "Hogyan küldhetek be imakérést?",
      "faq1Answer": "Egyszerűen kattintson az \"Imakérés beküldése\" gombra és töltse ki az űrlapot imaszükségleteivel. Választhat, hogy névtelen marad vagy megosztja a nevét. Kérését megosztjuk közösségünkkel imatámogatásért.",
      "faq2Question": "Biztonságban van-e a személyes adataim?",
      "faq2Answer": "Igen, tiszteletben tartjuk az Ön magánéletét. Névtelenül küldhet be imakéréseket, és soha nem osztjuk meg személyes kapcsolattartási információkat. Csak az imatartalom, amit megosztani választ, lesz látható a közösség számára.",
      "faq3Question": "Milyen gyakran kellene imádkoznom másokért?",
      "faq3Answer": "Nincs meghatározott követelmény, de naponta bátorítjuk a közösségi tagokért való imádkozást. Annyiszor imádkozhat, ahányszor úgy érzi, hogy hívják rá. Minden ima különbséget tesz valaki életében.",
      "faq4Question": "Csatlakozhatok beszélgetőcsoportokhoz?",
      "faq4Answer": "Természetesen! Beszélgetőcsoportjaink minden tag számára nyitottak. Csatlakozhat különböző témájú csoportokhoz, mint biblia tanulmányozás, családi hit, fiatal felnőttek és még sok más. Egyszerűen látogassa meg a Beszélgetések oldalt a kezdéshez.",
      "faq5Question": "Milyen nyelveket támogat a platform?",
      "faq5Answer": "Platformunk 12 nyelvet támogat, beleértve az angolt, spanyolt, franciát, németet, olaszt, portugált, oroszt, japánt, koreait, kínait, románt és magyart. Bármikor váltani lehet a nyelvek között.",
      "faq6Question": "Hogyan vehetek részt a közösségben?",
      "faq6Answer": "Sok módon lehet részt venni: imakérések beküldése, másokért imádkozás, beszélgetőcsoportokhoz csatlakozás, bibliai üzenetek megosztása és közösségi eseményekben való részvétel. Minden interakció segít építeni hitközösségünket.",
      "contactTitle": "Még mindig vannak kérdései?",
      "contactDescription": "Itt vagyunk, hogy segítsünk! Lépjen velünk kapcsolatba, ha bármilyen kérdése van vagy támogatásra van szüksége.",
      "contactButton": "Kapcsolat"
    },
    "footer": {
      "contact": "Kapcsolat",
      "email": "contact@myprayer.online",
      "newsletterTitle": "Maradjon kapcsolatban",
      "newsletterDescription": "Iratkozzon fel hírlevelünkre imafrissítésekért és lelki útmutatásért.",
      "newsletterPlaceholder": "Adja meg email címét",
      "subscribe": "Feliratkozás",
      "newsletterSuccess": "Köszönjük a feliratkozást!",
      "about": "Rólunk",
      "privacy": "Adatvédelmi szabályzat",
      "terms": "Szolgáltatási feltételek"
    },
    "about": {
      "title": "Rólunk",
      "missionTitle": "Küldetésünk",
      "missionText": "Imaközösségünk elkötelezett az emberek összehozatala mellett a hit, remény és ima által. Úgy hisszük, hogy az imának megvan az ereje, hogy összekapcsolja a szíveket a világban és vigaszt, támogatást és lelki útmutatást nyújtson azoknak, akiknek a leginkább szükségük van rá.",
      "missionText2": "Platformunk biztonságos térként szolgál, ahol az egyének megoszthatják imakéréseiket, értelmes beszélgetésekben vehetnek részt a hitről, és kapcsolódhatnak egy támogató közösséghez, amely megérti az ima erejét.",
      "valuesTitle": "Értékeink",
      "value1": "Hit: Hiszünk a hit erejében az életek átalakítására",
      "value2": "Közösség: Támogató és befogadó környezetet teremtünk",
      "value3": "Ima: Az imát erős eszköznek ismerjük el a gyógyulás és kapcsolat terén",
      "value4": "Tisztelet: Minden hitet és hátteret tiszteletben tartunk",
      "value5": "Magánélet: Védjük közösségi tagjaink bizalmas jellegét",
      "contactTitle": "Kapcsolat",
      "contactText": "Szeretnénk hallani Öntől! Legyen szó kérdésekről, javaslatokról vagy támogatásról, csapatunk itt van, hogy segítsen.",
      "emailLabel": "Email:",
      "responseTime": "Válaszidő:",
      "responseTimeValue": "Általában 24-48 órán belül válaszolunk",
      "imprintTitle": "Impresszum",
      "operator": "Weboldal üzemeltetője:",
      "email": "Email:",
      "website": "Weboldal:",
      "imprintNote": "Ezt a weboldalt az Imaközösség üzemelteti. Bármilyen jogi kérdés vagy aggodalom esetén kérjük, lépjen velünk kapcsolatba a fenti email címen."
    },
    "privacy": {
      "title": "Adatvédelmi szabályzat",
      "lastUpdated": "Utolsó frissítés: 2025. október 23.",
      "introductionTitle": "Bevezetés",
      "introductionText": "Imaközösségünk (\"mi\", \"miénk\" vagy \"mi\") elkötelezett az Ön magánéletének védelme mellett. Ez az Adatvédelmi szabályzat elmagyarázza, hogyan gyűjtjük, használjuk, tárjuk fel és védjük az Ön információit, amikor meglátogatja weboldalunkat és használja szolgáltatásainkat.",
      "informationTitle": "Összegyűjtött információk",
      "personalInfoTitle": "Személyes információk",
      "personalInfo1": "Email címek (hírlevél feliratkozáshoz)",
      "personalInfo2": "Nevek (amikor Ön választja meg őket)",
      "personalInfo3": "Imakérések és üzenetek (amikor Ön választja meg őket)",
      "technicalInfoTitle": "Technikai információk",
      "technicalInfo1": "IP címek és böngésző információk",
      "technicalInfo2": "Sütik és hasonló követési technológiák",
      "technicalInfo3": "Használati adatok és elemzések",
      "cookiesTitle": "Sütik és követés",
      "cookiesText": "Sütiket és hasonló technológiákat használunk a weboldalunkon való élmény javítására. Ezek a technológiák segítenek nekünk:",
      "cookiesUse1": "Emlékezni az Ön beállításaira és preferenciáira",
      "cookiesUse2": "Weboldal forgalom és használati minták elemzése",
      "cookiesUse3": "Személyre szabott tartalom és hirdetések biztosítása",
      "cookiesUse4": "Szolgáltatásaink és felhasználói élmény javítása",
      "cookiesNote": "A süti beállításokat böngésző preferenciáin keresztül szabályozhatja. A sütik letiltása azonban befolyásolhatja weboldalunk funkcionalitását.",
      "useTitle": "Hogyan használjuk az Ön információit",
      "use1": "Imaközösségi szolgáltatásaink biztosítása és karbantartása",
      "use2": "Hírlevelek és frissítések küldése (az Ön beleegyezésével)",
      "use3": "Weboldalunk és szolgáltatásaink javítása",
      "use4": "Használati minták és trendek elemzése",
      "use5": "Platformunk biztonságának és integritásának biztosítása",
      "use6": "Jogi kötelezettségek teljesítése",
      "sharingTitle": "Információ megosztás",
      "sharingText": "Nem adjuk el, kereskedünk vagy más módon adjuk át személyes információit harmadik feleknek az Ön beleegyezése nélkül, kivéve a következő körülményeket:",
      "sharing1": "Szolgáltatókkal, akik segítenek weboldalunk működtetésében",
      "sharing2": "Törvényi kötelezettség vagy jogaink védelme esetén",
      "sharing3": "Üzleti átruházás vagy felvásárlás kapcsán",
      "sharing4": "Az Ön kifejezett beleegyezésével",
      "securityTitle": "Adatbiztonság",
      "securityText": "Megfelelő technikai és szervezési intézkedéseket alkalmazunk személyes információi jogosulatlan hozzáférés, módosítás, nyilvánosságra hozatal vagy megsemmisítés elleni védelmére. Azonban az interneten keresztüli átvitel egyik módja sem 100%-ban biztonságos.",
      "rightsTitle": "Az Ön jogai",
      "rightsText": "Joga van:",
      "rights1": "Hozzáférni személyes információihoz",
      "rights2": "Pontatlan információk javítására",
      "rights3": "Személyes információi törlésére",
      "rights4": "Adatfeldolgozásra vonatkozó beleegyezés visszavonására",
      "rights5": "Bizonyos feldolgozási típusok elleni tiltakozásra",
      "contactTitle": "Kapcsolat",
      "contactText": "Ha bármilyen kérdése van ezzel az Adatvédelmi szabályzattal vagy adatkezelési gyakorlatunkkal kapcsolatban, kérjük, lépjen velünk kapcsolatba:",
      "email": "Email:",
      "changesTitle": "Szabályzat módosításai",
      "changesText": "Időnként frissíthetjük ezt az Adatvédelmi szabályzatot. Értesítjük Önt minden változásról az új Adatvédelmi szabályzat közzétételével ezen az oldalon és a \"Utolsó frissítés\" dátumának frissítésével."
    },
    "terms": {
      "title": "Szolgáltatási feltételek",
      "lastUpdated": "Utolsó frissítés: 2025. október 23.",
      "acceptanceTitle": "Feltételek elfogadása",
      "acceptanceText": "Imaközösségünk (\"a Szolgáltatás\") elérésével és használatával elfogadja és egyetért, hogy kötelezettséget vállal ezen megállapodás feltételei és rendelkezései szerint. Ha nem ért egyet a fentiek betartásával, kérjük, ne használja ezt a szolgáltatást.",
      "descriptionTitle": "Szolgáltatás leírása",
      "descriptionText": "Imaközösségünk egy platform, amely imakérések, lelki beszélgetések és közösségi támogatás megkönnyítését szolgálja. Szolgáltatásaink közé tartozik:",
      "service1": "Imakérések beküldése és megosztása",
      "service2": "Közösségi beszélgető fórumok",
      "service3": "Hírlevél és lelki tartalom",
      "service4": "Többnyelvű támogatás",
      "userResponsibilitiesTitle": "Felhasználói felelősségek",
      "userResponsibilitiesText": "Szolgáltatásunk felhasználójaként egyetért:",
      "responsibility1": "Pontos és igaz információkat szolgáltatni",
      "responsibility2": "Más közösségi tagokat és hiteiket tiszteletben tartani",
      "responsibility3": "Nem káros, sértő vagy nem megfelelő tartalmat közzétenni",
      "responsibility4": "A megosztott imakérések bizalmas jellegét megőrizni",
      "responsibility5": "A szolgáltatást az alkalmazandó törvényeknek megfelelően használni",
      "prohibitedTitle": "Tiltott tevékenységek",
      "prohibitedText": "Szolgáltatásunkat nem használhatja:",
      "prohibited1": "Spam, hirdetések vagy promóciós tartalom közzétételére",
      "prohibited2": "Más felhasználók zaklatására, fenyegetésére vagy megfélemlítésére",
      "prohibited3": "Hamis vagy félrevezető információk megosztására",
      "prohibited4": "Bármilyen alkalmazandó törvény vagy rendelet megsértésére",
      "prohibited5": "Jogosulatlan hozzáférés megkísérlésére rendszerünkhöz",
      "prohibited6": "Kártevő vagy káros szoftver terjesztésére",
      "contentTitle": "Felhasználó által létrehozott tartalom",
      "contentText": "Megtartja a tulajdonjogot a platformunkon közzétett tartalom felett. A tartalom közzétételével azonban nem kizárólagos, jogdíjmentes licencet ad nekünk a tartalom használatára, megjelenítésére és terjesztésére szolgáltatásunkkal kapcsolatban.",
      "contentNote": "Fenntartjuk a jogot bármilyen tartalom eltávolítására, amely megsérti ezeket a feltételeket vagy nem megfelelőnek minősül közösségünk számára.",
      "privacyTitle": "Magánélet és adatvédelem",
      "privacyText": "Az Ön magánélete fontos számunkra. Kérjük, tekintse át Adatvédelmi szabályzatunkat, hogy megértse, hogyan gyűjtjük, használjuk és védjük személyes információit. Szolgáltatásunk használatával hozzájárul az információk gyűjtéséhez és használatához, ahogyan azt Adatvédelmi szabályzatunkban leírjuk.",
      "disclaimersTitle": "Jogi nyilatkozatok",
      "disclaimersText": "Szolgáltatásunkat \"ahogy van\" biztosítjuk, mindenféle garancia nélkül. Nem garantáljuk:",
      "disclaimer1": "A felhasználó által létrehozott tartalom pontosságát vagy teljességét",
      "disclaimer2": "Szolgáltatásunk elérhetőségét vagy megszakítás nélküli működését",
      "disclaimer3": "Az imák vagy lelki útmutatás hatékonyságát",
      "disclaimer4": "A személyes vagy lelki problémák megoldását",
      "limitationTitle": "Felelősség korlátozása",
      "limitationText": "A törvény által megengedett legnagyobb mértékben az Imaközösség nem felelős semmilyen közvetett, véletlen, különleges, következményes vagy büntető kárért, beleértve, de nem kizárólagosan a nyereség, adat vagy használat elvesztését, amely az Ön szolgáltatásunk használatából vagy azzal kapcsolatban ered.",
      "terminationTitle": "Megszüntetés",
      "terminationText": "Fenntartjuk a jogot szolgáltatásunkhoz való hozzáférés megszüntetésére vagy felfüggesztésére bármikor, értesítéssel vagy anélkül, bármilyen okból, beleértve ezen feltételek megsértését. Az Ön is megszüntetheti szolgáltatásunk használatát bármikor.",
      "changesTitle": "Feltételek módosítása",
      "changesText": "Fenntartjuk a jogot ezen feltételek módosítására bármikor. Értesítjük a felhasználókat minden lényeges változásról a frissített feltételek közzétételével weboldalunkon. A szolgáltatás további használata ezen változások után az új feltételek elfogadását jelenti.",
      "contactTitle": "Kapcsolattartási információk",
      "contactText": "Ha bármilyen kérdése van ezekkel a Szolgáltatási feltételekkel kapcsolatban, kérjük, lépjen velünk kapcsolatba:",
      "email": "Email:",
      "governingTitle": "Irányadó jog",
      "governingText": "Ezek a feltételek az alkalmazandó törvények szerint irányítandók és értelmezendők. Ezen feltételekből vagy szolgáltatásunk használatából eredő viták megfelelő jogi csatornákon keresztül oldódnak meg."
    },
    "pages": {
      "about": "Rólunk",
      "privacy": "Adatvédelmi szabályzat",
      "terms": "Szolgáltatási feltételek"
    },
    "auth": {
      "loginRequired": "Bejelentkezés szükséges",
      "loginRequiredMessage": "Kérjük, jelentkezzen be a beszélgetések eléréséhez és közösségünkhöz való kapcsolódáshoz.",
      "loginButton": "Bejelentkezés",
      "noAccount": "Nincs fiókja?",
      "registerLink": "Regisztráljon itt"
    }
  }
};

// Function to deep merge objects
function deepMerge(target, source) {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

// Translate each language file
Object.keys(translations).forEach(lang => {
  const translatedContent = deepMerge(enContent, translations[lang]);
  const filePath = `src/messages/${lang}.json`;
  
  fs.writeFileSync(filePath, JSON.stringify(translatedContent, null, 2), 'utf8');
  console.log(`✅ Translated ${lang}.json`);
});

console.log('🎉 All translations completed!');
