// import { EditUserInfo, UserInfo } from '../../models';
// import { SignInArgs } from '../../services';

// export class SignIn {
//   static readonly type = '[Auth] SignIn';
//   constructor(public readonly payload: SignInArgs = {}) {}
// }

// export class CompleteAuthentication {
//   static readonly type = '[Auth] CompleteAuthentication';
//   constructor(public readonly returnUrl?: string) {}
// }
// /*
// export class RevalidateSession {
//   static readonly type = '[Auth] RevalidateSession';
// }
// */
// export class LoggedIn {
//   static readonly type = '[Auth] LoggedIn';
//   constructor(public readonly returnUrl: string | null) {}
// }

// export class LogOut {
//   static readonly type = '[Auth] LogOut';
// }

// export class InvalidateSession {
//   static readonly type = '[Auth] InvalidateSession';
// }

// export class GetUserInfo {
//   static readonly type = '[Auth] GetUserInfo';
// }

// export class UserResolved {
//   static readonly type = '[Auth] UserResolved';
//   constructor(public readonly payload: UserInfo) {}
// }

// export class UpdateUserInfo {
//   static readonly type = '[Auth] UpdateUserInfo';
//   constructor(public readonly payload: EditUserInfo) {}
// }

// export class PromptAuthAction {
//   static readonly type = '[Auth] PromptAuthAction';
//   constructor(public readonly returnUrl?: string) {}
// }

// export class RedirectToSystem {
//   static readonly type = '[Auth] RedirectToSystem';
// }
