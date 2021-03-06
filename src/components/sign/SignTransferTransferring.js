import React from 'react'

import MobileContainer from './MobileContainer'
import SignAnimatedArrow from './SignAnimatedArrow'

import { Grid } from 'semantic-ui-react'

const SignTransferReady = ({ transferTransferringStart, transferTransferringPending, transferTransferringEnd }) => (
   <MobileContainer>
      <Grid padded>
         <Grid.Row centered>
            <Grid.Column
               textAlign='center'
               className='authorize'
            >
               <SignAnimatedArrow
                  start={transferTransferringStart}
                  pending={transferTransferringPending}
                  end={transferTransferringEnd}
               />
            </Grid.Column>
         </Grid.Row>
         <Grid.Row className='title'>
            <Grid.Column
               as='h2'
               textAlign='center'
            >
               <span className='font-bold transferring-dots'>Transferring</span> 
            </Grid.Column>
         </Grid.Row>
      </Grid>
      <Grid padded>
         <Grid.Row centered className='contract'>
            <Grid.Column
               largeScreen={12}
               computer={14}
               tablet={16}
               textAlign='center'
            >
               Contract: @contractname.near
            </Grid.Column>
         </Grid.Row>
      </Grid>
   </MobileContainer>
)

export default SignTransferReady
