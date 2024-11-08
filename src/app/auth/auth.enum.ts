export enum Role {
  None = 'none',
  User = 'USER',  //clerk
  Manager = 'MANAGER',  //admin
  Admin = 'ADMIN',  //manager
}

export enum AuthMode {
  InMemory = 'In Memory',
  CustomServer = 'Custom Server',
  Firebase = 'Firebase',
}
