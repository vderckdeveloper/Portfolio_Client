import { useState, useEffect, useRef } from 'react';
import { Editor, EditorState, AtomicBlockUtils, RichUtils, CompositeDecorator, ContentBlock, ContentState } from 'draft-js';

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

function AdminBlogCreate() {

    const decorator = new CompositeDecorator([
        {
            strategy: findLinkEntities,
            component: Link,
        },
        {
            strategy: findImageEntities,
            component: ImageComponent,
        },
    ]);

    // state
    const [readOnly, setReadOnly] = useState(false);
    const [editorState, setEditorState] = useState(
        EditorState.createEmpty(decorator)
    );

    // ref
    const editor = useRef<Editor>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
        if (file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {

                if (!e.target) return;

                const contentState = editorState.getCurrentContent();
                const contentStateWithEntity = contentState.createEntity(
                    'IMAGE',
                    'IMMUTABLE',
                    { src: e.target.result }
                );
                const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
                setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
            };
            reader.readAsDataURL(file);
        } else {
            console.error('File is not an image.');
        }
    };


    // focus editor
    useEffect(() => {
        if (editor.current) {
            editor.current.focus();
        }
    }, []);

    return (
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
                <button onMouseDown={removeLink}>Remove Link</button>
                <button onMouseDown={() => setReadOnly(prevState => !prevState)}>Save</button>
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
            </div>
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                readOnly={readOnly}
            />
        </div>
    );
}

export default AdminBlogCreate;