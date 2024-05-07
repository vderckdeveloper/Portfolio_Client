import { useState, useEffect, useRef } from 'react';
import { Editor, EditorState, AtomicBlockUtils, RichUtils, CompositeDecorator, ContentBlock, ContentState, convertToRaw } from 'draft-js';

import styles from '@/styles/Admin/Dashboard/Blog/AdminBlogCreate.module.css';

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

function AdminBlogCreate() {

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

    // state
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [editorState, setEditorState] = useState(
        EditorState.createEmpty(decorator)
    );
    const [readOnly, setReadOnly] = useState(false);

    // image files
    const [files, setFiles] = useState<{ file: File; entityKey: string }[]>([]);

    // ref
    const editor = useRef<Editor>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // on title
    const onTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    // on category
    const onCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    }

    //on edtior state
    const onEditorState = (newEditorState: EditorState) => {
        setEditorState(newEditorState);
    };

    // focus editor
    const focusEditor = () => {
        if (editor.current) {
            editor.current.focus();
        }
    }

    // Function to handle key command
    const handleKeyCommand = (command: string) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    // Toggle inline styles
    const onToggleInlineStyle = (e: React.MouseEvent, inlineStyle: string) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    }

    // toggle block types
    const onToggleBlockType = (e: React.MouseEvent, blockType: string) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    }

    // prompt for link
    const promptForLink = (e: React.MouseEvent) => {
        e.preventDefault();
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            const url = window.prompt('Enter the URL');
            if (url) {
                const contentState = editorState.getCurrentContent();
                const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url });
                const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
                const newEditorStateWithLink = RichUtils.toggleLink(
                    newEditorState,
                    newEditorState.getSelection(),
                    entityKey
                );
                setEditorState(newEditorStateWithLink);
                focusEditor();
            }
        }
    }

    // prompt for iframe
    const promptForIFrame = (e: React.MouseEvent) => {
        e.preventDefault();
        const src = window.prompt("Enter the iframe URL");

        if (src) {
            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity('IFRAME', 'IMMUTABLE', { src });
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
            setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
            focusEditor();
        }
    }

    // Define removeLink here
    const removeLink = (e: React.MouseEvent) => {
        e.preventDefault();
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            setEditorState(RichUtils.toggleLink(editorState, selection, null));
        }
    };

    // hande add image click
    const handleAddImageClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!fileInputRef.current) return;

        fileInputRef.current.click();
    };

    // image upload
    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];

        // file size check
        if (file.size > 10 * 1024 * 1024) {
            alert('파일 크기는 10MB를 초과할 수 없습니다.');
            return;
        }

        // file type check
        if (!file.type.match(/^image\/(png|jpg|jpeg|webp)$/)) {
            alert('추가 가능한 이미지 파일 형식이 아닙니다.');
            return;
        }

        // add image files on the screen
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {

            if (!e.target) return;

            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity(
                'IMAGE',
                'IMMUTABLE',
                {
                    src: e.target.result,
                    /* Add more info later here if you want to 100% sure about the order of image sent.
                       curretnly, if the file names are same among different images, the order gets mixed up. 
                    */
                    fileName: file.name, 
                }
            );

            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
            setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));

            // attach image file
            setFiles(prevFiles => [...prevFiles, { file: file, entityKey: entityKey }]);
        };
        reader.readAsDataURL(file);

    };

    // send button
    const onSend = async () => {

        if (!title || title === '') {
            alert('제목에 공백을 입력할수 없습니다.');
            return;
        }

        if (!category || category === '') {
            alert('카테고리에 공백을 입력할수 없습니다.');
            return;
        }

        // Check if editorState is empty
        const contentState = editorState.getCurrentContent();
        const textLength = contentState.getPlainText().trim().length;

        if (textLength === 0) {
            alert('내용에 공백을 입력할수 없습니다.');
            return;
        }

        const content = convertToRaw(editorState.getCurrentContent());
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('content', JSON.stringify(content));

        const imageEntityKeyList: string[] = [];
        // sort out unattached image files
        const blocks = contentState.getBlocksAsArray();
        blocks.forEach(block => {
            block.findEntityRanges(
                character => {
                    const entity = character.getEntity();
                    return entity !== null && entity !== undefined;
                },
                (start, _end) => {
                    const entityKey = block.getEntityAt(start);
                    if (entityKey) {
                        const entityType = contentState.getEntity(entityKey).getType();

                        if (entityType === 'IMAGE') {
                            imageEntityKeyList.push(entityKey);
                        }
                    }
                }
            );
        });

        // append files
        files.forEach(({ file, entityKey }) => {
            if (imageEntityKeyList.includes(entityKey)) {
                formData.append('files', file);
            }
        });

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/postBlog`, {
                method: 'POST',
                body: formData,
                cache: 'no-store'
            });

            if (!response.ok) {
                throw new Error('Failed to save content');
            }

            alert('글 작성이 성공적으로 완료되었습니다.');
        } catch (error) {
            console.error('Error:', error);
            alert('글 작성에 실패하였습니다.');
        }
    }


    // focus editor
    useEffect(() => {
        if (editor.current) {
            editor.current.focus();
        }
    }, []);

    return (
        <>
            <div className={styles.titleContainer}>
                <input maxLength={40} value={title} onChange={onTitle} placeholder='제목을 입력해주세요.' />
            </div>
            <div className={styles.categoryContainer}>
                <input maxLength={20} value={category} onChange={onCategory} placeholder='카테고리를 입력해주세요.' />
            </div>
            <div className={styles.container} onClick={focusEditor}>
                <div className={styles.tool}>
                    <button onMouseDown={(e) => { onToggleInlineStyle(e, 'BOLD') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" stroke="#000000" fill="#000000" strokeWidth="0" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z"></path>
                        </svg>
                    </button>
                    <button onMouseDown={(e) => { onToggleInlineStyle(e, 'ITALIC') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" stroke="#000000" fill="#000000" strokeWidth="0" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0z"></path><path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z"></path>
                        </svg>
                    </button>
                    <button onMouseDown={(e) => { onToggleInlineStyle(e, 'UNDERLINE') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" stroke="#000000" fill="#000000" strokeWidth="0" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z"></path>
                        </svg>
                    </button>
                    <button onMouseDown={(e) => { onToggleInlineStyle(e, 'STRIKETHROUGH') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" stroke="#000000" fill="#000000" strokeWidth="0" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M17.154 14c.23.516.346 1.09.346 1.72 0 1.342-.524 2.392-1.571 3.147C14.88 19.622 13.433 20 11.586 20c-1.64 0-3.263-.381-4.87-1.144V16.6c1.52.877 3.075 1.316 4.666 1.316 2.551 0 3.83-.732 3.839-2.197a2.21 2.21 0 0 0-.648-1.603l-.12-.117H3v-2h18v2h-3.846zm-4.078-3H7.629a4.086 4.086 0 0 1-.481-.522C6.716 9.92 6.5 9.246 6.5 8.452c0-1.236.466-2.287 1.397-3.153C8.83 4.433 10.271 4 12.222 4c1.471 0 2.879.328 4.222.984v2.152c-1.2-.687-2.515-1.03-3.946-1.03-2.48 0-3.719.782-3.719 2.346 0 .42.218.786.654 1.099.436.313.974.562 1.613.75.62.18 1.297.414 2.03.699z"></path>
                        </svg>
                    </button>
                    <button onMouseDown={(e) => { onToggleInlineStyle(e, 'CODE') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" stroke="#000000" fill="#000000" strokeWidth="0" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M16.95 8.464l1.414-1.414 4.95 4.95-4.95 4.95-1.414-1.414L20.485 12 16.95 8.464zm-9.9 0L3.515 12l3.535 3.536-1.414 1.414L.686 12l4.95-4.95L7.05 8.464z"></path>
                        </svg>
                    </button>
                    <button onMouseDown={(e) => { onToggleBlockType(e, 'header-one') }}>H1</button>
                    <button onMouseDown={(e) => { onToggleBlockType(e, 'header-two') }}>H2</button>
                    <button onMouseDown={(e) => { onToggleBlockType(e, 'header-three') }}>H3</button>
                    <button onMouseDown={(e) => { onToggleBlockType(e, 'header-four') }}>H4</button>
                    <button onMouseDown={(e) => { onToggleBlockType(e, 'header-five') }}>H5</button>
                    <button onMouseDown={(e) => { onToggleBlockType(e, 'header-six') }}>H6</button>
                    <button onMouseDown={(e) => { onToggleBlockType(e, 'unstyled') }}>P</button>
                    <button onMouseDown={(e) => { onToggleBlockType(e, 'unordered-list-item') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" stroke="#000000" fill="#000000" strokeWidth="0" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0z"></path><path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"></path>
                        </svg>
                    </button>
                    <button onMouseDown={(e) => { onToggleBlockType(e, 'ordered-list-item') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" stroke="#000000" fill="#000000" strokeWidth="0" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0z"></path><path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"></path>
                        </svg>
                    </button>
                    <button onMouseDown={(e) => { onToggleBlockType(e, 'blockquote') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" stroke="#000000" fill="#000000" strokeWidth="0" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M19.417 6.679C20.447 7.773 21 9 21 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311-1.804-.167-3.226-1.648-3.226-3.489a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.099.49 2.748 1.179zm-10 0C10.447 7.773 11 9 11 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311C4.591 12.322 3.17 10.841 3.17 9a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.099.49 2.748 1.179z"></path>
                        </svg>
                    </button>
                    <button onMouseDown={(e) => { onToggleBlockType(e, 'code-block') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" stroke="#000000" fill="#000000" strokeWidth="0" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M23 12l-7.071 7.071-1.414-1.414L20.172 12l-5.657-5.657 1.414-1.414L23 12zM3.828 12l5.657 5.657-1.414 1.414L1 12l7.071-7.071 1.414 1.414L3.828 12z"></path>
                        </svg>
                    </button>
                    <button onMouseDown={promptForLink}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"></path>
                        </svg>
                    </button>
                    <button onMouseDown={removeLink}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 32 32" version="1.1">
                            <path d="M11.94 22.59c-0.899 0.899-2.141 1.455-3.512 1.455-2.743 0-4.967-2.224-4.967-4.967 0-1.371 0.556-2.613 1.454-3.512l3.036-3.036c0.131-0.135 0.212-0.319 0.212-0.523 0-0.414-0.336-0.75-0.75-0.75-0.203 0-0.388 0.081-0.523 0.212l0-0-3.036 3.036c-1.169 1.17-1.891 2.786-1.891 4.57 0 3.572 2.895 6.467 6.467 6.467 1.784 0 3.4-0.723 4.57-1.891l-0 0c0.137-0.136 0.222-0.325 0.222-0.533 0-0.415-0.336-0.751-0.751-0.751-0.208 0-0.396 0.085-0.532 0.221l-0 0zM18.143 22.482c-2.192-0.437-3.845-2.271-4.003-4.518l-0.001-0.016c-0.029-0.39-0.353-0.695-0.748-0.695-0.414 0-0.75 0.336-0.75 0.75 0 0.017 0.001 0.033 0.002 0.049l-0-0.002c0.205 2.947 2.36 5.337 5.174 5.897l0.041 0.007c0.042 0.009 0.090 0.014 0.14 0.014 0.001 0 0.002 0 0.003 0h-0c0 0 0 0 0 0 0.414 0 0.75-0.336 0.75-0.75 0-0.364-0.259-0.667-0.603-0.736l-0.005-0.001zM30.531 29.469l-7.1-7.1c0.074-0.067 0.157-0.118 0.229-0.189l4.488-4.488c1.169-1.17 1.893-2.785 1.893-4.57 0-3.569-2.894-6.463-6.463-6.463-1.785 0-3.401 0.724-4.57 1.893v0c-0.136 0.136-0.219 0.323-0.219 0.53 0 0.415 0.336 0.751 0.751 0.751 0.208 0 0.395-0.084 0.531-0.22v0c0.91-0.87 2.146-1.406 3.508-1.406s2.598 0.536 3.51 1.408l-0.002-0.002c0.897 0.899 1.452 2.139 1.452 3.509s-0.555 2.611-1.452 3.509l-4.488 4.488c-0.071 0.071-0.153 0.123-0.227 0.189l-3.738-3.738c0.47-0.871 0.746-1.907 0.746-3.007 0-3.553-2.881-6.434-6.434-6.434-1.1 0-2.136 0.276-3.042 0.763l0.034-0.017-7.406-7.406c-0.135-0.131-0.32-0.212-0.523-0.212-0.414 0-0.75 0.336-0.75 0.75 0 0.203 0.081 0.388 0.213 0.523l27.999 28.001c0.136 0.136 0.324 0.22 0.531 0.22 0.415 0 0.751-0.336 0.751-0.751 0-0.207-0.084-0.395-0.22-0.531v0zM16.433 11.074c0.894 0.901 1.447 2.142 1.447 3.513 0 0.673-0.133 1.315-0.375 1.901l0.012-0.033-2.126-2.126c0.066-0.075 0.119-0.157 0.191-0.229 0.13-0.135 0.211-0.319 0.211-0.521 0-0.414-0.336-0.75-0.75-0.75-0.204 0-0.388 0.081-0.524 0.213l0-0c-0.071 0.071-0.122 0.154-0.189 0.227l-3.278-3.277c0.553-0.23 1.195-0.363 1.868-0.363 1.37 0 2.611 0.553 3.513 1.447l-0-0z" />
                        </svg>
                    </button>
                    <button onMouseDown={promptForIFrame}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"></path>
                        </svg>
                    </button>
                    {/* Existing buttons */}
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={uploadImage}
                        ref={fileInputRef}
                    />
                    <button onMouseDown={handleAddImageClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
                        </svg>
                    </button>
                    <button onMouseDown={() => setReadOnly(prevState => !prevState)}>S</button>
                </div>
                <div className={styles.editorWrapper}>
                    <Editor
                        placeholder='내용을 입력해주세요.'
                        editorState={editorState}
                        onChange={onEditorState}
                        ref={editor}
                        handleKeyCommand={handleKeyCommand}
                        readOnly={readOnly}
                    />
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button onClick={onSend}>작성 하기</button>
            </div>
        </>
    );
}

export default AdminBlogCreate;