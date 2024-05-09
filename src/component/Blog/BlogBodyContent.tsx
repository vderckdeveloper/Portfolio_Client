import { useState, useEffect } from 'react';
import { EditorState, CompositeDecorator, ContentBlock, ContentState, convertFromRaw } from 'draft-js';

// Import Editor component dynamically without SSR
import dynamic from 'next/dynamic';
const Editor = dynamic(
    () => import('draft-js').then(mod => mod.Editor),
    { ssr: false }
);

import styles from '@/styles/Blog/BlogBodyContent.module.css';

interface BlogData {
    blog_index: number;
    blog_uniqueNum: number;
    admin_identification: string;
    blog_category: string;
    blog_title: string;
    blog_content: string;
    register_date: string;
    edit_date: string;
    delete_date: string;
    register_ip: string;
    edit_ip: string;
    delete_ip: string;
    blog_is_deleted: boolean;
    blog_is_approved: boolean;
}

interface BlogBodyContentProps {
    blogContentData: BlogData;
}

interface LinkProps {
    contentState: ContentState;
    entityKey: string;
    children: React.ReactNode;
}

interface ImageProps {
    contentState: ContentState;
    entityKey: string;
    children: React.ReactNode;
}

interface IFrameProps {
    contentState: ContentState;
    entityKey: string;
    children: React.ReactNode;
}

/**
 * Finds link entities within a content block and applies a callback to each.
 * @param contentBlock - The block of content to be examined.
 * @param callback - The function to call with start and end indices of each link entity found.
 * @param contentState - The state of the content which may contain entities.
 */
function findLinkEntities(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}

const Link: React.FC<LinkProps> = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url}>
            {props.children}
        </a>
    );
};

/**
 * Finds image entities within a content block and applies a callback to each.
 * @param contentBlock - The block of content to be examined.
 * @param callback - The function to call with start and end indices of each link entity found.
 * @param contentState - The state of the content which may contain entities.
 */
function findImageEntities(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'IMAGE'
            );
        },
        callback
    );
}

const ImageComponent: React.FC<ImageProps> = (props) => {
    const { src } = props.contentState.getEntity(props.entityKey).getData();

    return (
        <div style={{ overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} style={{ display: 'block', borderRadius: '8px', width: '100%', height: '100%', maxWidth: '1000px', maxHeight: '800px' }} alt="블로그 이미지" />
        </div>
    );

};

/**
 * Finds iframe entities within a content block and applies a callback to each.
 * @param contentBlock - The block of content to be examined.
 * @param callback - The function to call with start and end indices of each link entity found.
 * @param contentState - The state of the content which may contain entities.
 */
function findIframeEntities(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'IFRAME'
            );
        },
        callback
    );
}


const IFrameComponent: React.FC<IFrameProps> = (props) => {
    const { src } = props.contentState.getEntity(props.entityKey).getData();

    return (
        <div className='youtubeWrapper' style={{ overflow: 'hidden' }}>
            <iframe
                src={src}
                title="YouTubeVideoPlayer"
                width="560"
                height="315"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ maxWidth: '1000px', maxHeight: '800px' }}
            />
        </div>
    );
};

function BlogBodyContent(props: BlogBodyContentProps) {

    // page data
    const blogContentData = props.blogContentData;

    const blogTitle = blogContentData.blog_title;
    const blogContent = blogContentData.blog_content;

    // decorator
    const decorator = new CompositeDecorator([
        {
            strategy: findLinkEntities,
            component: Link,
        },
        {
            strategy: findImageEntities,
            component: ImageComponent,
        },
        {
            strategy: findIframeEntities,
            component: IFrameComponent,
        }
    ]);

    // color state
    const textColor: string = '#ffffff';

    // color map
    const colorStyleMap = {
        [`COLOR_${textColor}`]: { color: textColor }
    };

    // process blog content 
    const processBlogContent = (blogContent: string) => {

        // convert from raw
        const contentState = convertFromRaw(JSON.parse(blogContent));

        // apply color change
        contentState.getBlockMap().forEach(block => {

            if (!block) return;

            block.findStyleRanges(
                (char) => {
                    return char.getStyle().some(style => style!.startsWith('COLOR_'));
                },
                (start, _end) => {
                    const styles = block.getInlineStyleAt(start);

                    styles.forEach(style => {
                        if (style!.startsWith('COLOR_')) {
                            const color = style!.split('_')[1];
                            const styleKey = `COLOR_${color}`;
                            if (!colorStyleMap[styleKey]) {
                                colorStyleMap[styleKey] = { color: `${color}` };
                            }
                        }
                    });
                }
            );
        });
        return contentState;
    };

    // modify state with process blog content
    const contentState = processBlogContent(blogContent);
    const newEditorState = EditorState.createWithContent(contentState, decorator);

    // state
    const [editorState, setEditorState] = useState(newEditorState);

    //on edtior state
    const onEditorState = (newEditorState: EditorState) => {
        setEditorState(newEditorState);
    };

    // force re-rendering
    useEffect(() => {
        const contentState = processBlogContent(blogContent);
        const newEditorState = EditorState.createWithContent(contentState, decorator);
        setEditorState(newEditorState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blogContent]);

    return (
        <article className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.titleBox}>
                    <h1>{blogTitle}</h1>
                </div>
                <div className={styles.editorWrapper}>
                    <Editor
                        customStyleMap={colorStyleMap}
                        editorState={editorState}
                        onChange={onEditorState}
                        readOnly={true}
                    />
                </div>
            </div>

        </article>
    )
}

export default BlogBodyContent;