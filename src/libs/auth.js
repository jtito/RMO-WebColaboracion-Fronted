// Third-party Imports
import CredentialProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  // ** Configure one or more authentication providers
  // ** Please refer to https://next-auth.js.org/configuration/options#providers for more `providers` options
  providers: [
    CredentialProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/login/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          })

          const data = await res.json()

          if (res.status === 401) {
            throw new Error(JSON.stringify(data))
          }

          console.log('data', data)

          if (res.status === 200) {
            return {
              ...data,
              role: data.user.role.id
            }
          }

          return null
        } catch (e) {
          throw new Error(e.message)
        }
      }
    })

    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // })

    // ** ...add more providers here
  ],

  // ** Please refer to https://next-auth.js.org/configuration/options#session for more `session` options
  session: {
    strategy: 'jwt',

    maxAge: 30 * 24 * 60 * 60 // ** 30 days
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#pages for more `pages` options
  pages: {
    signIn: '/login'
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
  callbacks: {
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.role = user.role

          token.name = user.name
        }

        return token
      },
      async session({ session, token }) {
        if (session.user) {
          // ** Add custom params to user in session which are added in `jwt()` callback via `token` parameter
          // session.user.name = token.name

          session.user.role = token.role
        }

        return session
      }
    }
  }
}
