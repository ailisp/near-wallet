import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import { getAccountDetails, removeAccessKey } from '../../actions/account'

import AuthorizedAppsEmpty from './AuthorizedAppsEmpty'
import PaginationBlock from '../pagination/PaginationBlock'
import ListItem from '../dashboard/ListItem'
import PageContainer from '../common/PageContainer';

import AppDefaultImage from '../../images/icon-app-default.svg'

class AuthorizedApps extends Component {
   state = {
      loader: true,
      showSub: false,
      showSubOpen: 0,
      showSubData: [],
      authorizedApps: [],
      filterTypes: [
         { img: '', name: 'ALL' },
         { img: '', name: 'ALL' },
         { img: '', name: 'ALL' },
         { img: '', name: 'ALL' }
      ]
   }

   toggleShowSub = (i, row) => {
      i = i == null ? this.state.showSubOpen : i

      this.setState(state => ({
         showSub: true,
         showSubOpen: i,
         showSubData: row
      }))
   }

   toggleCloseSub = () => {
      this.setState(() => ({
         showSub: false,
         showSubOpen: 0,
         showSubData: []
      }))
   }

   handleDeauthorize = () => {
      const publicKey = this.state.showSubData[3]

      this.setState(() => ({
         loader: true
      }))

      this.props.removeAccessKey(publicKey).then(() => {
         this.toggleCloseSub()
         this.refreshAuthorizedApps()
      })
   }

   refreshAuthorizedApps = () => {
      this.setState(() => ({
         loader: true
      }))

      this.props.getAccountDetails().then(() => {
         this.setState(() => ({
            loader: false
         }))
      })
   }

   componentDidMount() {
      this.refreshAuthorizedApps()
   }

   render() {
      const {
         filterTypes,
         showSub,
         showSubOpen,
         showSubData
      } = this.state

      const { authorizedApps } = this.props

      return (
         <PageContainer
            title='Authorized Apps'
            additional={(
               <h1>
                  {authorizedApps && authorizedApps.length}
                  <span className='color-brown-grey'> total</span>
               </h1>
            )}
         >
            <PaginationBlock
               filterTypes={filterTypes}
               showSub={showSub}
               showSubData={showSubData}
               toggleShowSub={this.toggleShowSub}
               toggleCloseSub={this.toggleCloseSub}
               subPage='authorized-apps'
               handleDeauthorize={this.handleDeauthorize}
            >
               {authorizedApps && (authorizedApps.length 
                  ? authorizedApps.map((row, i) => (
                     <ListItem
                        key={`a-${i}`}
                        row={row}
                        i={i}
                        wide={true}
                        showSub={showSub}
                        toggleShowSub={this.toggleShowSub}
                        showSubOpen={showSubOpen}
                     />
                  )) : <AuthorizedAppsEmpty />)}
            </PaginationBlock>
         </PageContainer>
      )
   }
}

const mapDispatchToProps = {
   getAccountDetails,
   removeAccessKey
}

const mapStateToProps = ({ account }) => ({
   ...account,
   authorizedApps: account.authorizedApps
      ? account.authorizedApps.map(r => [
           AppDefaultImage,
           r.contractId,
           r.amount,
           r.publicKey
        ])
      : null
})

export const AuthorizedAppsWithRouter = connect(
   mapStateToProps,
   mapDispatchToProps
)(withRouter(AuthorizedApps))
