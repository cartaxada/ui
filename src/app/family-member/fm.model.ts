export class FamilyMember {

  constructor(
    public familyId: string,
    public name: string,
    public email: string,
    public birthday: string,
    public nicknames: string[],
    public phones: any[],
    public address: any
  ) { }

}
