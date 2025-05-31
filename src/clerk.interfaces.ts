import type { SignedInAuthObject, SignedOutAuthObject } from '@clerk/backend/internal'

export type AuthEntity = () => SignedInAuthObject | SignedOutAuthObject
