<template>
    <div :class="['block', 'post', `post--layout--${layout}`]">
        <div :class="['post__header', 'post-header', `post-header--layout--${layout}`]">
            <div class="post-header__categories">
                <AppLink to="/">
                    Latest news
                </AppLink>
            </div>
            <h1 class="post-header__title">
                Morbi Interdum Velit Quis Magna Placerat Lobortis Eget
            </h1>
            <div class="post-header__meta">
                <div class="post-header__meta-item">
                    By
                    <AppLink to="/">
                        Jessica Moore
                    </AppLink>
                </div>
                <div class="post-header__meta-item">
                    <AppLink to="/">
                        November 30, 2018
                    </AppLink>
                </div>
                <div class="post-header__meta-item">
                    <AppLink to="/">
                        4 Comments
                    </AppLink>
                </div>
            </div>
        </div>

        <div class="post__featured">
            <AppLink to="/">
                <img :src="$url.img('/images/posts/post-featured.jpg')" alt="">
            </AppLink>
        </div>

        <div
            :class="[
                'post__content',
                'typography',
                {'typography--expanded': layout === 'full'}
            ]"
        >
            <p>
                Vestibulum sagittis justo sit amet nisl semper, et pulvinar elit maximus. Morbi
                interdum velit quis magna placerat lobortis eget pharetra magna. Nulla
                tristique sollicitudin turpis, eget maximus risus faucibus non. Nulla
                vestibulum ipsum risus, vitae maximus nunc bibendum quis.
            </p>
            <p>
                raesent eu consequat nibh. Quisque
                <i>ullamcorper</i>
                , augue eu fringillasodales, leo metus volutpat risus, at suscipit ipsum
                diam eget sem. Maecenas dictum elit in enim molestie,
                <AppLink to="/">
                    vel sollicitudin erat ultricies
                </AppLink>
                . Sed risus tellus, molestie finibus
                dui quis, suscipit consequat ex.
            </p>
            <blockquote>
                <p>
                    Sed a dictum elit. In iaculis porttitor luctus. Maecenas ultricies dolor et
                    semper placerat. Proin at lectus felis.
                </p>
                <p><cite>John Mcarthy</cite></p>
            </blockquote>
            <p>
                Vivamus in nisi at turpis rhoncus feugiat. Mauris scelerisque non ante et
                ultrices. Donec sit amet sem lobortis, ullamcorper felis at, finibus sem.
                Curabitur tincidunt neque nunc.
            </p>
            <h3>Nam Eget Blandit Diam</h3>
            <p>
                Quisque semper magna eget libero maximus, a sollicitudin nunc hendrerit. Cras
                efficitur, ante vitae fringilla rutrum, mi tortor dapibus metus, in egestas
                metus erat sit amet orci. Ut faucibus non ante dapibus efficitur. Nam eget
                blandit diam, imperdiet condimentum neque. Donec risus nisi, aliquet a commodo
                ac, elementum vitae leo.
            </p>
            <p>
                Vestibulum sagittis justo sit amet nisl semper, et pulvinar elit maximus. Morbi
                interdum velit quis magna placerat lobortis eget pharetra magna.
            </p>
            <p>
                <strong>Nulla fringilla:</strong>
                <AppLink to="/">
                    Donec aliquet at felis et dignissim
                </AppLink>
            </p>
            <figure>
                <AppLink to="/">
                    <img :src="$url.img('/images/posts/post-featured.jpg')" alt="">
                </AppLink>
                <figcaption>Nunc viverra, dui nec commodo dignissim, libero arcu.</figcaption>
            </figure>
            <p>
                Vestibulum non varius lectus. Cras vel elit id ligula laoreet imperdiet. Mauris
                quis laoreet velit. Suspendisse sed velit nec ante facilisis pharetra.
            </p>
            <p>
                Phasellus ut elit vestibulum, dignissim mi non, suscipit ex. Praesent eu
                consequat nibh. Quisque ullamcorper, augue eu fringilla sodales, leo metus
                volutpat risus,
                <AppLink to="/">
                    at suscipit ipsum diam eget sem
                </AppLink>
                . Maecenas dictum elit in enim molestie,
                vel sollicitudin erat ultricies. Sed risus tellus, molestie finibus dui quis,
                suscipit consequat ex.
            </p>
            <hr>
            <h2>Nunc Dapibus Varius Ligula</h2>
            <p>
                Maecenas ultrices arcu ut feugiat semper. Praesent dictum tincidunt justo, ac
                tincidunt ante fermentum at. Vestibulum non varius lectus. Cras vel elit id
                ligula laoreet imperdiet. Mauris quis laoreet velit. Suspendisse sed velit
                nec ante facilisis pharetra. Duis vitae fermentum elit. Integer ac mattis elit.
            </p>
            <p>
                Mauris scelerisque non ante et ultrices. Donec sit amet sem lobortis:
            </p>
            <ol>
                <li>
                    Duis
                    <strong>finibus imperdiet ultricies</strong>
                    . Donec vel pretium turpis. In auctor euismod posuere.
                </li>
                <li>
                    Praesent dictum tincidunt justo, ac tincidunt ante fermentum at. Vestibulum
                    non varius lectus. Cras vel elit id ligula laoreet imperdiet.
                </li>
                <li>
                    <strong>In iaculis porttitor luctus</strong>
                    . Maecenas ultricies dolor et semper placerat. Proin at lectus felis.
                    Quisque dapibus auctor justo id dictum.
                </li>
            </ol>
            <p>
                Ut faucibus non ante dapibus efficitur. Nam eget blandit diam, imperdiet
                condimentum neque. Donec risus nisi, aliquet a commodo ac, elementum vitae leo.
            </p>
        </div>

        <div class="post__footer">
            <div class="post__tags-share-links">
                <div class="post__tags tags">
                    <div class="tags__list">
                        <AppLink to="/">
                            Promotion
                        </AppLink>
                        <AppLink to="/">
                            Power Tool
                        </AppLink>
                        <AppLink to="/">
                            Wrench
                        </AppLink>
                        <AppLink to="/">
                            Electrodes
                        </AppLink>
                    </div>
                </div>
                <div class="post__share-links share-links">
                    <ul class="share-links__list">
                        <li class="share-links__item share-links__item--type--like">
                            <AppLink to="/">
                                Like
                            </AppLink>
                        </li>
                        <li class="share-links__item share-links__item--type--tweet">
                            <AppLink to="/">
                                Tweet
                            </AppLink>
                        </li>
                        <li class="share-links__item share-links__item--type--pin">
                            <AppLink to="/">
                                Pin It
                            </AppLink>
                        </li>
                        <li class="share-links__item share-links__item--type--counter">
                            <AppLink to="/">
                                4K
                            </AppLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="post-author">
                <div class="post-author__avatar">
                    <AppLink to="/">
                        <img :src="$url.img('/images/avatars/avatar-1.jpg')" alt="">
                    </AppLink>
                </div>
                <div class="post-author__info">
                    <div class="post-author__name">
                        <AppLink to="/">
                            Jessica Moore
                        </AppLink>
                    </div>
                    <div class="post-author__about">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                        suscipit suscipit mi, non tempor nulla finibus eget. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit.
                    </div>
                </div>
            </div>
        </div>
        <section class="post__section">
            <h4 class="post__section-title">
                Related Posts
            </h4>
            <div class="related-posts">
                <div class="related-posts__list">
                    <div
                        v-for="relatedPost in relatedPosts"
                        :key="relatedPost.id"
                        class="related-posts__item post-card post-card--layout--related"
                    >
                        <div class="post-card__image">
                            <AppLink to="/">
                                <!--suppress HtmlUnknownTarget -->
                                <img :src="$url.img(relatedPost.image)" alt="">
                            </AppLink>
                        </div>
                        <div class="post-card__info">
                            <div class="post-card__name">
                                <AppLink to="/">
                                    {{ relatedPost.title }}
                                </AppLink>
                            </div>
                            <div class="post-card__date">
                                {{ relatedPost.date }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="post__section">
            <h4 class="post__section-title">
                Comments ({{ comments.total }})
            </h4>

            <BlogCommentsList :comments="comments.items" />
        </section>

        <section class="post__section">
            <h4 class="post__section-title">
                Write A Comment
            </h4>

            <form>
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="comment-first-name">First Name</label>
                        <input
                            id="comment-first-name"
                            class="form-control"
                            type="text"
                            placeholder="First Name"
                        >
                    </div>
                    <div class="form-group col-md-4">
                        <label for="comment-last-name">Last Name</label>
                        <input
                            id="comment-last-name"
                            class="form-control"
                            type="text"
                            placeholder="Last Name"
                        >
                    </div>
                    <div class="form-group col-md-4">
                        <label for="comment-email">Email Address</label>
                        <input
                            id="comment-email"
                            class="form-control"
                            type="email"
                            placeholder="Email Address"
                        >
                    </div>
                </div>
                <div class="form-group">
                    <label for="comment-content">Comment</label>
                    <textarea
                        id="comment-content"
                        class="form-control"
                        :rows="6"
                    />
                </div>
                <div class="form-group mt-4">
                    <button type="submit" class="btn btn-primary btn-lg">
                        Post Comment
                    </button>
                </div>
            </form>
        </section>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { BlogPagePostLayout } from '~/interfaces/components'
import { IPost } from '~/interfaces/post'
import { ICommentsList } from '~/interfaces/comment'
import AppLink from '~/components/shared/app-link.vue'
import BlogCommentsList from '~/components/blog/blog-comments-list.vue'
import dataBlogPostComments from '~/data/blogPostComments'
import dataBlogPosts from '~/data/blogPosts'

@Component({
    components: { AppLink, BlogCommentsList }
})
export default class BlogPost extends Vue {
    @Prop({ type: String, required: true }) readonly layout!: BlogPagePostLayout

    relatedPosts: IPost[] = dataBlogPosts.slice(0, 2)

    comments: ICommentsList = dataBlogPostComments
}

</script>
