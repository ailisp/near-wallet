import React from 'react'
import { withRouter } from 'react-router-dom'

import { Image, Loader } from 'semantic-ui-react'

import Balance from '../common/Balance'

import MobileMenuImage from '../../images/icon-mobile-menu.svg'
import CloseImage from '../../images/icon-close.svg'
import ArrowDownImage from '../../images/icon-arrow-down.svg'
import milli from '../../images/n-1000-wht.svg'

import styled from 'styled-components'

const CustomDiv = styled('div')`
   overflow: hidden;
   width: 100%;
   cursor: pointer;
   font-family: 'benton-sans', sans-serif;
   font-weight: 600;
   
   > div {
      .account-img {
         padding-left: 6px;
         float: left;
         
         margin-top: 18px;
         margin-right: 10px;

         > div {
            background: #4a4f54 !important;
         }
      }
      .overflow {
         overflow: hidden;
      }
      .account-arrow {
         float: right;
         padding-right: 14px;
         padding-left: 14px;
         padding-top: 24px;
         img {
            width: 20px;
         }
         &.desktop {
            padding-top: 32px;
            padding-right: 26px;
            img {
               width: 12px;
            }
         }
      }
      .account-tokens {
         font-size: 18px;
         color: #8fd6bd;
         font-weight: 300;
         line-height: 24px;
      }
      .account-name {
         overflow: hidden;
         text-overflow: ellipsis;
         font-size: 16px;
         color: #fff;
         margin-top: 16px;

         :hover {
            color: #fff;
         }
      }
      .node-staking {
         > div {
            > div {
               float: left;
            }
            .staking {
               color: #999;
               font-size: 14px;
               line-height: 26px;
            }
         }
      }
   }
`

const PopupMenuTrigger = ({ account, handleClick, type, dropdown = false, location }) => (
   <CustomDiv onClick={handleClick}>
      <div>
         <div className={`account-arrow ${type}`}>
            {type === 'mobile' && (
               <Image src={dropdown ? MobileMenuImage : CloseImage} />
            )}
            {type === 'desktop' && <Image src={ArrowDownImage} />}
         </div>
         <div className='overflow'>
            <div className='account-name'>
               {account.loader || !account.accountId ? (
                  <Loader active inline size='mini' />
               ) : (
                  `@${account.accountId}`
               )}
            </div>
            <div className={`account-tokens ${location.pathname === `/node-staking` ? `node-staking` : ``}`}>
               {account.loader || !account.accountId ? (
                  <Loader active inline size='mini' />
               ) : (
                     <div>
                        {account.amount 
                        ? <Balance amount={account.amount} milli={milli} /> 
                        : 'NaN'}

                        {location.pathname === '/node-staking' && (
                           <div className='staking'>&nbsp;/ 202,250.0025</div>
                        )}
                     </div>
                  )}
            </div>
         </div>
      </div>
   </CustomDiv>
)

export default withRouter(PopupMenuTrigger)
