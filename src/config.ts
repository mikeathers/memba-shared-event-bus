interface ConfigProps {
  STACK_PREFIX: string
  REGION: string
  AWS_ACCOUNT_ID_PROD: string
  AWS_ACCOUNT_ID_DEV: string
  ORGANIZATION_ID: string
  ORGANIZATION_ROOT_ID: string
}

const CONFIG: ConfigProps = {
  STACK_PREFIX: 'SharedEventBus',
  REGION: 'eu-west-2',
  AWS_ACCOUNT_ID_PROD: '635800996936',
  AWS_ACCOUNT_ID_DEV: '544312030237',
  ORGANIZATION_ID: 'o-d0llr53ux1',
  ORGANIZATION_ROOT_ID: 'r-2hgv',
}

export default CONFIG
