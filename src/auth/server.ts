import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const client = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )

  return client;
}


export async function getUser() {
  const { auth } = await createClient();

  const userObject = await auth.getUser();
  const { user } = userObject.data;
  const { error } = userObject;

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  if (!user) {
    console.log('No user found');
    return null;
  }
  console.log('User found:', user);
  return user;
}