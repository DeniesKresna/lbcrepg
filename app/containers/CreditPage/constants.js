/*
 * CreditPageConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_DATA = 'boilerplate/CreditPage/GET_DATA';
export const GET_PROFILE_DATA_SUCCESS = 'boilerplate/CreditPage/GET_PROFILE_DATA_SUCCESS';
export const GET_CREDIT_EXPIRING_SUCCESS = 'boilerplate/CreditPage/GET_CREDIT_EXPIRING_SUCCESS';
export const GET_CREDIT_USAGE_DATA_SUCCESS = 'boilerplate/CreditPage/GET_CREDIT_USAGE_DATA_SUCCESS';
export const GET_CREDIT_HISTORY_DATA_SUCCESS = 'boilerplate/CreditPage/GET_CREDIT_HISTORY_DATA_SUCCESS';
export const GET_PROFILE_DATA_FAILED = 'boilerplate/CreditPage/GET_PROFILE_DATA_FAILED';
export const GET_CREDIT_EXPIRING_FAILED = 'boilerplate/CreditPage/GET_CREDIT_EXPIRING_FAILED';
export const GET_CREDIT_USAGE_DATA_FAILED = 'boilerplate/CreditPage/GET_CREDIT_USAGE_DATA_FAILED';
export const GET_CREDIT_HISTORY_DATA_FAILED = 'boilerplate/CreditPage/GET_CREDIT_HISTORY_DATA_FAILED';
export const CHANGE_CREDIT_HISTORY = 'boilerplate/CreditPage/CHANGE_CREDIT_HISTORY';
export const CHANGE_CREDIT_EXPIRING_DETAIL = 'boilerplate/CreditPage/CHANGE_CREDIT_EXPIRING_DETAIL';
export const GET_CREDIT_EXPIRING_DETAIL_SUCCESS = 'boilerplate/CreditPage/GET_CREDIT_EXPIRING_DETAIL_SUCCESS';
export const GET_CREDIT_EXPIRING_DETAIL_FAILED = 'boilerplate/CreditPage/GET_CREDIT_EXPIRING_DETAIL_FAILED';


