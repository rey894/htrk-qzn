import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { APP_CONFIG } from '@/config/app';

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
}

interface UserRole {
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBAC, setIsBAC] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let hasLoadedInitialSession = false;

    // Helper function to fetch user data with timeout
    const fetchUserData = async (userId: string, userEmail?: string | null): Promise<void> => {
      const timeoutPromise = new Promise<void>((_, reject) => {
        setTimeout(() => reject(new Error('Fetch timeout after 8 seconds')), 8000);
      });

      const fetchPromise = (async () => {
        try {
          console.log('📥 Fetching user data for:', userId);

          // Fetch profile and roles in parallel with individual timeouts
          const profilePromise = supabase
            .from('profiles')
            .select('*')
            .eq('user_id', userId)
            .maybeSingle();

          const rolesPromise = (async () => {
            // Try RPC function first
            try {
              const funcResult = await Promise.race([
                supabase.rpc('get_user_roles', { p_user_id: userId }),
                new Promise<any>((_, reject) => setTimeout(() => reject(new Error('RPC timeout')), 5000))
              ]) as any;
              console.log('🔍 RPC get_user_roles result:', { error: funcResult.error, data: funcResult.data });
              if (!funcResult.error && funcResult.data && Array.isArray(funcResult.data)) {
                // Ensure data is in the expected format
                const formattedData = funcResult.data.map((r: any) => ({ role: typeof r === 'string' ? r : (r.role || r) }));
                console.log('✅ RPC function returned roles:', formattedData);
                return {
                  data: formattedData,
                  error: null
                };
              }
              if (funcResult.error) {
                console.warn('⚠️ RPC function error:', funcResult.error);
              }
            } catch (e) {
              console.warn('⚠️ Function call failed, trying direct query:', e);
            }
            // Fallback to direct query
            console.log('🔄 Falling back to direct user_roles query for user:', userId);
            const directQuery = await Promise.race([
              supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', userId),
              new Promise<any>((_, reject) => setTimeout(() => reject(new Error('Query timeout')), 5000))
            ]) as any;
            console.log('🔍 Direct query result:', { error: directQuery.error, data: directQuery.data });
            return directQuery;
          })();

          const [profileResult, rolesResult] = await Promise.all([profilePromise, rolesPromise]);

          if (!isMounted) {
            console.log('⚠️ Component unmounted, skipping state update');
            return;
          }

          const resolvedEmail = userEmail ?? (profileResult?.data as { email?: string } | null)?.email ?? '';
          const isWhitelistedAdmin = (APP_CONFIG.adminEmailWhitelist?.length ?? 0) > 0 &&
            APP_CONFIG.adminEmailWhitelist!.some((e) => e.toLowerCase() === resolvedEmail.toLowerCase());

          if (profileResult?.data && !profileResult.error) {
            setProfile(profileResult.data);
            console.log('✅ Profile loaded');
          } else if (profileResult?.error && profileResult.error.code !== 'PGRST116') {
            // PGRST116 is "not found" which is acceptable
            console.warn('Profile fetch warning:', profileResult.error.message);
          }

          // Handle roles
          if (rolesResult?.data && !rolesResult.error) {
            // RPC and direct query both return array of objects: [{role: "admin"}, {role: "bac"}]
            const roles = rolesResult.data as Array<{ role: string }>;
            const isAdminRole = roles.some(r => r.role === 'admin' || r.role === 'superadmin');
            const isBACRole = roles.some(r => r.role === 'bac');
            setIsAdmin(isAdminRole || isWhitelistedAdmin);
            setIsBAC(isBACRole);
            console.log('✅ Roles loaded:', {
              roles: roles.map(r => r.role),
              isAdmin: isAdminRole,
              isBAC: isBACRole
            });
          } else if (rolesResult?.error) {
            console.error('❌ Error fetching roles:', rolesResult.error);
            if (rolesResult.error.code === 'PGRST301' || rolesResult.error.message?.includes('permission')) {
              console.warn('⚠️ Permission denied for user_roles. RLS policy may need adjustment.');
            }
            setIsAdmin(isWhitelistedAdmin);
            setIsBAC(false);
          } else {
            // No data and no error - user has no roles (check whitelist)
            console.log('ℹ️ No roles found for user');
            setIsAdmin(isWhitelistedAdmin);
            setIsBAC(false);
          }
        } catch (error: any) {
          console.error('❌ Error fetching user profile/roles:', error);
          if (isMounted) {
            setProfile(null);
            const fallbackWhitelisted = (APP_CONFIG.adminEmailWhitelist?.length ?? 0) > 0 &&
              (userEmail && APP_CONFIG.adminEmailWhitelist!.some((e) => e.toLowerCase() === userEmail.toLowerCase()));
            setIsAdmin(fallbackWhitelisted);
            setIsBAC(false);
          }
        } finally {
          // Always set loading to false after fetching data
          if (isMounted) {
            console.log('✅ User data fetch complete, setting loading to false');
            setLoading(false);
          }
        }
      })();

      // Race between fetch and timeout
      try {
        await Promise.race([fetchPromise, timeoutPromise]);
      } catch (error: any) {
        console.error('❌ Fetch timed out or failed:', error);
        if (isMounted) {
          setProfile(null);
          setIsAdmin(false);
          setIsBAC(false);
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;

        console.log('🔄 Auth state changed:', event, { hasSession: !!session, hasLoadedInitial: hasLoadedInitialSession });

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Fetch user profile and role
          // fetchUserData will set loading to false in its finally block
          await fetchUserData(session.user.id, session.user.email);
        } else {
          setProfile(null);
          setIsAdmin(false);
          setIsBAC(false);
          if (isMounted) {
            console.log('✅ No session, setting loading to false');
            setLoading(false);
          }
        }
      }
    );

    // Check for existing session first
    supabase.auth.getSession().then(async ({ data: { session }, error }) => {
      if (!isMounted) return;

      console.log('🔍 Initial session check:', { hasSession: !!session, error: error?.message });

      if (error) {
        console.error('Error getting session:', error);
        setLoading(false);
        return;
      }

      setSession(session);
      setUser(session?.user ?? null);

      if (!session) {
        console.log('✅ No initial session, setting loading to false');
        setLoading(false);
        hasLoadedInitialSession = true;
        return;
      }

      // If session exists, fetch roles
      // fetchUserData will set loading to false in its finally block
      await fetchUserData(session.user.id, session.user.email);
      hasLoadedInitialSession = true;
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: fullName,
        },
      },
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth?type=recovery`,
    });
    return { error };
  };

  return {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    isAdmin,
    isBAC,
  };
}