import { genTestUserSig } from '../utils/GenerateTestUserSig'
const SDKAPPID = genTestUserSig('').SDKAPPID
export default {
  SDKAPPID: SDKAPPID,
  CallTimeout: 30
}
