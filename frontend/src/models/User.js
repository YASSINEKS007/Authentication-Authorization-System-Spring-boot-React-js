class User {
  constructor({ id, fullName, password, email, createdAt, updatedAt, role }) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.role = role;
  }
}

export default User;
