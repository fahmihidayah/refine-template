export class UserAuth {

    constructor(
        public id: number,
        public email: string,
        public first_name: string,
        public last_name: string,
        public access_token: string,
        public refresh_token: string,
        public avatar: string = "https://i.pravatar.cc/150?img=11",
        public roles: string[] = []
    ) {
       }

    getName = () : string =>   {
        return this.first_name + " " + this.last_name
    }

    public getDefaultAvatar() : string {
        return "https://i.pravatar.cc/150?img=11"
    }


}