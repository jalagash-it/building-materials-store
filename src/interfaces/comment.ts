export interface IComment {
    id: number;
    author: string;
    avatar: string;
    text: string;
    date: string;
    postTitle: string;
    children?: this[];
}

export interface ICommentsList {
    total: number;
    items: IComment[];
}
