/**
 * 博客内容
 */
export interface BlogContent {
    id: string;
    title: string;
    contentMd: string;
    typeId: string;
    userId: string;



}


/**
 * 文章标签
 */
export interface CheckTagArr {
    id: string;
    name: string;
}


export interface BlogItemContent {
    id: string;
    title: string
    userId: string;
    coverImage: string;
    qrcodePath: string;
    isMarkdown: Number;
    content: string;
    contentMd: string;
    top: 0;
    typeId: string;
    status: string;
    recommended: 0;
    original: 1;
    description: string;
    keywords: string;
    comment: string;
    createTime: string;
    updateTime: string;
}



