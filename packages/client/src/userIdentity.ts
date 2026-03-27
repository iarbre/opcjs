import { IssuedIdentityToken, UserIdentityToken, UserNameIdentityToken, UserTokenTypeEnum } from "opcjs-base";
import { IssuerConfiguration } from "./configuration/issuerConfiguration";
import { IssuerToken } from "./issuerToken";
import { AnonymousIdentityToken } from "opcjs-base";

export class UserIdentity {
    private userIdentityToken?: UserIdentityToken;
    private tokenType = UserTokenTypeEnum.Anonymous;
    private issuerLoginCallback: ((config:IssuerConfiguration)=>Promise<IssuerToken>) | undefined = undefined;

    public static newAnonymous(): UserIdentity {
        const userIdentity = new UserIdentity();
        userIdentity.userIdentityToken = new AnonymousIdentityToken();
        userIdentity.userIdentityToken.policyId = "anonymous";
        userIdentity.tokenType = UserTokenTypeEnum.Anonymous;
        return userIdentity;
    }
    
    public static newWithUserName(userName: string, password: string): UserIdentity {
        const userIdentity = new UserIdentity();
        const nameToken = new UserNameIdentityToken();
        nameToken.userName = userName;
        nameToken.password = new TextEncoder().encode(password);

        userIdentity.userIdentityToken = nameToken;
        userIdentity.tokenType = UserTokenTypeEnum.UserName;
        return userIdentity;
    }

    public static newWithIssuerToken(loginCallback: (config:IssuerConfiguration)=>Promise<IssuerToken>): UserIdentity {
        const userIdentity = new UserIdentity();
        const issuedToken = new IssuedIdentityToken();
        issuedToken.tokenData = new TextEncoder().encode(""); // token data will be filled by the login callback 
        userIdentity.userIdentityToken = issuedToken;
        userIdentity.tokenType = UserTokenTypeEnum.IssuedToken;
        userIdentity.issuerLoginCallback = loginCallback;
        return userIdentity;
    }

    public getUserIdentityToken(): UserIdentityToken {
        return this.userIdentityToken as UserIdentityToken;
    }

    public getTokenType(): UserTokenTypeEnum {
        return this.tokenType;
    }

    public getIssuerLoginCallback(): ((config:IssuerConfiguration)=>Promise<IssuerToken>) {
        if(!this.issuerLoginCallback){
            throw new Error("No issuer login callback defined");
        }
        
        return this.issuerLoginCallback;
    }
}
