export function formatPhoneNumber(phoneNumber) {
  // Remove everything but digits
  let cleaned = ('' + phoneNumber).replace(/\D/g, '');

  // If there's a leading '1' for US country code and a total of 11 digits, remove it
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    cleaned = cleaned.slice(1); // drop the leading '1'
  }

  // Now match the standard 10-digit US pattern
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  // If it doesn't match, just return the original string
  return phoneNumber;
}
