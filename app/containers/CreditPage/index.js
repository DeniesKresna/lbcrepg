/*
 * CreditPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getData, changeCreditHistory, changeCreditExpiringDetail } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectProfileClient, makeSelectProfileUser, makeSelectUsage, makeSelectExpiring, makeSelectHistory,
  makeSelectProfileLoading, makeSelectExpiringLoading , makeSelectUsageLoading, makeSelectHistoryLoading, makeSelectExpiringDetailLoading,
  makeSelectExpiringDetail  } from './selectors';

import CustomProgress from '../../components/CustomProgress';
import Header from '../../components/Header';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Typography from 'antd/lib/typography';
import Card from 'antd/lib/card';
import Image from 'antd/lib/image';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Pagination from 'antd/lib/pagination';
import Spin from 'antd/lib/spin';
import Modal from 'antd/lib/modal';

const { Text, Title, Link } = Typography; 

const key = 'creditPage';

export function CreditPage({
  onGetData,
  onCreditHistoryChange,
  onCreditExpiringDetailChange,
  profileClient,
  profileUser,
  usage,
  expiring,
  expiringDetail,
  expiringDetailLoading,
  history,
  profileLoading,
  historyLoading,
  usageLoading,
  expiringLoading
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onGetData(creditUsageParams);
  }, []);
  
  const [creditUsageParams, setCreditUsageParams] = useState({
    //currentUserEmail: "faysal+test1@leadbook.com",
    currentUserEmail: mauticUserInfo.email,
    historyPage: 1,
    historyPageSize: 10
  });
  const [historyPage, setHistoryPage] = useState(1);
  const [historyPageSize, setHistoryPageSize] = useState(10);
  const [expiringPage, setExpiringPage] = useState(1);
  const [expiringPageSize, setExpiringPageSize] = useState(10);
  const [isCreditExpiringModalVisible, setIsCreditExpiringModalVisible] = useState(false);

  const block = {
    borderStyled: "solid",
    borderColor: "#D9D9D9"
  }

  const ButtonContainer = styled.div`
  .ant-btn-text {
    background: #33CC99;
    color: white;
    width: 100%;
  }
`;

  const centering = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  const readableDate = (val) => {
      var thedate = new Date(val);
      var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][thedate.getMonth()];
      var str = month + ' ' + thedate.getDate() + ', ' + thedate.getFullYear();
      return str;
  }

  const profileBalance= () => {
    if(leadbookApp){
      if(profileUser.credits != undefined){
        return profileUser.credits.balance;
      }
    }else{
      if(profileClient.credits != undefined){
        return profileClient.credits.balance;
      }
    }
    return "0.00";
  }
  const lastPurchased = expiring.results.length? readableDate(expiring.results[0].transaction_details.created_at) : '';

  const populateCreditExpiringData = (data)=> {
    let mappedData = [];
    if(data.results != undefined){
      const results = data.results;

      results.map(item => {
        let temp = {}
        temp.key = item.id,
        temp.transactionDate = readableDate(item.transaction_details.created_at),
        temp.expiryDate = readableDate(item.transaction_details.expire_date),
        temp.credits = item.amount
        mappedData.push(temp);
      });
    }
    return mappedData;
  }
  
  const creditExpiring = {
    columns: [{
        title: 'Transaction Date',
        dataIndex: 'transactionDate'
      },{
        title: 'Expiry Date',
        dataIndex: 'expiryDate'
      },{
        title: 'Credits',
        dataIndex: 'credits'
      },
    ],
    data: populateCreditExpiringData(expiring),
  }

  const creditExpiringDetail = {
    columns: [{
        title: 'Transaction Date',
        dataIndex: 'transactionDate'
      },{
        title: 'Expiry Date',
        dataIndex: 'expiryDate'
      },{
        title: 'Credits',
        dataIndex: 'credits'
      },
    ],
    data: populateCreditExpiringData(expiringDetail),
  }

  const setCreditExpiring = (pageNumber, pageSize) => {
    let cep = {};
    cep.expiringDetailPage = pageNumber;
    cep.expiringDetailPageSize = pageSize;
    setExpiringPage(pageNumber);
    setExpiringPageSize(pageSize);
    onCreditExpiringDetailChange(cep);
  }

  const handleCreditExpiringModalOk = () => {
    setIsCreditExpiringModalVisible(false);
  };

  const showCreditExpiringModal = () => {
    let cep = {};
    cep.expiringDetailPage = expiringPage;
    cep.expiringDetailPageSize = expiringPageSize;
    onCreditExpiringDetailChange(cep);
    setIsCreditExpiringModalVisible(true);
  }

  const totalProgress = () => {
    let totalValue = 0;
    for(const key in usage.type){
      totalValue += parseInt(usage.type[key]);
    }
    return totalValue;
  }

  const progressData = [
    {
      name: 'Rent list',
      value: usage.type.data_rent.toFixed(2),
      color: 'blue'
    },
    {
      name: 'Data Services',
      value: usage.type.data_service.toFixed(2),
      color: 'purple'
    },
    {
      name: 'Purchase list',
      value: usage.type.data_purchase.toFixed(2),
      color: 'orange'
    },
    {
      name: 'Campaign Services',
      value: usage.type.campaign_service.toFixed(2),
      color: 'yellow'
    },
    {
      name: 'Email Verification',
      value: usage.type.data_verification.toFixed(2),
      color: '#6ab04c'
    },
    {
      name: 'Others',
      value: usage.type.others.toFixed(2),
      color: 'grey'
    }
  ];

  const populateCreditHistoryData = (data)=> {
    let mappedData = [];
    if(data.results != undefined){
      const results = data.results;
      results.map(item => {
        let temp = {}
        temp.key = item.id,
        temp.date = readableDate(item.transaction_details.created_at),
        temp.reference = item.transaction_details.reference,
        temp.performedBy = item.transaction_details.user.email,
        temp.transactionDesc = item.transaction_details.transaction_type,
        temp.credits = item.transaction_details.amount,
        temp.balance = item.current_balance
        mappedData.push(temp);
      });
    }
    return mappedData;
  }

  const creditHistory = {
    data: populateCreditHistoryData(history),
    columns: [{
        title: 'Date',
        dataIndex: 'date'
      },{
        title: 'Reference',
        dataIndex: 'reference'
      },{
        title: 'Performed By',
        dataIndex: 'performedBy'
      },{
        title: 'Transaction Description',
        dataIndex: 'transactionDesc'
      },{
        title: 'Credits',
        dataIndex: 'credits'
      },{
        title: 'Balance',
        dataIndex: 'balance'
      },
    ],
  };

  const setCreditHistory = (pageNumber, pageSize) => {
    let cup = {...creditUsageParams};
    cup.historyPage = pageNumber;
    cup.historyPageSize = pageSize;
    setHistoryPage(pageNumber);
    setHistoryPageSize(pageSize);
    onCreditHistoryChange(cup);
  }

  const clickAddCredits = () => {
    document.querySelector('.add-credits').click();
  }

  return (
    <article>
      <Header
          style={{
            padding: 15,
            backgroundColor: 'rgba(213,219,219,0.25)',
            border: '1px solid #D5DBDB',
          }}
        />
      <div>
        <Row>
          <Col span={12} style={{padding: "24px"}}>
            <Row>
              <Col span={24}>
                <Card>
                  <Row>
                    <Col span={12}>
                      { profileLoading? <Spin /> : 
                        <div>
                          <Text>Current Credit Balance</Text>
                          <Title level={3} style={{margin: 0}}>{profileBalance()}</Title>
                          <Text type="secondary">{lastPurchased.length? "Last Purchase on " + lastPurchased:""}</Text>
                        </div>
                      }
                    </Col>
                    <Col span={12}>
                      <div style={{centering}}>
                        <ButtonContainer>
                          <Button type="text" size="large" onClick={clickAddCredits} >
                            Add Credits
                          </Button>
                        </ButtonContainer>
                      </div>
                    </Col>
                  </Row>
                </Card>
                <Card style={{marginTop: "24px"}}>
                  <Row>
                    <Col span={24}>
                      { expiringLoading? <Spin /> : 
                        <div>
                          <div style={{textAlign: "center"}}><b>Credit expiring soon</b></div>
                          <Table columns={creditExpiring.columns} dataSource={creditExpiring.data} size="small" pagination={false} />
                          <div style={{textAlign: "center", marginTop: "10px"}}><a onClick={showCreditExpiringModal}>See all</a></div>

                          <Modal title="Credit Expiring detail" visible={isCreditExpiringModalVisible} onOk={handleCreditExpiringModalOk} onCancel={handleCreditExpiringModalOk}>
                            { expiringDetailLoading? <Spin /> : 
                              <div>
                                <Table columns={creditExpiringDetail.columns} dataSource={creditExpiringDetail.data} size="small" pagination={false}/>
                                <Pagination 
                                  style={{marginTop: '10px'}}
                                  showLessItems={true}
                                  onChange={setCreditExpiring}
                                  total={expiring.count}
                                  defaultCurrent={expiringPage}
                                  pageSize={expiringPageSize}
                                  pageSizeOptions={[10,20,30,50,100]}
                                  locale={{ items_per_page: ""}}
                                  />
                              </div>
                            }
                          </Modal>
                        </div>
                      }
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{padding: "24px"}}>
            <Row>
              <Col span={24}>
                <Card>
                  <div style={{textAlign: "center"}}><Title level={4}>How to spend credits</Title></div>
                  <Row>
                    <Col span={12}>
                      <Row>
                        <Col>
                          <Image src={require('../../assets/images/cart.png')} width={40} />
                        </Col>
                        <Col style={{paddingLeft: "8px"}}>
                          <div><strong><a href="/s/new-audience">Purchase list &gt;</a></strong></div>
                          <div><b>1 credit</b>/contact</div>
                        </Col>
                      </Row>
                      <Row style={{marginTop: "20px"}}>
                        <Col>
                          <Image src={require('../../assets/images/inbox.png')} width={40} />
                        </Col>
                        <Col style={{paddingLeft: "8px"}}>
                          <div><strong><a href="/s/contacts">Email verification &gt;</a></strong></div>
                          <div><b>0.03 credits</b>/email</div>
                        </Col>
                      </Row>
                      <Row style={{marginTop: "20px"}}>
                        <Col>
                          <Image src={require('../../assets/images/rent.png')} width={40} />
                        </Col>
                        <Col style={{paddingLeft: "8px"}}>
                          <div><strong><a href="/s/new-audience">Rent list &gt;</a></strong></div>
                          <div><b>0.5 credits</b>/contact/year</div>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={12}>
                      <Row>
                        <Col>
                          <Image src={require('../../assets/images/cart.png')} width={40} />
                        </Col>
                        <Col style={{paddingLeft: "8px"}}>
                          <div><strong><a href="mailto:support@leadbook.com">Campaign services &gt;</a></strong></div>
                          <div><b>110 credits</b>/hour</div>
                        </Col>
                      </Row>
                      <Row>
                        <div>
                          <small>Get help from a Leadbook Email Specialist to <br />create and set up emails, forms, landing <br/> pages and more.</small>
                        </div>
                      </Row>
                      <Row style={{marginTop: "10px"}}>
                        <Col>
                          <Button href="mailto:support@leadbook.com"><Text>Request Campaign Services</Text></Button>
                        </Col>
                      </Row>
                      <Row style={{marginTop: "14px"}}>
                        <Col>
                          <Image src={require('../../assets/images/telegram.png')} width={40} />
                        </Col>
                        <Col style={{paddingLeft: "8px"}}>
                          <div><strong><a href="mailto:support@leadbook.com">Data services &gt;</a></strong></div>
                          <div><b>110 credits</b>/hour</div>
                        </Col>
                      </Row>
                      <Row>
                        <div>
                          <small>For custom data requests like additional <br />data fields. data enrichments, list cleansing,<br/> ABS search, list matching and more.</small>
                        </div>
                      </Row>
                      <Row style={{marginTop: "10px"}}>
                        <Col>
                          <Button href="mailto:support@leadbook.com"><Text>Request Data Services</Text></Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{paddingLeft: "24px"}}>
          <b>Past credit usage</b>
        </Row>
        { usageLoading? <Spin /> : 
        <Row>
          <Col span={12}>
            <Row style={{padding: "24px"}}>
              <Col span={24}>
                <Row justify="space-between">
                  
                      <Col span={11}>
                        <Card style={{textAlign: "center", paddingBottom: "73px"}}>
                          <div><b>Credit used this month</b></div>
                          <Title level={3} style={{margin: 0}}>{usage.last_month}</Title>
                          <Text type="secondary">credits</Text>
                        </Card>
                      </Col>
                      <Col span={11}>
                        <Card style={{textAlign: "center", paddingBottom: "73px"}}>
                          <div><b>Credit used in last 3 months</b></div>
                          <Title level={3} style={{margin: 0}}>{usage.last_three_month}</Title>
                          <Text type="secondary">credits</Text>
                        </Card>
                      </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row style={{padding: "24px"}}>
                  <Col span={24}>
                    <Card>
                      <div><b>Credit usage by type</b></div>
                      {totalProgress() > 0?
                        <div style={{textAlign: "center"}}><CustomProgress progressData={progressData}/></div> : 
                        <div>No Data</div>
                      }
                    </Card>
                  </Col>
            </Row>
          </Col>
        </Row>
        }
        <Row style={{paddingLeft: "24px"}}>
          <b>Credit History</b>
        </Row>
        { historyLoading? <Spin /> : 
          <Row style={{padding: "24px"}}>
                <Col span={24}>
                  <Table columns={creditHistory.columns} dataSource={creditHistory.data} size="small" pagination={false} />
                  <Pagination
                    style={{ marginTop: '10px', float:'right'}}
                    onChange= {setCreditHistory}
                    total= {history.count}
                    showSizeChanger= {true}
                    defaultCurrent={historyPage}
                    pageSize={historyPageSize}
                    pageSizeOptions={[10,20,30,50,100]}
                    locale={{ items_per_page: ""}}
                  />
                </Col>
          </Row>
        }
              
      </div>
    </article>
  );
}

CreditPage.propTypes = {
  onGetData: PropTypes.func,
  onCreditHistoryChange: PropTypes.func,
  onCreditExpiringDetailChange: PropTypes.func,
  profileUser: PropTypes.object,
  profileClient: PropTypes.object,
  usage: PropTypes.object,
  expiring: PropTypes.object,
  expiringDetail: PropTypes.object,
  history: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  profileUser: makeSelectProfileUser(),
  profileClient: makeSelectProfileClient(),
  usage: makeSelectUsage(),
  expiringDetail: makeSelectExpiringDetail(),
  expiring: makeSelectExpiring(),
  history: makeSelectHistory(),
  profileLoading: makeSelectProfileLoading(), 
  expiringLoading: makeSelectExpiringLoading(), 
  expiringDetailLoading: makeSelectExpiringDetailLoading(), 
  usageLoading: makeSelectUsageLoading(), 
  historyLoading: makeSelectHistoryLoading()
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetData: payload => dispatch(getData(payload)),
    onCreditHistoryChange: payload => dispatch(changeCreditHistory(payload)),
    onCreditExpiringDetailChange: payload => dispatch(changeCreditExpiringDetail(payload))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CreditPage);
