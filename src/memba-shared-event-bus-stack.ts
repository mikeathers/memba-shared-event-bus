import {Construct} from 'constructs'
import {Stack, StackProps} from 'aws-cdk-lib'
import CONFIG from './config'
import {CfnEventBusPolicy, EventBus} from 'aws-cdk-lib/aws-events'
import {Effect} from 'aws-cdk-lib/aws-iam'

interface MembaSharedEventBusStackProps extends StackProps {
  stage: string
}

export class MembaSharedEventBusStack extends Stack {
  constructor(scope: Construct, id: string, props: MembaSharedEventBusStackProps) {
    super(scope, id, props)

    const {stage} = props

    const eventBusName = `${CONFIG.STACK_PREFIX}EventBus-${stage}`

    const eventBus = new EventBus(this, eventBusName, {
      eventBusName,
    })

    const allowToPutEvents = {
      Principal: '*',
      Condition: {
        'ForAnyValue:StringLike': {
          'aws:PrincipalOrgPaths': [
            `${CONFIG.ORGANIZATION_ID}/${CONFIG.ORGANIZATION_ROOT_ID}/*`,
          ],
        },
      },
      Action: ['events:PutEvents'],
      Resource: [eventBus.eventBusArn],
      Effect: Effect.ALLOW,
    }

    new CfnEventBusPolicy(this, `allowToPutEvents`, {
      statementId: 'allowToPutEvents',
      eventBusName,
      statement: allowToPutEvents,
    })
  }
}
