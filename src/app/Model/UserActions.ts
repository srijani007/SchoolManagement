export interface createUser{
    id       : Number,
    userName     : string,
    password     : string,
    firstName    : string,
    lastName     : string,
    email        : string,
    gradeLevel   :Number,
    address      : string,
    stateCode    : string,
    country      : string,
    zipcode      : string,
    phoneNumber  : string,
    idRole       : string
}

export interface createCourse{
    id    : Number, 
    title       : string,
    description :string,
    subject     : string,
    subjectArea : string,
    gradeLevel  : Number
}

export interface roles{
    id:Number,
    post:string
}

export interface detailsbyCourseId{
    id    : Number
}

export interface detailsbyUserId{
    id:number
}

export interface detailsbyUserName{
    userName     : string | null
}