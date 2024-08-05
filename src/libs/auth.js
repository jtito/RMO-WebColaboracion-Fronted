import CredentialProvider from 'next-auth/providers/credentials'

export const authOptions = {
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
              user: {
                id: data.user.id,
                name: data.user.name,
                last_nameF: data.user.last_nameF,
                last_nameS: data.user.last_nameS,
                role: data.user.role.id,
                email: data.user.email,
                is_active: data.user.is_active,
                create_at: data.user.create_at,
                updated_at: data.user.updated_at,
                country_display: data.user.country_display,
                type_doc_display: data.user.type_doc_display,
                doc_num: data.user.doc_num
              },
              access_token: data.access_token,
              refresh_token: data.refresh_token
            }
          }

          return null
        } catch (e) {
          throw new Error(e.message)
        }
      }
    })
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },

  pages: {
    signIn: '/login'
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.user.role
        token.userId = user.user
        token.name = user.user.name
        token.last_nameF = user.user.last_nameF
        token.last_nameS = user.user.last_nameS

        token.email = user.user.email
        token.is_active = user.user.is_active
        token.create_at = user.user.create_at
        token.updated_at = user.user.updated_at
        token.country_display = user.user.country_display
        token.type_doc_display = user.user.type_doc_display
        token.doc_num = user.user.doc_num
        token.access_token = user.access_token
        token.refresh_token = user.refresh_token
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId
        session.user.name = token.name
        session.user.last_nameF = token.last_nameF
        session.user.last_nameS = token.last_nameS
        session.user.role = token.role
        session.user.email = token.email
        session.user.is_active = token.is_active
        session.user.create_at = token.create_at
        session.user.updated_at = token.updated_at
        session.user.country_display = token.country_display
        session.user.type_doc_display = token.type_doc_display
        session.user.doc_num = token.doc_num
        session.access_token = token.access_token
        session.refresh_token = token.refresh_token
      }

      return session
    }
  }
}
