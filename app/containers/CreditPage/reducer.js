/*
 * CreditPageReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { GET_DATA, GET_PROFILE_DATA_SUCCESS, GET_CREDIT_EXPIRING_SUCCESS, GET_CREDIT_USAGE_DATA_SUCCESS, GET_CREDIT_HISTORY_DATA_SUCCESS, CHANGE_CREDIT_HISTORY, GET_CREDIT_EXPIRING_DETAIL_SUCCESS, CHANGE_CREDIT_EXPIRING_DETAIL,
  GET_PROFILE_DATA_FAILED, GET_CREDIT_EXPIRING_FAILED, GET_CREDIT_USAGE_DATA_FAILED, GET_CREDIT_HISTORY_DATA_FAILED, GET_CREDIT_EXPIRING_DETAIL_FAILED } from './constants';

// The initial state of the App
export const initialState = {
  profile: {
    user: {},
    client: {
      credits: {
        balance: 0
      }
    }
  },
  expiring: {
    results: []
  },
  expiringDetail: {
    count: 0,
    results: []
  },
  usage: {
    last_month: 0,
    last_three_month: 0,
    type: {
        data_rent: 0,
        data_service: 0,
        data_purchase: 0,
        campaign_service: 0,
        data_verification: 0,
        others: 0
    }
  },
  history: {
    count: 0,
    results: []
  },
  loading: {
    profile: false,
    expiring: false,
    expiringDetail: true,
    usage: false,
    history: false,
  }
};

/* eslint-disable default-case, no-param-reassign */
const creditPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DATA:
        draft.loading.profile = true
        draft.loading.expiring = true
        draft.loading.usage = true
        draft.loading.history = true
        break;
      case GET_PROFILE_DATA_SUCCESS:
        draft.profile = action.payload
        draft.loading.profile = false
        break;
      case GET_CREDIT_EXPIRING_SUCCESS:
        draft.expiring = action.payload
        draft.loading.expiring = false
        break;
      case GET_CREDIT_USAGE_DATA_SUCCESS:
        draft.usage = action.payload
        draft.loading.usage = false
        break;
      case GET_CREDIT_HISTORY_DATA_SUCCESS:
        draft.history = action.payload
        draft.loading.history = false
        break;
      case CHANGE_CREDIT_HISTORY:
        draft.loading.history = true
        break;
      case CHANGE_CREDIT_EXPIRING_DETAIL:
        draft.loading.expiringDetail = true
        break;
      case GET_CREDIT_EXPIRING_DETAIL_SUCCESS:
        draft.expiringDetail = action.payload
        draft.loading.expiringDetail = false
        break;
      case GET_PROFILE_DATA_FAILED:
        draft.loading.profile = false
        break;
      case GET_CREDIT_EXPIRING_FAILED:
        draft.loading.expiring = false
        break;
      case GET_CREDIT_USAGE_DATA_FAILED:
        draft.loading.usage = false
        break;
      case GET_CREDIT_HISTORY_DATA_FAILED:
        draft.loading.history = false
        break;
      case GET_CREDIT_EXPIRING_DETAIL_FAILED:
        draft.loading.expiringDetail = false
        break;
    }
  });

export default creditPageReducer;
