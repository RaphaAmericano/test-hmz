import bcrypt from 'bcrypt'

export class EncryptionService
 {
    private readonly saltRounds: number = 10;
    
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    static async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

}