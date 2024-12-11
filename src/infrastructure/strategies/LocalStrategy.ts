import { PromiseHandle } from "../../shared/utils/PromiseHandle";
import { Strategy as LocalStrategy } from "passport-local";
import { EncryptionService } from "../../application/services/EncryptionService";
export class LocalStrategyService {
  constructor(private readonly findUserFunction: (value: string) => any) {}
  public getStategy(): any {
    return new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      async (username, password, done) => {
        const { data, error } = await PromiseHandle.wrapPromise<any>(
          this.findUserFunction(username)
        );
        if (!data || !EncryptionService.comparePassword(data.password, password) ||  error) {
          return done(null, false, { message: "Email ou senha incorretos" });
        }
        return done(null, data);
      }
    );
  }
}
