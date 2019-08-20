import React, { Component } from 'react'
import { connect } from 'react-redux'

import FormButton from '../common/FormButton'
import MobileContainer from './MobileContainer'
import SignAnimatedArrow from './SignAnimatedArrow'
import SelectAccountDropdown from '../login/SelectAccountDropdown'

import { handleRefreshAccount, switchAccount } from '../../actions/account'

import { Grid, Form } from 'semantic-ui-react'

class SignTransferReady extends Component {
   state = {
      dropdown: false
   }

   handleOnClick = () => {
      this.setState({
         dropdown: !this.state.dropdown
      })
   }

   handleSelectAccount = accountId => {
      this.props.switchAccount(accountId)
      this.props.handleRefreshAccount(this.props.history)
   }

   redirectCreateAccount = () => {
      this.props.history.push('/create')
   }

   render() {
      const { appTitle = 'CryptoCorgis', transferTransfering, handleAllow, handleDeny, account } = this.props
      const { dropdown } = this.state

      return (
         <MobileContainer>
            <Grid>
               <Grid.Row centered>
                  <Grid.Column
                     textAlign='center'
                     className='authorize'
                     
                  >
                     <SignAnimatedArrow animate={transferTransfering}  />
                  </Grid.Column>
               </Grid.Row>
               <Grid.Row className='title'>
                  <Grid.Column
                     as='h2'
                     textAlign='center'
                     computer={16}
                     tablet={16}
                     mobile={16}
                  >
                     <span className='font-bold'>{appTitle} </span> 
                     wants to 
                     <span className='font-bold'> withdraw 1.345 Ⓝ </span>
                  </Grid.Column>
               </Grid.Row>
               <Grid.Row className='estimated'>
                  <Grid.Column
                     textAlign='center'
                     computer={16}
                     className='fees'
                  >
                     Estimated Fees: .00043 Ⓝ
                  </Grid.Column>
                  <Grid.Column
                     textAlign='center'
                     computer={16}
                     className='gas'
                  >
                     Gas Limit: 21000
                  </Grid.Column>
                  <Grid.Column
                     textAlign='center'
                     computer={16}
                     className='gas'
                  >
                     Gas Price: .0000000021 Ⓝ
                  </Grid.Column>
               </Grid.Row>
            </Grid>
            <Grid>
               <Grid.Row centered>
                  <Grid.Column largeScreen={6} computer={8} tablet={10} mobile={16}>
                     <SelectAccountDropdown
                        handleOnClick={this.handleOnClick}
                        account={account}
                        dropdown={dropdown}
                        handleSelectAccount={this.handleSelectAccount}
                        redirectCreateAccount={this.redirectCreateAccount}
                     />
                  </Grid.Column>
               </Grid.Row>
               <Grid.Row centered>
                  <Grid.Column largeScreen={6} computer={8} tablet={10} mobile={16}>
                     <Form onSubmit={handleAllow}>
                        <input
                           type='hidden'
                           name='accountId'
                           // value={account.accountId}
                        />

                        <FormButton
                           color='gray-white'
                           onClick={handleDeny}
                        >
                           DENY
                        </FormButton>

                        <FormButton
                           type='submit'
                           color='blue'
                        >
                           ALLOW
                        </FormButton>
                     </Form>
                  </Grid.Column>
               </Grid.Row>
               <Grid.Row className='contract'>
                  <Grid.Column>
                     Contract: @contractname.near
                  </Grid.Column>
               </Grid.Row>
            </Grid>
         </MobileContainer>
      )
   }
}

const mapDispatchToProps = {
   handleRefreshAccount,
   switchAccount,
}

const mapStateToProps = ({ account }) => ({
   account
})

export default connect(mapStateToProps, mapDispatchToProps)(SignTransferReady)