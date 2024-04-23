import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
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
            <img src={src} style={{ display: 'block', borderRadius: '8px' }} width='100%' height='100%' alt="블로그 이미지" />;
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
                <button onMouseDown={(e) => { onToggleInlineStyle(e, 'BOLD') }}>Bold</button>
                <button onMouseDown={(e) => { onToggleInlineStyle(e, 'ITALIC') }}>Italic</button>
                <button onMouseDown={(e) => { onToggleInlineStyle(e, 'UNDERLINE') }}>Underline</button>
                <button onMouseDown={(e) => { onToggleInlineStyle(e, 'STRIKETHROUGH') }}>STRIKETHROUGH</button>
                <button onMouseDown={(e) => { onToggleInlineStyle(e, 'CODE') }}>CODE</button>
                <button onMouseDown={(e) => { onToggleBlockType(e, 'header-one') }}>H1</button>
                <button onMouseDown={(e) => { onToggleBlockType(e, 'header-two') }}>H2</button>
                <button onMouseDown={(e) => { onToggleBlockType(e, 'header-three') }}>H3</button>
                <button onMouseDown={(e) => { onToggleBlockType(e, 'header-four') }}>H4</button>
                <button onMouseDown={(e) => { onToggleBlockType(e, 'header-five') }}>H5</button>
                <button onMouseDown={(e) => { onToggleBlockType(e, 'header-six') }}>H6</button>
                <button onMouseDown={(e) => { onToggleBlockType(e, 'unstyled') }}>Paragraph</button>
                <button onMouseDown={(e) => { onToggleBlockType(e, 'unordered-list-item') }}>unordered-list-item</button>
                <button onMouseDown={(e) => { onToggleBlockType(e, 'ordered-list-item') }}>ordered-list-item</button>
                <button onMouseDown={(e) => { onToggleBlockType(e, 'blockquote') }}>Blockquote</button>
                <button onMouseDown={(e) => { onToggleBlockType(e, 'code-block') }}>code block</button>
                <button onMouseDown={promptForLink}>Add Link</button>
                <button onMouseDown={removeLink}>Remove Link</button>
                <button onMouseDown={() => setReadOnly(prevState => !prevState)}>Save</button>
                {/* Existing buttons */}
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={uploadImage}
                />
                <button onMouseDown={handleAddImageClick}>
                    Add Image
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