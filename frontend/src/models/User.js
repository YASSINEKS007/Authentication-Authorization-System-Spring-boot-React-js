class User {
  constructor({ id, fullName, email, createdAt, updatedAt, role }) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.role = role;
  }

  toPlainObject() {
    return {
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      role: this.role
    };
  }
}


export default User;
