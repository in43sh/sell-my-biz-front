// TODO
// TO BE DELETED
// only delete commented out function
// export function formatPhoneNumber(phoneNumber) {
//   // Remove everything but digits
//   let cleaned = ('' + phoneNumber).replace(/\D/g, '');

//   // If there's a leading '1' for US country code and a total of 11 digits, remove it
//   if (cleaned.length === 11 && cleaned.startsWith('1')) {
//     cleaned = cleaned.slice(1); // drop the leading '1'
//   }

//   // Now match the standard 10-digit US pattern
//   const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

//   if (match) {
//     return `(${match[1]}) ${match[2]}-${match[3]}`;
//   }

//   // If it doesn't match, just return the original string
//   return phoneNumber;
// }

export const formatPhoneNumber = (phone) => {
  if (!phone) return '';

  // Remove all non-numeric characters except "+"
  let cleaned = phone.replace(/[^0-9+]/g, '');

  // If the number doesn't start with "+", assume it's a US number and add "+1"
  if (!cleaned.startsWith('+')) {
    cleaned = '+1' + cleaned;
  }

  // Ensure the number is within a reasonable length (E.164 allows up to 15 digits)
  if (cleaned.length > 16) {
    return phone; // Return original if it's too long
  }

  return cleaned;
};
