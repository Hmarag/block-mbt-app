// Ορίζουμε τους τύπους για καλύτερη οργάνωση και type safety
export interface Option {
  value: string;
  info?: string;
}

export interface SubQuestion {
  id: string;
  text: string;
  type: 'radio'; // Οι υπο-ερωτήσεις είναι πάντα radio
  options: Option[];
}

export interface Question {
  id: string;
  type: 'radio' | 'checkbox' | 'textarea' | 'group';
  text: string;
  options?: Option[];
  subQuestions?: SubQuestion[];
  placeholder?: string;
}

export interface Chapter {
  title: string;
  questions: Question[];
}

export interface Questionnaire {
  new: Chapter[];
  existing: Chapter[];
}

export const questionnaires: Questionnaire = {
  // --- ΕΡΩΤΗΜΑΤΟΛΟΓΙΟ ΓΙΑ ΝΕΕΣ ΕΠΙΧΕΙΡΗΣΕΙΣ ---
  new: [
    // --- ΚΕΦΑΛΑΙΟ 1 ---
    {
      title: 'Κεφάλαιο 1: Οι πελάτες σου',
      questions: [
        { id: 'new-customer-type', type: 'radio', text: '1.1 Ποιο είδος ανθρώπων ή οργανισμών στοχεύεις;', options: [{ value: 'Ιδιώτες (B2C)' }, { value: 'Επιχειρήσεις (B2B)' }, { value: 'Δημόσιοι φορείς' }, { value: 'Εθελοντικοί/μη κερδοσκοπικοί οργανισμοί' }] },
        { id: 'new-customer-profile', type: 'checkbox', text: '1.2 Ποιο είναι το προφίλ των πελατών σου;', options: [{ value: 'Νεαροί', info: 'π.χ. φοιτητές, νέοι επαγγελματίες' }, { value: 'Οικογένειες με παιδιά' }, { value: 'Συνταξιούχοι' }, { value: 'Ιδιοκτήτες μικρών επιχειρήσεων' }, { value: 'Μεγάλοι οργανισμοί / εταιρείες' }] },
        { id: 'new-customer-location', type: 'radio', text: '1.3 Πού βρίσκονται γεωγραφικά;', options: [{ value: 'Τοπικά', info: 'στη γειτονιά/πόλη μου' }, { value: 'Πανελλαδικά' }, { value: 'Ευρωπαϊκά' }, { value: 'Παγκόσμια / Διεθνώς' }] },
      ],
    },
    // --- ΚΕΦΑΛΑΙΟ 2 ---
    {
      title: 'Κεφάλαιο 2: Τι ακριβώς τους προσφέρεις;',
      questions: [
        { id: 'new-need-covered', type: 'radio', text: '2.1 Ποια είναι η βασική ανάγκη ή πρόβλημα που καλύπτεις;', options: [{ value: 'Εξοικονόμηση χρόνου ή αυτοματοποίηση διαδικασιών' }, { value: 'Εξοικονόμηση κόστους / βελτίωση οικονομικής αποδοτικότητας' }, { value: 'Βελτίωση άνεσης, εμπειρίας ή ευκολίας χρήσης' }, { value: 'Πρόσβαση σε καινοτόμο τεχνολογία ή υπηρεσία που δεν υπάρχει στην αγορά' }, { value: 'Περιβαλλοντική ή κοινωνική συνεισφορά', info: 'π.χ. μείωση αποτυπώματος, κοινωνική ένταξη' }, { value: 'Αύξηση παραγωγικότητας / αποτελεσματικότητας πελάτη' }, { value: 'Βελτίωση ασφάλειας, ποιότητας ή συμμόρφωσης' }] },
        { id: 'new-offer-format', type: 'radio', text: '2.2 Ποια είναι η βασική μορφή της προσφοράς σου;', options: [{ value: 'Φυσικό προϊόν', info: 'π.χ. κατασκευή, αγαθό, εξοπλισμός' }, { value: 'Ψηφιακό προϊόν', info: 'π.χ. εφαρμογή, λογισμικό, course' }, { value: 'Υπηρεσία', info: 'π.χ. συμβουλευτική, καθαρισμός, παράδοση, σχεδιασμός' }, { value: 'Πλατφόρμα διασύνδεσης', info: 'marketplace, SaaS, app' }, { value: 'Συνδυασμός φυσικού & ψηφιακού', info: 'π.χ. προϊόν + συνδρομητική εφαρμογή' }, { value: 'Άλλη μορφή προσφοράς', info: 'π.χ. εμπειρία, εκπαίδευση, κοινότητα' }] },
        { id: 'new-differentiation-factor', type: 'checkbox', text: '2.3 Τι σε κάνει να ξεχωρίζεις;', options: [{ value: 'Καινοτομία σε προϊόν ή διαδικασία' }, { value: 'Ανώτερη ποιότητα / αξιοπιστία' }, { value: 'Προσωποποιημένη εξυπηρέτηση ή εμπειρία πελάτη' }, { value: 'Ανταγωνιστική τιμή / σχέση ποιότητας-κόστους' }, { value: 'Ταχύτητα / απλότητα στη χρήση ή παράδοση' }, { value: 'Περιβαλλοντική ή κοινωνική υπεροχή' }, { value: 'Ισχυρή τεχνογνωσία ή μοναδική εξειδίκευση' }, { value: 'Ισχυρό brand ή δίκτυο συνεργασιών' }] },
      ],
    },
    // --- ΚΕΦΑΛΑΙΟ 3 ---
    {
      title: 'Κεφάλαιο 3: Πώς θα φτάσεις στους πελάτες σου;',
      questions: [
        { id: 'new-customer-reach-location', type: 'radio', text: '3.1 Πού θα βρίσκουν κυρίως την υπηρεσία ή το προϊόν σου;', options: [{ value: 'Ιστοσελίδα ή e-shop' }, { value: 'Μέσω social media', info: 'π.χ. Instagram, TikTok, LinkedIn' }, { value: 'Πλατφόρμες τρίτων', info: 'π.χ. Skroutz, Etsy, Booking' }, { value: 'Μέσω συνεργατών, μεταπωλητών ή αντιπροσώπων' }, { value: 'Direct πωλήσεις', info: 'π.χ. εκθέσεις, B2B παρουσιάσεις' }, { value: 'Μέσω διαγωνισμών ή δημοσίων προμηθειών', info: 'για δημόσιο τομέα' }, { value: 'Εφαρμογή ή ψηφιακή πλατφόρμα' }] },
        { id: 'new-customer-communication', type: 'radio', text: '3.2 Πώς θα επικοινωνείς κυρίως μαζί τους;', options: [{ value: 'Social media', info: 'π.χ. περιεχόμενο, stories, reels' }, { value: 'Email marketing / newsletter' }, { value: 'Δια ζώσης', info: 'εκδηλώσεις, παρουσιάσεις, συναντήσεις' }, { value: 'Chat / Messenger / WhatsApp / live support' }, { value: 'Τηλεφωνικά', info: 'τηλεφωνικό κέντρο ή ραντεβού' }, { value: 'Community building', info: 'π.χ. Discord, Facebook groups, forum' }, { value: 'Αυτοματοποιημένη επικοινωνία μέσω CRM ή chatbot' }, { value: 'PR / Δημόσιες σχέσεις', info: 'άρθρα, media, συνέδρια' }] },
        { id: 'new-service-delivery', type: 'radio', text: '3.3 Πώς θα γίνεται κυρίως η παράδοση ή χρήση της υπηρεσίας;', options: [{ value: 'Αυτοπροσώπως', info: 'π.χ. ραντεβού, επίσκεψη, επί τόπου εργασία' }, { value: 'Παράδοση μέσω courier ή διανομής' }, { value: 'Ψηφιακή πρόσβαση', info: 'π.χ. login σε πλατφόρμα, online λήψη' }, { value: 'Μέσω συνεργατών ή παρόχων υπηρεσιών', info: 'outsourcing / franchise' }, { value: 'Υβριδικό μοντέλο', info: 'φυσική + online εξυπηρέτηση' }, { value: 'On-demand', info: 'παράδοση ή εξυπηρέτηση κατόπιν αιτήματος' }, { value: 'Αυτόματη / self-service πρόσβαση', info: 'π.χ. app, kiosk, API' }] },
      ],
    },
    // --- ΚΕΦΑΛΑΙΟ 4 ---
    {
      title: 'Κεφάλαιο 4: Πώς θα κρατάς επαφή και σχέση μαζί τους;',
      questions: [
        { id: 'new-customer-service-method', type: 'radio', text: '4.1 Πώς θα εξυπηρετείς κυρίως τον πελάτη σου;', options: [{ value: 'Προσωπική εξυπηρέτηση', info: 'τηλεφωνικά, email, ή δια ζώσης' }, { value: 'Αυτόματη εξυπηρέτηση', info: 'FAQ, chatbot, help center' }, { value: 'Συνδυασμός αυτόματης & προσωπικής εξυπηρέτησης' }, { value: 'Εκπαιδευτικό υλικό', info: 'videos, tutorials, οδηγοί, webinars' }, { value: 'Online community ή forum υποστήριξης' }, { value: 'Υπηρεσία υποστήριξης 24/7 μέσω εξωτερικού συνεργάτη' }, { value: 'Υποστήριξη βάσει επιπέδου πελάτη', info: 'π.χ. premium support για συνδρομητές' }] },
        { id: 'new-customer-retention', type: 'radio', text: '4.2 Πώς θα τον κρατήσεις πιστό;', options: [{ value: 'Πρόγραμμα πόντων, επιβράβευσης ή referral system' }, { value: 'Συνδρομητικά προγράμματα / πακέτα με προνόμια' }, { value: 'Προσφορές και εξατομικευμένες εκπτώσεις' }, { value: 'Εξαιρετική εμπειρία εξυπηρέτησης / customer success focus' }, { value: 'Συνεχής επικοινωνία και ενημέρωση', info: 'email, social, CRM' }, { value: 'Δημιουργία κοινότητας / club πελατών' }, { value: 'Εκπαίδευση πελατών για μεγαλύτερη αξία χρήσης προϊόντος' }, { value: 'Εγγύηση ικανοποίησης ή after-sales υποστήριξη' }] },
        { id: 'new-customer-feedback', type: 'radio', text: '4.3 Πώς θα μαθαίνεις τη γνώμη του;', options: [{ value: 'Ερωτηματολόγια ικανοποίησης', info: 'μετά από αγορά ή χρήση' }, { value: 'Αξιολογήσεις / reviews σε πλατφόρμες ή site' }, { value: 'Προσωπικές συνεντεύξεις / συζητήσεις με πελάτες' }, { value: 'Παρακολούθηση στατιστικών χρήσης / analytics συμπεριφοράς' }, { value: 'Συλλογή feedback μέσω social media ή chat' }, { value: 'Αυτοματοποιημένη συλλογή feedback', info: 'CRM, NPS system' }, { value: 'Ετήσια ή περιοδική αξιολόγηση πελατών', info: 'B2B focus' }] },
      ],
    },
    // --- ΚΕΦΑΛΑΙΟ 5 ---
    {
      title: 'Κεφάλαιο 5: Πώς θα βγάζεις χρήματα;',
      questions: [
        { id: 'new-payment-model', type: 'radio', text: '5.1 Με ποιο μοντέλο πληρωμής;', options: [{ value: 'Εφάπαξ πληρωμή ανά προϊόν ή έργο', info: 'one-time purchase' }, { value: 'Συνδρομή', info: 'π.χ. μηνιαία ή ετήσια, recurring revenue' }, { value: 'Προμήθεια ανά συναλλαγή ή μεσολάβηση', info: 'commission-based' }, { value: 'Ενοικίαση / leasing', info: 'χρήση χωρίς ιδιοκτησία' }, { value: 'Pay-per-use', info: 'ανάλογα με τη χρήση ή τη διάρκεια υπηρεσίας' }, { value: 'Υβριδικό μοντέλο', info: 'συνδυασμός των παραπάνω' }] },
        { id: 'new-revenue-source', type: 'radio', text: '5.2 Από ποια κύρια πηγή θα έρχονται τα έσοδά σου;', options: [{ value: 'Πελάτες άμεσα', info: 'πωλήσεις προϊόντων ή υπηρεσιών' }, { value: 'Διαφημιζόμενοι ή χορηγοί' }, { value: 'Συνεργάτες / τρίτοι', info: 'π.χ. marketplace, affiliate models' }, { value: 'Δημόσια χρηματοδότηση ή προγράμματα', info: 'π.χ. ΕΣΠΑ, grants' }, { value: 'Επενδυτές ή εταιρικές συνεργασίες', info: 'π.χ. joint ventures' }, { value: 'Άλλες έμμεσες ροές εσόδων', info: 'π.χ. πώληση δεδομένων, licensing, royalties' }] },
        { id: 'new-supplementary-revenue', type: 'checkbox', text: '5.3 Θα έχεις συμπληρωματικά έσοδα;', options: [{ value: 'Upselling', info: 'αναβάθμιση ή premium έκδοση προϊόντος/υπηρεσίας' }, { value: 'Cross-selling', info: 'πρόσθετα προϊόντα ή πακέτα συνδυασμού' }, { value: 'Affiliate / προμήθειες από συνεργάτες ή πλατφόρμες' }, { value: 'Παροχή εκπαίδευσης, υποστήριξης ή συντήρησης' }, { value: 'Διαφημίσεις ή προβολή άλλων υπηρεσιών' }, { value: 'Όχι, εστιάζω μόνο στο κύριο προϊόν/υπηρεσία' }] },
      ],
    },
    // --- ΚΕΦΑΛΑΙΟ 6 ---
    {
      title: 'Κεφάλαιο 6: Τι χρειάζεσαι για να λειτουργήσει;',
      questions: [
        { id: 'new-key-resources', type: 'radio', text: '6.1 Ποιος πόρος είναι ο πιο κρίσιμος για εσένα;', options: [{ value: 'Ανθρώπινο δυναμικό', info: 'π.χ. εξειδικευμένοι συνεργάτες ή προσωπικό' }, { value: 'Τεχνολογικός εξοπλισμός ή λογισμικό', info: 'servers, υποδομές, SaaS' }, { value: 'Υλικά και προμήθειες', info: 'παραγωγή ή λειτουργία υπηρεσιών' }, { value: 'Εξειδικευμένη γνώση / τεχνογνωσία / πνευματικά δικαιώματα' }, { value: 'Δεδομένα και ανάλυση αγοράς' }, { value: 'Εταιρικό brand, δίκτυο επαφών ή πελατολόγιο' }, { value: 'Κεφάλαιο ή πρόσβαση σε χρηματοδότηση' }, { value: 'Υποστήριξη από συνεργάτες / εξωτερικούς παρόχους' }] },
        { id: 'new-key-infrastructure', type: 'radio', text: '6.2 Ποιοι είναι οι κρίσιμοι χώροι/δομές σου;', options: [{ value: 'Γραφείο ή διοικητικός χώρος' }, { value: 'Εργαστήριο, παραγωγική ή αποθηκευτική εγκατάσταση' }, { value: 'Διακομιστές / cloud hosting / data centers' }, { value: 'Co-working ή shared office space' }, { value: 'Φυσικό κατάστημα ή showroom' }, { value: 'Δεν χρειάζομαι φυσική υποδομή', info: 'λειτουργώ εξ αποστάσεως / online' }] },
        { id: 'new-key-tools', type: 'checkbox', text: '6.3 Ποια εργαλεία/τεχνολογίες χρειάζεσαι;', options: [{ value: 'Website builder / e-shop ή ηλεκτρονική πλατφόρμα' }, { value: 'CRM / ERP ή άλλα συστήματα διαχείρισης πελατών & πόρων' }, { value: 'Εργαλεία project management', info: 'π.χ. Notion, Asana, Trello' }, { value: 'Λογιστικά / invoicing / φορολογικά εργαλεία' }, { value: 'Εργαλεία marketing automation', info: 'π.χ. social scheduling, email tools' }, { value: 'Εφαρμογές ανάλυσης δεδομένων', info: 'π.χ. Power BI, Google Analytics' }, { value: 'Εργαλεία επικοινωνίας / συνεργασίας', info: 'π.χ. Teams, Slack, Zoom' }] },
        { id: 'new-initial-investment-cost', type: 'radio', text: '6.4 Ποιο είναι το εκτιμώμενο αρχικό κόστος επένδυσης σε υποδομές και εργαλεία;', options: [{ value: '< 1.000 €' }, { value: '1.000 – 5.000 €' }, { value: '5.000 – 20.000 €' }, { value: '20.000 – 100.000 €' }, { value: '> 100.000 €' }, { value: 'Δεν έχει υπολογιστεί ακόμη' }] },
      ],
    },
    // --- ΚΕΦΑΛΑΙΟ 7 ---
    {
      title: 'Κεφάλαιο 7: Ποιες είναι οι βασικές καθημερινές σου ενέργειες;',
      questions: [
        { id: 'new-key-activities-frequent', type: 'radio', text: '7.1 Τι θα κάνεις πιο συχνά;', options: [{ value: 'Πώληση ή εξυπηρέτηση πελατών' }, { value: 'Δημιουργία προϊόντων, υπηρεσιών ή περιεχομένου' }, { value: 'Διανομή / αποστολή ή υλοποίηση παραγγελιών' }, { value: 'Marketing, επικοινωνία και social media' }, { value: 'Διαχείριση έργων ή συνεργασιών' }, { value: 'Οικονομική και διοικητική διαχείριση', info: 'τιμολόγηση, παρακολούθηση κόστους' }, { value: 'Έρευνα αγοράς ή ανάπτυξη νέων ιδεών' }, { value: 'Διαχείριση προσωπικού / συνεργατών' }] },
        { id: 'new-key-activities-strategic', type: 'radio', text: '7.2 Ποια δραστηριότητα απαιτεί τη μεγαλύτερη στρατηγική ή σχεδιασμό;', options: [{ value: 'Ανάπτυξη προϊόντων ή υπηρεσιών (R&D)' }, { value: 'Δημιουργία συνεργασιών ή δικτύου επαφών' }, { value: 'Σχεδιασμός στρατηγικής μάρκετινγκ / branding' }, { value: 'Βελτιστοποίηση εσόδων και τιμολογιακής πολιτικής' }, { value: 'Ανάλυση αγοράς και ανταγωνισμού' }, { value: 'Ανάπτυξη ανθρώπινου δυναμικού / οργανωτική δομή' }, { value: 'Ψηφιακός μετασχηματισμός και καινοτομία' }] },
        { id: 'new-key-activities-automation', type: 'checkbox', text: '7.3 Τι μπορείς να αυτοματοποιήσεις;', options: [{ value: 'Κρατήσεις, παραγγελίες ή διαχείριση ραντεβού' }, { value: 'Τιμολόγηση, πληρωμές και λογιστική παρακολούθηση' }, { value: 'Επικοινωνία με πελάτες', info: 'chatbots, email automation κ.λπ.' }, { value: 'Ενημέρωση social media ή καμπάνιες marketing' }, { value: 'Διαχείριση αποθεμάτων ή logistics' }, { value: 'Reporting / ανάλυση δεδομένων' }, { value: 'Όχι, προς το παρόν όλα γίνονται χειροκίνητα' }] },
      ],
    },
    // --- ΚΕΦΑΛΑΙΟ 8 ---
    {
      title: 'Κεφάλαιο 8: Ποιοι είναι οι βασικοί συνεργάτες σου;',
      questions: [
        { id: 'new-partner-support', type: 'radio', text: '8.1 Τι είδους υποστήριξη χρειάζεσαι κυρίως από άλλους;', options: [{ value: 'Προμηθευτές πρώτων υλών ή εξοπλισμού' }, { value: 'Διανομείς ή συνεργάτες logistics' }, { value: 'Συνεργάτες παροχής υπηρεσιών', info: 'λογιστές, νομικοί, σύμβουλοι, developers κ.λπ.' }, { value: 'Υπεργολάβοι για επιμέρους εργασίες / έργα' }, { value: 'Ερευνητικοί ή τεχνολογικοί συνεργάτες', info: 'πανεπιστήμια, labs, start-ups' }, { value: 'Δημόσιοι φορείς, ΜΚΟ ή ιδρύματα' }, { value: 'Επενδυτές ή μέντορες' }, { value: 'Κανένας — όλα γίνονται εσωτερικά' }] },
        { id: 'new-potential-partners-role', type: 'radio', text: '8.2 Τι ρόλο θα έχουν οι πιθανοί συνεργάτες;', options: [{ value: 'Παροχή πρώτων υλών, εξοπλισμού ή υπηρεσιών υποστήριξης' }, { value: 'Διανομή, προώθηση ή εμπορική δικτύωση' }, { value: 'Τεχνική υποστήριξη, συντήρηση ή παραγωγή' }, { value: 'Χρηματοδότηση, επενδυτική στήριξη ή mentoring' }, { value: 'Συμμετοχή σε έρευνα, ανάπτυξη ή καινοτομία' }, { value: 'Κοινές δράσεις προβολής ή εκπαίδευσης' }] },
        { id: 'new-partner-relationship', type: 'checkbox', text: '8.3 Με ποιους θα συνεργαστείς;', options: [{ value: 'Με επιχειρήσεις του ίδιου ή συμπληρωματικού κλάδου' }, { value: 'Με πανεπιστήμια ή ερευνητικά κέντρα' }, { value: 'Με δημόσιους φορείς ή δήμους' }, { value: 'Με επενδυτές, συμβούλους ή incubators' }, { value: 'Με ΜΚΟ ή κοινωνικές οργανώσεις' }, { value: 'Με διεθνείς συνεργάτες / εξαγωγικές σχέσεις' }, { value: 'Δεν το έχω σκεφτεί ακόμη' }] },
      ],
    },
    // --- ΚΕΦΑΛΑΙΟ 9 ---
    {
      title: 'Κεφάλαιο 9: Πού θα ξοδεύεις χρήματα;',
      questions: [
        {
          id: 'new-fixed-costs-group', type: 'group', text: '9.1 Ποια είναι τα σταθερά έξοδα;',
          subQuestions: [
            { id: 'new-fixed-costs-rent', type: 'radio', text: 'Ενοίκιο / hosting', options: [{ value: '< 300 €/μήνα' }, { value: '300–800 €/μήνα' }, { value: '> 800 €/μήνα' }] },
            { id: 'new-fixed-costs-salaries', type: 'radio', text: 'Μισθοί / αμοιβές προσωπικού', options: [{ value: '0 € (ατομική επιχείρηση)' }, { value: '500–2.000 €/μήνα' }, { value: '> 2.000 €/μήνα' }] },
            { id: 'new-fixed-costs-services', type: 'radio', text: 'Λογιστικές, νομικές ή διοικητικές υπηρεσίες', options: [{ value: '< 150 €/μήνα' }, { value: '150–400 €/μήνα' }, { value: '> 400 €/μήνα' }] },
            { id: 'new-fixed-costs-tools', type: 'radio', text: 'Συνδρομές σε εργαλεία / λογισμικά', options: [{ value: '< 50 €/μήνα' }, { value: '50–150 €/μήνα' }, { value: '> 150 €/μήνα' }] },
          ]
        },
        {
          id: 'new-variable-costs-group', type: 'group', text: '9.2 Ποια είναι τα μεταβαλλόμενα έξοδα;',
          subQuestions: [
            { id: 'new-variable-costs-materials', type: 'radio', text: 'Υλικά / πρώτες ύλες', options: [{ value: 'Δεν έχω / ελάχιστο κόστος' }, { value: 'Αποτελούν μικρό μέρος του κόστους' }, { value: 'Είναι σημαντικό έξοδο' }, { value: 'Είναι το μεγαλύτερο έξοδο μου' }] },
            { id: 'new-variable-costs-shipping', type: 'radio', text: 'Μεταφορικά / διανομή', options: [{ value: 'Δεν ισχύει για τη δραστηριότητά μου' }, { value: 'Περιορισμένο κόστος (π.χ. λίγες αποστολές)' }, { value: 'Μέτριο κόστος (τακτικές αποστολές ή logistics)' }, { value: 'Υψηλό κόστος (σημαντικό μέρος των εξόδων)' }] },
            { id: 'new-variable-costs-ads', type: 'radio', text: 'Διαφήμιση και προώθηση', options: [{ value: 'Δεν επενδύω ακόμη σε διαφήμιση' }, { value: 'Ελάχιστη επένδυση (π.χ. social media posts)' }, { value: 'Σταθερή επένδυση για ανάπτυξη' }, { value: 'Μεγάλο μέρος των εξόδων αφιερώνεται στην προβολή' }] },
            { id: 'new-variable-costs-commissions', type: 'radio', text: 'Προμήθειες / συνεργάτες πωλήσεων', options: [{ value: 'Δεν χρησιμοποιώ συνεργάτες' }, { value: 'Μικρό κόστος (περιστασιακά)' }, { value: 'Μέτριο κόστος (συνεχείς συνεργασίες)' }, { value: 'Υψηλό κόστος (σημαντική εξάρτηση από προμήθειες)' }] },
          ]
        },
        {
          id: 'new-startup-costs-group', type: 'group', text: '9.3 Ποια είναι τα αρχικά έξοδα για να ξεκινήσεις;',
          subQuestions: [
            { id: 'new-startup-costs-website', type: 'radio', text: 'Κατασκευή ιστοσελίδας ή e-shop', options: [{ value: '< 500 €' }, { value: '500–1.500 €' }, { value: '> 1.500 €' }] },
            { id: 'new-startup-costs-equipment', type: 'radio', text: 'Εξοπλισμός / εγκαταστάσεις', options: [{ value: '< 1.000 €' }, { value: '1.000–5.000 €' }, { value: '> 5.000 €' }] },
            { id: 'new-startup-costs-legal', type: 'radio', text: 'Άδειες / νομικά έξοδα / ίδρυση εταιρείας', options: [{ value: '< 500 €' }, { value: '500–1.000 €' }, { value: '> 1.000 €' }] },
            { id: 'new-startup-costs-branding', type: 'radio', text: 'Branding / λογότυπο / επικοινωνιακό υλικό', options: [{ value: '< 300 €' }, { value: '300–800 €' }, { value: '> 800 €' }] },
          ]
        },
        { id: 'new-startup-funding', type: 'checkbox', text: '9.4 Πώς σκοπεύεις να χρηματοδοτήσεις την εκκίνηση ή την ανάπτυξη;', options: [{ value: 'Ίδια κεφάλαια' }, { value: 'Οικογενειακή/φιλική χρηματοδότηση' }, { value: 'Τραπεζικό δάνειο' }, { value: 'Επενδυτής / Venture Capital' }, { value: 'Δημόσιο πρόγραμμα', info: 'ΕΣΠΑ, επιχορήγηση κ.λπ.' }, { value: 'Crowdfunding ή προπωλήσεις' }] },
      ],
    },
  ],
  // --- ΕΡΩΤΗΜΑΤΟΛΟΓΙΟ ΓΙΑ ΥΠΑΡΧΟΥΣΕΣ ΕΠΙΧΕΙΡΗΣΕΙΣ ---
  existing: [
    // --- ΚΕΦΑΛΑΙΟ 1 ---
    {
      title: 'Κεφάλαιο 1: Ποιοι είναι οι πελάτες σου;',
      questions: [
        { id: 'existing-customer-type', type: 'radio', text: '1.1 Ποιο είδος ανθρώπων ή οργανισμών στοχεύεις;', options: [{ value: 'Ιδιώτες (B2C)' }, { value: 'Επιχειρήσεις (B2B)' }, { value: 'Δημόσιοι φορείς' }, { value: 'Εθελοντικοί/μη κερδοσκοπικοί οργανισμοί' }] },
        { id: 'existing-customer-profile', type: 'checkbox', text: '1.2 Ποιο είναι το προφίλ των πελατών σου;', options: [{ value: 'Νεαροί', info: 'π.χ. φοιτητές, νέοι επαγγελματίες' }, { value: 'Οικογένειες με παιδιά' }, { value: 'Συνταξιούχοι' }, { value: 'Ιδιοκτήτες μικρών επιχειρήσεων' }, { value: 'Μεγάλοι οργανισμοί / εταιρείες' }] },
        { id: 'existing-customer-location', type: 'radio', text: '1.3 Πού βρίσκονται γεωγραφικά;', options: [{ value: 'Τοπικά', info: 'στη γειτονιά/πόλη μου' }, { value: 'Πανελλαδικά' }, { value: 'Ευρωπαϊκά' }, { value: 'Παγκόσμια / Διεθνώς' }] },
      ],
    },
    // --- ΚΕΦΑΛΑΙΟ 2 ---
    {
      title: 'Κεφάλαιο 2: Τι ακριβώς τους προσφέρεις;',
      questions: [
        { id: 'existing-need-covered', type: 'radio', text: '2.1 Ποια είναι η βασική ανάγκη ή πρόβλημα που καλύπτεις;', options: [{ value: 'Εξοικονόμηση χρόνου ή αυτοματοποίηση διαδικασιών' }, { value: 'Εξοικονόμηση κόστους / βελτίωση οικονομικής αποδοτικότητας' }, { value: 'Βελτίωση άνεσης, εμπειρίας ή ευκολίας χρήσης' }, { value: 'Πρόσβαση σε καινοτόμο τεχνολογία ή υπηρεσία που δεν υπάρχει στην αγορά' }, { value: 'Περιβαλλοντική ή κοινωνική συνεισφορά', info: 'π.χ. μείωση αποτυπώματος, κοινωνική ένταξη' }, { value: 'Αύξηση παραγωγικότητας / αποτελεσματικότητας πελάτη' }, { value: 'Βελτίωση ασφάλειας, ποιότητας ή συμμόρφωσης' }] },
        { id: 'existing-offer-format', type: 'radio', text: '2.2 Ποια είναι η βασική μορφή της προσφοράς σου;', options: [{ value: 'Φυσικό προϊόν', info: 'π.χ. κατασκευή, αγαθό, εξοπλισμός' }, { value: 'Ψηφιακό προϊόν', info: 'π.χ. εφαρμογή, λογισμικό, course' }, { value: 'Υπηρεσία', info: 'π.χ. συμβουλευτική, καθαρισμός, παράδοση, σχεδιασμός' }, { value: 'Πλατφόρμα διασύνδεσης', info: 'marketplace, SaaS, app' }, { value: 'Συνδυασμός φυσικού & ψηφιακού', info: 'π.χ. προϊόν + συνδρομητική εφαρμογή' }, { value: 'Άλλη μορφή προσφοράς', info: 'π.χ. εμπειρία, εκπαίδευση, κοινότητα' }] },
        { id: 'existing-differentiation-factor', type: 'checkbox', text: '2.3 Τι σε κάνει να ξεχωρίζεις;', options: [{ value: 'Καινοτομία σε προϊόν ή διαδικασία' }, { value: 'Ανώτερη ποιότητα / αξιοπιστία' }, { value: 'Προσωποποιημένη εξυπηρέτηση ή εμπειρία πελάτη' }, { value: 'Ανταγωνιστική τιμή / σχέση ποιότητας-κόστους' }, { value: 'Ταχύτητα / απλότητα στη χρήση ή παράδοση' }, { value: 'Περιβαλλοντική ή κοινωνική υπεροχή' }, { value: 'Ισχυρή τεχνογνωσία ή μοναδική εξειδίκευση' }, { value: 'Ισχυρό brand ή δίκτυο συνεργασιών' }] },
      ],
    },
    // --- ΚΕΦΑΛΑΙΟ 3 ---
    {
      title: 'Κεφάλαιο 3: Πώς φτάνεις στους πελάτες σου;',
      questions: [
        { id: 'existing-customer-reach-location', type: 'radio', text: '3.1 Πού βρίσκουν κυρίως την υπηρεσία ή το προϊόν σου;', options: [{ value: 'Ιστοσελίδα ή e-shop' }, { value: 'Μέσω social media', info: 'π.χ. Instagram, TikTok, LinkedIn' }, { value: 'Πλατφόρμες τρίτων', info: 'π.χ. Skroutz, Etsy, Booking' }, { value: 'Μέσω συνεργατών, μεταπωλητών ή αντιπροσώπων' }, { value: 'Direct πωλήσεις', info: 'π.χ. εκθέσεις, B2B παρουσιάσεις' }, { value: 'Μέσω διαγωνισμών ή δημοσίων προμηθειών', info: 'για δημόσιο τομέα' }, { value: 'Εφαρμογή ή ψηφιακή πλατφόρμα' }] },
        { id: 'existing-customer-communication', type: 'radio', text: '3.2 Πώς επικοινωνείς κυρίως μαζί τους;', options: [{ value: 'Social media', info: 'π.χ. περιεχόμενο, stories, reels' }, { value: 'Email marketing / newsletter' }, { value: 'Δια ζώσης', info: 'εκδηλώσεις, παρουσιάσεις, συναντήσεις' }, { value: 'Chat / Messenger / WhatsApp / live support' }, { value: 'Τηλεφωνικά', info: 'τηλεφωνικό κέντρο ή ραντεβού' }, { value: 'Community building', info: 'π.χ. Discord, Facebook groups, forum' }, { value: 'Αυτοματοποιημένη επικοινωνία μέσω CRM ή chatbot' }, { value: 'PR / Δημόσιες σχέσεις', info: 'άρθρα, media, συνέδρια' }] },
        { id: 'existing-service-delivery', type: 'radio', text: '3.3 Πώς γίνεται κυρίως η παράδοση ή χρήση της υπηρεσίας;', options: [{ value: 'Αυτοπροσώπως', info: 'π.χ. ραντεβού, επίσκεψη, επί τόπου εργασία' }, { value: 'Παράδοση μέσω courier ή διανομής' }, { value: 'Ψηφιακή πρόσβαση', info: 'π.χ. login σε πλατφόρμα, online λήψη' }, { value: 'Μέσω συνεργατών ή παρόχων υπηρεσιών', info: 'outsourcing / franchise' }, { value: 'Υβριδικό μοντέλο', info: 'φυσική + online εξυπηρέτηση' }, { value: 'On-demand', info: 'παράδοση ή εξυπηρέτηση κατόπιν αιτήματος' }, { value: 'Αυτόματη / self-service πρόσβαση', info: 'π.χ. app, kiosk, API' }] },
      ],
    },
    // --- ΚΕΦΑΛΑΙΟ 4 ---
    {
      title: 'Κεφάλαιο 4: Πώς κρατάς επαφή και σχέση μαζί τους;',
      questions: [
        { id: 'existing-customer-service-method', type: 'radio', text: '4.1 Πώς εξυπηρετείς κυρίως τον πελάτη σου;', options: [{ value: 'Προσωπική εξυπηρέτηση', info: 'τηλεφωνικά, email, ή δια ζώσης' }, { value: 'Αυτόματη εξυπηρέτηση', info: 'FAQ, chatbot, help center' }, { value: 'Συνδυασμός αυτόματης & προσωπικής εξυπηρέτησης' }, { value: 'Εκπαιδευτικό υλικό', info: 'videos, tutorials, οδηγοί, webinars' }, { value: 'Online community ή forum υποστήριξης' }, { value: 'Υπηρεσία υποστήριξης 24/7 μέσω εξωτερικού συνεργάτη' }, { value: 'Υποστήριξη βάσει επιπέδου πελάτη', info: 'π.χ. premium support για συνδρομητές' }] },
        { id: 'existing-customer-retention', type: 'radio', text: '4.2 Πώς τον κρατάς πιστό;', options: [{ value: 'Πρόγραμμα πόντων, επιβράβευσης ή referral system' }, { value: 'Συνδρομητικά προγράμματα / πακέτα με προνόμια' }, { value: 'Προσφορές και εξατομικευμένες εκπτώσεις' }, { value: 'Εξαιρετική εμπειρία εξυπηρέτησης / customer success focus' }, { value: 'Συνεχής επικοινωνία και ενημέρωση', info: 'email, social, CRM' }, { value: 'Δημιουργία κοινότητας / club πελατών' }, { value: 'Εκπαίδευση πελατών για μεγαλύτερη αξία χρήσης προϊόντος' }, { value: 'Εγγύηση ικανοποίησης ή after-sales υποστήριξη' }] },
        { id: 'existing-customer-feedback', type: 'radio', text: '4.3 Πώς μαθαίνεις τη γνώμη του;', options: [{ value: 'Ερωτηματολόγια ικανοποίησης', info: 'μετά από αγορά ή χρήση' }, { value: 'Αξιολογήσεις / reviews σε πλατφόρμες ή site' }, { value: 'Προσωπικές συνεντεύξεις / συζητήσεις με πελάτες' }, { value: 'Παρακολούθηση στατιστικών χρήσης / analytics συμπεριφοράς' }, { value: 'Συλλογή feedback μέσω social media ή chat' }, { value: 'Αυτοματοποιημένη συλλογή feedback', info: 'CRM, NPS system' }, { value: 'Ετήσια ή περιοδική αξιολόγηση πελατών', info: 'B2B focus' }] },
      ],
    },
    // --- ΚΕΦΑΛΑΙΟ 5 ---
    {
      title: 'Κεφάλαιο 5: Πώς βγάζεις χρήματα;',
      questions: [
        { id: 'existing-payment-model', type: 'radio', text: '5.1 Με ποιο μοντέλο πληρωμής;', options: [{ value: 'Εφάπαξ πληρωμή ανά προϊόν ή έργο', info: 'one-time purchase' }, { value: 'Συνδρομή', info: 'π.χ. μηνιαία ή ετήσια, recurring revenue' }, { value: 'Προμήθεια ανά συναλλαγή ή μεσολάβηση', info: 'commission-based' }, { value: 'Ενοικίαση / leasing', info: 'χρήση χωρίς ιδιοκτησία' }, { value: 'Pay-per-use', info: 'ανάλογα με τη χρήση ή τη διάρκεια υπηρεσίας' }, { value: 'Υβριδικό μοντέλο', info: 'συνδυασμός των παραπάνω' }] },
        { id: 'existing-revenue-source', type: 'radio', text: '5.2 Από ποια κύρια πηγή έρχονται τα έσοδά σου;', options: [{ value: 'Πελάτες άμεσα', info: 'πωλήσεις προϊόντων ή υπηρεσιών' }, { value: 'Διαφημιζόμενοι ή χορηγοί' }, { value: 'Συνεργάτες / τρίτοι', info: 'π.χ. marketplace, affiliate models' }, { value: 'Δημόσια χρηματοδότηση ή προγράμματα', info: 'π.χ. ΕΣΠΑ, grants' }, { value: 'Επενδυτές ή εταιρικές συνεργασίες', info: 'π.χ. joint ventures' }, { value: 'Άλλες έμμεσες ροές εσόδων', info: 'π.χ. πώληση δεδομένων, licensing, royalties' }] },
        { id: 'existing-supplementary-revenue', type: 'checkbox', text: '5.3 Έχεις συμπληρωματικά έσοδα;', options: [{ value: 'Upselling', info: 'αναβάθμιση ή premium έκδοση προϊόντος/υπηρεσίας' }, { value: 'Cross-selling', info: 'πρόσθετα προϊόντα ή πακέτα συνδυασμού' }, { value: 'Affiliate / προμήθειες από συνεργάτες ή πλατφόρμες' }, { value: 'Παροχή εκπαίδευσης, υποστήριξης ή συντήρησης' }, { value: 'Διαφημίσεις ή προβολή άλλων υπηρεσιών' }, { value: 'Όχι, εστιάζω μόνο στο κύριο προϊόν/υπηρεσία' }] },
      ],
    },
    // --- ΚΕΦΑΛΑΙΟ 6 ---
    {
      title: 'Κεφάλαιο 6: Τι χρειάζεσαι για να λειτουργήσει;',
      questions: [
        { id: 'existing-key-resources', type: 'radio', text: '6.1 Ποιος πόρος είναι ο πιο κρίσιμος για εσένα;', options: [{ value: 'Ανθρώπινο δυναμικό', info: 'π.χ. εξειδικευμένοι συνεργάτες ή προσωπικό' }, { value: 'Τεχνολογικός εξοπλισμός ή λογισμικό', info: 'servers, υποδομές, SaaS' }, { value: 'Υλικά και προμήθειες', info: 'παραγωγή ή λειτουργία υπηρεσιών' }, { value: 'Εξειδικευμένη γνώση / τεχνογνωσία / πνευματικά δικαιώματα' }, { value: 'Δεδομένα και ανάλυση αγοράς' }, { value: 'Εταιρικό brand, δίκτυο επαφών ή πελατολόγιο' }, { value: 'Κεφάλαιο ή πρόσβαση σε χρηματοδότηση' }, { value: 'Υποστήριξη από συνεργάτες / εξωτερικούς παρόχους' }] },
        { id: 'existing-key-infrastructure', type: 'radio', text: '6.2 Ποιοι είναι οι κρίσιμοι χώροι/δομές σου;', options: [{ value: 'Γραφείο ή διοικητικός χώρος' }, { value: 'Εργαστήριο, παραγωγική ή αποθηκευτική εγκατάσταση' }, { value: 'Διακομιστές / cloud hosting / data centers' }, { value: 'Co-working ή shared office space' }, { value: 'Φυσικό κατάστημα ή showroom' }, { value: 'Δεν χρειάζομαι φυσική υποδομή', info: 'λειτουργώ εξ αποστάσεως / online' }] },
        { id: 'existing-key-tools', type: 'checkbox', text: '6.3 Ποια εργαλεία/τεχνολογίες χρειάζεσαι;', options: [{ value: 'Website builder / e-shop ή ηλεκτρονική πλατφόρμα' }, { value: 'CRM / ERP ή άλλα συστήματα διαχείρισης πελατών & πόρων' }, { value: 'Εργαλεία project management', info: 'π.χ. Notion, Asana, Trello' }, { value: 'Λογιστικά / invoicing / φορολογικά εργαλεία' }, { value: 'Εργαλεία marketing automation', info: 'π.χ. social scheduling, email tools' }, { value: 'Εφαρμογές ανάλυσης δεδομένων', info: 'π.χ. Power BI, Google Analytics' }, { value: 'Εργαλεία επικοινωνίας / συνεργασίας', info: 'π.χ. Teams, Slack, Zoom' }] },
        { id: 'existing-investment-cost', type: 'radio', text: '6.4 Ποιο είναι το εκτιμώμενο κόστος επένδυσης σε υποδομές και εργαλεία;', options: [{ value: '< 1.000 €' }, { value: '1.000 – 5.000 €' }, { value: '5.000 – 20.000 €' }, { value: '20.000 – 100.000 €' }, { value: '> 100.000 €' }, { value: 'Δεν έχει υπολογιστεί ακόμη' }] },
      ],
    },
    // --- ΚΕΦΑΛΑΙΟ 7 ---
    {
      title: 'Κεφάλαιο 7: Ποιες είναι οι βασικές καθημερινές σου ενέργειες;',
      questions: [
        { id: 'existing-key-activities-frequent', type: 'radio', text: '7.1 Τι κάνεις πιο συχνά;', options: [{ value: 'Πώληση ή εξυπηρέτηση πελατών' }, { value: 'Δημιουργία προϊόντων, υπηρεσιών ή περιεχομένου' }, { value: 'Διανομή / αποστολή ή υλοποίηση παραγγελιών' }, { value: 'Marketing, επικοινωνία και social media' }, { value: 'Διαχείριση έργων ή συνεργασιών' }, { value: 'Οικονομική και διοικητική διαχείριση', info: 'τιμολόγηση, παρακολούθηση κόστους' }, { value: 'Έρευνα αγοράς ή ανάπτυξη νέων ιδεών' }, { value: 'Διαχείριση προσωπικού / συνεργατών' }] },
        { id: 'existing-key-activities-strategic', type: 'radio', text: '7.2 Ποια δραστηριότητα απαιτεί τη μεγαλύτερη στρατηγική ή σχεδιασμό;', options: [{ value: 'Ανάπτυξη προϊόντων ή υπηρεσιών (R&D)' }, { value: 'Δημιουργία συνεργασιών ή δικτύου επαφών' }, { value: 'Σχεδιασμός στρατηγικής μάρκετινγκ / branding' }, { value: 'Βελτιστοποίηση εσόδων και τιμολογιακής πολιτικής' }, { value: 'Ανάλυση αγοράς και ανταγωνισμού' }, { value: 'Ανάπτυξη ανθρώπινου δυναμικού / οργανωτική δομή' }, { value: 'Ψηφιακός μετασχηματισμός και καινοτομία' }] },
        { id: 'existing-key-activities-automation', type: 'checkbox', text: '7.3 Τι μπορείς να αυτοματοποιήσεις;', options: [{ value: 'Κρατήσεις, παραγγελίες ή διαχείριση ραντεβού' }, { value: 'Τιμολόγηση, πληρωμές και λογιστική παρακολούθηση' }, { value: 'Επικοινωνία με πελάτες', info: 'chatbots, email automation κ.λπ.' }, { value: 'Ενημέρωση social media ή καμπάνιες marketing' }, { value: 'Διαχείριση αποθεμάτων ή logistics' }, { value: 'Reporting / ανάλυση δεδομένων' }, { value: 'Όχι, προς το παρόν όλα γίνονται χειροκίνητα' }] },
      ],
    },
    // --- ΚΕΦΑΛΑΙΟ 8 ---
    {
      title: 'Κεφάλαιο 8: Ποιοι είναι οι βασικοί συνεργάτες σου;',
      questions: [
        { id: 'existing-partner-support', type: 'radio', text: '8.1 Τι είδους υποστήριξη χρειάζεσαι κυρίως από άλλους;', options: [{ value: 'Προμηθευτές πρώτων υλών ή εξοπλισμού' }, { value: 'Διανομείς ή συνεργάτες logistics' }, { value: 'Συνεργάτες παροχής υπηρεσιών', info: 'λογιστές, νομικοί, σύμβουλοι, developers κ.λπ.' }, { value: 'Υπεργολάβοι για επιμέρους εργασίες / έργα' }, { value: 'Ερευνητικοί ή τεχνολογικοί συνεργάτες', info: 'πανεπιστήμια, labs, start-ups' }, { value: 'Δημόσιοι φορείς, ΜΚΟ ή ιδρύματα' }, { value: 'Επενδυτές ή μέντορες' }, { value: 'Κανένας — όλα γίνονται εσωτερικά' }] },
        { id: 'existing-potential-partners-role', type: 'radio', text: '8.2 Ποιοι είναι οι συνεργάτες;', options: [{ value: 'Παροχή πρώτων υλών, εξοπλισμού ή υπηρεσιών υποστήριξης' }, { value: 'Διανομή, προώθηση ή εμπορική δικτύωση' }, { value: 'Τεχνική υποστήριξη, συντήρηση ή παραγωγή' }, { value: 'Χρηματοδότηση, επενδυτική στήριξη ή mentoring' }, { value: 'Συμμετοχή σε έρευνα, ανάπτυξη ή καινοτομία' }, { value: 'Κοινές δράσεις προβολής ή εκπαίδευσης' }] },
        { id: 'existing-partner-relationship', type: 'checkbox', text: '8.3 Ποια σχέση έχεις με αυτούς;', options: [{ value: 'Με επιχειρήσεις του ίδιου ή συμπληρωματικού κλάδου' }, { value: 'Με πανεπιστήμια ή ερευνητικά κέντρα' }, { value: 'Με δημόσιους φορείς ή δήμους' }, { value: 'Με επενδυτές, συμβούλους ή incubators' }, { value: 'Με ΜΚΟ ή κοινωνικές οργανώσεις' }, { value: 'Με διεθνείς συνεργάτες / εξαγωγικές σχέσεις' }, { value: 'Δεν το έχω σκεφτεί ακόμη' }] },
      ],
    },
    // --- ΚΕΦΑΛΑΙΟ 9 ---
    {
      title: 'Κεφάλαιο 9: Πού ξοδεύεις χρήματα;',
      questions: [
        {
          id: 'existing-fixed-costs-group', type: 'group', text: '9.1 Ποια είναι τα σταθερά έξοδα;',
          subQuestions: [
            { id: 'existing-fixed-costs-rent', type: 'radio', text: 'Ενοίκιο / hosting', options: [{ value: '< 300 €/μήνα' }, { value: '300–800 €/μήνα' }, { value: '> 800 €/μήνα' }] },
            { id: 'existing-fixed-costs-salaries', type: 'radio', text: 'Μισθοί / αμοιβές προσωπικού', options: [{ value: '0 € (ατομική επιχείρηση)' }, { value: '500–2.000 €/μήνα' }, { value: '> 2.000 €/μήνα' }] },
            { id: 'existing-fixed-costs-services', type: 'radio', text: 'Λογιστικές, νομικές ή διοικητικές υπηρεσίες', options: [{ value: '< 150 €/μήνα' }, { value: '150–400 €/μήνα' }, { value: '> 400 €/μήνα' }] },
            { id: 'existing-fixed-costs-tools', type: 'radio', text: 'Συνδρομές σε εργαλεία / λογισμικά', options: [{ value: '< 50 €/μήνα' }, { value: '50–150 €/μήνα' }, { value: '> 150 €/μήνα' }] },
          ]
        },
        {
          id: 'existing-variable-costs-group', type: 'group', text: '9.2 Ποια είναι τα μεταβαλλόμενα έξοδα;',
          subQuestions: [
            { id: 'existing-variable-costs-materials', type: 'radio', text: 'Υλικά / πρώτες ύλες', options: [{ value: 'Δεν έχω / ελάχιστο κόστος' }, { value: 'Αποτελούν μικρό μέρος του κόστους' }, { value: 'Είναι σημαντικό έξοδο' }, { value: 'Είναι το μεγαλύτερο έξοδο μου' }] },
            { id: 'existing-variable-costs-shipping', type: 'radio', text: 'Μεταφορικά / διανομή', options: [{ value: 'Δεν ισχύει για τη δραστηριότητά μου' }, { value: 'Περιορισμένο κόστος (π.χ. λίγες αποστολές)' }, { value: 'Μέτριο κόστος (τακτικές αποστολές ή logistics)' }, { value: 'Υψηλό κόστος (σημαντικό μέρος των εξόδων)' }] },
            { id: 'existing-variable-costs-ads', type: 'radio', text: 'Διαφήμιση και προώθηση', options: [{ value: 'Δεν επενδύω ακόμη σε διαφήμιση' }, { value: 'Ελάχιστη επένδυση (π.χ. social media posts)' }, { value: 'Σταθερή επένδυση για ανάπτυξη' }, { value: 'Μεγάλο μέρος των εξόδων αφιερώνεται στην προβολή' }] },
            { id: 'existing-variable-costs-commissions', type: 'radio', text: 'Προμήθειες / συνεργάτες πωλήσεων', options: [{ value: 'Δεν χρησιμοποιώ συνεργάτες' }, { value: 'Μικρό κόστος (περιστασιακά)' }, { value: 'Μέτριο κόστος (συνεχείς συνεργασίες)' }, { value: 'Υψηλό κόστος (σημαντική εξάρτηση από προμήθειες)' }] },
          ]
        },
        {
          id: 'existing-expansion-costs-group', type: 'group', text: '9.3 Ποια είναι τα αρχικά έξοδα για την επέκταση;',
          subQuestions: [
            { id: 'existing-expansion-costs-website', type: 'radio', text: 'Κατασκευή ιστοσελίδας ή e-shop', options: [{ value: '< 500 €' }, { value: '500–1.500 €' }, { value: '> 1.500 €' }] },
            { id: 'existing-expansion-costs-equipment', type: 'radio', text: 'Εξοπλισμός / εγκαταστάσεις', options: [{ value: '< 1.000 €' }, { value: '1.000–5.000 €' }, { value: '> 5.000 €' }] },
            { id: 'existing-expansion-costs-legal', type: 'radio', text: 'Άδειες / νομικά έξοδα / ίδρυση εταιρείας', options: [{ value: '< 500 €' }, { value: '500–1.000 €' }, { value: '> 1.000 €' }] },
            { id: 'existing-expansion-costs-branding', type: 'radio', text: 'Branding / λογότυπο / επικοινωνιακό υλικό', options: [{ value: '< 300 €' }, { value: '300–800 €' }, { value: '> 800 €' }] },
          ]
        },
        { id: 'existing-expansion-funding', type: 'checkbox', text: '9.4 Πώς σκοπεύεις να χρηματοδοτήσεις την ανάπτυξη;', options: [{ value: 'Ίδια κεφάλαια' }, { value: 'Οικογενειακή/φιλική χρηματοδότηση' }, { value: 'Τραπεζικό δάνειο' }, { value: 'Επενδυτής / Venture Capital' }, { value: 'Δημόσιο πρόγραμμα', info: 'ΕΣΠΑ, επιχορήγηση κ.λπ.' }, { value: 'Crowdfunding ή προπωλήσεις' }] },
      ],
    },
  ],
};