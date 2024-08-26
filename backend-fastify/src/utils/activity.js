import { ActivityType } from "../enums/activity.js";

/**
 * @typedef {Object} Property
 * @property {string} property_id - unique identifier
 * @property {string} name - The action taken (e.g., "ENQUIRY_NEW", "ENQUIRY_DELETE", etc).
 * @property {string} description - A description of the activity.
 * @property {string} type - A type of property (eg. land, commercial)
 * @property {string} transactionType - for Sale or Rent
 * @property {string} price - property price
 * @property {string} currency - currency used for value
 */

/**
 * @param {string} currency
 * @param {number} price
 * @param {string} transactionType
 * @returns {string}
 */
const propertyPrice = function (
  currency,
  price,
  transactionType,
  paymentFrequency
) {
  return `for ${transactionType} at ${currency} ${price}${
    transactionType === "sale" ? "." : " [" + paymentFrequency + "]"
  }`;
};

/**
 *
 * @param {string} name
 * @return {string}
 */
const propertyName = function (name) {
  return name.length > 10 ? name.slice(0, 10) + "..." : name;
};
/**
 * Description for creating Property
 * @param {Property} property
 * @returns {string}
 */
const propertyDescriptionCreate = function (property) {
  const { name, transactionType, price, paymentFrequency, currency } = property;
  return `Created a Property named [${propertyName(name)}] ${propertyPrice(
    currency,
    price,
    transactionType,
    paymentFrequency
  )}`;
};

/**
 * Description for deleting Property
 * @param {Property} property
 * @returns {string}
 */
const propertyDescriptionDelete = function (property) {
  const { transactionType, name } = property;
  return `Deleted a Property listed for ${transactionType} named [${propertyName(
    name
  )}].`;
};

/**
 * Description for updating Property
 * @param {Property} property
 * @returns {string}
 */
const propertyDescriptionUpdate = function (property) {
  const { name, transactionType, price, paymentFrequency, currency } = property;
  return `Updated a Property listed for ${transactionType} named [${propertyName(
    name
  )}] ${propertyPrice(currency, price, transactionType, paymentFrequency)}.`;
};

/**
 *
 * @param {string} action
 * @param {Property} property
 * @returns {string}
 */
export const activityPropertyDescription = function (
  action,
  property = {
    name: "",
    transactionType: "sale",
    price: 0,
    paymentFrequency: "",
    currency: "",
  }
) {
  switch (action) {
    case ActivityType.property.new:
      return propertyDescriptionCreate(property);

    case ActivityType.property.delete:
      return propertyDescriptionDelete(property);

    case ActivityType.property.update:
      return propertyDescriptionUpdate(property);
    default:
      break;
  }
  return msg;
};
