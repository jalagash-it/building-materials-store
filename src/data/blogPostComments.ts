import { ICommentsList } from '~/interfaces/comment'

const dataBlogPostComments: ICommentsList = {
    total: 4,
    items: [
        {
            id: 1,
            avatar: '/images/avatars/avatar-1.jpg',
            author: 'Jessica Moore',
            postTitle: 'Integer efficitur efficitur velit non pulvinar pellentesque dictum viverra',
            date: 'November 30, 2018',
            text: 'Aliquam ullamcorper elementum sagittis. Etiam lacus lacus, mollis in mattis in, vehicula eu ' +
                'nulla. Nulla nec tellus pellentesque.',
            children: [
                {
                    id: 2,
                    avatar: '/images/avatars/avatar-2.jpg',
                    author: 'Adam Taylor',
                    postTitle: 'Integer efficitur efficitur velit non pulvinar pellentesque dictum viverra',
                    date: 'December 4, 2018',
                    text: 'Ut vitae finibus nisl, suscipit porttitor urna. Integer efficitur efficitur velit non ' +
                        'pulvinar. Aliquam blandit volutpat arcu vel tristique. Integer commodo ligula id augue ' +
                        'tincidunt faucibus.'
                },
                {
                    id: 3,
                    avatar: '/images/avatars/avatar-3.jpg',
                    author: 'Helena Garcia',
                    postTitle: 'Integer efficitur efficitur velit non pulvinar pellentesque dictum viverra',
                    date: 'December 12, 2018',
                    text: 'Suspendisse dignissim luctus metus vitae aliquam. Vestibulum sem odio, ullamcorper a ' +
                        'imperdiet a, tincidunt sed lacus. Sed magna felis, consequat a erat ut, rutrum finibus odio.'
                }
            ]
        },
        {
            id: 4,
            avatar: '/images/avatars/avatar-4.jpg',
            author: 'Ryan Ford',
            postTitle: 'Integer efficitur efficitur velit non pulvinar pellentesque dictum viverra',
            date: 'December 5, 2018',
            text: 'Nullam at varius sapien. Sed sit amet condimentum elit.'
        }
    ]
}

export default dataBlogPostComments
