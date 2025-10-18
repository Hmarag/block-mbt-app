# Αυτό το αρχείο είναι ένας "καθρέφτης" του questionnaireData.tsx του frontend.
# Βοηθά το backend να καταλαβαίνει το περιεχόμενο κάθε ερώτησης.

QUESTIONNAIRES = {
    "new": [
        {"title": "Κεφάλαιο 1: Οι πελάτες σου", "questions": [
            {"id": "new-customer-type", "text": "1.1 Ποιο είδος ανθρώπων ή οργανισμών στοχεύεις;"},
            {"id": "new-customer-profile", "text": "1.2 Ποιο είναι το προφίλ των πελατών σου;"},
            {"id": "new-customer-location", "text": "1.3 Πού βρίσκονται γεωγραφικά;"},
            {"id": "new-customer-notes", "text": "1.4 Άλλες σημειώσεις για τους πελάτες σου:"}
        ]},
        {"title": "Κεφάλαιο 2: Τι ακριβώς τους προσφέρεις;", "questions": [
            {"id": "new-need-covered", "text": "2.1 Τι ανάγκη ή πρόβλημα καλύπτεις;"},
            {"id": "new-offer-format", "text": "2.2 Ποια είναι η βασική μορφή της προσφοράς σου;"},
            {"id": "new-differentiation-factor", "text": "2.3 Τι σε κάνει να ξεχωρίζεις;"},
            {"id": "new-value-notes", "text": "2.4 Άλλες σημειώσεις για την προσφορά σου:"}
        ]},
        {"title": "Κεφάλαιο 3: Πώς θα φτάσεις στους πελάτες σου;", "questions": [
            {"id": "new-customer-reach-location", "text": "3.1 Πού θα βρίσκουν την υπηρεσία ή το προϊόν σου;"},
            {"id": "new-customer-communication", "text": "3.2 Πώς θα επικοινωνείς μαζί τους;"},
            {"id": "new-service-delivery", "text": "3.3 Πώς θα γίνεται η παράδοση ή χρήση της υπηρεσίας;"},
            {"id": "new-delivery-notes", "text": "3.4 Άλλες σημειώσεις για τα κανάλια διανομής:"}
        ]},
        {"title": "Κεφάλαιο 4: Πώς θα κρατάς επαφή και σχέση μαζί τους;", "questions": [
            {"id": "new-customer-service-method", "text": "4.1 Πώς θα εξυπηρετείς τον πελάτη σου;"},
            {"id": "new-customer-retention", "text": "4.2 Πώς θα τον κρατήσεις πιστό;"},
            {"id": "new-customer-feedback", "text": "4.3 Πώς θα μαθαίνεις τη γνώμη του;"},
            {"id": "new-relations-notes", "text": "4.4 Άλλες σημειώσεις για τις σχέσεις με τους πελάτες:"}
        ]},
        {"title": "Κεφάλαιο 5: Πώς θα βγάζεις χρήματα;", "questions": [
            {"id": "new-payment-model", "text": "5.1 Με ποιο μοντέλο πληρωμής;"},
            {"id": "new-revenue-source", "text": "5.2 Από ποια πηγή θα έρχονται τα έσοδά σου;"},
            {"id": "new-supplementary-revenue", "text": "5.3 Θα έχεις συμπληρωματικά έσοδα;"},
            {"id": "new-revenue-notes", "text": "5.4 Άλλες σημειώσεις για τα έσοδα:"}
        ]},
        {"title": "Κεφάλαιο 6: Τι χρειάζεσαι για να λειτουργήσει;", "questions": [
            {"id": "new-key-resources", "text": "6.1 Τι είδους πόρους χρειάζεσαι περισσότερο;"},
            {"id": "new-key-infrastructure", "text": "6.2 Ποιοι είναι οι κρίσιμοι χώροι/δομές σου;"},
            {"id": "new-key-tools", "text": "6.3 Ποια εργαλεία/τεχνολογίες χρειάζεσαι;"},
            {"id": "new-initial-investment-cost", "text": "6.4 Ποιο είναι το εκτιμώμενο αρχικό κόστος επένδυσης σε υποδομές και εργαλεία;"},
            {"id": "new-resources-notes", "text": "6.5 Άλλες σημειώσεις για τους πόρους:"}
        ]},
        {"title": "Κεφάλαιο 7: Ποιες είναι οι βασικές καθημερινές σου ενέργειες;", "questions": [
            {"id": "new-key-activities-frequent", "text": "7.1 Τι θα κάνεις πιο συχνά;"},
            {"id": "new-key-activities-strategic", "text": "7.2 Τι απαιτεί στρατηγική ή σχεδιασμό;"},
            {"id": "new-key-activities-automation", "text": "7.3 Τι μπορείς να αυτοματοποιήσεις;"},
            {"id": "new-activities-notes", "text": "7.4 Άλλες σημειώσεις για τις δραστηριότητες:"}
        ]},
        {"title": "Κεφάλαιο 8: Ποιοι είναι οι βασικοί συνεργάτες σου;", "questions": [
            {"id": "new-partner-support", "text": "8.1 Τι είδους υποστήριξη χρειάζεσαι από άλλους;"},
            {"id": "new-potential-partners-role", "text": "8.2 Τι ρόλο θα έχουν οι πιθανοί συνεργάτες;"},
            {"id": "new-partner-relationship", "text": "8.3 Με ποιους θα συνεργαστείς;"},
            {"id": "new-partners-notes", "text": "8.4 Άλλες σημειώσεις για τους συνεργάτες:"}
        ]},
        {"title": "Κεφάλαιο 9: Πού θα ξοδεύεις χρήματα;", "questions": [
            {"id": "new-fixed-costs-group", "text": "9.1 Ποια είναι τα σταθερά έξοδα;"},
            {"id": "new-variable-costs-group", "text": "9.2 Ποια είναι τα μεταβαλλόμενα έξοδα;"},
            {"id": "new-startup-costs-group", "text": "9.3 Ποια είναι τα αρχικά έξοδα για να ξεκινήσεις;"},
            {"id": "new-startup-funding", "text": "9.4 Πώς σκοπεύεις να χρηματοδοτήσεις την εκκίνηση ή την ανάπτυξη;"}
        ]}
    ],
    "existing": [
        {"title": "Κεφάλαιο 1: Ποιοι είναι οι πελάτες σου;", "questions": [
            {"id": "existing-customer-type", "text": "1.1 Ποιο είδος ανθρώπων ή οργανισμών στοχεύεις;"},
            {"id": "existing-customer-profile", "text": "1.2 Ποιο είναι το προφίλ των πελατών σου;"},
            {"id": "existing-customer-location", "text": "1.3 Πού βρίσκονται γεωγραφικά;"},
            {"id": "existing-customer-notes", "text": "1.4 Άλλες σημειώσεις για τους πελάτες σου:"}
        ]},
        {"title": "Κεφάλαιο 2: Τι ακριβώς τους προσφέρεις;", "questions": [
            {"id": "existing-need-covered", "text": "2.1 Τι ανάγκη ή πρόβλημα καλύπτεις;"},
            {"id": "existing-offer-format", "text": "2.2 Ποια είναι η βασική μορφή της προσφοράς σου;"},
            {"id": "existing-differentiation-factor", "text": "2.3 Τι σε κάνει να ξεχωρίζεις;"},
            {"id": "existing-value-notes", "text": "2.4 Άλλες σημειώσεις για την προσφορά σου:"}
        ]},
        {"title": "Κεφάλαιο 3: Πώς φτάνεις στους πελάτες σου;", "questions": [
            {"id": "existing-customer-reach-location", "text": "3.1 Πού βρίσκουν την υπηρεσία ή το προϊόν σου;"},
            {"id": "existing-customer-communication", "text": "3.2 Πώς επικοινωνείς μαζί τους;"},
            {"id": "existing-service-delivery", "text": "3.3 Πώς γίνεται η παράδοση ή χρήση της υπηρεσίας;"},
            {"id": "existing-delivery-notes", "text": "3.4 Άλλες σημειώσεις για τα κανάλια διανομής:"}
        ]},
        {"title": "Κεφάλαιο 4: Πώς κρατάς επαφή και σχέση μαζί τους;", "questions": [
            {"id": "existing-customer-service-method", "text": "4.1 Πώς εξυπηρετείς τον πελάτη σου;"},
            {"id": "existing-customer-retention", "text": "4.2 Πώς τον κρατάς πιστό;"},
            {"id": "existing-customer-feedback", "text": "4.3 Πώς μαθαίνεις τη γνώμη του;"},
            {"id": "existing-relations-notes", "text": "4.4 Άλλες σημειώσεις για τις σχέσεις με τους πελάτες:"}
        ]},
        {"title": "Κεφάλαιο 5: Πώς βγάζεις χρήματα;", "questions": [
            {"id": "existing-payment-model", "text": "5.1 Με ποιο μοντέλο πληρωμής;"},
            {"id": "existing-revenue-source", "text": "5.2 Από ποια πηγή έρχονται τα έσοδά σου;"},
            {"id": "existing-supplementary-revenue", "text": "5.3 Έχεις συμπληρωματικά έσοδα;"},
            {"id": "existing-revenue-notes", "text": "5.4 Άλλες σημειώσεις για τα έσοδα:"}
        ]},
        {"title": "Κεφάλαιο 6: Τι χρειάζεσαι για να λειτουργήσει;", "questions": [
            {"id": "existing-key-resources", "text": "6.1 Τι είδους πόρους χρειάζεσαι περισσότερο;"},
            {"id": "existing-key-infrastructure", "text": "6.2 Ποιοι είναι οι κρίσιμοι χώροι/δομές σου;"},
            {"id": "existing-key-tools", "text": "6.3 Ποια εργαλεία/τεχνολογίες χρειάζεσαι;"},
            {"id": "existing-investment-cost", "text": "6.4 Ποιο είναι το εκτιμώμενο κόστος επένδυσης σε υποδομές και εργαλεία;"},
            {"id": "existing-resources-notes", "text": "6.5 Άλλες σημειώσεις για τους πόρους:"}
        ]},
        {"title": "Κεφάλαιο 7: Ποιες είναι οι βασικές καθημερινές σου ενέργειες;", "questions": [
            {"id": "existing-key-activities-frequent", "text": "7.1 Τι κάνεις πιο συχνά;"},
            {"id": "existing-key-activities-strategic", "text": "7.2 Τι απαιτεί στρατηγική ή σχεδιασμό;"},
            {"id": "existing-key-activities-automation", "text": "7.3 Τι μπορείς να αυτοματοποιήσεις;"},
            {"id": "existing-activities-notes", "text": "7.4 Άλλες σημειώσεις για τις δραστηριότητες:"}
        ]},
        {"title": "Κεφάλαιο 8: Ποιοι είναι οι βασικοί συνεργάτες σου;", "questions": [
            {"id": "existing-partner-support", "text": "8.1 Τι είδους υποστήριξη χρειάζεσαι από άλλους;"},
            {"id": "existing-potential-partners-role", "text": "8.2 Ποιοι είναι οι συνεργάτες;"},
            {"id": "existing-partner-relationship", "text": "8.3 Ποια σχέση έχεις με αυτούς;"},
            {"id": "existing-partners-notes", "text": "8.4 Άλλες σημειώσεις για τους συνεργάτες:"}
        ]},
        {"title": "Κεφάλαιο 9: Πού ξοδεύεις χρήματα;", "questions": [
            {"id": "existing-fixed-costs-group", "text": "9.1 Ποια είναι τα σταθερά έξοδα;"},
            {"id": "existing-variable-costs-group", "text": "9.2 Ποια είναι τα μεταβαλλόμενα έξοδα;"},
            {"id": "existing-expansion-costs-group", "text": "9.3 Ποια είναι τα αρχικά έξοδα για την επέκταση;"},
            {"id": "existing-expansion-funding", "text": "9.4 Πώς σκοπεύεις να χρηματοδοτήσεις την ανάπτυξη;"}
        ]}
    ]
}

# Δημιουργούμε ένα επίπεδο λεξικό για γρήγορη αναζήτηση του κειμένου της ερώτησης από το ID της.
# Π.χ. QUESTIONS_MAP['new-customer-type'] -> "1.1 Ποιο είδος ανθρώπων..."
QUESTIONS_MAP = {
    q['id']: q['text']
    for type in QUESTIONNAIRES.values()
    for chapter in type
    for q in chapter['questions']
}