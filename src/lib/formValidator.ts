import type { UserAuthForm } from "@/types"
import { validate } from "email-validator";

export const registerValidator = (body: UserAuthForm['register']) => {

    const { username, password, email, name } = body;

    if (!username || username.trim().length < 6) {
        throw new Error("Username harus diisi minimal 6 karakter!");
    }

    if (!name || name.trim().length < 3) {
        throw new Error("Nama harus diisi!");
    }

    if (!email || !validate(email)) {
        throw new Error("Email harus diisi dengan email yang valid!");
    }

    if (!password || password.trim().length < 6) {
        throw new Error("Password harus diisi minimal 6 karakter!");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
        throw new Error("Password harus mengandung minimal 8 karakter, terdiri dari huruf besar, huruf kecil, dan angka!");
    }
}


export const loginValidator = (body: UserAuthForm['login']) => {
    const { identifier, password } = body
    if (!identifier || identifier.trim().length < 6) {
        throw new Error("Harap isi username atau email dengan benar");
    }

    if (!password || password.trim().length < 6) {
        throw new Error("Password harus diisi minimal 6 karakter!");
    }
}

export const verifyOtpValidator = (body: UserAuthForm['verify']) => {
    const { otp, identifier } = body
    if (!identifier || identifier.trim().length < 6) {
        throw new Error("Harap isi username atau email dengan benar");
    }
    if (!otp || otp.trim().length < 6 || !+otp) {
        throw new Error("OTP hanya bisa diisi 6 digit angka");
    }
}