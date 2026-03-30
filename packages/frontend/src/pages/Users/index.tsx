import { useUsers } from '../../api/hooks/useUsers';
import styles from './index.module.css';

export function UsersPage() {
  const { data, isPending, error } = useUsers();

  if (isPending) {
    return <div className={styles.state}>Loading users…</div>;
  }

  if (error) {
    return (
      <div className={styles.state} role="alert">
        Error: {error.message}
      </div>
    );
  }

  const users = data?.data ?? [];

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Users</h1>
      {users.length === 0 ? (
        <p className={styles.empty}>No users yet.</p>
      ) : (
        <ul className={styles.list}>
          {users.map((user) => (
            <li key={user.id} className={styles.item}>
              <strong>{user.name}</strong>
              <span className={styles.email}>{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default UsersPage;
