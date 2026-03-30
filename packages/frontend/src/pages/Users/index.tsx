import { useUsers } from '../../api/hooks/useUsers';

export function UsersPage() {
  const { data, isPending, error } = useUsers();

  if (isPending) {
    return <div className="text-center p-10 text-gray-500">Loading users…</div>;
  }

  if (error) {
    return (
      <div className="text-center p-10 text-gray-500" role="alert">
        Error: {error.message}
      </div>
    );
  }

  const users = data?.data ?? [];

  return (
    <main className="max-w-3xl mx-auto mt-10 px-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Users</h1>
      {users.length === 0 ? (
        <p className="text-gray-500 italic">No users yet.</p>
      ) : (
        <ul className="list-none p-0 m-0 flex flex-col gap-3">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-white"
            >
              <strong>{user.name}</strong>
              <span className="text-gray-500 text-sm">{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default UsersPage;
