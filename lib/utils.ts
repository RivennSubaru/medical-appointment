import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short", // Mois abrégé (ex. 'oct.')
    day: "numeric", // Jour (ex. '25')
    year: "numeric", // Année (ex. '2023')
    hour: "numeric", // Heure (ex. '08')
    minute: "numeric", // Minute (ex. '30')
    hour12: false, // Utiliser le format 24h au lieu de 12h
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // Jour abrégé (ex. 'lun.')
    year: "numeric",
    month: "2-digit", // Mois sur 2 chiffres (ex. '10' pour octobre)
    day: "2-digit", // Jour sur 2 chiffres (ex. '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
    day: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: false, // Format 24h
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "fr-FR",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "fr-FR",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "fr-FR",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "fr-FR",
    timeOptions
  );

  return {
    dateTime: formattedDateTime, // Exemple: "25 oct. 2023, 08:30"
    dateDay: formattedDateDay, // Exemple: "lun. 25/10/2023"
    dateOnly: formattedDate, // Exemple: "25 oct. 2023"
    timeOnly: formattedTime, // Exemple: "08:30"
  };
};


export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}