import { useEffect, useState, type FormEvent } from 'react';
import { fetchUsersProtobuf, createUser, updateUser, deleteUser } from '@/services/api';
import type { User } from '@/types/user';
import { decodeProtobufUsers } from '@/utils/protobuf';
import { FileCode, Loader2 } from 'lucide-react';
import { Trash2, Edit, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export const ProtobufUserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Partial<User>>({
    id: '',
    email: '',
    role: 'user',
    status: 'active',
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    loadProtobufUsers();
  }, []);

  const loadProtobufUsers = async () => {
    try {
      setLoading(true);
      const binaryData = await fetchUsersProtobuf();
      const decodedUsers = await decodeProtobufUsers(binaryData);
      setUsers(decodedUsers);
      
      toast({
        title: 'Success',
        description: `Decoded ${decodedUsers.length} users from Protobuf binary data`,
      });
    } catch (error) {
      console.error('Error loading protobuf users:', error);
      toast({
        title: 'Error',
        description: 'Failed to decode Protobuf data. Make sure the backend is running.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setIsEditing(false);
    setForm({
      id: '',
      email: '',
      role: 'user',
      status: 'active',
      createdAt: new Date().toISOString(),
    });
    setIsFormOpen(true);
  };

  const openEditForm = (user: User) => {
    setIsEditing(true);
    setForm({
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setIsEditing(false);
    setForm({
      id: '',
      email: '',
      role: 'user',
      status: 'active',
      createdAt: new Date().toISOString(),
    });
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    try {
      setLoading(true);
      if (isEditing && form.id) {
        // update via JSON API
        await updateUser(form.id, form as Partial<User>);
        toast({ title: 'Updated', description: 'User updated successfully' });
      } else {
        // create via JSON API
        const newUser = await createUser(form as Partial<User>);
        toast({ title: 'Created', description: `User ${newUser.email} created` });
      }
      await loadProtobufUsers();
      closeForm();
    } catch (err) {
      console.error('Error saving user:', err);
      toast({ title: 'Error', description: 'Failed to save user', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId?: string) => {
    if (!userId) return;
    if (!window.confirm('Delete this user? This action cannot be undone.')) return;
    try {
      setLoading(true);
      await deleteUser(userId);
      toast({ title: 'Deleted', description: 'User deleted' });
      await loadProtobufUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      toast({ title: 'Error', description: 'Failed to delete user', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
            <FileCode className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Protobuf Decoded Users</h2>
            <p className="text-muted-foreground">Binary data decoded using protobufjs</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-2xl font-bold text-primary">{users.length}</p>
        </div>
      </div>

      {/* form / add / edit area */}
      <div className="flex items-center justify-between">
        <div />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openAddForm}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary text-white text-sm"
            aria-label="Add user"
          >
            <Plus className="w-4 h-4" /> Add User
          </button>
        </div>
      </div>

      {isFormOpen && (
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Email</label>
                <input
                  value={form.email || ''}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  type="email"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Role</label>
                <select
                  value={form.role || 'user'}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Status</label>
                <select
                  value={form.status || 'active'}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="inline-flex items-center px-3 py-1.5 rounded-md bg-primary text-white text-sm"
              >
                {isEditing ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="inline-flex items-center px-3 py-1.5 rounded-md border text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      <Card className="shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Created At</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <FileCode className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground">No users found</p>
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr
                    key={user.id || index}
                    className="border-b border-border hover:bg-muted/50 transition-smooth"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-muted-foreground">{user.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-foreground">{user.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditForm(user)}
                          className="inline-flex items-center gap-2 px-2 py-1 rounded-md border text-sm"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="inline-flex items-center gap-2 px-2 py-1 rounded-md border text-sm text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
};
