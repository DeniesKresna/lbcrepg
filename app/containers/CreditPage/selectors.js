/**
 * CreditPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCreditPage = state => state.creditPage || initialState;

const makeSelectProfile = () =>
  createSelector(
    selectCreditPage,
    subState => subState.profile,
  );

const makeSelectProfileUser = () =>
  createSelector(
    selectCreditPage,
    subState => subState.profile.user,
  );

const makeSelectProfileClient = () =>
  createSelector(
    selectCreditPage,
    subState => subState.profile.client,
  );

const makeSelectUsage = () =>
  createSelector(
    selectCreditPage,
    subState => subState.usage,
  );

const makeSelectExpiring = () =>
  createSelector(
    selectCreditPage,
    subState => subState.expiring,
  );

const makeSelectExpiringDetail = () =>
  createSelector(
    selectCreditPage,
    subState => subState.expiringDetail,
  );

const makeSelectHistory = () =>
  createSelector(
    selectCreditPage,
    subState => subState.history,
  );


//loading bar
const makeSelectProfileLoading = () =>
  createSelector(
    selectCreditPage,
    subState => subState.loading.profile,
  );

const makeSelectExpiringLoading = () =>
  createSelector(
    selectCreditPage,
    subState => subState.loading.expiring,
  );

const makeSelectExpiringDetailLoading = () =>
  createSelector(
    selectCreditPage,
    subState => subState.loading.expiringDetail,
  );

const makeSelectUsageLoading = () =>
  createSelector(
    selectCreditPage,
    subState => subState.loading.usage,
  );

const makeSelectHistoryLoading = () =>
  createSelector(
    selectCreditPage,
    subState => subState.loading.history,
  );

export { makeSelectProfileUser, makeSelectProfileClient, makeSelectUsage, makeSelectExpiring, makeSelectHistory,
  makeSelectProfileLoading, makeSelectExpiringLoading , makeSelectUsageLoading, makeSelectHistoryLoading, makeSelectExpiringDetailLoading,
  makeSelectExpiringDetail };
