export interface editData {
    fullName?: string
    profileInfo?: string
    links?: string
    background?: string
}

export class EditProfileDTO {
    readonly user: string;
    readonly data: editData;
}