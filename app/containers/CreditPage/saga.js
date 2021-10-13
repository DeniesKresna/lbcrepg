/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_DATA, CHANGE_CREDIT_HISTORY, CHANGE_CREDIT_EXPIRING_DETAIL } from './constants';
import request from '../../utils/api';
import { getProfileDataSuccess, getCreditExpiringDataSuccess, getCreditUsageDataSuccess, getCreditHistoryDataSuccess, getCreditExpiringDetailSuccess,
  getCreditExpiringDataFailed, getCreditUsageDataFailed, getCreditHistoryDataFailed, getCreditExpiringDetailFailed, getProfileDataFailed } from './actions';
import { makeSelectProfileClient, makeSelectProfileUser } from './selectors';

export function* getData(action) {
  let credentialIdParam = '';
  const email = action.payload.currentUserEmail;
  let url = 'users/profiles/details/';

  let profile = null;
  try{
    profile = yield call(request, 'POST', url, {email: email});
    yield put(getProfileDataSuccess(profile));
  }catch(error) {
    yield put(getProfileDataFailed());
  }

  const user_id = profile? profile.user.id : 0;
  const client_id = profile? profile.client.id : 0;

  credentialIdParam = '?client_id=' + client_id;
  if(leadbookApp){
    credentialIdParam = '?user_id=' + user_id;
  }

  //credit usage data
  url = '/credits/usage/' + credentialIdParam;
  let usage = null;
  try {
    usage = yield call(request, 'GET', url);
    yield put(getCreditUsageDataSuccess(usage));
  } catch (err) {
    yield put(getCreditUsageDataFailed());
  }

  //credit expiring data
  url = '/credits/expiring/' + credentialIdParam + '&page=1&page_size=3';
  let expiring = null;
  try {
    expiring = yield call(request, 'GET', url);
    yield put(getCreditExpiringDataSuccess(expiring));
  } catch (err) {
    yield put(getCreditExpiringDataFailed());
  }

  //credit transaction data
  url = '/credits/transactionentries/' + credentialIdParam + '&page=' + action.payload.historyPage + '&page_size=' + action.payload.historyPageSize;
  let history = null;
  try {
    history = yield call(request, 'GET', url);
    yield put(getCreditHistoryDataSuccess(history));
  } catch (err) {
    yield put(getCreditHistoryDataFailed());
  }
}

export function* changeCreditHistory(action){
  const client = yield select(makeSelectProfileClient());
  const user = yield select(makeSelectProfileUser());
  const client_id = client.id;
  const user_id = user.id;
  let credentialIdParam = '?client_id=' + client_id;
  if(leadbookApp){
    credentialIdParam = '?user_id=' + user_id;
  }
  const url = '/credits/transactionentries/' + credentialIdParam + '&page=' + action.payload.historyPage + '&page_size=' + action.payload.historyPageSize;
  let history = null;
  if(client_id != 0 || user_id != 0){
    try {
        history = yield call(request, 'GET', url);
        yield put(getCreditHistoryDataSuccess(history));
      }
    catch (err) {
      yield put(getCreditHistoryDataFailed());
    }
  }else{
    yield put(getCreditHistoryDataFailed());
  }
}

export function* changeCreditExpiringDetail(action){
  const client = yield select(makeSelectProfileClient());
  const user = yield select(makeSelectProfileUser());
  const client_id = client.id;
  const user_id = user.id;
  let credentialIdParam = '?client_id=' + client_id;
  if(leadbookApp){
    credentialIdParam = '?user_id=' + user_id;
  }
  const url = '/credits/expiring/' + credentialIdParam + '&page=' + action.payload.expiringDetailPage + '&page_size=' + action.payload.expiringDetailPageSize;
  let expiring = null;
  if(client_id != 0 || user_id != 0){
    try {
      expiring = yield call(request, 'GET', url);
      yield put(getCreditExpiringDetailSuccess(expiring));

    } catch (err) {
      yield put(getCreditExpiringDetailFailed());
    }
  }else{
    yield put(getCreditExpiringDetailFailed());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  yield takeLatest(GET_DATA, getData);
  yield takeLatest(CHANGE_CREDIT_HISTORY, changeCreditHistory);
  yield takeLatest(CHANGE_CREDIT_EXPIRING_DETAIL, changeCreditExpiringDetail);
}
