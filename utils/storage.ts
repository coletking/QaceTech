// utils/storage.ts
interface user {
    email:string
    username:string
    mobile:string
    password:string
    createdAt:string
}
export const storage = {
    getUsers: (): user[] => {
      if (typeof window !== 'undefined') {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
      }
      return [];
    },
  
    saveUser: (user: user) => {
      if (typeof window !== 'undefined') {
        const users = storage.getUsers();
        const existingUser = users.find((existing: any) => existing.email === user.email);
  
        if (existingUser) {
          throw new Error(`A user with the email ${user.email} already exists.`);
        }
  
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('email', JSON.stringify(user.email));
        return user;
      }
    },
  
    findUserByEmail: (email: string) => {
      const users = storage.getUsers();
      const user = users.find((user: any) => user.email === email);
      return user;
    },
  };
  