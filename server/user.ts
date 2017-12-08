export class User {
  constructor(
    public id: number,
    public name: string,
    public trueName: string,
    public creditValue: number,
    public domicile: string,
    public phoneNumber: number,
    public idCard: any
  ) {}
}

export function getUser(): User[] {
  return [
    new User(1, 'CoderBen', '金奔', 193, '山大学15宿舍楼',
    13567898765, null),
    new User(2, '小明', '王明', 68, '高区金沙滩小区',
      13974892734, null)
  ];
}