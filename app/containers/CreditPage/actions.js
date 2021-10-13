/*
 * CreditPage Actions
 *
 */

import { GET_DATA, GET_PROFILE_DATA_SUCCESS, GET_CREDIT_EXPIRING_SUCCESS, GET_CREDIT_USAGE_DATA_SUCCESS, GET_CREDIT_HISTORY_DATA_SUCCESS, CHANGE_CREDIT_HISTORY, CHANGE_CREDIT_EXPIRING_DETAIL, GET_CREDIT_EXPIRING_DETAIL_SUCCESS,
  GET_PROFILE_DATA_FAILED, GET_CREDIT_EXPIRING_FAILED, GET_CREDIT_USAGE_DATA_FAILED, GET_CREDIT_HISTORY_DATA_FAILED, GET_CREDIT_EXPIRING_DETAIL_FAILED } from './constants';

/**
 * Get Init Data
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function getData(payload) {
  return {
    type: GET_DATA,
    payload,
  };
}

/**
 * Get Profile Success
 *
 * @param  {object} payload
 *
 * @return {object} An action object with a type of GET_PROFILE_DATA_SUCCESS
 */
 export function getProfileDataSuccess(payload) {
  return {
    type: GET_PROFILE_DATA_SUCCESS,
    payload,
  };
}

/**
 * Get Credit Expiring Success
 *
 * @param  {object} payload
 *
 * @return {object} An action object with a type of GET_CREDIT_EXPIRING_SUCCESS
 */
 export function getCreditExpiringDataSuccess(payload) {
  return {
    type: GET_CREDIT_EXPIRING_SUCCESS,
    payload,
  };
}

/**
 * Get Credit Usage Success
 *
 * @param  {object} payload
 *
 * @return {object} An action object with a type of GET_CREDIT_USAGE_DATA_SUCCESS
 */
 export function getCreditUsageDataSuccess(payload) {
  return {
    type: GET_CREDIT_USAGE_DATA_SUCCESS,
    payload,
  };
}

/**
 * Get Credit History Success
 *
 * @param  {object} payload
 *
 * @return {object} An action object with a type of GET_CREDIT_HISTORY_DATA_SUCCESS
 */
 export function getCreditHistoryDataSuccess(payload) {
  return {
    type: GET_CREDIT_HISTORY_DATA_SUCCESS,
    payload,
  };
}

/**
 * Get Profile Failed
 *
 * @return {object} An action object with a type of GET_PROFILE_DATA_FAILED
 */
 export function getProfileDataFailed(payload) {
  return {
    type: GET_PROFILE_DATA_FAILED,
  };
}

/**
 * Get Credit Expiring Failed
 *
 * @return {object} An action object with a type of GET_CREDIT_EXPIRING_FAILED
 */
 export function getCreditExpiringDataFailed(payload) {
  return {
    type: GET_CREDIT_EXPIRING_FAILED,
  };
}

/**
 * Get Credit Usage Failed
 *
 * @return {object} An action object with a type of GET_CREDIT_USAGE_DATA_FAILED
 */
 export function getCreditUsageDataFailed(payload) {
  return {
    type: GET_CREDIT_USAGE_DATA_FAILED,
  };
}

/**
 * Get Credit History Failed
 *
 * @return {object} An action object with a type of GET_CREDIT_HISTORY_DATA_FAILED
 */
 export function getCreditHistoryDataFailed(payload) {
  return {
    type: GET_CREDIT_HISTORY_DATA_FAILED,
  };
}

/**
 * Change Credit History
 *
 * @param  {object} payload
 *
 * @return {object} An action object with a type of CHANGE_CREDIT_HISTORY
 */
 export function changeCreditHistory(payload) {
  return {
    type: CHANGE_CREDIT_HISTORY,
    payload,
  };
}

/**
 * Change Credit Expiring
 *
 * @param  {object} payload
 *
 * @return {object} An action object with a type of CHANGE_CREDIT_EXPIRING_DETAIL
 */
 export function changeCreditExpiringDetail(payload) {
  return {
    type: CHANGE_CREDIT_EXPIRING_DETAIL,
    payload,
  };
}

/**
 * Change Credit Expiring Success
 *
 * @param  {object} payload
 *
 * @return {object} An action object with a type of GET_CREDIT_EXPIRING_DETAIL_SUCCESS
 */
 export function getCreditExpiringDetailSuccess(payload) {
  return {
    type: GET_CREDIT_EXPIRING_DETAIL_SUCCESS,
    payload,
  };
}

/**
 * Change Credit Expiring Failed
 *
 * @return {object} An action object with a type of GET_CREDIT_EXPIRING_DETAIL_FAILED
 */
 export function getCreditExpiringDetailFailed(payload) {
  return {
    type: GET_CREDIT_EXPIRING_DETAIL_FAILED,
  };
}