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

export class SetCoverDTO {
    readonly username: string;
    readonly background: string;
}

export class SubscriptionDTO {
    readonly target: string;
    readonly subscriber: string;
}