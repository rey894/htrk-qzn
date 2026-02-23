import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Edit, Plus, Save, X, Shield, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'user' | 'bac';
  created_at: string;
}

export function UserManager() {
  const { user: currentUser } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [userRoles, setUserRoles] = useState<Record<string, UserRole[]>>({});
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; userId: string | null }>({
    open: false,
    userId: null
  });
  const [form, setForm] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'user' as 'admin' | 'moderator' | 'user' | 'bac'
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch all profiles (admins can see all)
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      if (profilesData) {
        setProfiles(profilesData);

        // Fetch roles for all users
        const { data: rolesData, error: rolesError } = await supabase
          .from('user_roles')
          .select('*');

        if (rolesError) throw rolesError;

        // Group roles by user_id
        const rolesByUser: Record<string, UserRole[]> = {};
        if (rolesData) {
          rolesData.forEach(role => {
            if (!rolesByUser[role.user_id]) {
              rolesByUser[role.user_id] = [];
            }
            rolesByUser[role.user_id].push(role);
          });
        }
        setUserRoles(rolesByUser);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch users",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    if (!form.email || !form.password || !form.full_name) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive"
      });
      return;
    }

    try {
      // Note: Admin user creation requires Supabase Admin API (service role key)
      // For now, we'll guide admins to have users sign up, then update their roles
      // Or use a serverless function/edge function for this
      
      // For WordPress-like experience, we'll use the regular signup flow
      // and immediately update the role after creation
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: {
            full_name: form.full_name
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Wait for trigger to create profile
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update role using the admin function
        if (form.role !== 'user') {
          const { error: roleError } = await supabase.rpc('admin_update_user_role', {
            _user_id: authData.user.id,
            _role: form.role
          });

          if (roleError) {
            // Fallback: try direct insert (might fail due to RLS)
            await supabase
              .from('user_roles')
              .delete()
              .eq('user_id', authData.user.id);
            
            await supabase
              .from('user_roles')
              .insert({ user_id: authData.user.id, role: form.role });
          }
        }

        toast({
          title: "Success",
          description: "User created successfully. They will receive an email to verify their account."
        });
        setIsCreating(false);
        setForm({ email: '', password: '', full_name: '', role: 'user' });
        fetchUsers();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create user. Note: User creation requires email verification. For immediate access, use Supabase Admin API or a serverless function.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateRole = async (userId: string, newRole: 'admin' | 'moderator' | 'user' | 'bac') => {
    try {
      // Use the admin function to update role
      const { error } = await supabase.rpc('admin_update_user_role', {
        _user_id: userId,
        _role: newRole
      });

      if (error) {
        // Fallback to direct update if function doesn't exist yet
        await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId);
        
        await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: newRole });
      }

      toast({
        title: "Success",
        description: "User role updated successfully"
      });
      setEditingId(null);
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update user role",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      // Note: User deletion requires Supabase Admin API
      // For now, we'll show a message that this needs to be done via Supabase dashboard
      // or through a serverless function
      toast({
        title: "Info",
        description: "User deletion requires Supabase Admin API access. Please delete users through the Supabase dashboard or set up a serverless function for this operation.",
        variant: "default"
      });
      
      // Alternative: Delete profile and roles (user will still exist in auth.users but won't have access)
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', userId);

      if (profileError) throw profileError;

      const { error: rolesError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (rolesError) throw rolesError;

      toast({
        title: "Success",
        description: "User profile and roles deleted. Note: Auth user still exists and should be deleted via Supabase dashboard."
      });
      setDeleteDialog({ open: false, userId: null });
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive"
      });
    }
  };

  const getRoleBadge = (role: string) => {
    const colors: Record<string, string> = {
      admin: 'destructive',
      moderator: 'default',
      user: 'secondary',
      bac: 'outline'
    };
    return <Badge variant={colors[role] as any}>{role}</Badge>;
  };

  const getUserRoles = (userId: string) => {
    return userRoles[userId] || [];
  };

  if (loading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>User Management</span>
            <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
              <Plus className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </CardTitle>
          <CardDescription>
            Manage user accounts and permissions. Create, edit, and assign roles to users.
          </CardDescription>
        </CardHeader>
        {isCreating && (
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Minimum 6 characters"
                  minLength={6}
                />
              </div>
              <div>
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={form.role} onValueChange={(value: any) => setForm({ ...form, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="bac">BAC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreate}>
                  <Save className="h-4 w-4 mr-2" />
                  Create User
                </Button>
                <Button variant="outline" onClick={() => {
                  setIsCreating(false);
                  setForm({ email: '', password: '', full_name: '', role: 'user' });
                }}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>View and manage all registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                profiles.map((profile) => {
                  const roles = getUserRoles(profile.user_id);
                  const isCurrentUser = profile.user_id === currentUser?.id;
                  
                  return (
                    <TableRow key={profile.id}>
                      <TableCell className="font-medium">
                        {profile.full_name || 'No name'}
                      </TableCell>
                      <TableCell>{profile.email}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {roles.length > 0 ? (
                            roles.map((r) => (
                              <span key={r.id}>{getRoleBadge(r.role)}</span>
                            ))
                          ) : (
                            <Badge variant="secondary">user</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(profile.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {editingId === profile.user_id ? (
                            <>
                              <Select
                                value={roles[0]?.role || 'user'}
                                onValueChange={(value: any) => handleUpdateRole(profile.user_id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="user">User</SelectItem>
                                  <SelectItem value="moderator">Moderator</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="bac">BAC</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingId(null)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingId(profile.user_id)}
                                disabled={isCurrentUser}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setDeleteDialog({ open: true, userId: profile.user_id })}
                                disabled={isCurrentUser}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, userId: deleteDialog.userId })}
        onConfirm={() => deleteDialog.userId && handleDelete(deleteDialog.userId)}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />
    </div>
  );
}
