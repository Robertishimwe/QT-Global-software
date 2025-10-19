import { useEffect, useState } from 'react';
import { fetchUsers } from '@/services/api';
import type { User } from '@/types/user';
import { verifySignature } from '@/utils/crypto';
import { Shield, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export const VerifiedUserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [verifiedUsers, setVerifiedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      console.log('Fetching users from API...');
      const data = await fetchUsers();
      console.log('Fetched users:', data);
      setUsers(data);
      await verifyUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load users from the API',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyUsers = async (userList: User[]) => {
    setVerifying(true);
    const verified: User[] = [];

    console.log(`Starting verification for ${userList.length} users...`);

    for (const user of userList) {
      if (user.email && user.signature && user.publicKey) {
        console.log(`Verifying user: ${user.email}`);
        console.log('  Signature:', user.signature?.substring(0, 50) + '...');
        console.log('  PublicKey:', user.publicKey?.substring(0, 50) + '...');
        
        const isValid = await verifySignature(user.email, user.signature, user.publicKey);
        console.log(`  Verification result: ${isValid}`);
        
        if (isValid) {
          verified.push(user);
        }
      } else {
        console.log(`User ${user.email} missing signature or publicKey`);
      }
    }

    console.log(`Verification complete. ${verified.length} out of ${userList.length} users verified.`);
    setVerifiedUsers(verified);
    setVerifying(false);

    toast({
      title: 'Verification Complete',
      description: `${verified.length} out of ${userList.length} users verified successfully`,
    });
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
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Cryptographically Verified Users</h2>
            <p className="text-muted-foreground">Users with valid SHA-384 signatures</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Verified Users</p>
            <p className="text-2xl font-bold text-primary">{verifiedUsers.length}</p>
          </div>
          {verifying && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
        </div>
      </div>

      <Card className="shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Created At</th>
              </tr>
            </thead>
            <tbody>
              {verifiedUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <XCircle className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground">No verified users found</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Users must have valid signatures to appear here
                    </p>
                  </td>
                </tr>
              ) : (
                verifiedUsers.map((user, index) => (
                  <tr
                    key={user.id || index}
                    className="border-b border-border hover:bg-muted/50 transition-smooth"
                  >
                    <td className="px-6 py-4">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{user.email}</span>
                      </div>
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-xl font-bold text-foreground">{users.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Verified</p>
              <p className="text-xl font-bold text-foreground">{verifiedUsers.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Failed</p>
              <p className="text-xl font-bold text-foreground">{users.length - verifiedUsers.length}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
