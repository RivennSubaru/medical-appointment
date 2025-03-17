export const baseUrl = "http://localhost:4000"
export const GenderOptions = ['Masculin', 'Féminin', 'Autre']
export const Doctors = [
    {
      image: "/assets/images/dr-green.png",
      name: "John Green",
    },
    {
      image: "/assets/images/dr-cameron.png",
      name: "Leila Cameron",
    },
    {
      image: "/assets/images/dr-livingston.png",
      name: "David Livingston",
    },
    {
      image: "/assets/images/dr-peter.png",
      name: "Evan Peter",
    },
    {
      image: "/assets/images/dr-powell.png",
      name: "Jane Powell",
    },
    {
      image: "/assets/images/dr-remirez.png",
      name: "Alex Ramirez",
    },
    {
      image: "/assets/images/dr-lee.png",
      name: "Jasmine Lee",
    },
    {
      image: "/assets/images/dr-cruz.png",
      name: "Alyana Cruz",
    },
    {
      image: "/assets/images/dr-sharma.png",
      name: "Hardik Sharma",
    },
  ];

  export const PatientFormDefaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: new Date(Date.now()),
    gender: "Masculin" as Gender,
    address: "",
    occupation: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    primaryPhysician: "",
    allergies: "",
    currentMedication: "",
    familyMedicalHistory: "",
    pastMedicalHistory: "",
    identificationType: "Birth Certificate",
    identificationDocument: []
  };

export const IdentificationTypes = [
    "Certificat de naissance",
    "Permis de conduire",
    "Carte d'assurance médicale",
    "Carte d'identité militaire",
    "Carte d'identité national",
    "Passport",
    "Carte de résident étranger (carte verte)",
    "Carte d'identité d'État",
    "Carte d'étudiant",
    "Carte d'électeur",
  ];

  export const StatusIcon = {
    "programmé": "/assets/icons/check.svg",
    'en attente': "/assets/icons/pending.svg",
    'annulé': "/assets/icons/cancelled.svg",
  };