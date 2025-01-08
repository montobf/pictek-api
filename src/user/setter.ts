import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

async function setUser(userInfo, profil) : Promise<User>   {
    const user = new User();

    user.username = userInfo.username;
    user.mail = userInfo.mail;
    user.password = await setUserPassword();
    user.profiles = profil;

    return user;
}

async function setUserPassword(length: number = 12): Promise<string> {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    const allChars = uppercase + lowercase + numbers + specialChars;

    let password = '';

    // Garantir au moins un caractère de chaque type
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Remplir le reste du mot de passe
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Mélanger les caractères pour éviter un ordre prévisible
    const hashedPassword = await bcrypt.hash(password.split('').sort(() => Math.random() - 0.5).join(''), 10);

    return hashedPassword;

}

export {
    setUser
}