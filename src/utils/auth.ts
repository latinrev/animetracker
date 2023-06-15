import { createUser } from "@/services/userDb"
import { client } from "@/utils/prismaClient"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
export const authOptions: NextAuthOptions = ({

    pages: {
        signIn: "/?success=true",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log({ credentials, req })
                const { username, email, password, from } = credentials
                let user = await client.users.findFirst({ where: { email: credentials?.email } })
                console.log(user)
                if (!user && from !== "/login") user = await createUser({ username, email, password })
                if (user) {
                    let isPassword = await bcrypt.compare(password, user?.password)
                    if (isPassword) {
                        return user
                    }
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.user = user
            }
            return token
        },
        session({ session, token }) {
            if (token) {
                session.user = token
            }
            return session
        }
    }
})


